"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm, RegisterForm } from "@/components/auth";
import { Navbar } from "@/components/layout/navbar";

import { Suspense } from "react";

function JoinPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "member";

  const handleTabChange = (value: string) => {
    router.replace(`/join?tab=${value}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              Join the HIMSU Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with fellow students, access resources, and contribute to
              society.
            </p>
          </div>

          <div className="bg-card border rounded-xl shadow-lg p-6 md:p-8">
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="login">Already a Member</TabsTrigger>
                <TabsTrigger value="member">New Member</TabsTrigger>
                <TabsTrigger value="donor">Blood Donor Only</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">Welcome Back</h3>
                  <p className="text-sm text-muted-foreground">
                    Login to your account to continue.
                  </p>
                </div>
                <LoginForm />
              </TabsContent>

              <TabsContent value="member">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">Register as Member</h3>
                  <p className="text-sm text-muted-foreground">
                    Full access to community features and events.
                  </p>
                </div>
                <RegisterForm type="member" />
              </TabsContent>

              <TabsContent value="donor">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-red-600">
                    Blood Donation Donor
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Register only as a donor to save lives.
                  </p>
                </div>
                <RegisterForm type="donor" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">
            Configuring Entry Portal...
          </p>
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}
