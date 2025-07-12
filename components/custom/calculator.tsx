"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toast } from "sonner"

const formSchema = z.object({
  amount: z.coerce
    .number()
    .nonnegative({
      message: "Age must be a positive number.",
    })
    .min(1, {
      message: "Age must be at least 1.",
    }),
  term: z.coerce
    .number()
    .nonnegative({
      message: "Age must be a positive number.",
    })
    .min(1, {
      message: "Age must be at least 1.",
    }),
  rate: z.coerce
    .number()
    .nonnegative({
      message: "Age must be a positive number.",
    })
    .min(1, {
      message: "Age must be at least 1%.",
    }),
  type: z.enum(["repayment", "interest"], { 
    required_error: "You need to select a notification type.",

  })
})

export function Calculator() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      term: 0,
      rate: 0,
      type: "repayment",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl">Mortgage calculator</h1>
        <Button variant={"ghost"}>Clear all</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    
                    <FormItem className={"flex items-center gap-3 p-3 pb-3.5 rounded-lg border " + (field.value == 'repayment' ? 'bg-neutral-800 border-neutral-600' : 'border-neutral-800 hover:bg-neutral-950')}>
                      <FormControl>
                        <RadioGroupItem value="repayment" />
                      </FormControl>
                      <FormLabel className="w-full">
                        Repayment
                      </FormLabel>
                    </FormItem>
                    <FormItem className={"flex items-center gap-3 p-3 pb-3.5 rounded-lg border "  + (field.value == 'interest' ? 'bg-neutral-800 border-neutral-600' : 'border-neutral-800 hover:bg-neutral-950')}>
                      <FormControl>
                        <RadioGroupItem value="interest" />
                      </FormControl>
                      <FormLabel className="w-full">
                        Interest
                      </FormLabel>
                    </FormItem> 
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Calculate repayments
          </Button>
        </form>
      </Form>
    </>
  )
}
