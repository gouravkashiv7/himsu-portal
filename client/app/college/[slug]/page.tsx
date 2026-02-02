import { notFound } from "next/navigation";
import { colleges } from "@/lib/data/colleges";
import { CollegeHeader } from "@/components/college/college-header";
import { CourseList } from "@/components/college/course-list";

// Generate static params for all known colleges
export async function generateStaticParams() {
  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

export default async function CollegePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const college = colleges.find((c) => c.slug === slug);

  if (!college) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      <CollegeHeader college={college} />

      <main className="container mx-auto px-4 space-y-16">
        {/* Dynamic Course List */}
        <section id="courses" className="scroll-mt-24">
          <CourseList courses={college.courses} />
        </section>

        {/* Admission Info Placeholder */}
        <section
          id="admission"
          className="grid md:grid-cols-2 gap-8 bg-muted/30 p-8 rounded-2xl border"
        >
          <div>
            <h3 className="text-xl font-bold mb-4">Admission Process 2026</h3>
            <ol className="space-y-4 relative border-l border-primary/20 ml-3 pl-8">
              <li className="relative">
                <span className="absolute -left-9.75 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <div className="font-semibold">Fill Online Application</div>
                <p className="text-sm text-muted-foreground">
                  Submit basic details and academic records.
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-9.75 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div className="font-semibold">Check Merit List</div>
                <p className="text-sm text-muted-foreground">
                  Merit lists are displayed on the college website.
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-9.75 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div className="font-semibold">Document Verification</div>
                <p className="text-sm text-muted-foreground">
                  Visit campus with original documents.
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-9.75 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <div className="font-semibold">Fee Payment</div>
                <p className="text-sm text-muted-foreground">
                  Secure your seat by paying the admission fee.
                </p>
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-2">Important Dates</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Forms Out</span>
                  <span className="font-mono font-bold">May 15</span>
                </li>
                <li className="flex justify-between">
                  <span>Last Date</span>
                  <span className="font-mono font-bold">June 30</span>
                </li>
                <li className="flex justify-between text-primary">
                  <span>Session Starts</span>
                  <span className="font-mono font-bold">July 15</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">Helpline</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Stuck in the process? HIMSU volunteers are here to help.
              </p>
              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">
                Chat with Volunteer
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
