import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
  {
    title: "Course Preferences",
    href: "/forms/courses",
  },
  // {
  //   title: "Appearance",
  //   href: "/forms/appearance",
  // },
  // {
  //   title: "Notifications",
  //   href: "/forms/notifications",
  // },
  {
    title: "Interests",
    href: "/forms/interests",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">HootPlanner Onboarding</h2>
          <p className="text-muted-foreground">
           Share your major, interests, and current year to receive personalized course recommendations and extracurricular opportunities.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
