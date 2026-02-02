"use client";

import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-1 border rounded-full p-1 bg-background/50 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={`h-7 w-7 rounded-full ${theme === "light" ? "bg-primary/20 text-primary" : ""}`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`h-7 w-7 rounded-full ${theme === "dark" ? "bg-primary/20 text-primary" : ""}`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("brand")}
        className={`h-7 w-7 rounded-full ${theme === "brand" ? "bg-primary/20 text-primary" : ""}`}
        title="Brand Mode"
      >
        <Palette className="h-4 w-4" />
        <span className="sr-only">Brand</span>
      </Button>
    </div>
  );
}
