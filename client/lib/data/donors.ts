export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export type Donor = {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  contact: string;
  location: string; // e.g., "Sector 14", "Boys Hostel 1"
  lastDonated?: string;
  isAvailable: boolean;
};

export const donors: Donor[] = [
  {
    id: "d1",
    name: "Aarav Sharma",
    bloodGroup: "O+",
    contact: "98765*****",
    location: "Boys Hostel 4, PU",
    isAvailable: true,
  },
  {
    id: "d2",
    name: "Ishita Verma",
    bloodGroup: "B+",
    contact: "87654*****",
    location: "Sector 15, Chandigarh",
    isAvailable: true,
    lastDonated: "2024-01-15",
  },
  {
    id: "d3",
    name: "Rohan Singh",
    bloodGroup: "A-",
    contact: "76543*****",
    location: "Sector 32, SD College",
    isAvailable: false, // Recently donated
  },
  {
    id: "d4",
    name: "Meera Gill",
    bloodGroup: "AB+",
    contact: "65432*****",
    location: "Mata Gujri Hall",
    isAvailable: true,
  },
  {
    id: "d5",
    name: "Vikramjeet",
    bloodGroup: "O+",
    contact: "99887*****",
    location: "DAV College Hostel",
    isAvailable: true,
  },
];
