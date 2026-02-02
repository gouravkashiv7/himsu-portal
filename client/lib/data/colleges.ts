export type Course = {
  id: string;
  name: string;
  type: "Undergraduate" | "Postgraduate" | "Diploma";
  duration: string;
  eligibility: string;
  seats: number;
  fees: string;
};

export type College = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
  established: string;
  accreditation: string;
  bannerColor: string; // Fallback until images are ready
  logo?: string;
  courses: Course[];
  highlights: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
};

export const colleges: College[] = [
  {
    id: "1",
    slug: "pu",
    name: "Panjab University",
    shortName: "PU",
    location: "Sector 14, Chandigarh",
    description:
      "One of the oldest and most prestigious universities in India, renowned for its research and diverse academic programs.",
    established: "1882",
    accreditation: "NAAC A++",
    bannerColor: "bg-purple-900",
    highlights: ["Ranked #1 in Pharmacy", "Wide Campus", "Historical Heritage"],
    contact: {
      email: "vc@pu.ac.in",
      phone: "1800-180-2065",
      website: "https://puchd.ac.in",
    },
    courses: [
      {
        id: "c1",
        name: "B.A. (Hons) Economics",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with 50% marks",
        seats: 60,
        fees: "₹15,000 / Sem",
      },
      {
        id: "c2",
        name: "B.Sc. (Hons) Physics",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with PCM",
        seats: 40,
        fees: "₹18,000 / Sem",
      },
      {
        id: "c3",
        name: "M.Sc. Computer Science",
        type: "Postgraduate",
        duration: "2 Years",
        eligibility: "BCA/B.Sc. CS with 50%",
        seats: 30,
        fees: "₹45,000 / Sem",
      },
    ],
  },
  {
    id: "2",
    slug: "dav",
    name: "DAV College",
    shortName: "DAV-10",
    location: "Sector 10, Chandigarh",
    description:
      "A premier institution offering a blend of traditional and modern education with a focus on holistic development.",
    established: "1958",
    accreditation: "NAAC A",
    bannerColor: "bg-red-800",
    highlights: ["Sports Excellence", "Placement Cell", "Cultural Hub"],
    contact: {
      email: "principal@davchd.ac.in",
      phone: "0172-2743980",
      website: "https://davchd.ac.in",
    },
    courses: [
      {
        id: "c4",
        name: "B.Com (Hons)",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 in Commerce stream",
        seats: 140,
        fees: "₹22,000 / Sem",
      },
      {
        id: "c5",
        name: "BCA",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with Math",
        seats: 80,
        fees: "₹35,000 / Sem",
      },
    ],
  },
  {
    id: "3",
    slug: "sd",
    name: "GGDSD College",
    shortName: "SD College",
    location: "Sector 32, Chandigarh",
    description:
      "Goswami Ganesh Dutta S.D. College is known for its academic excellence and state-of-the-art infrastructure.",
    established: "1973",
    accreditation: "NAAC A+",
    bannerColor: "bg-orange-600",
    highlights: ["Best Commerce College", "Innovation Center", "Research Labs"],
    contact: {
      email: "info@ggdsd.ac.in",
      phone: "0172-4912400",
      website: "https://ggdsd.ac.in",
    },
    courses: [
      {
        id: "c6",
        name: "BBA",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 with 50%",
        seats: 120,
        fees: "₹30,000 / Sem",
      },
      {
        id: "c7",
        name: "M.Com",
        type: "Postgraduate",
        duration: "2 Years",
        eligibility: "B.Com with 50%",
        seats: 60,
        fees: "₹25,000 / Sem",
      },
    ],
  },
  {
    id: "4",
    slug: "ppgc-11",
    name: "Post Graduate Govt. College",
    shortName: "GC-11",
    location: "Sector 11, Chandigarh",
    description:
      "A leading government institution committed to providing quality higher education at affordable costs.",
    established: "1953",
    accreditation: "NAAC B++",
    bannerColor: "bg-blue-700",
    highlights: ["Affordable Education", "Green Campus", "NCC/NSS"],
    contact: {
      email: "principal@gc11.ac.in",
      phone: "0172-2740597",
      website: "https://gc11.ac.in",
    },
    courses: [
      {
        id: "c8",
        name: "B.A. (General)",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 Pass",
        seats: 600,
        fees: "₹8,000 / Year",
      },
      {
        id: "c9",
        name: "B.Sc. Medical",
        type: "Undergraduate",
        duration: "3 Years",
        eligibility: "10+2 Medical",
        seats: 120,
        fees: "₹12,000 / Year",
      },
    ],
  },
];
