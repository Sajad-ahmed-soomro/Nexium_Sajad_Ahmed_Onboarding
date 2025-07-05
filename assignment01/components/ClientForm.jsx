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

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
})

export default function ClientForm() {
  const [quotes,setQuotes]=useState([])
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Topic:", data.topic)
    const topic=data.topic.toLowerCase();
    const filtered=quotesData.filter((quote)=>quote.topic.toLowerCase().includes(topic));
    setQuotes(filtered)


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
          {quotes.length>0 && (
            <div className="mt-6 space-y-4">
              {quotes.map((quote,index)=>(
                <blockquote className="border-l-4 border-blue-500 pl-4 italic" key={index}> “{quote.text}”
                  <div className="text-sm mt-1 text-right">{quote.author}</div>
                </blockquote>
              ))}
            </div>
          )}
    </div>
  )
}