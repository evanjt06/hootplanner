from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict
import pandas as pd

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

class OnboardingData(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    completed_courses: Optional[List[str]] = None
    career_interests: Optional[str] = None
    exploration_interests: Optional[str] = None
    num_schedule_versions: Optional[int] = None
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

df = pd.read_csv('CSBSCourses.csv')

def get_course_details(course_code):
    # Search for the course
    course = df[df['course_code'] == course_code]
    
    if course.empty:
        return f"Course {course_code} not found."
    
    # Extract course details
    details = {
        "code": course['course_code'].iloc[0],
        "course_title": course['title'].iloc[0],
        "description": course['description'].iloc[0],
        "prerequisites": course['prerequisites'].iloc[0],
        "hours": course['credit_hours'].iloc[0],
        "major": course['major'].iloc[0],
        "type": "Required Course" if course['require'].iloc[0] == "Yes" else "Elective Course",
        "year": course['year_level'].iloc[0]
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

    print(major_requirements)

    major_requirements_details = []
    for course_major in major_requirements:
        details = get_course_details(course_major)
        major_requirements_details.append(details)

    #This is the main major requirement array with all the information. We have to combine this with the electives and the percentages. 
    print(major_requirements_details)

    #Ignore this for now, this is just a template/placeholder
    recommended_plans = {
    "version_1": [
        {
            "code": "MATH 101",
            "course_title": "SINGLE VARIABLE CALCULUS I",
            "description": "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
            "prerequisites": "None",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        },
        {
            "code": "COMP 182",
            "course_title": "ALGORITHMS AND DATA STRUCTURES",
            "description": "Introduction to algorithms, data structures, and their design and analysis.",
            "prerequisites": "COMP 140",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        }
    ],
    "percentage_1": 90.0,
    "version_2": [
        {
            "code": "MATH 102",
            "course_title": "SINGLE VARIABLE CALCULUS II",
            "description": "Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series.",
            "prerequisites": "None",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        },
        {
            "code": "COMP 182",
            "course_title": "ALGORITHMS AND DATA STRUCTURES",
            "description": "Introduction to algorithms, data structures, and their design and analysis.",
            "prerequisites": "COMP 140",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        }
    ],
    "percentage_2": 85.0,
    "version_3": [
        {
            "code": "MATH 101",
            "course_title": "SINGLE VARIABLE CALCULUS I",
            "description": "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
            "prerequisites": "None",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        },
        {
            "code": "COMP 140",
            "course_title": "COMPUTATIONAL THINKING",
            "description": "Introduction to programming and computational problem-solving techniques.",
            "prerequisites": "None",
            "hours": 3,
            "major": "COMP",
            "type": "Required Course",
            "year": "Freshman"
        }
    ],
    "percentage_3": 80.0
    }

    return recommended_plans

@app.get("/extracurriculars")
def get_extracurriculars(data: extracurricularData):

    clubs = ""
    research = ""

    return {
        "clubs": clubs,
        "research_opportunities": research
    }

@app.post("/advice")
def get_advice(data: AdviceRequest):

    return {
        "academic_advice": {
            "next_courses": next_courses,
            "notes": academic_notes
        },
        "career_advice": {
            "advice": career_advice
        }
    }
