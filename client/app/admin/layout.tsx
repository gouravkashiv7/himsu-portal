import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Admin Dashboard - HIMSU Portal",
  description: "Superadmin interface for managing colleges and presidents.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-border/50">
        <AdminSidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 pt-24 lg:pt-24 max-w-400 mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
