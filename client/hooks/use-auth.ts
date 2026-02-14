"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  college?: any;
  rejectionReason?: string;
  phone?: string;
  bloodGroup?: string;
  isBloodDonor?: boolean;
  isCampusVolunteer?: boolean;
  location?: {
    city?: string;
    sector?: string;
  };
  otherCollegeName?: string;
  createdAt?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return { user, loading, logout, checkAuth };
}
