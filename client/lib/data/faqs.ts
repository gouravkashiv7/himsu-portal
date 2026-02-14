export type FAQCategory = "Admissions" | "Examinations" | "Hostel" | "General";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
};

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "How do I apply for Panjab University affiliated colleges?",
    answer:
      "Applications are submitted centrally via the DHE (Director Higher Education) Chandigarh portal. You need to fill one common form and select your specialized colleges.",
    category: "Admissions",
  },
  {
    id: "f2",
    question: "What is the eligibility for BCA in DAV College?",
    answer:
      "You must have passed 10+2 with at least 50% marks. Mathematics as a subject in 10+2 is usually mandatory for BCA admissions.",
    category: "Admissions",
  },
  {
    id: "f3",
    question: "Where can I find the datesheet for Semester exams?",
    answer:
      "Datesheets are released on the official PU Chandigarh website (puchd.ac.in). We also update them in the 'Alerts' section on this portal.",
    category: "Examinations",
  },
  {
    id: "f4",
    question: "Are hostel facilities available for outside students?",
    answer:
      "Yes, most colleges like DAV, SD, and Govt College Sector 11 have hostel facilities. Allotment is merit-based.",
    category: "Hostel",
  },
  {
    id: "f5",
    question: "How can I join HIMSU?",
    answer:
      "You can join HIMSU by contacting any unit president or using the 'Join HIMSU' button in the menu to fill the membership form.",
    category: "General",
  },
];
