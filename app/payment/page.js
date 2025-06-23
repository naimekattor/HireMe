"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";

const planDetails = {
  basic: { name: "Basic", price: 0, period: "month" },
  premium: { name: "Premium", price: 29, period: "month" },
  starter: { name: "Starter", price: 99, period: "month" },
  professional: { name: "Professional", price: 199, period: "month" },
  enterprise: { name: "Enterprise", price: 499, period: "month" },
};

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [planId, setPlanId] = useState(""); // Removed string type annotation
  const [paymentStep, setPaymentStep] = useState("details"); // Removed union type annotation
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({}); // Removed Record<string, string> type annotation

  useEffect(() => {
    const plan = searchParams.get("plan");
    // Check if plan exists in planDetails to avoid issues
    if (plan && planDetails[plan]) {
      // Removed type assertion 'as keyof typeof planDetails'
      setPlanId(plan);
    } else {
      router.push("/pricing");
    }
  }, [searchParams, router]);

  // Safely access selectedPlan using the dynamic planId
  const selectedPlan = planDetails[planId] || planDetails.basic; // Fallback to basic if planId is invalid or not yet set

  const validateForm = () => {
    const newErrors = {}; // Removed Record<string, string> type annotation

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter expiry date in MM/YY format";
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Please enter the name on card";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    // Removed string type annotations
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value) => {
    // Removed string type annotation
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    // Removed string type annotation
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    // Removed React.FormEvent type annotation
    e.preventDefault();

    if (!validateForm()) return;

    setPaymentStep("processing");

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate random success/failure for demo
      if (Math.random() > 0.1) {
        // 90% success rate
        setPaymentStep("success");
        setTimeout(() => {
          router.push(`/dashboard/${user?.role}`);
        }, 3000);
      } else {
        setPaymentStep("error");
      }
    } catch (error) {
      setPaymentStep("error");
    }
  };

  if (!selectedPlan) {
    return null;
  }

  if (paymentStep === "processing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we process your payment securely...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to {selectedPlan.name}! Your subscription is now active.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStep === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-4">
              There was an issue processing your payment. Please try again.
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => setPaymentStep("details")}
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/pricing")}
                className="w-full"
              >
                Back to Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/pricing")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 mt-2">
            Secure checkout powered by industry-standard encryption
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Card Information
                    </h3>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            formatCardNumber(e.target.value)
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "expiryDate",
                              formatExpiryDate(e.target.value)
                            )
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          className={errors.expiryDate ? "border-red-500" : ""}
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange(
                              "cvv",
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                          placeholder="123"
                          maxLength={4}
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) =>
                          handleInputChange("cardName", e.target.value)
                        }
                        placeholder="John Doe"
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Billing Information
                    </h3>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) =>
                          handleInputChange("billingAddress", e.target.value)
                        }
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Payment - ${selectedPlan.price}/
                    {selectedPlan.period}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedPlan.name} Plan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Monthly subscription
                    </p>
                  </div>
                  <Badge variant="secondary">
                    ${selectedPlan.price}/{selectedPlan.period}
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${selectedPlan.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Billed monthly • Cancel anytime
                  </p>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Your payment information is encrypted and secure. We use
                    industry-standard SSL encryption.
                  </AlertDescription>
                </Alert>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• 14-day free trial for premium plans</p>
                  <p>• Cancel anytime, no questions asked</p>
                  <p>• Instant access to all features</p>
                  <p>• 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
