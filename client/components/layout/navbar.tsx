"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

import { useAuth } from "@/hooks";

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
  const { user, logout } = useAuth();

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

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Link
                  href={
                    user.role === "superadmin" || user.role === "president"
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                  className="relative group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shadow-sm">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-black text-muted-foreground/60 focus:outline-none">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-medium">{user.name}</span>
                  <Link
                    href={
                      user.role === "superadmin" || user.role === "president"
                        ? "/admin/dashboard"
                        : "/dashboard"
                    }
                    className="text-[10px] text-primary hover:underline font-bold uppercase"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-muted rounded-full text-red-500"
                title="Logout"
              >
                {/* Using a simple logout icon for brevity */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <Link href="/join?tab=login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/join?tab=member">
                <Button
                  variant="default"
                  className="bg-primary hover:bg-green-700 text-white rounded-full px-6 shadow-md shadow-green-200 dark:shadow-none"
                >
                  Join HIMSU
                </Button>
              </Link>
            </>
          )}
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
            <Link href="/join?tab=member" className="flex-1">
              <Button className="w-full bg-primary text-white shadow-lg shadow-green-200/50 dark:shadow-none">
                Join HIMSU
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
