"use client";

import * as React from "react";
import { Course } from "@/lib/data/colleges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Banknote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CourseList({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = React.useState<
    "All" | "Undergraduate" | "Postgraduate" | "Diploma"
  >("All");

  const filteredCourses = React.useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter((c) => c.type === filter);
  }, [courses, filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Available Courses</h2>

        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {["All", "Undergraduate", "Postgraduate"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
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
          filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/40"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-lg line-clamp-2">
                    {course.name}
                  </CardTitle>
                  <Badge
                    variant={
                      course.type === "Postgraduate" ? "default" : "secondary"
                    }
                  >
                    {course.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {course.seats} Seats
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <Banknote className="w-4 h-4" />
                    {course.fees}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <BookOpen className="w-4 h-4" />
                    {course.eligibility}
                  </div>
                </div>

                <div className="pt-2">
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
