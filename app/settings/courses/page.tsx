import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./courses"
import Link from "next/link"
import Image from "next/image"
import owllogo from "../../assets/OwlLogo.jpg"
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

export default function SettingsAccountPage() {
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
              className="flex  h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <UsersRound className="h-5 w-5" />
            </Link>
          
            <Link
              href="/research"
              className="flex  h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Microscope className="h-5 w-5" />
            </Link> 

            
            <Link
              href="/settings"
              className="flex  bg-accent h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
            </Link>  
      </nav>
    </aside>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Course Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Let HootPlanner know your course preferences and prior academic coursework.
          </p>
        </div>
        {/* <Separator /> */}
        <AccountForm />
      </div>
    </div>
  )
}
