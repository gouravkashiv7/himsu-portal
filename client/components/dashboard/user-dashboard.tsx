"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  School,
  Droplet,
  Calendar,
  ShieldAlert,
  Edit,
  Save,
  X,
  Loader2,
  AlertCircle,
  Users,
  ArrowRight,
  Lock,
  Camera,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserDashboard() {
  const { user: authUser, loading: authLoading, checkAuth } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  // Use authUser immediately if available to reduce loading perception
  const profile = authUser;

  const { data: colleges } = useQuery({
    queryKey: ["colleges-list"],
    queryFn: async () => {
      const res = await axios.get("/api/colleges");
      return res.data.data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      await axios.patch("/api/profile", data);
    },
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      await checkAuth(); // Refresh global auth state
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  useEffect(() => {
    if (profile) {
      setEditForm({
        name: profile.name,
        phone: profile.phone || "",
        bloodGroup: profile.bloodGroup || "Unknown",
        isBloodDonor: profile.isBloodDonor || false,
        isCampusVolunteer: profile.isCampusVolunteer || false,
        image: profile.image || "",
        college: profile.college?._id || "",
        otherCollegeName: profile.otherCollegeName || "",
        location: {
          city: profile.location?.city || "",
          sector: profile.location?.sector || "",
        },
      });
    }
  }, [profile]);

  const requestUpgradeMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/profile/request-upgrade");
    },
    onSuccess: (data: any) => {
      toast.success("Verification request submitted!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 250kb
    if (file.size > 250 * 1024) {
      toast.error("Image size must be less than 250kb");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm((prev: any) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary/50" />
        <p className="text-muted-foreground animate-pulse font-medium">
          Loading your profile...
        </p>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditForm((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditForm((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    updateProfileMutation.mutate(editForm);
  };

  const getTags = () => {
    const tags = [];
    if (profile?.isBloodDonor)
      tags.push({
        label: "Donor",
        color: "bg-red-500/10 text-red-500 border-red-500/20",
      });
    if (profile?.isCampusVolunteer)
      tags.push({
        label: "Volunteer",
        color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      });
    return tags;
  };

  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case "member":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "unverified":
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-6 md:py-12 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full">
          {/* Profile Picture Section */}
          <div className="relative group mx-auto md:mx-0">
            <div
              className={`w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 ${profile?.role === "unverified" ? "border-muted" : "border-primary/20"} shadow-2xl relative transition-all`}
            >
              {profile?.image || editForm?.image ? (
                <img
                  src={editForm?.image || profile?.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-2xl md:text-3xl font-black text-muted-foreground/40">
                  {profile?.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}

              {profile?.role === "unverified" && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                  <Lock className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground/50" />
                </div>
              )}

              {isEditing && profile?.role !== "unverified" && (
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 md:w-8 md:h-8 text-white mb-1" />
                  <span className="text-[6px] md:text-[8px] font-black text-white uppercase tracking-tighter">
                    Update
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            {isEditing &&
              (editForm?.image || profile?.image) &&
              profile?.role !== "unverified" && (
                <button
                  onClick={() =>
                    setEditForm((prev: any) => ({ ...prev, image: "" }))
                  }
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-destructive text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              )}
          </div>

          <div className="space-y-3 md:space-y-4 w-full text-center md:text-left">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge
                className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-widest ${getRoleBadgeClasses(profile?.role || "")}`}
              >
                {profile?.role} Identity
              </Badge>
              {getTags().map((tag) => (
                <Badge
                  key={tag.label}
                  className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-widest ${tag.color}`}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-baseline justify-center md:justify-start gap-1 md:gap-2">
              Hey, {profile?.name.split(" ")[0]}
              <span className="text-primary animate-pulse">.</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium max-w-md mx-auto md:mx-0">
              Welcome to your HIMSU central dashboard. Manage your identity,
              verification status, and preferences.
            </p>
          </div>
        </div>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full md:w-auto rounded-xl md:rounded-2xl h-12 md:h-14 px-8 font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modify Profile
          </Button>
        ) : (
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold border-2"
            >
              <X className="w-4 h-4 mr-2" />
              Discard
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
              className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold shadow-xl shadow-primary/20"
            >
              {updateProfileMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Confirm Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Status Card */}
        <div className="lg:col-span-1 space-y-8">
          <Card
            className={`border-none shadow-2xl overflow-hidden rounded-[2.5rem] ${profile?.role === "unverified" ? "bg-amber-500/5" : "bg-green-500/5"}`}
          >
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg mb-4">
                {profile?.role === "unverified" ? (
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                ) : (
                  <School className="w-6 h-6 text-green-500" />
                )}
              </div>
              <CardTitle className="text-xl font-black">Verification</CardTitle>
              <CardDescription className="text-xs font-bold uppercase tracking-wider opacity-60">
                Status Overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-relaxed">
                  {profile?.role === "unverified"
                    ? "Your account is currently in pending state. Complete your profile to request an upgrade."
                    : "Your identity is verified. You have full access to HIMSU member resources."}
                </p>
              </div>

              {profile?.role === "unverified" && (
                <div className="space-y-4">
                  {profile.rejectionReason && (
                    <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-1">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Rejection Notice
                        </span>
                      </div>
                      <p className="text-xs font-medium text-destructive/80 italic">
                        {profile.rejectionReason}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full rounded-2xl h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/20"
                    disabled={requestUpgradeMutation.isPending}
                    onClick={() => requestUpgradeMutation.mutate()}
                  >
                    {requestUpgradeMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      "Request Verification"
                    )}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg font-black">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Joined
                  </span>
                </div>
                <span className="text-sm font-black">
                  {new Date(profile?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <Droplet className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Blood Group
                  </span>
                </div>
                <span className="text-sm font-black text-red-500">
                  {profile?.bloodGroup}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Form/Display */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50 p-8">
              <CardTitle className="text-2xl font-black">
                Identity Details
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                Verify your information as it appears to system administrators.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              {/* Basic Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="rounded-2xl h-12 bg-muted/30"
                    />
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-5 rounded-2xl bg-muted/10 border border-dashed border-border/50">
                      <UserIcon className="w-4 h-4 text-primary/50" />
                      <span className="text-sm font-bold">{profile?.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 h-12 px-5 rounded-2xl bg-muted/5 border border-border/30 opacity-70">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-bold">{profile?.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={editForm.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="rounded-2xl h-12 bg-muted/30"
                    />
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-5 rounded-2xl bg-muted/10 border border-dashed border-border/50">
                      <Phone className="w-4 h-4 text-primary/50" />
                      <span className="text-sm font-bold">
                        {profile?.phone || "Not specified"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    College Affiliation
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.college}
                      onChange={(e) =>
                        handleInputChange("college", e.target.value)
                      }
                      className="flex h-12 w-full rounded-2xl border border-input bg-muted/30 px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="">Select College</option>
                      {colleges?.map((c: any) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-5 rounded-2xl bg-muted/10 border border-dashed border-border/50">
                      <School className="w-4 h-4 text-primary/50" />
                      <span className="text-sm font-bold">
                        {profile?.college?.name || "Open Member"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Primary Residence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                      City
                    </label>
                    {isEditing ? (
                      <Input
                        value={editForm.location.city}
                        onChange={(e) =>
                          handleInputChange("location.city", e.target.value)
                        }
                        className="rounded-2xl h-12 bg-muted/30"
                      />
                    ) : (
                      <span className="block px-5 py-3 rounded-2xl bg-muted/5 border border-border/30 text-sm font-bold">
                        {profile?.location?.city || "—"}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                      Sector/Area
                    </label>
                    {isEditing ? (
                      <Input
                        value={editForm.location.sector}
                        onChange={(e) =>
                          handleInputChange("location.sector", e.target.value)
                        }
                        className="rounded-2xl h-12 bg-muted/30"
                      />
                    ) : (
                      <span className="block px-5 py-3 rounded-2xl bg-muted/5 border border-border/30 text-sm font-bold">
                        {profile?.location?.sector || "—"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Health Registry */}
              <div className="space-y-6">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-red-500" />
                  Health Registry
                </h3>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="space-y-2 min-w-37.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                      Blood Group
                    </label>
                    {isEditing ? (
                      <select
                        value={editForm.bloodGroup}
                        onChange={(e) =>
                          handleInputChange("bloodGroup", e.target.value)
                        }
                        className="flex h-12 w-full rounded-2xl border border-input bg-muted/30 px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      >
                        {[
                          "A+",
                          "A-",
                          "B+",
                          "B-",
                          "AB+",
                          "AB-",
                          "O+",
                          "O-",
                          "Unknown",
                        ].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Badge className="block text-center py-2 bg-red-500/10 text-red-500 border-red-500/20 text-sm font-black w-20 rounded-xl">
                        {profile?.bloodGroup || "—"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-6 rounded-3xl bg-muted/10 border border-border/50 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${profile?.isBloodDonor ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black">Blood Donor Program</p>
                      <p className="text-xs text-muted-foreground">
                        Make yourself discoverable for emergencies.
                      </p>
                    </div>
                    {isEditing && profile?.role !== "unverified" ? (
                      <input
                        type="checkbox"
                        checked={editForm.isBloodDonor}
                        onChange={(e) =>
                          handleInputChange("isBloodDonor", e.target.checked)
                        }
                        className="w-6 h-6 rounded text-primary focus:ring-primary border-gray-300"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {profile?.role === "unverified" && (
                          <Lock className="w-3 h-3 text-muted-foreground/50" />
                        )}
                        <Badge
                          variant={
                            profile?.isBloodDonor ? "default" : "outline"
                          }
                          className="rounded-lg uppercase text-[9px] font-black"
                        >
                          {profile?.isBloodDonor
                            ? "Enrolled"
                            : profile?.role === "unverified"
                              ? "Members Only"
                              : "Opted Out"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Community Involvement */}
              <div className="space-y-6">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Community Involvement
                </h3>
                <div className="p-6 rounded-3xl bg-muted/10 border border-border/50 flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${profile?.isCampusVolunteer ? "bg-purple-500 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      <School className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black">Campus Volunteer</p>
                      <p className="text-xs text-muted-foreground">
                        Join our core team for campus events and support.
                      </p>
                    </div>
                    {isEditing && profile?.role !== "unverified" ? (
                      <input
                        type="checkbox"
                        checked={editForm.isCampusVolunteer}
                        onChange={(e) =>
                          handleInputChange(
                            "isCampusVolunteer",
                            e.target.checked,
                          )
                        }
                        className="w-6 h-6 rounded text-primary focus:ring-primary border-gray-300"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {profile?.role === "unverified" && (
                          <Lock className="w-3 h-3 text-muted-foreground/50" />
                        )}
                        <Badge
                          variant={
                            profile?.isCampusVolunteer ? "default" : "outline"
                          }
                          className="rounded-lg uppercase text-[9px] font-black"
                        >
                          {profile?.isCampusVolunteer
                            ? "Team Member"
                            : profile?.role === "unverified"
                              ? "Members Only"
                              : "Not Enrolled"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
