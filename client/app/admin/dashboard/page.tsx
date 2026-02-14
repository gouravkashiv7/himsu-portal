"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CollegeManagement } from "@/components/admin/college-management";
import { AnnouncementManagement } from "@/components/admin/announcement-management";
import { UserManagement } from "@/components/admin/user-management";
import {
  GraduationCap,
  Users,
  Megaphone,
  TrendingUp,
  Activity,
  Plus,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { useSearchParams, useRouter } from "next/navigation";
import { RoleManagement } from "@/components/admin/role-management";
import { useAuth } from "@/hooks/use-auth";

import { Suspense, useEffect, useState } from "react";

function AdminDashboardContent() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "colleges";

  const setTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  // Fetch real statistics
  const { data: colleges, isLoading: loadingColleges } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/colleges");
      return res.data.data;
    },
  });

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/users");
      // Fallback for user list structure if needed
      return res.data.data || res.data;
    },
  });

  const { data: announcements, isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/api/announcements");
      return res.data.data;
    },
  });

  const volunteerCount = Array.isArray(users)
    ? users.filter((u: any) => u.isCampusVolunteer).length
    : 0;
  const userCount = Array.isArray(users) ? users.length : 0;

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500 max-w-[100vw] overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-lg">
            Welcome back! Here&apos;s a look at the live status of HIMSU.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-linear-to-br from-primary/10 to-transparent rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Total Colleges
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingColleges ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
            ) : (
              <div className="text-2xl md:text-3xl font-black">
                {colleges?.length || 0}
              </div>
            )}
            <p className="text-[10px] text-muted-foreground mt-1 font-bold">
              {" "}
              Registered institutions
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-linear-to-br from-blue-500/10 to-transparent rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <Loader2 className="h-6 w-6 animate-spin text-blue-500/50" />
            ) : (
              <div className="text-2xl md:text-3xl font-black">{userCount}</div>
            )}
            <p className="text-[10px] text-muted-foreground mt-1 font-bold">
              Active community members
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-linear-to-br from-orange-500/10 to-transparent rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Announcements
            </CardTitle>
            <Megaphone className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            {loadingAnnouncements ? (
              <Loader2 className="h-6 w-6 animate-spin text-orange-500/50" />
            ) : (
              <div className="text-2xl md:text-3xl font-black">
                {announcements?.length || 0}
              </div>
            )}
            <p className="text-[10px] text-muted-foreground mt-1 font-bold">
              Active broadcasts
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-linear-to-br from-purple-500/10 to-transparent rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Campus Team
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <Loader2 className="h-6 w-6 animate-spin text-purple-500/50" />
            ) : (
              <div className="text-2xl md:text-3xl font-black">
                {volunteerCount}
              </div>
            )}
            <p className="text-[10px] text-muted-foreground mt-1 font-bold">
              Help across campuses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setTab} className="w-full">
        <div className="flex items-center mb-6 bg-muted/30 p-1 rounded-xl border border-border/50 overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent border-none flex w-max gap-2 p-0 h-auto">
            <TabsTrigger
              value="colleges"
              className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
            >
              {isSuperAdmin ? "Colleges" : "My College"}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
            >
              Users
            </TabsTrigger>
            {isSuperAdmin && (
              <>
                <TabsTrigger
                  value="announcements"
                  className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  Announcements
                </TabsTrigger>
                <TabsTrigger
                  value="roles"
                  className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  Roles
                </TabsTrigger>
              </>
            )}
          </TabsList>
        </div>

        <TabsContent
          value="colleges"
          className="mt-0 focus-visible:outline-none"
        >
          <Card className="border-none shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/50">
              <CardTitle className="text-xl font-black">
                College Registry
              </CardTitle>
              <CardDescription className="text-xs font-medium">
                Manage educational institutions associated with HIMSU.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <CollegeManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-0 focus-visible:outline-none">
          <Card className="border-none shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/50">
              <CardTitle className="text-xl font-black">
                User Directory
              </CardTitle>
              <CardDescription className="text-xs font-medium">
                View and moderate all users, members, and volunteers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="announcements"
          className="mt-0 focus-visible:outline-none"
        >
          <Card className="border-none shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/50">
              <CardTitle className="text-xl font-black">
                Broadcast Center
              </CardTitle>
              <CardDescription className="text-xs font-medium">
                Create and manage announcements for the portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <AnnouncementManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-0 focus-visible:outline-none">
          <Card className="border-none shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/50">
              <CardTitle className="text-xl font-black">
                Role Configuration
              </CardTitle>
              <CardDescription className="text-xs font-medium">
                Define and manage dynamic roles for the HIMSU ecosystem.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <RoleManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">
            Initializing Admin Systems...
          </p>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
