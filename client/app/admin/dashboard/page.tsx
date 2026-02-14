import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { DashboardContent } from "./dashboard-content";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">
            Initializing Admin Systems...
          </p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
