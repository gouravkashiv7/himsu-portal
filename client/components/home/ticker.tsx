export function AlertTicker() {
  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground py-2 border-b">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-primary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-primary to-transparent z-10" />

      <div className="whitespace-nowrap animate-marquee flex items-center space-x-8 text-xs md:text-sm font-medium">
        <span className="text-secondary-foreground px-2 py-0.5 rounded bg-secondary text-[10px] uppercase tracking-wider">
          New
        </span>
        <span>
          PU Admission Forms for 2026-27 Session available from May 15th.
        </span>
        <span className="text-primary mx-2">•</span>
        <span>
          Standard Deviation (SD) College Merit List released for B.Com.
        </span>
        <span className="text-primary mx-2">•</span>
        <span>Blood Donation Camp at Student Center on Feb 10th.</span>
        <span className="text-primary mx-2">•</span>
        <span>
          Hostel Allocations for DAV College started. Check your email.
        </span>
      </div>
    </div>
  );
}
