"use client"

import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotesData } from "./quote"
import { useState } from "react"
import { quotelessJson } from "zod/v3"

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
})

export default function ClientForm() {
  const [quotes,setQuotes]=useState([])
  const [submit,setSubmit]=useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  })

  const onSubmit = (data) => {
    const topic=data.topic.toLowerCase();
    const filtered=quotesData.filter((quote)=>quote.topic.toLowerCase().includes(topic));
    setQuotes(filtered)
    setSubmit(true)

  }

  return (
    <div>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Enter a topic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Form>
        {submit && (
          <div className="mt-6 space-y-4">
            {quotes.length> 0 ?(
              quotes.slice(0,3).map((quote,index)=>
                <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic">
                   “{quote.text}”
                   <div className="text-sm mt-1 text-right">{quote.author}</div>
                </blockquote>

              )
            ):(
              <p className="text-gray-500 italic">No quote found on this topic</p>
            )}
          </div>
        )}
          
    </div>
  )
}