"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Phone,
  Heart,
  MapPin,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { RequestBloodForm } from "@/components/blood/request-form";
import Link from "next/link";

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

interface DonorType {
  _id: string;
  name: string;
  bloodGroup: string;
  phone?: string;
  location?: {
    city: string;
    sector: string;
  };
  college?: {
    name: string;
    shortName: string;
  };
  image?: string;
}

export default function BloodDonationPage() {
  const [selectedGroup, setSelectedGroup] = React.useState<string>("All");

  const { data: donors, isLoading } = useQuery({
    queryKey: ["public-donors"],
    queryFn: async () => {
      const res = await axios.get("/api/donors");
      return res.data.data as DonorType[];
    },
  });

  const filteredDonors =
    donors?.filter(
      (d) => selectedGroup === "All" || d.bloodGroup === selectedGroup,
    ) || [];

  const bloodGroups: string[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh] animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Header & Stats */}
        <div className="lg:col-span-2 space-y-4">
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Emergency Response
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4">
            HIMSU <span className="text-red-600">Blood</span> Connect
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl font-medium">
            Bridging the gap between life-savers and those in need. Verified
            student donors from all major colleges are just a call away.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setSelectedGroup("All")}
              className={`px-5 py-2.5 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all ${
                selectedGroup === "All"
                  ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200"
                  : "bg-background hover:border-red-600/30"
              }`}
            >
              Everyone
            </button>
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`px-4 py-2.5 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all ${
                  selectedGroup === bg
                    ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200"
                    : "bg-background hover:border-red-600/30"
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Form */}
        <div className="relative">
          <div className="absolute -inset-4 bg-red-600/5 blur-3xl -z-10" />
          <RequestBloodForm />
        </div>
      </div>

      {/* Donors Grid */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
          Available Donors
          <span className="text-muted-foreground text-sm font-bold bg-muted px-3 py-1 rounded-full ml-2">
            {filteredDonors.length}
          </span>
        </h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-muted/10 rounded-[3rem] border border-dashed border-border/50">
          <Loader2 className="w-10 h-10 animate-spin text-red-600/40" />
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
            Scanning for lifesavers...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <Card
                key={donor._id}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[2.5rem] bg-card/50 backdrop-blur-sm overflow-hidden group"
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-muted overflow-hidden border-2 border-white shadow-md relative">
                        {donor.image ? (
                          <img
                            src={donor.image}
                            alt={donor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-black text-muted-foreground/30">
                            {donor.name[0]}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-red-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">
                          {donor.bloodGroup}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-lg tracking-tight leading-none mb-1 group-hover:text-red-600 transition-colors">
                          {donor.name}
                        </h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {donor.college?.shortName || "HIMSU Member"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-xs font-bold text-muted-foreground">
                      <MapPin className="w-3 h-3 text-red-600" />
                      {donor.location?.city
                        ? `${donor.location.city}, ${donor.location.sector}`
                        : "Chandigarh Base"}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        className="flex-1 rounded-2xl h-12 bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20"
                      >
                        <a href={`tel:${donor.phone}`}>
                          <Phone className="w-4 h-4 mr-2" /> Connect
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-12 h-12 rounded-2xl border-2 p-0 flex items-center justify-center"
                        asChild
                      >
                        <a
                          href={`https://wa.me/${donor.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="w-4 h-4 text-green-600" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-muted/10 rounded-[3rem] border border-dashed border-border/50">
              <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                No donors matched
              </h3>
              <p className="text-xs font-medium text-muted-foreground/60 mt-1">
                Try selecting a different blood group or use the emergency form.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CTA To Join */}
      <Card className="mt-20 border-none rounded-[3.5rem] bg-zinc-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] -ml-48 -mb-48" />

        <CardContent className="relative z-10 p-12 md:p-20 text-center">
          <Badge className="bg-red-600 text-white border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Become a Lifesaver
          </Badge>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Be a Hero. <span className="text-red-600">Save a Life.</span>
          </h3>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg font-medium mb-10 leading-relaxed">
            Join thousands of HIMSU volunteers committed to responding during
            critical emergencies. Your single donation can save up to three
            lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join?tab=donor">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-black px-10 h-16 rounded-2xl text-lg shadow-2xl shadow-red-600/30 w-full sm:w-auto"
              >
                Register as Donor
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-zinc-700 hover:bg-zinc-800 text-white font-black px-10 h-16 rounded-2xl text-lg w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
