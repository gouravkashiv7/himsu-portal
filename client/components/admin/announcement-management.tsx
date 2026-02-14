"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Loader2,
  Plus,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
  Megaphone,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  _id: string;
  text: string;
  link?: string;
  isActive: boolean;
}

export function AnnouncementManagement() {
  const queryClient = useQueryClient();
  const [newText, setNewText] = useState("");
  const [newLink, setNewLink] = useState("");

  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/api/announcements");
      return res.data.data as Announcement[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/announcements", {
        text: newText,
        link: newLink,
      });
    },
    onSuccess: () => {
      toast.success("Announcement broadcasted successfully");
      setNewText("");
      setNewLink("");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add announcement");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/announcements/${id}`);
    },
    onSuccess: () => {
      toast.success("Announcement removed");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (err: any) => {
      toast.error("Failed to delete announcement");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    createMutation.mutate();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm ring-1 ring-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary rounded-lg text-white">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">
              Create New Announcement
            </h3>
            <p className="text-xs text-muted-foreground">
              This will be visible on the home page for all users.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:flex-row lg:items-end"
        >
          <div className="flex-2 space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Announcement Text
            </label>
            <Input
              placeholder="e.g. Admission Forms for session 2024-25 are now available..."
              value={newText}
              className="bg-background border-border/50 rounded-xl py-5"
              onChange={(e) => setNewText(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">
              External Link (Optional)
            </label>
            <Input
              placeholder="https://himsu.org/news"
              value={newLink}
              className="bg-background border-border/50 rounded-xl py-5"
              onChange={(e) => setNewLink(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-xl px-8 h-12 shadow-lg shadow-primary/20 font-bold"
          >
            {createMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Post
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Active Broadcasts
          </h3>
          <Badge variant="outline" className="rounded-full bg-background">
            {announcements?.length || 0} Total
          </Badge>
        </div>

        <div className="grid gap-3">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium animate-pulse">
                Fetching announcements...
              </p>
            </div>
          ) : announcements && announcements.length > 0 ? (
            announcements.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-5 bg-card border border-border/50 rounded-2xl hover:shadow-md transition-all group"
              >
                <div className="flex-1 min-w-0 pr-6">
                  <p className="font-bold text-foreground text-sm leading-relaxed">
                    {item.text}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-primary flex items-center mt-2 hover:underline tracking-tight"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" />
                      {item.link}
                    </a>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 rounded-xl h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteMutation.mutate(item._id)}
                  disabled={deleteMutation.isPending}
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
                No active announcements
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                When you post something, it will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
