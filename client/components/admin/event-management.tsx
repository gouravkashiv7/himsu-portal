"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Loader2,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
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
  collegesInvolved: any[];
  author?: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  updatedAt: string;
}

export function EventManagement() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: "",
    eventDate: "",
    eventTime: "",
    duration: "",
    location: "",
    collegesInvolved: "",
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get("/api/events");
      return res.data.data as Event[];
    },
  });

  const { data: colleges } = useQuery({
    queryKey: ["admin-colleges-list"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/colleges");
      return res.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/events", data);
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      setFormData({
        title: "",
        description: "",
        images: "",
        eventDate: "",
        eventTime: "",
        duration: "",
        location: "",
        collegesInvolved: "",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create event");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/events/${id}`);
    },
    onSuccess: () => {
      toast.success("Event removed");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err: any) => {
      toast.error("Failed to delete event");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.eventDate) {
      toast.error("Title and Date are required");
      return;
    }

    const data = {
      ...formData,
      images: formData.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      collegesInvolved: formData.collegesInvolved
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    createMutation.mutate(data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm ring-1 ring-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary rounded-lg text-white">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Create New Event</h3>
            <p className="text-xs text-muted-foreground">
              Broadcast events across the platform with photos and details.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Event Title
            </label>
            <Input
              name="title"
              placeholder="Annual Sports Meet 2026"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="bg-background rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Event Date
            </label>
            <Input
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleInputChange}
              required
              className="bg-background rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Time & Duration
            </label>
            <div className="flex gap-2">
              <Input
                name="eventTime"
                placeholder="10 AM - 4 PM"
                value={formData.eventTime}
                onChange={handleInputChange}
                className="bg-background rounded-xl"
              />
              <Input
                name="duration"
                placeholder="6 hours"
                value={formData.duration}
                onChange={handleInputChange}
                className="bg-background rounded-xl w-32"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Location
            </label>
            <Input
              name="location"
              placeholder="PU Grounds, Chandigarh"
              value={formData.location}
              onChange={handleInputChange}
              className="bg-background rounded-xl"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide event details..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full min-h-[100px] p-3 rounded-xl bg-background border border-input focus:ring-2 focus:ring-ring text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Image URLs (comma separated)
            </label>
            <Input
              name="images"
              placeholder="https://image1.jpg, https://image2.jpg"
              value={formData.images}
              onChange={handleInputChange}
              className="bg-background rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Colleges IDs (comma separated)
            </label>
            <Input
              name="collegesInvolved"
              placeholder="id1, id2 (optional)"
              value={formData.collegesInvolved}
              onChange={handleInputChange}
              className="bg-background rounded-xl"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl px-12 h-12 shadow-lg shadow-primary/20 font-bold"
            >
              {createMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Publish Event
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Scheduled Events
          </h3>
          <Badge
            variant="outline"
            className="rounded-full bg-background whitespace-nowrap"
          >
            {events?.length || 0} Total
          </Badge>
        </div>

        <div className="grid gap-3">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium animate-pulse">
                Syncing events...
              </p>
            </div>
          ) : events && events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between p-5 bg-card border border-border/50 rounded-2xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-6">
                  {event.images?.[0] ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border/50">
                      <img
                        src={event.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/50">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-foreground text-sm leading-relaxed truncate">
                      {event.title}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                        <Calendar className="h-3 w-3 mr-1 text-primary" />
                        {new Date(event.eventDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                        <MapPin className="h-3 w-3 mr-1 text-primary" />
                        {event.location || "N/A"}
                      </div>
                    </div>
                    {event.author && (
                      <p className="text-[9px] text-muted-foreground mt-2 font-medium bg-muted/30 px-2 py-0.5 rounded w-fit capitalize">
                        Admin: {event.author.name}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-destructive/10 hover:text-destructive shrink-0 rounded-xl h-10 w-10 transition-opacity",
                    !isSuperAdmin && event.author?._id !== user?.id
                      ? "opacity-20 cursor-not-allowed text-muted-foreground hover:bg-transparent"
                      : "text-destructive opacity-0 group-hover:opacity-100",
                  )}
                  onClick={() => deleteMutation.mutate(event._id)}
                  disabled={
                    deleteMutation.isPending ||
                    (!isSuperAdmin && event.author?._id !== user?.id)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="p-16 text-center border-2 border-dashed border-border/50 rounded-3xl flex flex-col items-center bg-muted/20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground opacity-30" />
              </div>
              <p className="font-bold text-foreground opacity-50">
                No events found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Start by adding your first event above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
