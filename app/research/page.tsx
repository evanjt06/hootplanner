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
  Truck,
  Users2,
  PencilLine
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { BellIcon, CheckIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

// const research = [
//   {
//     "research_name": "Antarctic Diatom Ecophysiology",
//     "faculty_member": "Maggie Baker",
//     "faculty_description": "Graduate student (Faculty mentor: Sven Kranz)",
//     "research_description": "Maggie Baker's research focuses on Antarctic diatoms and their ecophysiology and biogeochemistry. Her work aims to understand how phytoplankton respond to environmental changes, particularly during the Austral winter season in Antarctica. She uses novel dynamic lighting systems and experimental ice chambers to study the survival and competition strategies of these microorganisms. Her research contributes to understanding CO2 sequestration and nutrient cycling in marine ecosystems.",
//     "contact": "mb203@rice.edu",
//     "link": "https://ouri.rice.edu/people/maggie-baker",
//     "lab_name": "Kranz lab",
//     "lab_description": "In our lab we study phytoplankton ecology and biogeochemistry. We are specifically interested in how different phytoplankton groups respond to environmental perturbations such as changes in CO2, light intensity and nutrient availability. My students and I aim to not only characterize the responses of phytoplankton to a multitude of environmental factors, but also to understand the underlying processes of the measured responses, such as photosynthetic pathways, carbon acquisition processes and protein regulation. In collaboration with my colleagues at FSU, within the US and around the globe, we investigate these ecophysiological responses on different levels (from gene expression to ecosystem function) and in many ecosystems (Gulf of Mexico, tropical oligotrophic regions, Southern Ocean and coastal upwelling regions). We hope that our work will inform many different groups of researchers. For example: Our work on nitrogen isotopes in the Southern Ocean aims to inform the interpretation of paleo proxies on the strength of the biological carbon pump during glacial and interglacial cycles. Our work on N2 fixing organisms will inform biogeochemical modelers on current and projected future productivity of our oceans. The work on marine productivity will inform ecologists, physiologists and numerical modelers on processes affecting the base of the marine food web. We further hope that our work on the toxic dinoflaggelate Karenia brevis, a Gulf of Mexico red tide organism, will inform decision makers and ecosystem managers to better understand and predict the socio-economic impact of this organism in the current and future ocean. Our lab is located in the Anderson Biological laboratory @ Rice University in Houston.",
//     "lab_website_link": "https://kranzlab.rice.edu/news/"
//   },
//   {
//     "research_name": "Peroxisome Biology and Biogenesis",
//     "faculty_member": "Bonnie Bartel",
//     "faculty_description": "Ralph and Dorothy Looney Professor of Biosciences",
//     "research_description": "Bonnie Bartel's research focuses on peroxisome biology in the plant Arabidopsis thaliana. Her lab investigates the mechanisms by which cells assemble and destroy peroxisomes, which are important organelles that sequester essential but potentially dangerous metabolic reactions. Using genetic, genomic, cell biological, and biochemical approaches, her work aims to uncover novel peroxisomal functions and advance understanding of peroxisome biogenesis and membrane complexity. This research has implications for human peroxisome biogenesis disorders and contributes to fundamental knowledge of eukaryotic cell biology.",
//     "contact": "bartel@rice.edu",
//     "link": "https://ouri.rice.edu/people/bonnie-bartel",
//     "lab_name": "Bartel lab",
//     "lab_description": "We use genetic and cell biological approaches to elucidate peroxisome biogenesis, degradation, dynamics, and functions in the reference plant Arabidopsis thaliana. In the past, we studied the roles of indole-3-butyric acid and auxin conjugates in auxin homeostasis, used auxin response mutants to understand hormone signaling and cross-talk, and used functional genomics to uncover targets and roles of plant microRNAs and to understand how and why plants synthesize diverse triterpenoids.",
//     "lab_website_link": "http://www.bioc.rice.edu/~bartel/index.html"
//   },
//   {
//     "research_name": "Metabolic Engineering for Biofuels and Chemicals",
//     "faculty_member": "George Bennett",
//     "faculty_description": "E. Dell Butcher Professor, Department of Biochemistry and Cell Biology",
//     "research_description": "George Bennett's research focuses on genetic engineering of metabolic pathways in microbes for the production of biofuels and chemicals. His lab studies bacterial responses to environmental stresses and develops approaches to metabolic engineering, including cofactor engineering and the 'cellular refinery' approach. They also work on understanding and manipulating genes related to butanol production in Clostridium acetobutylicum, studying biodegradation of hazardous compounds, and developing novel DNA technology for synthetic biology applications in microbial genetic engineering.",
//     "contact": "gbennett@rice.edu",
//     "link": "https://ouri.rice.edu/people/george-bennett",
//     "lab_name": "Microbial Biotechnology Lab",
//     "lab_description": "Microbial biotechnology has entered a new era due to the analysis of complete genomes of many organisms and the analytical capacity to measure transcription, proteins, and metabolic fluxes through systems biology approaches. We are now in the post-genomic era where creative use of this information in a more synthetic context can be applied to exploration of new scientific horizons and practical construction of microbes with optimized functions through metabolic engineering. The broader relevance of our work fits with several larger societal themes that are apt to continue to be of importance: concerns about environmental pollution, concerns about future energy and chemicals in an age of more expensive petroleum, the increasing capacity of computation to address complex issues in biology, and trends toward miniaturization, efficiency, specificity in process industry. These ideas coupled with the desire to understand more complex biological processes and apply advances to health make microbial biotechnology an important component of biofuels, genetics, and synthetic biology research. Information regarding our work on metabolic engineering projects with the bacteria Escherichia coli and Clostridium acetobutylicum related to formation and analysis of metabolic networks for specific chemical production and biodegradation is presented on this website. Other projects concerning how the pattern of cell-to-cell distribution of particular proteins can affect cell adaptation under fluctuating conditions and efforts to develop novel chemical and genetic manipulation tools are also ongoing.",
//     "lab_website_link": "http://www.bioc.rice.edu/~gbennett/index.htm"
//   },
//   {
//     "research_name": "Molecular Systems Biology and Synthetic Biology",
//     "faculty_member": "Matthew Bennett",
//     "faculty_description": "Associate Professor",
//     "research_description": "Matthew Bennett's research focuses on the dynamics of gene regulation, spanning from small-scale interactions like transcription and translation to large-scale dynamics of gene regulatory networks. His lab uses a hybrid experimental and computational approach to uncover design principles of native gene networks and apply these concepts to design novel synthetic circuits. This work bridges experimental and theoretical molecular systems biology, contributing to both fundamental understanding and practical applications in synthetic biology.",
//     "contact": "Matthew.Bennett@rice.edu",
//     "link": "https://ouri.rice.edu/people/matthew-bennett",
//     "lab_name": "The Biodesign Lab",
//     "lab_description": "Our research spans the boundary between theoretical and experimental synthetic biology. We use an interdisciplinary approach to 1) uncover the underlying design principles governing gene networks and microbial consortia, 2) develop new mathematical tools to better describe gene networks, and 3) engineer novel synthetic gene circuits for environmental and medical applications.",
//     "lab_website_link": "http://biodesign.rice.edu/index.html"
//   }
// ]



export default function Research() {

  const [researchOpps,setResearchOpps] = useState<any>()

  async function fetCHr() {
    try {

    const d = {
      current_grade: localStorage.getItem("grade"),
      term: localStorage.getItem("sem"),
      intended_major: localStorage.getItem("major"),
      career_interests: localStorage.getItem("career"),
      exploration_interests: localStorage.getItem("exploration"),
    }


      const resp = await axios.post("http://localhost:8000/research", d)
      console.log(resp.data)
      setResearchOpps(resp.data)
      
    } catch(error) {

    }
  }

  useEffect(() => {
    fetCHr()
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
                href="/research"
                className="flex  bg-accent h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Microscope className="h-5 w-5" />
              </Link> 
              <Link
                href="/clubs"
                className="flex  h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UsersRound className="h-5 w-5" />
              </Link>
           
           

              
              <Link
                href="/settings"
                className="flex  h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
              </Link>  
        </nav>
      </aside>

      <h1 className="text-3xl text-center mt-5 mb-5" style={{fontWeight:900}}>Your Suggested Research Opportunities</h1>

      <div className="flex justify-start flex-wrap gap-12 m-4 p-2">
      {researchOpps?.map((r:any, index:number) => (
  <Card key={index} className="w-[41vw] flex flex-col justify-between shadow-lg">
    <CardHeader>
      <CardTitle style={{fontSize: 20, display: "flex", justifyContent: "space-between"}}>
      {r.research_name}
        <i style={{color: "darkblue"}}>{r.similarity_score_percentage}% similarity</i>
      </CardTitle>
      {/* <CardDescription></CardDescription> */}
    </CardHeader>
    <CardContent className="flex-grow">
    
      <h1 className="text-md font-medium">Who's the research led by?</h1>
      <div className="text-sm text-muted-foreground mb-4">
      {r.faculty_member} <b>({r.contact})</b>, {r.faculty_description}.
      </div>
      <h1 className="text-md font-medium">Faculty Research Area Interests:</h1>
      <div className="text-sm text-muted-foreground mb-4">
        {r.research_description}
      </div>
      <h1 className="text-md font-medium">Lab/Group:</h1>
      <div className="text-sm text-muted-foreground mb-4">
        {r.lab_name}
      </div>
      <h1 className="text-md font-medium">Lab/Group Description:</h1>
      <div className="text-sm text-muted-foreground mb-4">
      <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Expand to view lab/group description</AccordionTrigger>
        <AccordionContent>
        {r.lab_description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>

       
      </div>
    </CardContent>
    <CardFooter className="mt-auto gap-10">
      <Button style={{background: "darkblue"}} className="w-full">
        <a href={r.link} target="_blank" className="flex w-full justify-center items-center">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> View faculty link
        </a>
      </Button>
      <Button className="w-full">
        <a href={r.lab_website_link} target="_blank" className="flex w-full justify-center items-center">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> View lab/group link
        </a>
      </Button>
    </CardFooter>
  </Card>
))}

      </div>
      
    </div>
  );
}
