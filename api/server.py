from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OnboardingData(BaseModel):
    current_grade: str
    term: str
    intended_major: str
    completed_courses: List[str]
    schedule_specific_comments: Optional[str] = None
    career_interests: Optional[str] = None
    exploration_interests: Optional[str] = None

class Course(BaseModel):
    code: str
    course_title: str
    description: str
    prerequisites: str
    hours: int
    major: str
    type: str
    year: str

class OnboardingResponse(BaseModel):
    version_1: List[Course]
    percentage_1: float
    version_2: List[Course]
    percentage_2: float
    version_3: List[Course]
    percentage_3: float

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


# Example input:
# {
#   "current_grade": "Freshman",
#   "term": "Spring",
#   "intended_major": "Computer Science",
#   "completed_courses": ["COMP140", "MATH101"],
#   "max_credit_hours": 15,
#   "schedule_specific_comments": "I'd like to take 13-14 credits with one Distribution I class.",
#   "career_interests": "I want to work at Google as a software engineer.",
#   "exploration_interests": "I have some experience with machine learning, but I’m really interested in exploring entrepreneurship."
# }
@app.post("/onboarding", response_model=OnboardingResponse)
async def onboarding(data: OnboardingData):

    print(data)
  
    # Generate three different versions of recommended plans (a list of Course objects for each)
    version_1 = [
        Course(code="MATH 101", course_title="SINGLE VARIABLE CALCULUS I",
               description="Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="COMP 182", course_title="ALGORITHMS AND DATA STRUCTURES",
               description="Introduction to algorithms, data structures, and their design and analysis.",
               prerequisites="COMP 140", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="MATH 101", course_title="SINGLE VARIABLE CALCULUS I",
               description="Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="COMP 182", course_title="ALGORITHMS AND DATA STRUCTURES",
               description="Introduction to algorithms, data structures, and their design and analysis.",
               prerequisites="COMP 140", hours=3, major="COMP", type="Required Course", year="Freshman"),
    ]
    version_2 = [
        Course(code="MATH 102", course_title="SINGLE VARIABLE CALCULUS II",
               description="Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="COMP 182", course_title="ALGORITHMS AND DATA STRUCTURES",
               description="Introduction to algorithms, data structures, and their design and analysis.",
               prerequisites="COMP 140", hours=3, major="COMP", type="Required Course", year="Freshman"),
                 Course(code="MATH 102", course_title="SINGLE VARIABLE CALCULUS II",
               description="Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="COMP 182", course_title="ALGORITHMS AND DATA STRUCTURES",
               description="Introduction to algorithms, data structures, and their design and analysis.",
               prerequisites="COMP 140", hours=3, major="COMP", type="Required Course", year="Freshman"),
    ]
    version_3 = [
        Course(code="MATH 101", course_title="SINGLE VARIABLE CALCULUS I",
               description="Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
        Course(code="COMP 140", course_title="COMPUTATIONAL THINKING",
               description="Introduction to programming and computational problem-solving techniques.",
               prerequisites="None", hours=3, major="COMP", type="Required Course", year="Freshman"),
    ]
    
    # Return the response with the three versions and their associated percentages
    return OnboardingResponse(
        version_1=version_1,
        percentage_1=90.0,  # Placeholder percentage for version 1
        version_2=version_2,
        percentage_2=85.0,  # Placeholder percentage for version 2
        version_3=version_3,
        percentage_3=80.0   # Placeholder percentage for version 3
    )

# Helper function to calculate similarity score
def calculate_similarity(user_input: List[str], related_fields: List[str]) -> float:
    common_fields = set(user_input).intersection(set(related_fields))
    score = (len(common_fields) / len(related_fields)) * 100
    return score

# API Route
@app.post("/clubs", response_model=List[ClubRecommendationResponse])
def get_club_recommendations(data: ClubRecommendationRequest):

    # Sample data
    clubs = [
        {
            "name": "RemixCS",
            "description": "A volunteer-driven club at Rice University offering a 7-week mentorship program for Houston K-12 students.",
            "contact": "riceremixcs@gmail.com",
            "application": "Open to anyone, must fill out google form",
            "link": "https://remixcs.rice.edu/#curriculum",
            "related_fields": ["Computer Science", "Mentorship", "Python"]
        },
        {
            "name": "Rice CS Club",
            "description": "Rice CS Club is an organization dedicated to providing a tight-knit community of friends and mentors in computer science.",
            "contact": "riceucsclub@gmail.com",
            "application": "None, open to anyone",
            "link": "https://csclub.rice.edu/contact",
            "related_fields": ["Computer Science", "Tech Networking", "Community"]
        },
        {
            "name": "RiceApps",
            "description": "Student-led organization building web apps for community partners. Focuses on product development and learning.",
            "contact": "team.riceapps@gmail.com",
            "application": "Competitive application process involving application form and interviews",
            "link": "https://riceapps.org",
            "related_fields": ["Web Development", "Software Engineering", "Community"]
        },
        {
            "name": "Rice Data Science",
            "description": "Student-led organization that enables students to pursue their passions in data science.",
            "contact": "ricedatasci@gmail.com",
            "application": "Open to anyone",
            "link": "https://datasci.rice.edu",
            "related_fields": ["Data Science", "Analytics", "Interdisciplinary"]
        },
         {
            "name": "RemixCS",
            "description": "A volunteer-driven club at Rice University offering a 7-week mentorship program for Houston K-12 students.",
            "contact": "riceremixcs@gmail.com",
            "application": "Open to anyone, must fill out google form",
            "link": "https://remixcs.rice.edu/#curriculum",
            "related_fields": ["Computer Science", "Mentorship", "Python"]
        },
        {
            "name": "Rice CS Club",
            "description": "Rice CS Club is an organization dedicated to providing a tight-knit community of friends and mentors in computer science.",
            "contact": "riceucsclub@gmail.com",
            "application": "None, open to anyone",
            "link": "https://csclub.rice.edu/contact",
            "related_fields": ["Computer Science", "Tech Networking", "Community"]
        },
        {
            "name": "RiceApps",
            "description": "Student-led organization building web apps for community partners. Focuses on product development and learning.",
            "contact": "team.riceapps@gmail.com",
            "application": "Competitive application process involving application form and interviews",
            "link": "https://riceapps.org",
            "related_fields": ["Web Development", "Software Engineering", "Community"]
        },
        {
            "name": "Rice Data Science",
            "description": "Student-led organization that enables students to pursue their passions in data science.",
            "contact": "ricedatasci@gmail.com",
            "application": "Open to anyone",
            "link": "https://datasci.rice.edu",
            "related_fields": ["Data Science", "Analytics", "Interdisciplinary"]
        },
        # Add more clubs here...
    ]
    
    recommended_clubs = []
    user_interests = [data.intended_major]
    if data.career_interests:
        user_interests.extend(data.career_interests.lower().split())
    if data.exploration_interests:
        user_interests.extend(data.exploration_interests.lower().split())

    for club in clubs:
        # similarity_score = calculate_similarity(user_interests, club["related_fields"])
        # if similarity_score > 0:  # Recommend if similarity is more than 0
        recommended_club = {
            "club_name": club["name"],
            "club_description": club["description"],
            "club_contact": club["contact"],
            "club_application": club["application"],
            "club_link": club["link"],
            "similarity_score_percentage": round(10, 2)
        }
        recommended_clubs.append(recommended_club)

    return recommended_clubs


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

