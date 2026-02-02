"use client";

import * as React from "react";
import { MessageCircle, X, ExternalLink } from "lucide-react"; // MessageCircle as fallback for Whatsapp icon if needed, or use customized SVG
import { Button } from "@/components/ui/button";

const groups = [
  { name: "Admissions 2026", link: "#" },
  { name: "HIMSU Main Group", link: "#" },
  { name: "PU Campus Unit", link: "#" },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Menu / Popover */}
      {isOpen && (
        <div className="bg-card border shadow-xl rounded-xl w-72 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 mb-2">
          <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
            <div>
              <h4 className="font-bold">HIMSU Help Desk</h4>
              <p className="text-xs opacity-90">Replies typically in 5 mins</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Join Student Groups
            </p>
            {groups.map((group) => (
              <a
                key={group.name}
                href={group.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
              >
                <span className="text-sm font-medium">{group.name}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}

            <div className="border-t my-2 pt-2">
              <a
                href="https://wa.me/919876543210" // Placeholder number
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 text-sm font-medium text-[#25D366] hover:bg-green-50 rounded-lg transition-colors"
              >
                Chat with President
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "rotate-45" : "hover:-translate-y-1"
        }`}
        style={{ backgroundColor: "#25D366" }} // Official WhatsApp Color
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white fill-current" />
        )}
      </Button>
    </div>
  );
}
