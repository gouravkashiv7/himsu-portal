"use client";

import * as React from "react";
import { Moon, Sun, Leaf } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(
      `Theme switched to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
      {
        icon: newTheme === "light" ? "☀️" : newTheme === "dark" ? "🌙" : "🍃",
      },
    );
  };

  return (
    <div className="flex items-center space-x-1 border rounded-full p-1 bg-background/50 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange("light")}
        className={`h-7 w-7 rounded-full ${mounted && theme === "light" ? "bg-primary/20 text-primary" : ""}`}
        title="Light Mode"
        suppressHydrationWarning
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange("dark")}
        className={`h-7 w-7 rounded-full ${mounted && theme === "dark" ? "bg-primary/20 text-primary" : ""}`}
        title="Dark Mode"
        suppressHydrationWarning
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleThemeChange("brand")}
        className={`h-7 w-7 rounded-full ${mounted && theme === "brand" ? "bg-primary/20 text-primary" : ""}`}
        title="Brand Mode"
        suppressHydrationWarning
      >
        <Leaf className="h-4 w-4" />
        <span className="sr-only">Brand</span>
      </Button>
    </div>
  );
}
