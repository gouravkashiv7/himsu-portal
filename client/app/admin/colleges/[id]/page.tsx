"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  Phone,
  TrendingUp,
  Activity,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";

// Type Definitions
type College = {
  _id: string;
  name: string;
  slug: string;
  shortName: string;
  location: string;
  description: string;
  established: string;
  accreditation: string;
  bannerColor: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    whatsapp: string;
  };
  highlights: string[];
  courses: {
    name: string;
    type: "Undergraduate" | "Postgraduate" | "Diploma";
    duration: string;
    eligibility: string;
    seats: number;
    fees: string;
  }[];
  importantDates: {
    label: string;
    date: string;
    description: string;
  }[];
  volunteers: {
    name: string;
    phone: string;
    course: string;
    designation: string;
  }[];
};

export default function CollegeEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Basic fetch
  const {
    data: college,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      const response = await axios.get(`/api/colleges/${id}`);
      return response.data.data as College;
    },
    enabled: !!id,
  });

  // Setup form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<College>({
    defaultValues: {
      highlights: [],
      courses: [],
      importantDates: [],
      volunteers: [],
    },
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (college) {
      reset(college);
    }
  }, [college, reset]);

  // Dynamic fields
  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights" as any,
  });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({
    control,
    name: "importantDates",
  });

  const {
    fields: volunteerFields,
    append: appendVolunteer,
    remove: removeVolunteer,
  } = useFieldArray({
    control,
    name: "volunteers",
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: async (data: College) => {
      // Clean up data before sending if needed
      const response = await axios.put(`/api/colleges/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("College updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["college", id] });
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update college");
    },
  });

  const onSubmit = (data: College) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading college configuration...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center">
        <div className="bg-destructive/10 text-destructive p-6 rounded-2xl inline-block">
          <AlertCircle className="h-10 w-10 mx-auto mb-2" />
          <p className="font-bold">Failed to load college details</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/dashboard"
            className="p-2.5 hover:bg-muted rounded-xl border border-border/50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Edit College
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Updating profile for{" "}
              <span className="text-primary">{college?.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="px-3 py-1 font-bold text-[10px] uppercase tracking-widest bg-muted/30 border-muted-foreground/20"
          >
            {college?.slug}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-foreground border-b pb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                College Name
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-[10px] font-bold ml-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Slug (URL Path)
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("slug", { required: "Slug is required" })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Short Name / Abbreviation
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("shortName")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Primary Location
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("location")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Established Year
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("established")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Accreditation
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("accreditation")}
              />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Institute Description
              </label>
              <textarea
                className="flex min-h-30 w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("description")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Theme Color (Tailwind)
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("bannerColor")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Logo URL
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("logo")}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-foreground border-b pb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Official Email
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("contact.email")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Support Phone
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("contact.phone")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                Official Website
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("contact.website")}
              />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
                WhatsApp Group Invitation Link
              </label>
              <input
                className="flex h-12 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                {...register("contact.whatsapp")}
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Key Highlights
            </h3>
            <Button
              type="button"
              onClick={() => appendHighlight("New Achievement")}
              variant="outline"
              size="sm"
              className="rounded-xl font-bold text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Highlight
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlightFields.map((field, index) => (
              <div
                key={field.id}
                className="group flex gap-2 animate-in zoom-in-95 duration-200"
              >
                <input
                  className="flex h-11 w-full rounded-xl border border-input bg-muted/20 px-4 py-2 text-sm transition-all group-hover:bg-background"
                  {...register(`highlights.${index}` as const)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeHighlight(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Offered Courses
            </h3>
            <Button
              type="button"
              onClick={() =>
                appendCourse({
                  name: "",
                  type: "Undergraduate",
                  duration: "3 Years",
                  eligibility: "",
                  seats: 0,
                  fees: "",
                })
              }
              variant="outline"
              size="sm"
              className="rounded-xl font-bold text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Course
            </Button>
          </div>
          <div className="space-y-6">
            {courseFields.map((field, index) => (
              <Card
                key={field.id}
                className="relative border-border/40 bg-muted/10 overflow-hidden group"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCourse(index)}
                  className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Course Name
                      </label>
                      <input
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm"
                        {...register(`courses.${index}.name` as const, {
                          required: true,
                        })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Type
                      </label>
                      <select
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm h-8.5"
                        {...register(`courses.${index}.type` as const)}
                      >
                        <option value="Undergraduate">UG</option>
                        <option value="Postgraduate">PG</option>
                        <option value="Diploma">Diploma</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Duration
                      </label>
                      <input
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm"
                        {...register(`courses.${index}.duration` as const)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Seats
                      </label>
                      <input
                        type="number"
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm"
                        {...register(`courses.${index}.seats` as const, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Eligibility
                      </label>
                      <input
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm"
                        {...register(`courses.${index}.eligibility` as const)}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        Annual Fees
                      </label>
                      <input
                        className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold text-primary"
                        {...register(`courses.${index}.fees` as const)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-8 sticky bottom-8 z-20">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-2xl px-12 py-7 font-bold text-lg shadow-2xl shadow-primary/30"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Synchronizing...
              </>
            ) : (
              "Save All Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 18 18" />
    </svg>
  );
}
