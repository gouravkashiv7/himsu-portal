import Link from "next/link";
import { FileText, Book, Video, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const categories = [
  {
    title: "Previous Year Questions",
    description:
      "Access exam papers from the last 10 years for all major courses.",
    icon: FileText,
    href: "/resources/pyq",
    color: "bg-blue-500/10 text-blue-600",
    hover: "hover:border-blue-500/50",
  },
  {
    title: "Digital Notes",
    description:
      "Curated study material, handwritten notes, and PDF summaries.",
    icon: Book,
    href: "/resources/notes",
    color: "bg-green-500/10 text-green-600",
    hover: "hover:border-green-500/50",
  },
  {
    title: "Video Lectures",
    description:
      "Topic-wise video tutorials and curated playlists for difficult subjects.",
    icon: Video,
    href: "/resources/videos",
    color: "bg-red-500/10 text-red-600",
    hover: "hover:border-red-500/50",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Study Resources Hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to excel in your exams. Free, open, and
          community-driven.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.title} href={category.href} className="group">
            <Card
              className={`h-full transition-all duration-300 border-2 border-transparent shadow-sm hover:shadow-xl ${category.hover}`}
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${category.color}`}
                >
                  <category.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Browse Collection{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Contribution CTA */}
      <div className="mt-20 p-8 rounded-3xl bg-muted/50 border text-center">
        <h3 className="text-2xl font-bold mb-2">
          Have study material to share?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Help your juniors by uploading your notes or question papers.
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors">
          Upload Resource
        </button>
      </div>
    </div>
  );
}
