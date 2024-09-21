"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const accountFormSchema = z.object({
  // name: z
  //   .string()
  //   .min(2, {
  //     message: "Name must be at least 2 characters.",
  //   })
  //   .max(30, {
  //     message: "Name must not be longer than 30 characters.",
  //   }),
  credit: z
    .string({
      required_error: "Please select credit.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  comments: z.string({
    required_error: "Please write a comment.",
  }),
  classes: z
  .array(
    z.object({
      value: z.string().url({ message: "Please enter classes." }),
    })
  )
  .optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // bio: "I own a computer.",
  classes: [
    { value: "COMP140" },
    { value: "MATH101" },
  ],
}

// This can come from your database or API.
// const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
// }

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })


const { fields, append } = useFieldArray({
  name: "classes",
  control: form.control,
})

  function onSubmit(data: AccountFormValues) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="credit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max # of credit hours</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the maximum number of credit hours you'd like to take." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="13">13</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="17">17</SelectItem>
                  <SelectItem value="18">18</SelectItem>
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
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`classes.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Past Coursework
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    These courses are prior classes you've taken that are REQUIRED for your major.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Course
          </Button>
        </div>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Comments</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Example: I am a CS major, but I'm interested in taking an art class.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update course preferences</Button>
      </form>
    </Form>
  )
}
