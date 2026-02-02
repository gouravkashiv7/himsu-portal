"use client";

import * as React from "react";
import { resources } from "@/lib/data/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";

export default function PYQPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState<string>("All");

  const pyqs = resources.filter((r) => r.type === "PYQ");
  const courses = Array.from(new Set(pyqs.map((r) => r.course)));

  const filteredPYQs = pyqs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || item.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Previous Year Questions
          </h1>
          <p className="text-muted-foreground mt-1">
            Archive of university exam papers
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search subject..."
              className="h-10 pl-9 pr-4 rounded-md border border-input bg-background w-full sm:w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPYQs.length > 0 ? (
          filteredPYQs.map((item) => (
            <Card key={item.id} className="hover:bg-muted/30 transition-colors">
              <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 shrink-0">
                    <span className="font-bold text-xs">PDF</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs font-normal">
                        {item.course}
                      </Badge>
                      <span>•</span>
                      <span>Sem {item.semester}</span>
                      <span>•</span>
                      <span>{item.subject}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No question papers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
