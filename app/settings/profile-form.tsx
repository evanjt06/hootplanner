"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { toast } from "sonner"
import { useRouter } from 'next/router'

const majors = [
  { "value": "Accounting", "label": "Accounting" },
  { "value": "African and African American Studies", "label": "African and African American Studies" },
  { "value": "Ancient Mediterranean Civilizations", "label": "Ancient Mediterranean Civilizations" },
  { "value": "Anthropology", "label": "Anthropology" },
  { "value": "Architectural Studies", "label": "Architectural Studies" },
  { "value": "Architecture", "label": "Architecture" },
  { "value": "Art", "label": "Art" },
  { "value": "Art History", "label": "Art History" },
  { "value": "Asian Studies", "label": "Asian Studies" },
  { "value": "Astronomy", "label": "Astronomy" },
  { "value": "Astrophysics", "label": "Astrophysics" },
  { "value": "Bassoon Performance", "label": "Bassoon Performance" },
  { "value": "Bioengineering", "label": "Bioengineering" },
  { "value": "Biosciences", "label": "Biosciences" },
  { "value": "Business", "label": "Business" },
  { "value": "Cello Performance", "label": "Cello Performance" },
  { "value": "Chemical Engineering", "label": "Chemical Engineering" },
  { "value": "Chemical Physics", "label": "Chemical Physics" },
  { "value": "Chemistry", "label": "Chemistry" },
  { "value": "Cinema and Media Studies", "label": "Cinema and Media Studies" },
  { "value": "Civic Leadership", "label": "Civic Leadership" },
  { "value": "Civil Engineering", "label": "Civil Engineering" },
  { "value": "Civil and Environmental Engineering", "label": "Civil and Environmental Engineering" },
  { "value": "Clarinet Performance", "label": "Clarinet Performance" },
  { "value": "Classical Civilizations", "label": "Classical Civilizations" },
  { "value": "Classical Studies", "label": "Classical Studies" },
  { "value": "Cognitive Sciences", "label": "Cognitive Sciences" },
  { "value": "Composition", "label": "Composition" },
  { "value": "Computational and Applied Mathematics", "label": "Computational and Applied Mathematics" },
  { "value": "Computer Science", "label": "Computer Science" },
  { "value": "Creative Writing", "label": "Creative Writing" },
  { "value": "Data Science", "label": "Data Science" },
  { "value": "Double Bass Performance", "label": "Double Bass Performance" },
  { "value": "Earth, Environmental and Planetary Sciences", "label": "Earth, Environmental and Planetary Sciences" },
  { "value": "Economics", "label": "Economics" },
  { "value": "Electrical and Computer Engineering", "label": "Electrical and Computer Engineering" },
  { "value": "Energy and Water Sustainability", "label": "Energy and Water Sustainability" },
  { "value": "Engineering Design", "label": "Engineering Design" },
  { "value": "Engineering Leadership", "label": "Engineering Leadership" },
  { "value": "English", "label": "English" },
  { "value": "Entrepreneurship", "label": "Entrepreneurship" },
  { "value": "Environmental Engineering", "label": "Environmental Engineering" },
  { "value": "Environmental Science", "label": "Environmental Science" },
  { "value": "Environmental Studies", "label": "Environmental Studies" },
  { "value": "European Studies", "label": "European Studies" },
  { "value": "Financial Computation and Modeling", "label": "Financial Computation and Modeling" },
  { "value": "Flute Performance", "label": "Flute Performance" },
  { "value": "French Studies", "label": "French Studies" },
  { "value": "German Studies", "label": "German Studies" },
  { "value": "Global Health Technologies", "label": "Global Health Technologies" },
  { "value": "Greek Language and Literature", "label": "Greek Language and Literature" },
  { "value": "Harp Performance", "label": "Harp Performance" },
  { "value": "Health Sciences", "label": "Health Sciences" },
  { "value": "History", "label": "History" },
  { "value": "Horn Performance", "label": "Horn Performance" },
  { "value": "Jewish Studies", "label": "Jewish Studies" },
  { "value": "Languages and Intercultural Communication", "label": "Languages and Intercultural Communication" },
  { "value": "Latin American and Latinx Studies", "label": "Latin American and Latinx Studies" },
  { "value": "Latin Language and Literature", "label": "Latin Language and Literature" },
  { "value": "Linguistics", "label": "Linguistics" },
  { "value": "Managerial Economics and Organizational Sciences", "label": "Managerial Economics and Organizational Sciences" },
  { "value": "Materials Science and NanoEngineering", "label": "Materials Science and NanoEngineering" },
  { "value": "Mathematical Economic Analysis", "label": "Mathematical Economic Analysis" },
  { "value": "Mathematics", "label": "Mathematics" },
  { "value": "Mechanical Engineering", "label": "Mechanical Engineering" },
  { "value": "Medical Humanities", "label": "Medical Humanities" },
  { "value": "Medieval and Early Modern Studies", "label": "Medieval and Early Modern Studies" },
  { "value": "Museums and Cultural Heritage", "label": "Museums and Cultural Heritage" },
  { "value": "Music", "label": "Music" },
  { "value": "Music History", "label": "Music History" },
  { "value": "Music Theory", "label": "Music Theory" },
  { "value": "Naval Science", "label": "Naval Science" },
  { "value": "Neuroscience", "label": "Neuroscience" },
  { "value": "Oboe Performance", "label": "Oboe Performance" },
  { "value": "Operations Research", "label": "Operations Research" },
  { "value": "Organ Performance", "label": "Organ Performance" },
  { "value": "Percussion Performance", "label": "Percussion Performance" },
  { "value": "Philosophy", "label": "Philosophy" },
  { "value": "Physics", "label": "Physics" },
  { "value": "Piano Performance", "label": "Piano Performance" },
  { "value": "Political Science", "label": "Political Science" },
  { "value": "Politics, Law, and Social Thought", "label": "Politics, Law, and Social Thought" },
  { "value": "Poverty, Justice, and Human Capabilities", "label": "Poverty, Justice, and Human Capabilities" },
  { "value": "Psychology", "label": "Psychology" },
  { "value": "Religion", "label": "Religion" },
  { "value": "Science and Technology Studies", "label": "Science and Technology Studies" },
  { "value": "Social Policy Analysis", "label": "Social Policy Analysis" },
  { "value": "Sociology", "label": "Sociology" },
  { "value": "Spanish and Portuguese", "label": "Spanish and Portuguese" },
  { "value": "Sport Analytics", "label": "Sport Analytics" },
  { "value": "Sport Management", "label": "Sport Management" },
  { "value": "Sports Medicine and Exercise Physiology", "label": "Sports Medicine and Exercise Physiology" },
  { "value": "Statistics", "label": "Statistics" },
  { "value": "Study of Women, Gender, and Sexuality", "label": "Study of Women, Gender, and Sexuality" },
  { "value": "Teaching and Learning", "label": "Teaching and Learning" },
  { "value": "Theatre", "label": "Theatre" },
  { "value": "Trombone Performance", "label": "Trombone Performance" },
  { "value": "Trumpet Performance", "label": "Trumpet Performance" },
  { "value": "Tuba Performance", "label": "Tuba Performance" },
  { "value": "Viola Performance", "label": "Viola Performance" },
  { "value": "Violin Performance", "label": "Violin Performance" },
  { "value": "Vocal Performance", "label": "Vocal Performance" }
] as const



const profileFormSchema = z.object({
  // username: z
  //   .string()
  //   .min(2, {
  //     message: "Username must be at least 2 characters.",
  //   })
  //   .max(30, {
  //     message: "Username must not be longer than 30 characters.",
  //   }),
  grade: z
    .string({
      required_error: "Please select a grade.",
    }),
  // bio: z.string().max(160).min(4),
  sem: z.enum(["Fall", "Spring"], {
    required_error: "You need to select a semester type.",
  }),
  major: z.string({
    required_error: "Please select a major.",
  }),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  // bio: "I own a computer.",
  // urls: [
  //   { value: "https://shadcn.com" },
  //   { value: "http://twitter.com/shadcn" },
  // ],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // })

  function onSubmit(data: ProfileFormValues) 
  {
    const {grade,sem,major} = data
    localStorage.setItem("grade",grade)
    localStorage.setItem("sem",sem)
    localStorage.setItem("major",major)
  
    toast("Notification", {
      description: "Your profile has been saved locally!",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Grade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Freshman">Freshman</SelectItem>
                  <SelectItem value="Sophomore">Sophomore</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sem"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Current Semester</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Fall" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Fall
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Spring" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Spring
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Intended Major</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? majors.find(
                            (major) => major.value === field.value
                          )?.label
                        : "Select your major"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search majors..." />
                    <CommandList>
                      <CommandEmpty>No major found.</CommandEmpty>
                      <CommandGroup>
                        {majors.map((major) => (
                          <CommandItem
                            value={major.label}
                            key={major.value}
                            onSelect={() => {
                              form.setValue("major", major.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                major.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {major.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                If you're not sure and plan on changing your major, that's totally fine!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
