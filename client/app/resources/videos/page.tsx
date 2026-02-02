"use client";

import { resources } from "@/lib/data/resources";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";

export default function VideosPage() {
  const videos = resources.filter((r) => r.type === "Video");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Video Lectures</h1>
        <p className="text-muted-foreground mt-1">
          Expert tutorials and recorded sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card
            key={video.id}
            className="overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-muted/20"
          >
            <div className="aspect-video bg-black relative flex items-center justify-center group-hover:opacity-90 transition-opacity cursor-pointer">
              {/* Placeholder Thumbnail */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform z-10" />
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                12:45
              </span>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] h-5">
                  {video.subject}
                </Badge>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
