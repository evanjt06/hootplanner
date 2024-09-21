from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

class OnboardingData(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    completed_courses: List[str]
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

@app.post("/onboarding")
def onboarding(data: OnboardingData):

    # LanceDB shit
    

    recommended_plans = [
        {
            "semester_1": ["COMP 182", "MATH 212", "ECON 101", "PHYS 101"],
            "notes": "This plan focuses on AI and entrepreneurship."
        },
        {
            "semester_1": ["COMP 182", "MATH 212", "ART 101", "PSYC 101"],
            "notes": "This plan incorporates more diverse interests like art and psychology."
        },
        {
            "semester_1": ["COMP 182", "MATH 212", "ART 101", "PSYC 101"],
            "notes": "This plan incorporates more diverse interests like art and psychology."
        },
    ]

    return {
        "recommended_plans": recommended_plans
    }

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