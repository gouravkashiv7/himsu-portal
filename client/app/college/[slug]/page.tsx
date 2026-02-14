import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import College from "@/lib/models/College";
import { CollegeHeader } from "@/components/college/college-header";
import { CourseList } from "@/components/college/course-list";
import { MessageCircle } from "lucide-react";

// Force dynamic rendering to ensure latest data from DB is always shown
export const dynamic = "force-dynamic";

export default async function CollegePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await dbConnect();
  // Using lean() for better performance as we don't need mongoose document methods
  const college = await College.findOne({ slug }).lean();

  if (!college) {
    notFound();
  }

  // Serialize the mongo document to plain object (handle _id, dates etc if needed)
  // For simple usage, JSON stringify/parse is a quick way to ensure it's plain JSON
  const serializedCollege = JSON.parse(JSON.stringify(college));
  const volunteers = serializedCollege.volunteers || [];

  // Pick a random volunteer if available
  const randomVolunteer =
    volunteers.length > 0
      ? volunteers[Math.floor(Math.random() * volunteers.length)]
      : null;

  return (
    <div className="min-h-screen pb-20">
      <CollegeHeader college={serializedCollege} />

      <main className="container mx-auto px-4 space-y-16">
        {/* Dynamic Course List */}
        <section id="courses" className="scroll-mt-24">
          <CourseList courses={serializedCollege.courses || []} />
        </section>

        {/* Admission Info Placeholder */}
        <section
          id="admission"
          className="grid md:grid-cols-2 gap-8 bg-muted/30 p-8 rounded-2xl border"
        >
          <div>
            <h3 className="text-xl font-bold mb-4">Admission Process</h3>
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
            {/* Important Dates */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-2">Important Dates</h4>
              {serializedCollege.importantDates &&
              serializedCollege.importantDates.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {serializedCollege.importantDates.map(
                    (date: any, i: number) => (
                      <li
                        key={i}
                        className="flex justify-between items-center py-2 border-b border-muted/50 last:border-0"
                      >
                        <div>
                          <span className="font-medium block">
                            {date.label}
                          </span>
                          {date.description && (
                            <span className="text-xs text-muted-foreground">
                              {date.description}
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-bold text-primary">
                          {date.date}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No upcoming dates announced yet.
                </p>
              )}
            </div>

            {/* Volunteer Helpline */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">Helpline</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Stuck in the process? HIMSU volunteers are here to help.
              </p>

              {randomVolunteer ? (
                <div className="bg-background/80 p-4 rounded-lg border mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                      {randomVolunteer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {randomVolunteer.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {randomVolunteer.course}{" "}
                        {randomVolunteer.designation
                          ? `• ${randomVolunteer.designation}`
                          : ""}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${randomVolunteer.phone}`}
                    target="_blank"
                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full py-2 bg-muted text-muted-foreground rounded-lg font-medium text-sm cursor-not-allowed"
                >
                  No Volunteers Available
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
