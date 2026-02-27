"use client";

import * as React from "react";
export type FAQCategory = "Admissions" | "Examinations" | "Hostel" | "General";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState<FAQCategory | "All">("All");

  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await axios.get("/api/faqs");
      return res.data.data as FAQ[];
    },
  });

  const filteredFaqs =
    faqs?.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All" || faq.category === category;
      return matchesSearch && matchesCategory;
    }) || [];

  const categories: (FAQCategory | "All")[] = [
    "All",
    "Admissions",
    "Examinations",
    "Hostel",
    "General",
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground">
          Find answers to common queries about admissions, exams, and campus
          life.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border p-2 min-h-75">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p>Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-lg text-left">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No results found. Try a different search term.
          </div>
        )}
      </div>

      <div className="mt-12 text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
        <h3 className="font-semibold mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our volunteers are active on WhatsApp to help you out.
        </p>
        <button className="text-primary font-medium hover:underline">
          Chat with us
        </button>
      </div>
    </div>
  );
}
