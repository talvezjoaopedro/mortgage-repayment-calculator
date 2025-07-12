"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { motion } from "motion/react"
import { useState } from "react"
import { watch } from "fs"

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
  const [shouldShake, setShouldShake] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      term: 0,
      rate: 0,
      type: "repayment",
    },
  });

  const { reset, handleSubmit } = form;
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast("Mortgage calculated successfully.");
  }

  function onError() {
    setShouldShake(true);
    console.log("error");
  }

  return (
    <>
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl">Mortgage calculator</h1>
            <Button key="ClearButton" type="button" variant={"ghost"} onClick={() => reset()}>Clear all</Button>
          </div>
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
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
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
          <motion.div
            animate={shouldShake ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.2 }}
            onAnimationComplete={() => setShouldShake(false)}
          >
            <Button key="SubmitButton" type="submit" className="w-full">
              {"Calculate " + (form.watch("type") == "repayment" ? "repayments" : "interest")}
            </Button>
          </motion.div>
        </form>
      </Form>
    </>
  )
}
