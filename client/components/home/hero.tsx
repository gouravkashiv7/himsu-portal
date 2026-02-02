import Link from "next/link";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const colleges = [
  {
    name: "Panjab University",
    slug: "pu",
    color: "bg-purple-600", // Fallback colors until we have images
    description: "Premier institution for higher education & research.",
  },
  {
    name: "DAV College",
    slug: "dav",
    color: "bg-red-600",
    description: "Excellence in education at Sector 10, Chandigarh.",
  },
  {
    name: "PPGC-11",
    slug: "ppgc-11",
    color: "bg-blue-600",
    description: "Post Graduate Government College, Sector 11.",
  },
  {
    name: "SD College",
    slug: "sd",
    color: "bg-orange-500",
    description: "GGDSD College, Sector 32. A legacy of quality.",
  },
];

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-20 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background dark:from-green-950/20 dark:to-background pointer-events-none" />

      <div className="container max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          Admissions Open 2026-27
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl leading-tight">
          Your Gateway to <br />
          <span className="text-gradient">Top Colleges in Chandigarh</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          One portal for all your admission needs. Simplified process, real-time
          updates, and student support by HIMSU.
        </p>

        {/* Quick Search */}
        <div className="w-full max-w-xl relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transition-all group-hover:bg-primary/30" />
          <div className="relative glass rounded-full flex items-center p-2 pl-6 shadow-lg">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Search for courses, colleges, or deadlines..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Button size="sm" className="rounded-full px-6">
              Search
            </Button>
          </div>
        </div>

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-12">
          {colleges.map((college) => (
            <Link
              key={college.slug}
              href={`/college/${college.slug}`}
              className="group"
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                <div
                  className={`h-24 ${college.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
                >
                  <GraduationCap className="text-white w-10 h-10 opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-6 text-left relative z-10 bg-card">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {college.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {college.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    View Portal <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
