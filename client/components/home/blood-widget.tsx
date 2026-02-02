"use client";

import * as React from "react";
import { Heart, X, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BloodDonationWidget() {
  const [isOpen, setIsOpen] = React.useState(true); // Open by default for visibility
  const [isMinimized, setIsMinimized] = React.useState(false);

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white animate-pulse"
        size="icon"
      >
        <Droplet className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-2xl border-red-200 dark:border-red-900 bg-card/95 backdrop-blur slide-in-from-bottom-5 animate-in">
      <CardHeader className="bg-red-50 dark:bg-red-950/30 rounded-t-lg pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-red-600 flex items-center text-lg">
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Emergency Blood
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
            >
              <div className="h-0.5 w-3 bg-foreground/50" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Urgent requirements in Chandigarh/PU</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm p-2 bg-muted rounded border border-l-4 border-l-red-500">
          <span className="font-bold text-red-600">O+ Needed</span>
          <span className="text-xs text-muted-foreground">PGI · 2 hrs ago</span>
        </div>
        <div className="flex items-center justify-between text-sm p-2 bg-muted rounded border border-l-4 border-l-red-500">
          <span className="font-bold text-red-600">AB- Needed</span>
          <span className="text-xs text-muted-foreground">
            GMCH-32 · 5 hrs ago
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          Request / Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
