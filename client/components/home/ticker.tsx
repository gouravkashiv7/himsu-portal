"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Announcement {
  _id: string;
  text: string;
  link?: string;
  priority: number;
}

export function AlertTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("/api/announcements");
        if (res.data.success) {
          setAnnouncements(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch announcements");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return null; // Or a skeleton specifically for ticker but better to just not show if loading
  if (announcements.length === 0) return null;

  return (
    <div className="relative w-full bg-primary/5 border-b border-primary/10 overflow-hidden h-10 flex items-center">
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 bg-primary text-primary-foreground px-4 flex items-center z-20 font-bold text-xs uppercase tracking-wider shadow-md">
        Updates
      </div>

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:paused pl-24">
          {announcements.map((item, index) => (
            <div key={item._id} className="flex items-center mx-4">
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  className="text-sm font-medium hover:underline hover:text-primary transition-colors cursor-pointer"
                >
                  {item.text}
                </Link>
              ) : (
                <span className="text-sm font-medium cursor-default">
                  {item.text}
                </span>
              )}
              {/* Separator if not last */}
              <span className="mx-4 text-primary/40">•</span>
            </div>
          ))}
          {/* Duplicate for seamless loop (simplified for now, full seamless usually needs double render) */}
          {announcements.map((item, index) => (
            <div key={`${item._id}-dup`} className="flex items-center mx-4">
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  className="text-sm font-medium hover:underline hover:text-primary transition-colors cursor-pointer"
                >
                  {item.text}
                </Link>
              ) : (
                <span className="text-sm font-medium cursor-default">
                  {item.text}
                </span>
              )}
              <span className="mx-4 text-primary/40">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
