"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  Building,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import Image from "next/image";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $130k",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["Strategy", "Analytics", "Leadership"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $100k",
    logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    tags: ["Figma", "Design Systems", "User Research"],
  },
];

const companies = [
  {
    name: "Google",
    logo: "https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    openJobs: 42,
  },
  {
    name: "Microsoft",
    logo: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    openJobs: 38,
  },
  {
    name: "Apple",
    logo: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    openJobs: 29,
  },
  {
    name: "Amazon",
    logo: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    openJobs: 56,
  },
];

const handleSearch = (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const title = form.get("title") || "";
  const city = form.get("city") || "";
  const filteredData = featuredJobs.filter((job) => {
    return job.title.toLowerCase().includes(title.toLowerCase());
  });
  //console.log(filteredData);
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your <span className="text-blue-600">Dream Job</span> Today
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with top employers, discover amazing opportunities, and
              take the next step in your career journey.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full shadow-lg p-2 max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center px-4 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  name="title"
                  placeholder="Job title, keywords, or company"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-2 border-l border-gray-200">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  name="city"
                  placeholder="City or remote"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full"
              >
                Search Jobs
              </Button>
            </form>

            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Jobs</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Job Seekers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-gray-600">
              Discover opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/login">
              <Button variant="outline" size="lg">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Companies Hiring
            </h2>
            <p className="text-gray-600">
              Join industry leaders and innovative startups
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companies.map((company) => (
              <div
                key={company.name}
                className="text-center group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-xl p-6 mb-4 group-hover:bg-gray-200 transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 mx-auto rounded-lg object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {company.openJobs} open positions
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HireMe?</h2>
            <p className="text-blue-100">
              Everything you need to find your perfect job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Companies</h3>
              <p className="text-blue-100">
                All companies are thoroughly vetted and verified for legitimacy
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Applications</h3>
              <p className="text-blue-100">
                Apply to multiple jobs with just one click using your profile
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Matches
              </h3>
              <p className="text-blue-100">
                Get job recommendations tailored to your skills and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have already found their perfect
            career match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Sign Up as Job Seeker
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-gray-900"
              >
                Post Jobs as Employer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
