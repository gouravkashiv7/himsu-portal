import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-full bg-muted mb-4">
        <FileQuestion className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        College Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the college you're looking for. It might have been
        removed or the URL is incorrect.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link href="/colleges">
          <Button>View All Colleges</Button>
        </Link>
      </div>
    </div>
  );
}
