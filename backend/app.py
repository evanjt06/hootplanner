from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import lancedb
from transformers import AutoTokenizer, AutoModel
import torch
import random

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


uri = "data/hoot"
db = lancedb.connect(uri)

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L12-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L12-v2")

# Function to generate embeddings
def generate_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    # embeddings = outputs.last_hidden_state.mean(dim=1)
    # embeddings = embeddings.detach().numpy().flatten()  # Flatten the embeddings
    # return embeddings
    return outputs.last_hidden_state.mean(dim=1).detach().numpy()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

class ClubRecommendationRequest(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    career_interests: Optional[str] = None
    exploration_interests: Optional[str] = None

# Output schema
class ClubRecommendationResponse(BaseModel):
    club_name: str
    club_description: str
    club_contact: str
    club_application: str
    club_link: str
    similarity_score_percentage: float

class OnboardingData(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    completed_courses: Optional[List[str]] = None
    career_interests: Optional[str] = None
    exploration_interests: Optional[str] = None
    schedule_specific_comments: Optional[str] = None

class extracurricularData(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    career_interests: Optional[str] = None
    exploration_interests: Optional[str] = None

class AdviceRequest(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    career_goals: str
    academic_progress: List[dict[str, str]]
    exploration_interests: Optional[str] = None
    schedule_specific_comments: Optional[str] = None

def get_course_details(course_code, file_name):

    df = pd.read_csv(file_name)
    course = df[df['course_code'] == course_code]
    
    if course.empty:
        return f"Course {course_code} not found."
    
    # Extract course details, handle NaN values by replacing them with empty strings
    details = {
        "code": course['course_code'].iloc[0],
        "course_title": course['title'].fillna("").iloc[0],
        "description": course['description'].fillna("").iloc[0],
        "prerequisites": course['prerequisites'].fillna("").iloc[0],
        "hours": course['credit_hours'].fillna(0).iloc[0],
        "major": course['major'].fillna("").iloc[0],
        "type": "Required Course" if course['require'].fillna("No").iloc[0] == "Yes" else "Elective Course",
        "year": course['year_level'].fillna("").iloc[0]
    }
    
    return details

@app.post("/onboarding")
def onboarding(data: OnboardingData):

    math_requirements_cs = ["MATH 101", "MATH 102", "MATH 212", "MATH 355"]
    comp_requirements_cs = ["COMP 140", "COMP 182", "COMP 215", "COMP 222", "COMP 301", "COMP 312", "COMP 318", "COMP 321", "COMP 382", "COMP 416"]
    
    bios_requirements_bs = ["BIOS 201", "BIOS 202"]
    math_requirements_bs = ["MATH 101", "MATH 102"]
    chem_requirements_bs = ["CHEM 121", "CHEM 123", "CHEM 122", "CHEM 124"]

    major_requirements = []

    if data.intended_major == "Computer Science":
        if data.completed_courses is not None:
            for course in data.completed_courses:
                if course[:4] == "MATH":
                    math_requirements_cs.remove(course)

                elif course[:4] == "COMP":
                    comp_requirements_cs.remove(course)

        major_requirements.append(math_requirements_cs[0])
        major_requirements.append(comp_requirements_cs[0])

    elif data.intended_major == "Biosciences":
        if data.completed_courses is None:
            major_requirements.append(bios_requirements_bs[0])
            major_requirements.append(math_requirements_bs[0])
            major_requirements.append(chem_requirements_bs[0])
            major_requirements.append(chem_requirements_bs[1])

        else:
            for course in data.completed_courses:
                if course[:4] == "MATH":
                    math_requirements_bs.remove(course)

                elif course[:4] == "BIOS":
                    bios_requirements_bs.remove(course)

                elif course[:4] == "CHEM":
                    major_requirements.append(chem_requirements_bs[2])
                    major_requirements.append(chem_requirements_bs[3])

            major_requirements.append(bios_requirements_bs[0])
            major_requirements.append(math_requirements_bs[0])

    # print(major_requirements)

    major_requirements_details = []
    for course_major in major_requirements:
        details = get_course_details(course_major, "CSBSCourses.csv")
        major_requirements_details.append(details)
    major_requirements_details.append({
        "code": "FWIS 100",
        "course_title": "FWIS WRITING STUDIO",
        "description": "First-Year Writing-Intensive Seminar (FWIS) courses at Rice University fulfill the Writing and Communication Requirement for all bachelor's degree students. Capped at 16 students, these courses focus on developing writing, speaking, and visual communication skills through diverse assignments and close faculty interaction.",
        "prerequisites": "",
        "hours": 3,
        "major": "",
        "type": "Required Course",
        "year": "Freshman"
    })
    
    # use lance RAG to get elective recommendations

    # 17-18 is 3 elective classes
    # 15-16 is 2 elective classes
    # 12-13 is 1 elective class

    user_input_embedding = generate_embeddings(data.exploration_interests).flatten()

    hoot = db.open_table("electives")
    results = hoot.search(user_input_embedding) \
    .metric("cosine")\
        .limit(10) \
        .to_list()
    
    elective_course_codes = [i["course_code"] for i in results]
    print(elective_course_codes)

    elective_course_details = []
    for course_elective in elective_course_codes:
        details = get_course_details(course_elective, "electives.csv")
        elective_course_details.append(details)

    recommended_plans = {}

    # Version 1: Include all items from elective_course_details
    recommended_plans["version_1"] = major_requirements_details + elective_course_details[:3]
    recommended_plans["percentage_1"] = round((1-0.5*results[0]['_distance']+0.1) * 100, 2)

    # Version 2: Include first 2 items from elective_course_details
    recommended_plans["version_2"] = major_requirements_details + random.sample(elective_course_details, 2)
    recommended_plans["percentage_2"] = round((1-0.5*results[1]['_distance']+0.1) * 100, 2) 

    # Version 3: Include first 1 item from elective_course_details
    recommended_plans["version_3"] = major_requirements_details + random.sample(elective_course_details, 1)
    recommended_plans["percentage_3"] = round((1-0.5*results[2]['_distance']+0.1) * 100, 2)

    return recommended_plans


# API Route
@app.post("/clubs", response_model=List[ClubRecommendationResponse])
def get_club_recommendations(data: ClubRecommendationRequest):

    # current_grade: str
    # term: str
    # intended_major: str
    # career_interests: Optional[str] = None
    # exploration_interests: Optional[str] = None

    tclub = ""
    if data.intended_major == "Computer Science":
        tclub="csclubs"
    if data.intended_major == "Biosciences":
        tclub="bioclubs"

    # read csv data
    club_data = pd.read_csv(tclub+".csv")

    hoot = db.open_table(tclub)
    user_input = data.career_interests + " " + data.exploration_interests + " " + data.intended_major
    user_input_embedding = generate_embeddings(user_input).flatten()

    results = hoot.search(user_input_embedding) \
    .metric("cosine")\
        .limit(10) \
        .to_list()

    # for i in results:
    #     print(i["club_name"], 1-i["_distance"]/2+0.15)

    totals = []
    for i in results:
        matching_row = club_data[club_data['club_name'] == i["club_name"]]
    
        if not matching_row.empty:
    
            matching_row = matching_row.copy()  # To avoid SettingWithCopyWarning

            # acct for missing fiedls
            matching_row['club_contact'].fillna('', inplace=True)
            matching_row['club_link'].fillna('', inplace=True)

            matching_row['similarity_score_percentage'] = round((1-0.5*i['_distance']+0.1) * 100, 2)

            totals.append(matching_row.to_dict(orient='records')[0])
    return totals



# Pydantic model for ResearchOpportunity
class ResearchOpportunity(BaseModel):
    research_name: str
    faculty_member: str
    faculty_description: str
    research_description: str
    contact: str
    link: str
    lab_name: Optional[str] = None
    lab_description: Optional[str] = None
    lab_website_link: Optional[str] = None
    similarity_score_percentage: float

# Route to get research opportunity recommendations
@app.post("/research", response_model=List[ResearchOpportunity])
def get_research_opportunities(data: ClubRecommendationRequest):

    #  "research_name": r["research_name"],
    # "faculty_member": r["faculty_member"],
    # "faculty_description": r["faculty_description"],
    # "research_description": r["research_description"],
    # "contact": r["contact"],
    #     "link": r["link"],
    # "lab_name": r["lab_name"],
    # "lab_description": r["lab_description"],
    # "lab_website_link": r["lab_website_link"],
    # "similarity_score_percentage": round(10, 2)

    tclub = ""
    if data.intended_major == "Computer Science":
        tclub="csresearch"
    if data.intended_major == "Biosciences":
        tclub="bioresearch"

    # read csv data
    club_data = pd.read_csv(tclub+".csv")

    hoot = db.open_table(tclub)
    user_input = data.career_interests + " " + data.exploration_interests + " " + data.intended_major
    user_input_embedding = generate_embeddings(user_input).flatten()

    results = hoot.search(user_input_embedding) \
    .metric("cosine")\
        .limit(10) \
        .to_list()

    totals = []
    for i in results:
        matching_row = club_data[club_data['faculty_member'] == i["faculty_member"]]
    
        if not matching_row.empty:
    
            matching_row = matching_row.copy()  # To avoid SettingWithCopyWarning

            # acct for missing fiedls
            matching_row['lab_website_link'].fillna('', inplace=True)
            matching_row['lab_description'].fillna('', inplace=True)
            matching_row['lab_name'].fillna('', inplace=True)

            matching_row['similarity_score_percentage'] = round((1-0.5*i['_distance']+0.1) * 100, 2)

            totals.append(matching_row.to_dict(orient='records')[0])
    return totals
       
