"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ / Help" },
  { href: "/college/pu", label: "PU Campus" },
  { href: "/blood-donation", label: "Donate Blood", highlight: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-primary/10 py-2"
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary group-hover:shadow-[0_0_15px_rgba(50,160,65,0.5)] transition-shadow">
            <Image
              src="/logo.jpg"
              alt="HIMSU Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-primary leading-none">
              HIMSU
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
              Himachal Students Union
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                link.highlight
                  ? "text-destructive font-semibold"
                  : "text-foreground",
              )}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="default"
            className="bg-primary hover:bg-green-700 text-white rounded-full px-6 shadow-md shadow-green-200 dark:shadow-none"
          >
            Join HIMSU
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 glass border-t p-4 md:hidden flex flex-col space-y-4 animate-accordion-down">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm font-medium py-2 border-b border-border/50 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-border/50">
            <ThemeToggle />
            <Button className="flex-1 bg-primary text-white shadow-lg shadow-green-200/50 dark:shadow-none">
              Join HIMSU
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
