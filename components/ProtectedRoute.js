"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in, redirect to login page
      if (!user) {
        router.push("/login");
        return;
      }

      // If allowedRoles are specified and the user's role is not among them, redirect to unauthorized page
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  // Show a loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If after loading, there's no user or the role is not allowed, render nothing (the redirects handle the UX)
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  // If user is logged in and has an allowed role, render the children
  return <>{children}</>;
}
