"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Upload,
  User,
  FileText,
  Star,
  Building,
  CheckCircle,
  X,
  File,
  Crown,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["React", "TypeScript", "Next.js"],
    description:
      "We are looking for a senior frontend developer to join our growing team...",
    applied: false,
    premium: false,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateLab",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "3 days ago",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["Node.js", "React", "MongoDB"],
    description: "Join our remote team and work on cutting-edge projects...",
    applied: true,
    premium: true,
  },
  {
    id: 3,
    title: "React Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Contract",
    salary: "$80 - $100/hour",
    posted: "1 week ago",
    logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["React", "JavaScript", "CSS"],
    description: "Contract position for an experienced React developer...",
    applied: false,
    premium: true,
  },
];

const mockApplications = [
  {
    id: 1,
    jobTitle: "Full Stack Engineer",
    company: "InnovateLab",
    appliedDate: "2024-01-15",
    status: "Interview Scheduled",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    jobTitle: "Senior Backend Developer",
    company: "TechCorp",
    appliedDate: "2024-01-10",
    status: "Under Review",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 3,
    jobTitle: "Frontend Developer",
    company: "DesignStudio",
    appliedDate: "2024-01-05",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-800",
  },
];

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [appliedJobs, setAppliedJobs] = useState([2]);

  const [uploadedFile, setUploadedFile] = useState(null);

  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [currentPlan] = useState("basic");
  const [applicationsThisMonth] = useState(3);

  const handleApply = (jobId) => {
    const maxApplications = currentPlan === "basic" ? 5 : Infinity;

    if (currentPlan === "basic" && applicationsThisMonth >= maxApplications) {
      return;
    }

    setAppliedJobs([...appliedJobs, jobId]);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("error");
      setUploadMessage("Please upload a PDF or Word document");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadMessage("File size must be less than 5MB");
      return;
    }

    setUploadStatus("uploading");
    setUploadMessage("Uploading your resume...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadedFile(file);
      setUploadStatus("success");
      setUploadMessage("Resume uploaded successfully!");
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("Upload failed. Please try again.");
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadMessage("");
  };

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  const canApply = currentPlan === "premium" || applicationsThisMonth < 5;

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2">Find your next opportunity</p>
            </div>

            {/* Plan Status */}
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
              {currentPlan === "basic" && (
                <Briefcase className="h-4 w-4 text-gray-600" />
              )}
              {currentPlan === "premium" && (
                <Crown className="h-4 w-4 text-yellow-600" />
              )}
              <span className="text-sm font-medium capitalize">
                {currentPlan} Plan
              </span>
              {currentPlan === "basic" && (
                <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Application Limit Warning */}
          {currentPlan === "basic" && applicationsThisMonth >= 4 && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <Crown className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                You&apos;ve used {applicationsThisMonth} of 5 monthly
                applications.
                <Link href="/pricing" className="font-medium underline ml-1">
                  Upgrade to Premium
                </Link>{" "}
                for unlimited applications.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Jobs Applied</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applicationsThisMonth}
                      {currentPlan === "basic" && (
                        <span className="text-sm text-gray-500 font-normal">
                          /5
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
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Saved Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              {/* Search Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search for jobs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Location..."
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button>Search</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Listings */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Image
                            width={64}
                            height={64}
                            src={job.logo}
                            alt={job.company}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              {job.premium && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {job.company}
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
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="secondary">{job.type}</Badge>
                              {job.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-gray-700">{job.description}</p>
                          </div>
                        </div>
                        <div className="ml-4">
                          {appliedJobs.includes(job.id) ? (
                            <Button disabled variant="outline">
                              Applied ✓
                            </Button>
                          ) : (
                            <>
                              {canApply ? (
                                <Button onClick={() => handleApply(job.id)}>
                                  Apply Now
                                </Button>
                              ) : (
                                <div className="text-center">
                                  <Button
                                    disabled
                                    variant="outline"
                                    className="mb-2"
                                  >
                                    Limit Reached
                                  </Button>
                                  <Link href="/pricing">
                                    <Button size="sm" variant="outline">
                                      Upgrade Plan
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplications.map((application) => (
                      <div
                        key={application.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {application.jobTitle}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {application.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            Applied on {application.appliedDate}
                          </p>
                        </div>
                        <Badge className={application.statusColor}>
                          {application.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <Input value={user?.name || ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input value={user?.email || ""} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Title
                      </label>
                      <Input placeholder="e.g., Senior Software Engineer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <Button>Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Resume Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Upload Status Messages */}
                    {uploadStatus === "success" && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          {uploadMessage}
                        </AlertDescription>
                      </Alert>
                    )}

                    {uploadStatus === "error" && (
                      <Alert className="border-red-200 bg-red-50">
                        <X className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          {uploadMessage}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Current Resume Display */}
                    {uploadedFile && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <File className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900">
                                Current Resume
                              </h4>
                              <p className="text-sm text-blue-700">
                                {uploadedFile.name}
                              </p>
                              <p className="text-xs text-blue-600">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={removeFile}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {uploadedFile
                          ? "Replace Your Resume"
                          : "Upload Your Resume"}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Upload a PDF or Word document (Max 5MB)
                      </p>

                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={uploadStatus === "uploading"}
                        />
                        <Button disabled={uploadStatus === "uploading"}>
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadStatus === "uploading"
                            ? "Uploading..."
                            : "Choose File"}
                        </Button>
                      </div>

                      {uploadStatus === "uploading" && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full animate-pulse"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {uploadMessage}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Resume Tips
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Keep it to 1-2 pages maximum</li>
                        <li>• Use a clean, professional format</li>
                        <li>• Include relevant keywords for your industry</li>
                        <li>• Quantify your achievements with numbers</li>
                        <li>• Proofread for spelling and grammar errors</li>
                        <li>• Save as PDF to preserve formatting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plan" className="space-y-6">
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
                            {currentPlan === "basic"
                              ? "5 applications per month"
                              : "Unlimited applications"}
                          </p>
                        </div>
                        <Badge
                          variant={
                            currentPlan === "basic" ? "secondary" : "default"
                          }
                        >
                          {currentPlan === "basic" ? "Free" : "Premium"}
                        </Badge>
                      </div>

                      {currentPlan === "basic" && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                              Applications Used
                            </span>
                            <span className="text-sm font-medium">
                              {applicationsThisMonth}/5
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(applicationsThisMonth / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Link href="/pricing" className="flex-1">
                          <Button className="w-full">
                            {currentPlan === "basic"
                              ? "Upgrade Plan"
                              : "Change Plan"}
                          </Button>
                        </Link>
                        {currentPlan === "premium" && (
                          <Button variant="outline">View Invoices</Button>
                        )}
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
                          Applications This Month
                        </span>
                        <span className="font-semibold">
                          {applicationsThisMonth}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Profile Views
                        </span>
                        <span className="font-semibold">45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Interviews Scheduled
                        </span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Jobs Saved
                        </span>
                        <span className="font-semibold">8</span>
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
