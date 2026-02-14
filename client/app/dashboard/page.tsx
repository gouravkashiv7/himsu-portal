"use client";

import { useAuth } from "@/hooks/use-auth";
import UserDashboard from "@/components/dashboard/user-dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    // Redirect admins to their specific dashboard
    if (user && (user.role === "superadmin" || user.role === "president")) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <UserDashboard />;
}
