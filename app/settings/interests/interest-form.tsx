"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const

const displayFormSchema = z.object({
  exploration: z.string().optional(),
  career: z.string().optional()
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {

}

export function DisplayForm() {

  const router = useRouter()
  const [load,setLoad]=useState(false)
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  })

  async function onSubmit(data: DisplayFormValues) {
    setLoad(true)
    const {exploration, career} = data

    if (career) {
      localStorage.setItem("career",career)
    }
    if (exploration) {
      localStorage.setItem("exploration",exploration)
    }
  
    toast("Notification", {
      description: "Your interests has been saved locally!",
    })

    let cl = localStorage.getItem("classes");
    let flattened:any[] = []
    
      if (cl) {
          
      const parsedCl = JSON.parse(cl) as Array<{ value: string }>;
      flattened = parsedCl.map(item => item.value); 
      }

    const d = {
      current_grade: localStorage.getItem("grade"),
      term: localStorage.getItem("sem"),
      intended_major: localStorage.getItem("major"),
      completed_courses: flattened,
      schedule_specific_comments: localStorage.getItem("comments"),
      career_interests: localStorage.getItem("career"),
      exploration_interests: localStorage.getItem("exploration"),
    }

    // SEND TO API /onboarding
    try {
      const resp = await axios.post("http://localhost:8000/onboarding", d)

      // set info to local storage
      const {
        percentage_1,
        percentage_2,
        percentage_3,
        version_1,
        version_2,
        version_3
      } = resp.data

      localStorage.setItem("percentage_1", percentage_1)
      localStorage.setItem("percentage_2", percentage_2)
      localStorage.setItem("percentage_3", percentage_3)
      localStorage.setItem("version_1", JSON.stringify(version_1))
      localStorage.setItem("version_2", JSON.stringify(version_2))
      localStorage.setItem("version_3", JSON.stringify(version_3))

      // loading false now
      setLoad(false)
       // REDIRECT TO /DASHBOARD
      router.push("/dashboard")

    } catch(error) {
      console.log(error)
    }

   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="exploration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What would you like to explore within your major?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Example: I am a Biosciences major and I want to do research at the BioResearch Collaborative.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="career"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What would you like to explore a career in?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Example: I'd like to be a pediatrician or go into family medicine.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">
          {load ? 
          <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 m-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
          :
          "Submit"}

          </Button>
      </form>
    </Form>
  )
}
