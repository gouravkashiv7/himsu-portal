"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Loader2,
  Plus,
  AlertCircle,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { AddCollegeDialog } from "./add-college-dialog";
import { AssignPresidentDialog } from "./assign-president-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type College = {
  _id: string;
  name: string;
  slug: string;
  shortName: string;
  location: string;
  president?: {
    _id: string;
    name: string;
    email: string;
  };
};

export function CollegeManagement() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/colleges");
      return response.data.data as College[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading college data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 rounded-2xl bg-destructive/5 text-destructive border border-destructive/20 flex items-center gap-4">
        <div className="p-3 bg-destructive/10 rounded-full">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold">Error fetching colleges</h3>
          <p className="text-sm opacity-80">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Active Institutions
          </h2>
          <p className="text-sm text-muted-foreground">
            You are currently managing {data?.length || 0} colleges.
          </p>
        </div>
        <AddCollegeDialog />
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Institution Details
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Location
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Assigned President
                </th>
                <th className="h-14 px-6 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {data?.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap className="h-10 w-10 opacity-20" />
                      <p className="font-medium text-base">No colleges found</p>
                      <p className="text-xs">
                        Add your first college to get started.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.map((college) => (
                  <tr
                    key={college._id}
                    className="group transition-all hover:bg-primary/2"
                  >
                    <td className="p-6 align-middle">
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/admin/colleges/${college._id}`}
                          className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        >
                          {college.name}
                          <Badge
                            variant="outline"
                            className="text-[10px] py-0 px-1.5 h-4 font-bold border-muted-foreground/30 text-muted-foreground"
                          >
                            {college.slug}
                          </Badge>
                        </Link>
                        {college.shortName && (
                          <span className="text-xs text-muted-foreground font-medium">
                            {college.shortName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="font-medium italic">
                          {college.location}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      {college.president ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                            {college.president.name[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">
                              {college.president.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground leading-none">
                              {college.president.email}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none"
                        >
                          Needs President
                        </Badge>
                      )}
                    </td>
                    <td className="p-6 align-middle text-right">
                      {!college.president ? (
                        <AssignPresidentDialog
                          collegeId={college._id}
                          collegeName={college.name}
                        />
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-bold text-primary hover:text-primary hover:bg-primary/10"
                          >
                            Edit
                          </Button>
                          <Badge
                            variant="outline"
                            className="h-8 px-3 bg-green-500/5 text-green-600 border-green-200"
                          >
                            Managed
                          </Badge>
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
