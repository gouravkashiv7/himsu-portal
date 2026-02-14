"use client";

import * as React from "react";
// import { Course } from "@/lib/data/colleges"; // Removed strict type dependency
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Banknote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a flexible Course interface locally or use 'any'
interface Course {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  duration: string;
  seats: number | string;
  fees: string;
  eligibility: string;
}

export function CourseList({ courses }: { courses: any[] }) {
  const [filter, setFilter] = React.useState<string>("All");

  const filteredCourses = React.useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter((c) => c.type === filter);
  }, [courses, filter]);

  // Derive unique course types for filter buttons
  const courseTypes = React.useMemo(() => {
    const types = new Set(courses.map((c) => c.type));
    return ["All", ...Array.from(types)];
  }, [courses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>

        <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg w-full md:w-auto overflow-x-auto">
          {courseTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                filter === type
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Card
              key={course._id || course.id || index}
              className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/40 flex flex-col h-full"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-lg line-clamp-2 leading-tight">
                    {course.name}
                  </CardTitle>
                  <Badge
                    variant={
                      course.type === "Postgraduate" ? "default" : "secondary"
                    }
                    className="shrink-0"
                  >
                    {course.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-y-3 text-sm flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 shrink-0" />
                    {course.seats} Seats
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <Banknote className="w-4 h-4 shrink-0" />
                    {course.fees}
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground col-span-2">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="line-clamp-2" title={course.eligibility}>
                      {course.eligibility}
                    </span>
                  </div>
                </div>

                <div className="pt-2 mt-auto">
                  <Button variant="outline" className="w-full">
                    View Syllabus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
            No courses found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
