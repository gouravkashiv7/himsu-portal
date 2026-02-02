export type ResourceType = "PYQ" | "Note" | "Video";

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  subject: string;
  course: string;
  semester: string;
  year?: string; // For PYQs
  author?: string; // For Notes
  link: string; // URL or Embed ID
  description?: string;
};

export const resources: Resource[] = [
  // PYQs
  {
    id: "p1",
    title: "Data Structures & Algorithms - 2025",
    type: "PYQ",
    subject: "Computer Science",
    course: "BCA",
    semester: "3",
    year: "2025",
    link: "#",
    description: "Previous year question paper for DSA.",
  },
  {
    id: "p2",
    title: "Financial Accounting - 2024",
    type: "PYQ",
    subject: "Commerce",
    course: "B.Com",
    semester: "1",
    year: "2024",
    link: "#",
    description: "End semester exam paper.",
  },
  {
    id: "p3",
    title: "Organic Chemistry - 2023",
    type: "PYQ",
    subject: "Chemistry",
    course: "B.Sc",
    semester: "5",
    year: "2023",
    link: "#",
    description: "Major examination paper.",
  },

  // Notes
  {
    id: "n1",
    title: "Complete Java Guide",
    type: "Note",
    subject: "Programming",
    course: "BCA",
    semester: "4",
    author: "Prof. Sharma",
    link: "#",
    description: "Comprehensive notes covering Core Java concepts.",
  },
  {
    id: "n2",
    title: "Microeconomics Summaries",
    type: "Note",
    subject: "Economics",
    course: "B.A. Economics",
    semester: "2",
    author: "Topper Group",
    link: "#",
    description: "Short revision notes for exam preparation.",
  },

  // Videos
  {
    id: "v1",
    title: "Introduction to React.js",
    type: "Video",
    subject: "Web Development",
    course: "General",
    semester: "Any",
    link: "dQw4w9WgXcQ", // Youtube ID placeholder
    description: "A beginner-friendly tutorial on React basics.",
  },
  {
    id: "v2",
    title: "Calculus I: Limits and Continuity",
    type: "Video",
    subject: "Mathematics",
    course: "B.Sc Math",
    semester: "1",
    link: "dQw4w9WgXcQ",
    description: "Detailed lecture on Calculus fundamentals.",
  },
];
