"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password, role);
    if (success) {
      router.push(`/dashboard/${role}`);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const demoCredentials = [
    {
      role: "jobseeker",
      email: "jobseeker@demo.com",
      label: "Job Seeker Demo",
    },
    { role: "employer", email: "employer@demo.com", label: "Employer Demo" },
    { role: "admin", email: "admin@demo.com", label: "Admin Demo" },
  ];

  const handleDemoLogin = async (demoRole, demoEmail) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setRole(demoRole);
    console.log(demoRole, demoEmail);

    const success = await login(demoEmail, "demo123", demoRole);
    if (success) {
      router.push(`/dashboard/${demoRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to HireMe
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  {" "}
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jobseeker">Job Seeker</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-sm text-gray-600">
              Try Demo Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoCredentials.map((demo) => (
                <Button
                  key={demo.role}
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => handleDemoLogin(demo.role, demo.email)}
                  disabled={isLoading}
                >
                  {demo.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Click any demo button to explore the platform with different roles
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
