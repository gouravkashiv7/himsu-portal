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

      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl px-2 sm:px-0">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 md:mb-4">
              Join <span className="text-primary">HIMSU</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-md mx-auto">
              Empowering students through community, connection, and
              contribution.
            </p>
          </div>

          <div className="bg-card border-2 border-border/50 rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-black/5 p-4 sm:p-6 md:p-10 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl -z-10" />

            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-10 p-1 bg-muted/50 rounded-xl md:rounded-2xl">
                <TabsTrigger
                  value="login"
                  className="rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-tighter sm:tracking-normal px-1"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="member"
                  className="rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-tighter sm:tracking-normal px-1"
                >
                  Register
                </TabsTrigger>
                <TabsTrigger
                  value="donor"
                  className="rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-tighter sm:tracking-normal px-1"
                >
                  Donor
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="login"
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">
                    Welcome Back
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">
                    Enter your credentials to access your HIMSU dashboard.
                  </p>
                </div>
                <LoginForm />
              </TabsContent>

              <TabsContent
                value="member"
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">
                    Register Member
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">
                    Get full access to community perks and events.
                  </p>
                </div>
                <RegisterForm type="member" />
              </TabsContent>

              <TabsContent
                value="donor"
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-red-600">
                    Blood Donor Registry
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">
                    Help us build a lifecycle of emergency response.
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
