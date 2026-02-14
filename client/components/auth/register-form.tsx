"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";

// Define Form Schema for Registration
const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  collegeId: z.string().min(1, "Please select a college"),
  otherCollegeName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  otherCityName: z.string().optional(),
  sector: z.string().optional(),
  bloodGroup: z.string().optional(),
  isBloodDonor: z.boolean(),
  role: z.string(),
});

type FormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  type = "member",
}: {
  type?: "member" | "donor";
}) {
  const router = useRouter();
  const [colleges, setColleges] = useState<{ _id: string; name: string }[]>([]);

  const { user } = useAuth(); // If already logged in

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isBloodDonor: type === "donor",
      role: "member",
    },
  });

  // Watch inputs for conditional rendering
  const selectedCity = watch("city");
  const selectedCollegeId = watch("collegeId");

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("/api/colleges?limit=100"); // Ensure we get all colleges
        if (res.data.success) {
          setColleges(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load colleges");
      }
    };
    fetchColleges();
  }, []);

  // Derived state directly from watch values
  const isTriCity =
    selectedCity?.toLowerCase() === "chandigarh" ||
    selectedCity?.toLowerCase() === "mohali" ||
    selectedCity?.toLowerCase() === "panchkula";
  const showSectorInput = isTriCity;
  const showOtherCityInput = selectedCity?.toLowerCase() === "other";
  const showOtherCollegeInput = selectedCollegeId === "other";

  const onSubmit = async (data: FormData) => {
    try {
      // Modify payload based on selections
      const payload = {
        ...data,
        college: data.collegeId === "other" ? undefined : data.collegeId, // Backend expects ID or nothing if 'other' (and otherCollegeName is sent)
        otherCollegeName:
          data.collegeId === "other" ? data.otherCollegeName : undefined,
        location: {
          city: data.city === "other" ? data.otherCityName : data.city,
          sector: data.sector,
        },
      };

      const response = await axios.post("/api/auth/register", payload);

      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login"); // Or auto-login if backend supports returning token
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            placeholder="+91 9876543210"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        {/* College Selection */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">College / University</label>
          <div className="relative">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none"
              {...register("collegeId")}
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
              <option value="other">Other (Not Listed)</option>
            </select>
            {/* Simple arrow icon for better UX since default select can be ugly */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.collegeId && (
            <p className="text-red-500 text-xs">{errors.collegeId.message}</p>
          )}
        </div>

        {showOtherCollegeInput && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Enter College Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="College Name"
              {...register("otherCollegeName")}
            />
          </div>
        )}

        {/* City */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Current City</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            {...register("city")}
          >
            <option value="">Select City</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Mohali">Mohali</option>
            <option value="Panchkula">Panchkula</option>
            <option value="other">Other</option>
          </select>
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>

        {showOtherCityInput && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter City Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="e.g. Shimla"
              {...register("otherCityName")}
            />
          </div>
        )}

        {/* Sector (Conditional) */}
        {showSectorInput && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Sector</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="e.g. Sector 15"
              {...register("sector")}
            />
          </div>
        )}

        {/* Blood Group */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Blood Group {type === "donor" && "*"}
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            {...register("bloodGroup")}
          >
            <option value="">Select Blood Group</option>
            <option value="Unknown">Unknown / Prefer not to say</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {type === "member" && (
        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="bloodDonor"
            className="h-4 w-4 rounded border-gray-300"
            {...register("isBloodDonor")}
          />
          <label
            htmlFor="bloodDonor"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am interested in donating blood (Volunteer)
          </label>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
        {isSubmitting
          ? "Registering..."
          : type === "donor"
            ? "Register as Blood Donor"
            : "Join HIMSU"}
      </Button>
    </form>
  );
}
