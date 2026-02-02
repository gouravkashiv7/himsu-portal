"use client";

import { resources } from "@/lib/data/resources";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";

export default function NotesPage() {
  const notes = resources.filter((r) => r.type === "Note");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Digital Notes</h1>
        <p className="text-muted-foreground mt-1">
          Curated study material by top students and professors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="group hover:shadow-md transition-all">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant="secondary">{note.course}</Badge>
              </div>
              <CardTitle className="line-clamp-1">{note.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {note.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">Subject:</span>{" "}
                {note.subject}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>{note.author}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 shadow-none border border-primary/20">
                Read Online
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
