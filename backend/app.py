from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import lancedb
from transformers import AutoTokenizer, AutoModel
import torch

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

df = pd.read_csv('CSBSCourses.csv')

def get_course_details(course_code):
    # Search for the course
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
        details = get_course_details(course_major)
        major_requirements_details.append(details)
    
    # use lance RAG to get elective recommendations

    # 17-18 is 3 elective classes
    # 15-16 is 2 elective classes
    # 12-13 is 1 elective class

    



    #This is the main major requirement array with all the information. We have to combine this with the electives and the percentages. 
    # return {"requirements": major_requirements_details}



    #Ignore this for now, this is just a template/placeholder
    # recommended_plans = {
    # "version_1": [
    #     {
    #         "code": "MATH 101",
    #         "course_title": "SINGLE VARIABLE CALCULUS I",
    #         "description": "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
    #         "prerequisites": "None",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     },
    #     {
    #         "code": "COMP 182",
    #         "course_title": "ALGORITHMS AND DATA STRUCTURES",
    #         "description": "Introduction to algorithms, data structures, and their design and analysis.",
    #         "prerequisites": "COMP 140",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     }
    # ],
    # "percentage_1": 90.0,
    # "version_2": [
    #     {
    #         "code": "MATH 102",
    #         "course_title": "SINGLE VARIABLE CALCULUS II",
    #         "description": "Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series.",
    #         "prerequisites": "None",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     },
    #     {
    #         "code": "COMP 182",
    #         "course_title": "ALGORITHMS AND DATA STRUCTURES",
    #         "description": "Introduction to algorithms, data structures, and their design and analysis.",
    #         "prerequisites": "COMP 140",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     }
    # ],
    # "percentage_2": 85.0,
    # "version_3": [
    #     {
    #         "code": "MATH 101",
    #         "course_title": "SINGLE VARIABLE CALCULUS I",
    #         "description": "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
    #         "prerequisites": "None",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     },
    #     {
    #         "code": "COMP 140",
    #         "course_title": "COMPUTATIONAL THINKING",
    #         "description": "Introduction to programming and computational problem-solving techniques.",
    #         "prerequisites": "None",
    #         "hours": 3,
    #         "major": "COMP",
    #         "type": "Required Course",
    #         "year": "Freshman"
    #     }
    # ],
    # "percentage_3": 80.0
    # }

    # return recommended_plans


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

    research = [
    {
        "research_name": "Antarctic Diatom Ecophysiology",
        "faculty_member": "Maggie Baker",
        "faculty_description": "Graduate student (Faculty mentor: Sven Kranz)",
        "research_description": "Maggie Baker's research focuses on Antarctic diatoms and their ecophysiology and biogeochemistry. Her work aims to understand how phytoplankton respond to environmental changes, particularly during the Austral winter season in Antarctica. She uses novel dynamic lighting systems and experimental ice chambers to study the survival and competition strategies of these microorganisms. Her research contributes to understanding CO2 sequestration and nutrient cycling in marine ecosystems.",
        "contact": "mb203@rice.edu",
        "link": "https://ouri.rice.edu/people/maggie-baker",
        "lab_name": "Kranz lab",
        "lab_description": "In our lab we study phytoplankton ecology and biogeochemistry. We are specifically interested in how different phytoplankton groups respond to environmental perturbations such as changes in CO2, light intensity and nutrient availability. My students and I aim to not only characterize the responses of phytoplankton to a multitude of environmental factors, but also to understand the underlying processes of the measured responses, such as photosynthetic pathways, carbon acquisition processes and protein regulation. In collaboration with my colleagues at FSU, within the US and around the globe, we investigate these ecophysiological responses on different levels (from gene expression to ecosystem function) and in many ecosystems (Gulf of Mexico, tropical oligotrophic regions, Southern Ocean and coastal upwelling regions). We hope that our work will inform many different groups of researchers. For example: Our work on nitrogen isotopes in the Southern Ocean aims to inform the interpretation of paleo proxies on the strength of the biological carbon pump during glacial and interglacial cycles. Our work on N2 fixing organisms will inform biogeochemical modelers on current and projected future productivity of our oceans. The work on marine productivity will inform ecologists, physiologists and numerical modelers on processes affecting the base of the marine food web. We further hope that our work on the toxic dinoflaggelate Karenia brevis, a Gulf of Mexico red tide organism, will inform decision makers and ecosystem managers to better understand and predict the socio-economic impact of this organism in the current and future ocean. Our lab is located in the Anderson Biological laboratory @ Rice University in Houston.",
        "lab_website_link": "https://kranzlab.rice.edu/news/"
    },
    {
        "research_name": "Peroxisome Biology and Biogenesis",
        "faculty_member": "Bonnie Bartel",
        "faculty_description": "Ralph and Dorothy Looney Professor of Biosciences",
        "research_description": "Bonnie Bartel's research focuses on peroxisome biology in the plant Arabidopsis thaliana. Her lab investigates the mechanisms by which cells assemble and destroy peroxisomes, which are important organelles that sequester essential but potentially dangerous metabolic reactions. Using genetic, genomic, cell biological, and biochemical approaches, her work aims to uncover novel peroxisomal functions and advance understanding of peroxisome biogenesis and membrane complexity. This research has implications for human peroxisome biogenesis disorders and contributes to fundamental knowledge of eukaryotic cell biology.",
        "contact": "bartel@rice.edu",
        "link": "https://ouri.rice.edu/people/bonnie-bartel",
        "lab_name": "Bartel lab",
        "lab_description": "We use genetic and cell biological approaches to elucidate peroxisome biogenesis, degradation, dynamics, and functions in the reference plant Arabidopsis thaliana. In the past, we studied the roles of indole-3-butyric acid and auxin conjugates in auxin homeostasis, used auxin response mutants to understand hormone signaling and cross-talk, and used functional genomics to uncover targets and roles of plant microRNAs and to understand how and why plants synthesize diverse triterpenoids.",
        "lab_website_link": "http://www.bioc.rice.edu/~bartel/index.html"
    },
    {
        "research_name": "Metabolic Engineering for Biofuels and Chemicals",
        "faculty_member": "George Bennett",
        "faculty_description": "E. Dell Butcher Professor, Department of Biochemistry and Cell Biology",
        "research_description": "George Bennett's research focuses on genetic engineering of metabolic pathways in microbes for the production of biofuels and chemicals. His lab studies bacterial responses to environmental stresses and develops approaches to metabolic engineering, including cofactor engineering and the 'cellular refinery' approach. They also work on understanding and manipulating genes related to butanol production in Clostridium acetobutylicum, studying biodegradation of hazardous compounds, and developing novel DNA technology for synthetic biology applications in microbial genetic engineering.",
        "contact": "gbennett@rice.edu",
        "link": "https://ouri.rice.edu/people/george-bennett",
        "lab_name": "Microbial Biotechnology Lab",
        "lab_description": "Microbial biotechnology has entered a new era due to the analysis of complete genomes of many organisms and the analytical capacity to measure transcription, proteins, and metabolic fluxes through systems biology approaches. We are now in the post-genomic era where creative use of this information in a more synthetic context can be applied to exploration of new scientific horizons and practical construction of microbes with optimized functions through metabolic engineering. The broader relevance of our work fits with several larger societal themes that are apt to continue to be of importance: concerns about environmental pollution, concerns about future energy and chemicals in an age of more expensive petroleum, the increasing capacity of computation to address complex issues in biology, and trends toward miniaturization, efficiency, specificity in process industry. These ideas coupled with the desire to understand more complex biological processes and apply advances to health make microbial biotechnology an important component of biofuels, genetics, and synthetic biology research. Information regarding our work on metabolic engineering projects with the bacteria Escherichia coli and Clostridium acetobutylicum related to formation and analysis of metabolic networks for specific chemical production and biodegradation is presented on this website. Other projects concerning how the pattern of cell-to-cell distribution of particular proteins can affect cell adaptation under fluctuating conditions and efforts to develop novel chemical and genetic manipulation tools are also ongoing.",
        "lab_website_link": "http://www.bioc.rice.edu/~gbennett/index.htm"
    },
    {
        "research_name": "Molecular Systems Biology and Synthetic Biology",
        "faculty_member": "Matthew Bennett",
        "faculty_description": "Associate Professor",
        "research_description": "Matthew Bennett's research focuses on the dynamics of gene regulation, spanning from small-scale interactions like transcription and translation to large-scale dynamics of gene regulatory networks. His lab uses a hybrid experimental and computational approach to uncover design principles of native gene networks and apply these concepts to design novel synthetic circuits. This work bridges experimental and theoretical molecular systems biology, contributing to both fundamental understanding and practical applications in synthetic biology.",
        "contact": "Matthew.Bennett@rice.edu",
        "link": "https://ouri.rice.edu/people/matthew-bennett",
        "lab_name": "The Biodesign Lab",
        "lab_description": "Our research spans the boundary between theoretical and experimental synthetic biology. We use an interdisciplinary approach to 1) uncover the underlying design principles governing gene networks and microbial consortia, 2) develop new mathematical tools to better describe gene networks, and 3) engineer novel synthetic gene circuits for environmental and medical applications.",
        "lab_website_link": "http://biodesign.rice.edu/index.html"
    }
    ]

    recommended_rsch = []
    user_interests = [data.intended_major]
    if data.career_interests:
        user_interests.extend(data.career_interests.lower().split())
    if data.exploration_interests:
        user_interests.extend(data.exploration_interests.lower().split())

    for r in research:
        # similarity_score = calculate_similarity(user_interests, club["related_fields"])
        # if similarity_score > 0:  # Recommend if similarity is more than 0
       
        recommended_rsch.append({
            "research_name": r["research_name"],
            "faculty_member": r["faculty_member"],
            "faculty_description": r["faculty_description"],
            "research_description": r["research_description"],
            "contact": r["contact"],
             "link": r["link"],
            "lab_name": r["lab_name"],
            "lab_description": r["lab_description"],
            "lab_website_link": r["lab_website_link"],
            "similarity_score_percentage": round(10, 2)
        })

    return recommended_rsch



# @app.get("/extracurriculars")
# def get_extracurriculars(data: extracurricularData):

#     clubs = ""
#     research = ""

#     return {
#         "clubs": clubs,
#         "research_opportunities": research
#     }

# @app.post("/advice")
# def get_advice(data: AdviceRequest):

#     return {
#         "academic_advice": {
#             "next_courses": next_courses,
#             "notes": academic_notes
#         },
#         "career_advice": {
#             "advice": career_advice
#         }
#     }
