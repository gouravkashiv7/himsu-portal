"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

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

  if (loading) return null;
  if (announcements.length === 0) return null;

  const tickerContent = announcements.map((item, index) => (
    <div key={item._id} className="flex items-center mx-4 shrink-0">
      {item.link ? (
        <Link
          href={item.link}
          target="_blank"
          className="text-sm font-medium hover:underline hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
        >
          {item.text}
        </Link>
      ) : (
        <span className="text-sm font-medium cursor-default whitespace-nowrap">
          {item.text}
        </span>
      )}
      <span className="mx-4 text-primary/40">•</span>
    </div>
  ));

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full bg-primary/5 border-b border-primary/10 overflow-hidden h-10 flex items-center"
    >
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 bg-primary text-primary-foreground px-3 sm:px-4 flex items-center z-20 font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md">
        <span className="flex h-1.5 w-1.5 rounded-full bg-white/80 mr-1.5 animate-pulse" />
        Updates
      </div>

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:paused pl-20 sm:pl-24">
          {tickerContent}
          {/* Duplicate for seamless loop */}
          {announcements.map((item) => (
            <div
              key={`${item._id}-dup`}
              className="flex items-center mx-4 shrink-0"
            >
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  className="text-sm font-medium hover:underline hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.text}
                </Link>
              ) : (
                <span className="text-sm font-medium cursor-default whitespace-nowrap">
                  {item.text}
                </span>
              )}
              <span className="mx-4 text-primary/40">•</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
