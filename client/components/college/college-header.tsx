import { College } from "@/lib/data/colleges";
import { MapPin, Globe, Phone, Mail, Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CollegeHeader({ college }: { college: College }) {
  return (
    <div className="relative w-full">
      {/* Banner */}
      <div
        className={`h-48 md:h-64 w-full ${college.bannerColor} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          {/* Logo Placeholder */}
          <div className="w-32 h-32 rounded-xl bg-card border-4 border-background shadow-xl flex items-center justify-center text-4xl font-bold text-primary shrinking-0">
            {college.shortName}
          </div>

          <div className="flex-1 space-y-2 mb-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {college.name}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {college.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Est. {college.established}
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-orange-500" />
                {college.accreditation}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
            <Button className="flex-1 md:flex-none">Apply Now</Button>
            <Button variant="outline" className="flex-1 md:flex-none">
              Download Brochure
            </Button>
          </div>
        </div>

        {/* Highlights Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {college.highlights.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-4xl mb-8 leading-relaxed border-l-4 border-primary/30 pl-4">
          {college.description}
        </p>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b py-6 mb-12">
          <a
            href={`mailto:${college.contact.email}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium text-sm">{college.contact.email}</div>
            </div>
          </a>
          <a
            href={`tel:${college.contact.phone}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="font-medium text-sm">{college.contact.phone}</div>
            </div>
          </a>
          <a
            href={college.contact.website}
            target="_blank"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Website</div>
              <div className="font-medium text-sm truncate max-w-50">
                {college.contact.website}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
