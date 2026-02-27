"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import { FileText, User, Loader2 } from "lucide-react";

interface Resource {
  _id: string;
  title: string;
  type: string;
  subject: string;
  course: string;
  author?: string;
  link: string;
  description?: string;
}

export default function NotesPage() {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["resources", "Note"],
    queryFn: async () => {
      const res = await axios.get("/api/resources?type=Note");
      return res.data.data as Resource[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Digital Notes</h1>
        <p className="text-muted-foreground mt-1">
          Curated study material by top students and professors.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
            Loading notes...
          </p>
        </div>
      ) : notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Card
              key={note._id}
              className="group hover:shadow-md transition-all"
            >
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
                {note.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{note.author}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className="w-full bg-primary/10 text-primary hover:bg-primary/20 shadow-none border border-primary/20"
                  asChild
                >
                  <a href={note.link} target="_blank" rel="noopener noreferrer">
                    Read Online
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-bold mb-1">No notes available</h3>
          <p className="text-sm text-muted-foreground">
            Notes will be uploaded soon.
          </p>
        </div>
      )}
    </div>
  );
}
