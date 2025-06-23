"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  Briefcase,
  Users,
  Eye,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Crown,
  Zap,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2024-01-15",
    status: "Active",
    applicants: 24,
    views: 156,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "2024-01-10",
    status: "Active",
    applicants: 18,
    views: 203,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Contract",
    salary: "$80 - $100/hour",
    posted: "2024-01-05",
    status: "Draft",
    applicants: 0,
    views: 0,
  },
];

const mockApplicants = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-16",
    status: "New",
    resume: "alice_resume.pdf",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-15",
    status: "Interviewed",
    resume: "bob_resume.pdf",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    jobTitle: "Product Manager",
    appliedDate: "2024-01-14",
    status: "Shortlisted",
    resume: "carol_resume.pdf",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
];

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(mockJobs);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("starter"); // Mock current plan
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  });

  const handleCreateJob = () => {
    const job = {
      id: jobs.length + 1,
      ...newJob,
      posted: new Date().toISOString().split("T")[0],
      status: "Draft",
      applicants: 0,
      views: 0,
    };
    setJobs([...jobs, job]);
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
    });
    setIsCreateJobOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApplicantStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Interviewed":
        return "bg-purple-100 text-purple-800";
      case "Shortlisted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanLimits = (plan) => {
    switch (plan) {
      case "starter":
        return { jobs: 3, features: "Basic" };
      case "professional":
        return { jobs: 10, features: "Advanced" };
      case "enterprise":
        return { jobs: "Unlimited", features: "Premium" };
      default:
        return { jobs: 3, features: "Basic" };
    }
  };

  const planLimits = getPlanLimits(currentPlan);
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const isJobLimitReached =
    typeof planLimits.jobs === "number" && activeJobs >= planLimits.jobs;

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}! 🏢
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your job postings and applicants
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Plan Status */}
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
                {currentPlan === "starter" && (
                  <Briefcase className="h-4 w-4 text-gray-600" />
                )}
                {currentPlan === "professional" && (
                  <Zap className="h-4 w-4 text-blue-600" />
                )}
                {currentPlan === "enterprise" && (
                  <Crown className="h-4 w-4 text-purple-600" />
                )}
                <span className="text-sm font-medium capitalize">
                  {currentPlan} Plan
                </span>
                <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </Link>
              </div>

              <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isJobLimitReached}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Job Posting</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title
                        </label>
                        <Input
                          value={newJob.title}
                          onChange={(e) =>
                            setNewJob({ ...newJob, title: e.target.value })
                          }
                          placeholder="e.g., Senior Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <Input
                          value={newJob.department}
                          onChange={(e) =>
                            setNewJob({ ...newJob, department: e.target.value })
                          }
                          placeholder="e.g., Engineering"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <Input
                          value={newJob.location}
                          onChange={(e) =>
                            setNewJob({ ...newJob, location: e.target.value })
                          }
                          placeholder="e.g., San Francisco, CA or Remote"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary Range
                        </label>
                        <Input
                          value={newJob.salary}
                          onChange={(e) =>
                            setNewJob({ ...newJob, salary: e.target.value })
                          }
                          placeholder="e.g., $100k - $120k"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description
                      </label>
                      <textarea
                        value={newJob.description}
                        onChange={(e) =>
                          setNewJob({ ...newJob, description: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Describe the role, responsibilities, and requirements..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateJobOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateJob}>
                        Create Job Posting
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Plan Limit Warning */}
          {isJobLimitReached && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <Crown className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                You've reached your job posting limit ({planLimits.jobs} jobs).
                <Link href="/pricing" className="font-medium underline ml-1">
                  Upgrade your plan
                </Link>{" "}
                to post more jobs.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {activeJobs}
                      {typeof planLimits.jobs === "number" && (
                        <span className="text-sm text-gray-500 font-normal">
                          /{planLimits.jobs}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Applicants</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">359</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="applicants">Applicants</TabsTrigger>
              <TabsTrigger value="company">Company Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {job.department}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.posted}
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {job.applicants} applicants
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {job.views} views
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applicants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applicants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={applicant.avatar}
                            alt={applicant.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {applicant.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {applicant.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied for {applicant.jobTitle}
                            </p>
                            <p className="text-xs text-gray-400">
                              Applied on {applicant.appliedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={getApplicantStatusColor(
                              applicant.status
                            )}
                          >
                            {applicant.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Resume
                          </Button>
                          <Button size="sm">Contact</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <Input defaultValue="TechCorp Inc." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry
                        </label>
                        <Input defaultValue="Technology" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size
                        </label>
                        <Input defaultValue="100-500 employees" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <Input defaultValue="https://techcorp.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Description
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={4}
                        defaultValue="We are a leading technology company focused on innovation and excellence..."
                      />
                    </div>

                    <Button>Update Company Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Current Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {currentPlan} Plan
                          </h3>
                          <p className="text-sm text-gray-600">
                            {planLimits.jobs === "Unlimited"
                              ? "Unlimited"
                              : `Up to ${planLimits.jobs}`}{" "}
                            job postings
                          </p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Job Postings Used
                          </span>
                          <span className="text-sm font-medium">
                            {activeJobs}/
                            {planLimits.jobs === "Unlimited"
                              ? "∞"
                              : planLimits.jobs}
                          </span>
                        </div>
                        {typeof planLimits.jobs === "number" && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (activeJobs / planLimits.jobs) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <Link href="/pricing" className="flex-1">
                          <Button variant="outline" className="w-full">
                            Change Plan
                          </Button>
                        </Link>
                        <Button variant="outline">View Invoices</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Total Applications Received
                        </span>
                        <span className="font-semibold">42</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Profile Views This Month
                        </span>
                        <span className="font-semibold">359</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Interviews Scheduled
                        </span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Successful Hires
                        </span>
                        <span className="font-semibold">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
