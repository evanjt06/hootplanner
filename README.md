# HootPlanner

## Inspiration
Course discovery and scheduling are often overwhelming and confusing. Students frequently miss exciting research opportunities they never knew existed. They are also troubled with too many choices in clubs and activities. Seeing this, we started working on **HootPlanner**.

## What it does
**HootPlanner** is the one-stop shop for students preparing for their careers in college. It:
- Crafts perfect class schedules in seconds
- Suggests exciting research projects tailored to students' passions
- Recommends clubs and activities students will love
- Reduces student stress and uncertainty in decision-making
- Improves utilization of university resources (courses, research, and clubs)

## How we built it
Our backend is driven by **FastAPI** that handles API endpoints for student onboarding, course recommendations, club suggestions, and research opportunities. We integrated **LanceDB** for vector search, using pre-trained language models to generate embeddings for semantic matching. This allowed us to provide highly relevant recommendations based on students' interests and academic profiles.

On the frontend, we used **Next.js** and **Tailwind CSS** to create a responsive interface. Our full-stack approach enables students to input their academic information and interests, then receive personalized recommendations for courses, clubs, and research opportunities that align with their goals. By incorporating machine learning for matching and recommendation, we've created a system that offers tailored suggestions for each user.

## Challenges we ran into
We encountered several challenges while training our **Lance Vector DB**. While developing our RAG pipeline, we dealt with issues related to batch processing, calculating cosine similarity, and determining which parameters and categories influence recommendations.

## Accomplishments that we're proud of
In building this app, we're particularly proud of our recommendation engine that uses advanced language models to provide personalized suggestions for courses, clubs, and research opportunities. We successfully integrated academic planning with extracurricular activities. Our user-centric design guides students through exploring options tailored to their profiles while offering data-driven insights through percentage matches. By efficiently managing data from various sources, we've created a comprehensive platform that goes beyond simple keyword matching to offer truly valuable recommendations for students' academic journeys.

## What we learned
This project was difficult, especially due to the time pressure we were under. Despite these factors, we expanded our understanding of vector databases, embeddings, RAG, and working with LLMs. On the less technical side, we learned to communicate effectively and had to set our differences aside to work as a team to complete our project.
