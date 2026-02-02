"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export function RequestBloodForm() {
  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4 text-destructive">
        <AlertCircle className="w-6 h-6 animate-pulse" />
        <h3 className="text-lg font-bold">Post Emergency Request</h3>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Patient Name" className="bg-background" />
          <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <Input placeholder="Hospital / Location" className="bg-background" />
        <Input placeholder="Attendant Contact No." className="bg-background" />

        <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Submit Emergency Request
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          This will be broadcasted to all registered volunteers instantly.
        </p>
      </form>
    </div>
  );
}
