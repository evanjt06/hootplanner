"use client"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  LibraryBig,
  UsersRound,
  PanelLeft,
  Search,
  Microscope,
  Settings,
  ShoppingCart,
  PencilLine,
  Truck,
  Users2,
} from "lucide-react"
import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import owllogo from "../assets/OwlLogo.jpg"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"

import { BellIcon, CheckIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

// const clubs = [
//   {
//     "club_name": "RemixCS",
//     "club_description": "Rice REMIX CS: A volunteer-driven club at Rice University offering a 7-week mentorship program for Houston K-12 students. Focuses on teaching Python programming, computer science concepts, and college application guidance. Aims to inspire underrepresented minorities in CS. Meets 1 hour/week.",
//     "club_contact": "riceremixcs@gmail.com",
//     "club_application": "Open to anyone, must fill out google form",
//     "club_link": "https://remixcs.rice.edu/#curriculum"
//   },
//   {
//     "club_name": "Rice CS Club",
//     "club_description": "Rice CS Club is an organization dedicated to providing Rice students with a tight-knit community of friends and mentors to promote and advocate computer science and working with tech. Community events include study breaks, social outings, and meet and greets between different classes. We also provide professional resources for members including company-sponsored informational and networking events, resume and algorithm review sessions, social outings, and tech workshops.",
//     "club_contact": "riceucsclub@gmail.com",
//     "club_application": "None, open to anyone",
//     "club_link": "https://csclub.rice.edu/contact"
//   },
//   {
//     "club_name": "RiceApps",
//     "club_description": "RiceApps: Student-led organization building web apps for community partners. Focuses on product development and learning process. Provides hands-on experience in software development, client communication, and team leadership. Offers practical application of classroom skills in real-world projects. Emphasizes fast-paced, collaborative environment for expanding technical abilities and soft skills.",
//     "club_contact": "team.riceapps@gmail.com",
//     "club_application": "Competitive application process involving application form and interviews",
//     "club_link": "https://riceapps.org"
//   },
//   {
//     "club_name": "CSters",
//     "club_description": "CSters was founded in the Spring of 2002 by a group of female Computer Science undergraduates who realized the importance of supporting women in this field. We aim to foster a network of undergraduate, graduate, and prospective students, as well as alumni and professionals within the field. Over the years, we have sponsored many Rice students to attend the annual Grace Hopper Conference. Through partnerships with various organizations in the Rice community and beyond, CSters further expands opportunities for students to interact with industry professionals for career development and mentorship.",
//     "club_contact": "csters.rice@gmail.com",
//     "club_application": "Targeted towards women in Computer Science, but no application",
//     "club_link": "https://csters.rice.edu"
//   },
//   {
//     "club_name": "Rice Data Science",
//     "club_description": "Rice Data Science is a student-led and student-centered organization that enables students to realize their passions and career aspirations in the field of data science. Our goal is to create a collaborative, enriching, and interdisciplinary Data Science community at Rice. We coordinate career preparation opportunities, technical workshops, and social events to provide Rice students with the ability to develop greater proficiency in data science and engage with peers who share their passion for data science.",
//     "club_contact": "ricedatasci@gmail.com",
//     "club_application": "Can join through website or socials, open to anyone",
//     "club_link": "https://datasci.rice.edu"
//   },
//   {
//     "club_name": "AR/VR",
//     "club_description": "Rice AR/VR is a club focused on augmented and virtual reality developments. They collaborate with NASA on projects, offering members unique opportunities in cutting-edge technology. The club has open positions available and welcomes new members, emphasizing that no prior development experience is required to join and participate.",
//     "club_contact": "Instagram: ricearvr",
//     "club_application": "Open to anyone",
//     "club_link": "https://www.instagram.com/ricearvr/"
//   },
//   {
//     "club_name": "Society of Women Engineers",
//     "club_description": "Rice SWE is a member of Region C (Gulf Coast Region) section of Society of Women Engineers (SWE). As a non-profit educational and service organization, we are committed to organizing professional and social events to help Rice women engineers succeed and advance in their career aspirations.",
//     "club_contact": "swe@rice.edu",
//     "club_application": "Open to women in engineering",
//     "club_link": "https://swe.rice.edu"
//   },
//   {
//     "club_name": "Rice Robotics Club",
//     "club_description": "The Rice University Robotics Club (RRC) is focused on providing members the resources to explore their interests in engineering and design. Our goal is to encourage students to collaborate on projects to develop their skills in engineering for industry development and research. Our club focuses on nurturing the development of engineering-based skills including expertise in engineering design, manufacturing, computation, and electronics. We also encourage members to establish leadership skills by developing solutions to real-world problems as a team and leading innovative projects.",
//     "club_contact": "riceroboticsclub@gmail.com",
//     "club_application": "Open to anyone, form to join club on website",
//     "club_link": "https://roboticsclub.rice.edu/join-us"
//   }
// ]


export default function Opportunities() {

  const [clubs,setClubs] = useState<any>()

  async function fetchClubs() {
    try {

    const d = {
      current_grade: localStorage.getItem("grade"),
      term: localStorage.getItem("sem"),
      intended_major: localStorage.getItem("major"),
      career_interests: localStorage.getItem("career"),
      exploration_interests: localStorage.getItem("exploration"),
    }


      const resp = await axios.post("http://localhost:8000/clubs", d)
      console.log(resp.data)
      setClubs(resp.data)
      
    } catch(error) {

    }
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  return (
    <div className="container mx-auto p-6">
       <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center  justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            {/* <LibraryBig className="h-4 w-4 transition-all group-hover:scale-110" /> */}
            <Image style={{borderRadius:10}} alt="" src={owllogo} />
          </Link>
              <Link
                href="/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
              </Link>
            
              <Link
                href="/clubs"
                className="flex  bg-accent h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UsersRound className="h-5 w-5" />
              </Link>
           
              <Link
                href="/research"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Microscope className="h-5 w-5" />
              </Link>  

               
              <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
              </Link>  
        </nav>
      </aside>

      <h1 className="text-3xl text-center mt-5 mb-5" style={{fontWeight:900}}>Your Suggested Clubs</h1>

      <div className="flex justify-start flex-wrap gap-12 m-4 p-2">
      {clubs?.map((club: any, index: number) => (
  <Card key={index} className="w-[41vw] flex flex-col justify-between shadow-lg">
    <CardHeader>
      <CardTitle style={{fontSize: 26, display: "flex", justifyContent: "space-between"}}>
        {club.club_name}
        <i style={{color: "darkgreen"}}>{club.similarity_score_percentage}% similarity</i>
      </CardTitle>
      <CardDescription>{club.club_contact}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <h1 className="text-md font-medium">Description:</h1>
      <div className="text-sm text-muted-foreground mb-4">
        {club.club_description}
      </div>
      <h1 className="text-md font-medium">Application Process:</h1>
      <div className="text-sm text-muted-foreground">
        {club.club_application}
      </div>
    </CardContent>
    <CardFooter className="mt-auto">
      <Button className="w-full">
        <a href={club.club_link} target="_blank" className="flex w-full justify-center items-center">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> View website link
        </a>
      </Button>
    </CardFooter>
  </Card>
))}

      </div>
      
    </div>
  );
}
