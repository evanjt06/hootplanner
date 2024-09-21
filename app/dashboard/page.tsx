import * as React from "react"
import Image from "next/image"
import Link from "next/link"
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
  PencilLine,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import owllogo from "../assets/OwlLogo.jpg"

const courses = [
    {
      course_code: "MATH 101",
      title: "SINGLE VARIABLE CALCULUS I",
      description:
        "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
      prerequisites: "None",
      credit_hours: "3",
      major: "COMP",
      require: "Yes",
      year_level: "Freshman",
    },
    {
      course_code: "MATH 102",
      title: "SINGLE VARIABLE CALCULUS II",
      description:
        "Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series, Taylor polynomials and Taylor series, parametric equations, arc length, polar coordinates, complex numbers, and Fourier polynomials.",
      prerequisites: "None",
      credit_hours: "3",
      major: "COMP",
      require: "Yes",
      year_level: "Freshman",
    },
    {
        course_code: "MATH 101",
        title: "SINGLE VARIABLE CALCULUS I",
        description:
          "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
        prerequisites: "None",
        credit_hours: "3",
        major: "COMP",
        require: "Yes",
        year_level: "Freshman",
      },
      {
        course_code: "MATH 102",
        title: "SINGLE VARIABLE CALCULUS II",
        description:
          "Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series, Taylor polynomials and Taylor series, parametric equations, arc length, polar coordinates, complex numbers, and Fourier polynomials.",
        prerequisites: "None",
        credit_hours: "3",
        major: "COMP",
        require: "Yes",
        year_level: "Freshman",
      },
      {
        course_code: "MATH 101",
        title: "SINGLE VARIABLE CALCULUS I",
        description:
          "Limits, continuity, differentiation, integration, and the Fundamental Theorem of Calculus.",
        prerequisites: "None",
        credit_hours: "3",
        major: "COMP",
        require: "Yes",
        year_level: "Freshman",
      },
      {
        course_code: "MATH 102",
        title: "SINGLE VARIABLE CALCULUS II",
        description:
          "Continuation of MATH 101. Includes further techniques of integration, as well as infinite sequences and series, Taylor polynomials and Taylor series, parametric equations, arc length, polar coordinates, complex numbers, and Fourier polynomials.",
        prerequisites: "None",
        credit_hours: "3",
        major: "COMP",
        require: "Yes",
        year_level: "Freshman",
      },
  ];

  const courses2 = 
    [
        {
          "course_code": "MATH 212",
          "title": "MULTIVARIABLE CALCULUS",
          "description": "Calculus of multiple variables, including vectors, partial derivatives and gradients, double and triple integrals, vector fields, and related theorems.",
          "prerequisites": "",
          "credit_hours": 3,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Sophomore"
        },
        {
          "course_code": "STAT 310",
          "title": "PROBABILITY AND STATISTICS",
          "description": "Central concepts and methods of statistics, including probability, random variables, distributions, estimation, and hypothesis testing.",
          "prerequisites": "",
          "credit_hours": "3-4",
          "major": "COMP",
          "require": "Yes",
          "year_level": "Sophomore"
        },
        {
          "course_code": "COMP 215",
          "title": "INTRODUCTION TO PROGRAM DESIGN",
          "description": "Covers the principles of programming and program design, with assignments that fit together to complete a real-world application.",
          "prerequisites": "",
          "credit_hours": 4,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Sophomore"
        },
        {
          "course_code": "COMP 222",
          "title": "INTRODUCTION TO COMPUTER ORGANIZATION",
          "description": "Introduces students to the organization of computer systems, including data representation, memory allocation, and assembly language.",
          "prerequisites": "",
          "credit_hours": 4,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Sophomore"
        }
      ]

      
    const courses3 =[
        {
          "course_code": "MATH 355",
          "title": "LINEAR ALGEBRA",
          "description": "Covers systems of linear equations, matrices, vector spaces, and eigenvalues/eigenvectors.",
          "prerequisites": "",
          "credit_hours": 3,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Junior"
        },
        {
          "course_code": "COMP 301",
          "title": "COMPUTER ETHICS",
          "description": "Discussion-based course on moral philosophy and social responsibility in computer science.",
          "prerequisites": "",
          "credit_hours": 3,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Junior"
        },
        {
          "course_code": "COMP 318",
          "title": "CONCURRENT PROGRAM DESIGN",
          "description": "Introduces principles of designing large-scale concurrent software systems, with a focus on best practices for concurrency.",
          "prerequisites": "",
          "credit_hours": 4,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Junior"
        },
        {
          "course_code": "COMP 382",
          "title": "REASONING ABOUT ALGORITHMS",
          "description": "Introduction to reasoning techniques about algorithms, covering topics like logic, correctness, and computational models.",
          "prerequisites": "",
          "credit_hours": 4,
          "major": "COMP",
          "require": "Yes",
          "year_level": "Junior"
        }
      ]
      

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Dashboard() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
              </Link>
            
              <Link
                href="/clubs"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
         
         
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            
          <h1 className="text-3xl text-center mt-2" style={{fontWeight:900}}>Your Suggested Schedules</h1>
            <h3 className="text-xl text-center mb-2" style={{marginTop: "-20px"}}>
                AI-generated schedules from HootPlanner, tailored to your preferences and needs.
            </h3>
            <Tabs defaultValue="1">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="1">Schedule Version 1</TabsTrigger>
                  <TabsTrigger value="2">Schedule Version 2</TabsTrigger>
                  <TabsTrigger value="3">Schedule Version 3</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  
                  <Button
                    size="sm"
                    // variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export schedules as PDF</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="1">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                  <CardTitle style={{fontSize: 24, display: "flex", justifyContent: "space-between"}}>
                    18 credit hour schedule
                    <i style={{color: "darkgreen"}}>{Math.trunc(Math.random() * 100)}% similarity</i>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Course Title
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Prerequisites
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Hours</TableHead>
                          <TableHead className="hidden md:table-cell">Major</TableHead>
                          <TableHead className="hidden md:table-cell">Type</TableHead>
                          <TableHead className="text-right">Year</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                       {courses.map((course, index) => (
                        <TableRow className="bg-accent" key={index}>
                          <TableCell>
                            <div className="font-medium">{course.course_code}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                          {course.title}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {course.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.prerequisites}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.credit_hours}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.major}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.require === "Yes" ? "Required Course" : "Elective Course"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.year_level}
                          </TableCell>
                        </TableRow>))}
                       
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="2">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                  <CardTitle style={{fontSize: 24, display: "flex", justifyContent: "space-between"}}>
                    15 credit hour schedule
                    <i style={{color: "darkgreen"}}>{Math.trunc(Math.random() * 100)}% similarity</i>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Course Title
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Prerequisites
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Hours</TableHead>
                          <TableHead className="hidden md:table-cell">Major</TableHead>
                          <TableHead className="hidden md:table-cell">Type</TableHead>
                          <TableHead className="text-right">Year</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                       {courses2.map((course, index) => (
                        <TableRow className="bg-accent" key={index}>
                          <TableCell>
                            <div className="font-medium">{course.course_code}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                          {course.title}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {/* <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge> */}
                            {course.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.prerequisites}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.credit_hours}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.major}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.require === "Yes" ? "Required Course" : "Elective Course"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.year_level}
                          </TableCell>
                        </TableRow>))}
                       
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="3">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                  <CardTitle style={{fontSize: 24, display: "flex", justifyContent: "space-between"}}>
                    14 credit hour schedule
                    <i style={{color: "darkgreen"}}>{Math.trunc(Math.random() * 100)}% similarity</i>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Course Title
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Description
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Prerequisites
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Hours</TableHead>
                          <TableHead className="hidden md:table-cell">Major</TableHead>
                          <TableHead className="hidden md:table-cell">Type</TableHead>
                          <TableHead className="text-right">Year</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                       {courses3.map((course, index) => (
                        <TableRow className="bg-accent" key={index}>
                          <TableCell>
                            <div className="font-medium">{course.course_code}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                          {course.title}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {/* <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge> */}
                            {course.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.prerequisites}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.credit_hours}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.major}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.require === "Yes" ? "Required Course" : "Elective Course"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.year_level}
                          </TableCell>
                        </TableRow>))}
                       
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
