"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Loader2, Video as VideoIcon } from "lucide-react";

interface Resource {
  _id: string;
  title: string;
  type: string;
  subject: string;
  course: string;
  link: string;
  description?: string;
}

export default function VideosPage() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["resources", "Video"],
    queryFn: async () => {
      const res = await axios.get("/api/resources?type=Video");
      return res.data.data as Resource[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Video Lectures</h1>
        <p className="text-muted-foreground mt-1">
          Expert tutorials and recorded sessions.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
            Loading videos...
          </p>
        </div>
      ) : videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video._id}
              className="overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-muted/20"
            >
              <div
                className="aspect-video bg-black relative flex items-center justify-center group-hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => window.open(video.link, "_blank")}
              >
                {/* Placeholder Thumbnail */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform z-10" />
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
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
          <VideoIcon className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-bold mb-1">No videos available</h3>
          <p className="text-sm text-muted-foreground">
            Video lectures will be uploaded soon.
          </p>
        </div>
      )}
    </div>
  );
}
