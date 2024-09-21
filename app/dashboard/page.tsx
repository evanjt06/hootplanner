"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Dashboard() {

  const [courses1, setCourses1] = useState([])
  const [courses2, setCourses2] = useState([])
  const [courses3, setCourses3] = useState([])

  const [pc1, setPc1] = useState<string>()
  const [pc2, setPc2] = useState<string>()
  const [pc3, setPc3] = useState<string>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const version1Data = localStorage.getItem("version_1");
    setCourses1(version1Data ? JSON.parse(version1Data) : [])
    
    const version2Data = localStorage.getItem("version_2");
    setCourses2(version2Data ? JSON.parse(version2Data) : [])
    
    const version3Data = localStorage.getItem("version_3");
    setCourses3(version3Data ? JSON.parse(version3Data) : [])

    const per1 = localStorage.getItem("percentage_1")
    const per2 = localStorage.getItem("percentage_2")
    const per3 = localStorage.getItem("percentage_3")

    setPc1(per1 ? per1 : "")
    setPc2(per2 ? per2 : "")
    setPc3(per3 ? per3 : "")

      }
  }, [])

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
                    17-18 credit hours schedule
                    <i style={{color: "darkgreen"}}>{pc1}% similarity</i>
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

                       {courses1.map((course: any, index: number) => (
                        <TableRow className="bg-accent" key={index}>
                          <TableCell>
                            <div className="font-medium">{course.code}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                          {course.course_title}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {course.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.prerequisites}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.hours}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.major}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.type}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {course.year}
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
                    15-16 credit hours schedule
                    <i style={{color: "darkgreen"}}>{pc2}% similarity</i>
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

                       {courses2.map((course: any, index: number) => (
                        <TableRow className="bg-accent" key={index}>
                        <TableCell>
                          <div className="font-medium">{course.code}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        {course.course_title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {course.description}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.prerequisites}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.hours}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.major}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.type}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.year}
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
                    12-13 credit hour schedule
                    <i style={{color: "darkgreen"}}>{pc3}% similarity</i>
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

                       {courses3.map((course: any, index: number) => (
                        <TableRow className="bg-accent" key={index}>
                        <TableCell>
                          <div className="font-medium">{course.code}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        {course.course_title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {course.description}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.prerequisites}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.hours}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.major}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.type}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {course.year}
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
