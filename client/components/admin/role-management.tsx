"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Loader2,
  Plus,
  Shield,
  Trash2,
  Palette,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Role {
  _id: string;
  name: string;
  description: string;
  color: string;
  isStatic: boolean;
}

export function RoleManagement() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("blue");

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/roles");
      return res.data.data as Role[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/admin/roles", { name, description, color });
    },
    onSuccess: () => {
      toast.success("New role added");
      setName("");
      setDescription("");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add role");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (roleId: string) => {
      await axios.delete(`/api/admin/roles?id=${roleId}`);
    },
    onSuccess: () => {
      toast.success("Role archived");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: () => {
      toast.error("Failed to delete role");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate();
  };

  const getRoleBadgeClasses = (color: string) => {
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
    <div className="space-y-8">
      {/* Create Role Form */}
      <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2.5 bg-primary rounded-xl text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Define New Role</CardTitle>
            <CardDescription>
              Custom roles allow granular permissions in the future.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                Role Name
              </label>
              <Input
                placeholder="e.g. Media Head"
                value={name}
                className="rounded-xl h-11 bg-background"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-2 space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                Description
              </label>
              <Input
                placeholder="Briefly describe what this role entails..."
                value={description}
                className="rounded-xl h-11 bg-background"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                Badge Color
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="cyan">Cyan</option>
                <option value="yellow">Yellow</option>
                <option value="emerald">Emerald</option>
                <option value="indigo">Indigo</option>
                <option value="rose">Rose</option>
                <option value="sky">Sky</option>
                <option value="amber">Amber</option>
                <option value="teal">Teal</option>
                <option value="lime">Lime</option>
                <option value="slate">Slate</option>
              </select>
            </div>
            <Button
              disabled={createMutation.isPending}
              className="rounded-xl h-11 px-8 shadow-lg shadow-primary/20 font-bold"
            >
              {createMutation.isPending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Role List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Initializing role registry...
            </p>
          </div>
        ) : (
          roles?.map((role) => (
            <Card
              key={role._id}
              className="group border-border/50 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getRoleBadgeClasses(role.color)}`}
                  >
                    {role.name}
                  </Badge>
                  {role.isStatic && (
                    <span
                      className="p-1.5 bg-muted rounded-lg"
                      title="System Protected Role"
                    >
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-foreground capitalize mb-2">
                  {role.name} Identity
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed h-8 line-clamp-2">
                  {role.description || "No description provided for this role."}
                </p>

                {!role.isStatic && (
                  <div className="mt-6 pt-4 border-t border-border/40 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to archive this role?")
                        ) {
                          deleteMutation.mutate(role._id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="h-8 text-destructive hover:bg-destructive/10 rounded-lg text-xs font-bold"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      Archive
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
