"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Megaphone,
  Settings,
  ChevronRight,
  Shield,
} from "lucide-react";

import { useAuth } from "@/hooks/use-auth";

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";
  const isPresident = user?.role === "president";
  const currentTab = searchParams.get("tab");

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: !currentTab, // Active if no tab param
    },
    {
      title: isSuperAdmin ? "Manage Colleges" : "My College",
      href: "/admin/dashboard?tab=colleges",
      icon: GraduationCap,
      active: currentTab === "colleges",
    },
    {
      title: "User Directory",
      href: "/admin/dashboard?tab=users",
      icon: Users,
      active: currentTab === "users",
    },
  ];

  if (isSuperAdmin || isPresident) {
    menuItems.push({
      title: "Announcements",
      href: "/admin/dashboard?tab=announcements",
      icon: Megaphone,
      active: currentTab === "announcements",
    });
  }

  if (isSuperAdmin) {
    menuItems.push({
      title: "Roles & Permissions",
      href: "/admin/dashboard?tab=roles",
      icon: Shield,
      active: currentTab === "roles",
    });
  }

  if (isPresident) {
    menuItems.push({
      title: "My Profile",
      href: "/admin/dashboard?tab=profile",
      icon: Users,
      active: currentTab === "profile",
    });
  }

  return (
    <div className="flex flex-col h-full bg-card border-r border-border/50">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Settings className="w-5 h-5" />
          </div>
          HIMSU Admin
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => {
          const isActive =
            item.active !== undefined ? item.active : pathname === item.href;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-primary transition-colors",
                  )}
                />
                {item.title}
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">All systems normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
