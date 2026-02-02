"use client";

import * as React from "react";
import { donors, BloodGroup } from "@/lib/data/donors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Phone, Heart, MapPin } from "lucide-react";
import { RequestBloodForm } from "@/components/blood/request-form";

export default function BloodDonationPage() {
  const [selectedGroup, setSelectedGroup] = React.useState<BloodGroup | "All">(
    "All",
  );

  const filteredDonors = donors.filter(
    (d) =>
      (selectedGroup === "All" || d.bloodGroup === selectedGroup) &&
      d.isAvailable,
  );

  const bloodGroups: BloodGroup[] = [
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
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Header & Stats */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-red-600">
            HIMSU Blood Connect
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting those in need with student heroes.
            <span className="block mt-2 font-medium text-foreground">
              Total Lives Impacted:{" "}
              <span className="text-primary font-bold">1,240+</span>
            </span>
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSelectedGroup("All")}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                selectedGroup === "All"
                  ? "bg-red-600 text-white border-red-600"
                  : "hover:bg-muted"
              }`}
            >
              All
            </button>
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`px-3 py-2 rounded-lg border font-medium transition-colors ${
                  selectedGroup === bg
                    ? "bg-red-600 text-white border-red-600"
                    : "hover:bg-muted"
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Form */}
        <div>
          <RequestBloodForm />
        </div>
      </div>

      {/* Donors Grid */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500 fill-current" />
        Available Donors ({filteredDonors.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <Card key={donor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{donor.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {donor.location}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold border-2 border-red-200">
                    {donor.bloodGroup}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" /> Call
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-xl">
            No donors found for {selectedGroup}. Try requesting in the emergency
            form.
          </div>
        )}
      </div>

      {/* CTA To Join */}
      <div className="mt-16 text-center py-12 bg-zinc-900 text-white rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Be a Hero. Save a Life.</h3>
          <p className="max-w-xl mx-auto text-zinc-300 mb-8">
            Join 5,000+ HIMSU volunteers committed to donating blood when it
            matters most.
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-zinc-100 font-bold px-8"
          >
            Register as Donor
          </Button>
        </div>
      </div>
    </div>
  );
}
