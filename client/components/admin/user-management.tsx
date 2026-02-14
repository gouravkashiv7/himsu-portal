"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Loader2,
  Phone,
  MapPin,
  School,
  Droplet,
  User as UserIcon,
  Search,
  ChevronDown,
  Shield,
  Trash2,
  MessageSquareX,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  phone?: string;
  bloodGroup?: string;
  college?: {
    _id: string;
    name: string;
    shortName: string;
  };
  otherCollegeName?: string;
  location?: {
    city: string;
    sector?: string;
  };
  isBloodDonor: boolean;
  isCampusVolunteer: boolean;
  createdAt: string;
  rejectionReason?: string;
};

interface Role {
  _id: string;
  name: string;
  color: string;
}

export function UserManagement() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/users");
      return res.data.data as UserType[];
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/roles");
      return res.data.data as Role[];
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      await axios.patch(`/api/admin/users/${userId}`, { role });
    },
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({
      userId,
      reason,
    }: {
      userId: string;
      reason: string;
    }) => {
      await axios.patch(`/api/admin/users/${userId}`, {
        rejectionReason: reason,
      });
    },
    onSuccess: () => {
      toast.success("Rejection reason sent to user");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      toast.error("Failed to send rejection");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`/api/admin/users/${userId}`);
    },
    onSuccess: () => {
      toast.success("User account deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Retrieving user roster...
        </p>
      </div>
    );
  }

  const filteredUsers = users?.filter((u: UserType) => {
    let matchesTab = true;
    if (activeTab === "donors") {
      matchesTab = u.isBloodDonor;
    } else if (activeTab !== "all") {
      matchesTab = u.role === activeTab;
    }

    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  const canManageUser = (targetUser: UserType) => {
    if (currentUser?.role === "superadmin") return true;
    if (
      currentUser?.role === "president" &&
      targetUser.college?._id === currentUser?.college
    ) {
      // Presidents can manage their own college students/members
      return (
        targetUser.role !== "superadmin" && targetUser.role !== "president"
      );
    }
    return false;
  };

  const handleReject = (userId: string) => {
    const reason = prompt("Enter rejection reason for this user:");
    if (reason) {
      rejectMutation.mutate({ userId, reason });
    }
  };

  const handleDelete = (userId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    ) {
      deleteMutation.mutate(userId);
    }
  };

  const getRoleBadgeClasses = (roleName: string) => {
    const roleData = roles?.find(
      (r: Role) => r.name.toLowerCase() === roleName.toLowerCase(),
    );
    const color = roleData?.color || "blue";

    switch (color) {
      case "red":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "blue":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "green":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "purple":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "orange":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "pink":
        return "bg-pink-500/10 text-pink-600 border-pink-500/20";
      case "cyan":
        return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
      case "yellow":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "emerald":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "indigo":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "rose":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "sky":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "teal":
        return "bg-teal-500/10 text-teal-600 border-teal-500/20";
      case "lime":
        return "bg-lime-500/10 text-lime-600 border-lime-500/20";
      case "slate":
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-muted/50 border-border/50 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={setActiveTab}
          className="w-auto"
        >
          <TabsList className="bg-muted/50 p-1 rounded-xl h-10">
            <TabsTrigger
              value="unverified"
              className="rounded-lg text-xs px-4 font-bold"
            >
              Unverified
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-lg text-xs px-4">
              All
            </TabsTrigger>
            <TabsTrigger value="member" className="rounded-lg text-xs px-4">
              Members
            </TabsTrigger>
            <TabsTrigger value="donors" className="rounded-lg text-xs px-4">
              Donors
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  User Identity
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Affiliation
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Location
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Blood Group
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Role
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredUsers?.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <UserIcon className="h-10 w-10 opacity-20" />
                      <p className="font-medium">No users found</p>
                      <p className="text-xs">
                        Adjust your filters or search query.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers?.map((user: UserType) => (
                  <tr
                    key={user._id}
                    className="group transition-all hover:bg-primary/1"
                  >
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground overflow-hidden border border-border/50">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-black text-muted-foreground/60">
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground flex items-center gap-1.5">
                            {user.name}
                            {user.isBloodDonor && (
                              <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[8px] font-black text-red-600 uppercase tracking-tighter border border-red-200">
                                Donor
                              </span>
                            )}
                            {user.isCampusVolunteer && (
                              <span className="px-1.5 py-0.5 rounded-md bg-purple-100 text-[8px] font-black text-purple-600 uppercase tracking-tighter border border-purple-200">
                                Volunteer
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {user.email}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-bold text-muted-foreground">
                              {user.phone || "No Number"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <School className="h-3.5 w-3.5 opacity-70" />
                        <span className="font-medium text-xs truncate max-w-37.5">
                          {user.college?.name ||
                            user.otherCollegeName ||
                            "Open/Individual"}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                          <MapPin className="h-3 w-3 text-primary" />
                          {user.location?.city || "Unspecified"}
                        </div>
                        {user.location?.sector && (
                          <span className="text-[10px] text-muted-foreground ml-4.5 font-medium">
                            {user.location.sector}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      {user.bloodGroup && user.bloodGroup !== "Unknown" ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 text-[10px] font-extrabold uppercase tracking-widest">
                          {user.bloodGroup}
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="p-6 align-middle">
                      {canManageUser(user) &&
                      user.role !== "president" &&
                      user.role !== "superadmin" ? (
                        <div className="flex flex-col items-start gap-1">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              roleMutation.mutate({
                                userId: user._id,
                                role: e.target.value,
                              })
                            }
                            className={`h-8 px-3 rounded-full text-[10px] font-bold capitalize outline-none border-none cursor-pointer hover:opacity-80 transition-opacity appearance-none text-center ${getRoleBadgeClasses(
                              user.role,
                            )}`}
                          >
                            {roles
                              ?.filter(
                                (r: Role) =>
                                  r.name !== "superadmin" &&
                                  r.name !== "president",
                              )
                              ?.map((r: Role) => (
                                <option
                                  key={r._id}
                                  value={r.name}
                                  className="bg-background text-foreground lowercase"
                                >
                                  {r.name}
                                </option>
                              ))}
                          </select>
                          {user.rejectionReason && (
                            <span className="text-[9px] text-destructive font-black uppercase tracking-tighter truncate max-w-24">
                              REJECTED: {user.rejectionReason}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-1">
                          <Badge
                            className={`capitalize text-[10px] font-bold px-3 py-1 rounded-full border-none shadow-none ${getRoleBadgeClasses(
                              user.role,
                            )}`}
                          >
                            {user.role}
                          </Badge>
                          {user.rejectionReason && (
                            <span className="text-[9px] text-destructive font-black uppercase tracking-tighter">
                              REJECTED: {user.rejectionReason}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-6 align-middle text-right">
                      {canManageUser(user) && (
                        <div className="flex items-center justify-end gap-1">
                          {user.role === "unverified" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReject(user._id)}
                              className="h-8 w-8 rounded-lg text-amber-600 hover:bg-amber-100/50"
                              title="Reject Verification"
                            >
                              <MessageSquareX className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user._id)}
                            className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                            title="Delete Account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
