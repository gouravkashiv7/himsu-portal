"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  MessageSquare,
  ArrowRight,
  Loader2,
  History,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Event {
  _id: string;
  title: string;
  description: string;
  images: string[];
  eventDate: string;
  eventTime: string;
  duration: string;
  location: string;
  collegesInvolved: { name: string; shortName: string; logo?: string }[];
  comments: {
    _id: string;
    user: { name: string; image?: string };
    text: string;
    createdAt: string;
  }[];
  updatedAt: string;
}

export function EventsContent() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["public-events"],
    queryFn: async () => {
      const res = await axios.get("/api/events");
      return res.data.data as Event[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-125 w-full bg-muted/30 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="py-20 text-center glass rounded-3xl p-10">
        <h2 className="text-2xl font-bold mb-2">No Events Found</h2>
        <p className="text-muted-foreground">
          Check back later for upcoming community events.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeImage, setActiveImage] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const commentMutation = useMutation({
    mutationFn: async (text: string) => {
      await axios.post(`/api/events/${event._id}/comments`, { text });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["public-events"] });
    },
  });

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % event.images.length);
  const prevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + event.images.length) % event.images.length,
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="overflow-hidden border-none glass rounded-3xl h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
        {/* Image Carousel */}
        <div className="relative aspect-video overflow-hidden">
          {event.images && event.images.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={event.images[activeImage]}
                  alt={event.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {event.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {event.images.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all",
                          i === activeImage ? "bg-white w-4" : "bg-white/40",
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Calendar className="w-12 h-12 text-muted-foreground/20" />
            </div>
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary/90 text-white border-none backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Upcoming
            </Badge>
            {event.duration && (
              <Badge
                variant="outline"
                className="glass border-none backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-widest"
              >
                {event.duration}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {event.collegesInvolved?.map((college, i) => (
                <div
                  key={i}
                  title={college.name}
                  className="w-6 h-6 rounded-full border-2 border-background overflow-hidden bg-white shadow-sm"
                >
                  {college.logo ? (
                    <img
                      src={college.logo}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[8px] font-black text-primary">
                      {college.shortName?.[0]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {event.collegesInvolved?.length > 0 && (
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Organized by{" "}
                {event.collegesInvolved
                  .map((c) => c.shortName || c.name)
                  .join(", ")}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter leading-tight group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                  Date
                </span>
                <span className="text-xs font-bold">
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                  Time
                </span>
                <span className="text-xs font-bold">
                  {event.eventTime || "TBA"}
                </span>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                  Location
                </span>
                <span className="text-xs font-bold truncate max-w-50">
                  {event.location || "TBA"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
            {event.description}
          </p>

          <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
              <History className="w-3.5 h-3.5" />
              Updated {formatDistanceToNow(new Date(event.updatedAt))} ago
            </div>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 group/btn"
            >
              <div className="flex items-center gap-1 bg-muted/50 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {event.comments?.length || 0}
                </span>
              </div>
            </button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-4">
                  <div className="max-h-62.5 overflow-y-auto pr-2 space-y-3 thin-scrollbar">
                    {event.comments?.length > 0 ? (
                      event.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-muted/20 p-3 rounded-2xl flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted border border-border/50 shrink-0">
                            {comment.user.image ? (
                              <img
                                src={comment.user.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase">
                                {comment.user.name[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-tight">
                                {comment.user.name}
                              </span>
                              <span className="text-[8px] text-muted-foreground font-bold">
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                )}{" "}
                                ago
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-xs font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
                        No comments yet
                      </p>
                    )}
                  </div>

                  {user ? (
                    <div className="flex gap-2 relative">
                      <Input
                        placeholder="Join the discussion..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="bg-muted/30 border-none rounded-2xl text-xs h-10 pr-10"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && commentText.trim()) {
                            commentMutation.mutate(commentText);
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={
                          !commentText.trim() || commentMutation.isPending
                        }
                        onClick={() => commentMutation.mutate(commentText)}
                        className="absolute right-1 top-1 h-8 w-8 rounded-xl hover:bg-primary/20 hover:text-primary"
                      >
                        {commentMutation.isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center bg-muted/30 p-3 rounded-2xl border border-dashed border-border/50">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                        Log in to comment
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
