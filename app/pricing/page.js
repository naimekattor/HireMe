"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Star,
  Briefcase,
  Users,
  Zap,
  Crown,
  Shield,
} from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    period: "month",
    description: "Perfect for getting started",
    features: [
      "Browse unlimited jobs",
      "Apply to 5 jobs per month",
      "Basic profile",
      "Email support",
    ],
    limitations: [
      "No priority support",
      "Limited applications",
      "No advanced filters",
    ],
    popular: false,
    cta: "Get Started",
    userType: "jobseeker",
  },
  {
    id: "premium",
    name: "Premium",
    price: 29,
    period: "month",
    description: "For serious job seekers",
    features: [
      "Everything in Basic",
      "Unlimited job applications",
      "Advanced search filters",
      "Priority application review",
      "Resume optimization tips",
      "Interview preparation guides",
      "Priority support",
    ],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    userType: "jobseeker",
  },
  {
    id: "starter",
    name: "Starter",
    price: 99,
    period: "month",
    description: "For small businesses",
    features: [
      "Post up to 3 jobs",
      "Basic applicant tracking",
      "Standard job visibility",
      "Email support",
    ],
    limitations: [
      "Limited job postings",
      "No premium features",
      "Basic analytics",
    ],
    popular: false,
    cta: "Start Hiring",
    userType: "employer",
  },
  {
    id: "professional",
    name: "Professional",
    price: 199,
    period: "month",
    description: "For growing companies",
    features: [
      "Post up to 10 jobs",
      "Advanced applicant tracking",
      "Priority job placement",
      "Detailed analytics",
      "Custom branding",
      "Priority support",
    ],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    userType: "employer",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    period: "month",
    description: "For large organizations",
    features: [
      "Unlimited job postings",
      "Advanced ATS integration",
      "Custom workflows",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "SLA guarantee",
    ],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
    userType: "employer",
  },
];

export default function Pricing() {
  const [userType, setUserType] = useState("jobseeker"); // Removed type annotation

  const filteredPlans = plans.filter((plan) => plan.userType === userType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>

          {/* User Type Toggle */}
          <div className="inline-flex bg-gray-100 rounded-full p-1 mb-8">
            <button
              onClick={() => setUserType("jobseeker")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                userType === "jobseeker"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Job Seekers
            </button>
            <button
              onClick={() => setUserType("employer")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                userType === "employer"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="h-4 w-4 inline mr-2" />
              Employers
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "border-blue-500 shadow-lg scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  {plan.name === "Premium" && (
                    <Crown className="h-8 w-8 text-yellow-500 mx-auto" />
                  )}
                  {plan.name === "Professional" && (
                    <Zap className="h-8 w-8 text-blue-500 mx-auto" />
                  )}
                  {plan.name === "Enterprise" && (
                    <Shield className="h-8 w-8 text-purple-500 mx-auto" />
                  )}
                  {!["Premium", "Professional", "Enterprise"].includes(
                    plan.name
                  ) && <Briefcase className="h-8 w-8 text-gray-500 mx-auto" />}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/payment?plan=${plan.id}`}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 14-day free trial for all premium plans. No
                credit card required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
