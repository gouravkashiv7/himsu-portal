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
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg animate-pulse"
        size="icon"
        variant="destructive"
      >
        <Droplet className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-2xl border-destructive/20 bg-card/95 backdrop-blur slide-in-from-bottom-5 animate-in">
      <CardHeader className="bg-destructive/10 rounded-t-lg pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-destructive flex items-center text-lg">
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Emergency Blood
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-destructive/20"
              onClick={() => setIsMinimized(true)}
            >
              <div className="h-0.5 w-3 bg-foreground/50" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Urgent requirements in Chandigarh/PU</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm p-2 bg-muted rounded border-l-4 border-l-destructive">
          <span className="font-bold text-destructive">O+ Needed</span>
          <span className="text-xs text-muted-foreground">PGI · 2 hrs ago</span>
        </div>
        <div className="flex items-center justify-between text-sm p-2 bg-muted rounded border-l-4 border-l-destructive">
          <span className="font-bold text-destructive">AB- Needed</span>
          <span className="text-xs text-muted-foreground">
            GMCH-32 · 5 hrs ago
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="destructive">
          Request / Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
