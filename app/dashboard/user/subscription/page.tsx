"use client";

import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/lib/api";

const subscriptionSchema = z.object({
  paymentMethod: z.enum(["Stripe", "Razorpay"], {
    required_error: "Payment method is required",
  }),
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .positive("Amount must be a positive number"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const SubscriptionPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/users/${session?.user?.id}/subscriptions`);
      setSubscriptions(res?.data?.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchSubscriptions();
    }
  }, [session?.user?.id]);

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const payload = {
        userId: session?.user?.id,
        paymentDetails: {
          amount: data?.amount,
          paymentMethod: data?.paymentMethod,
          paymentStatus: "Pending",
        },
      };

      const response = await api.post("/api/subscriptions", payload);

      if (response?.data?.success) {
        toast.success("Subscription created successfully!");
        fetchSubscriptions();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Subscription Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Subscribe to Premium Blogs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value=""
                onValueChange={(value: any) => {
                  setValue("paymentMethod", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="Razorpay">Razorpay</SelectItem>
                </SelectContent>
              </Select>
              {errors?.paymentMethod && (
                <p className="text-red-500 text-sm">{errors?.paymentMethod?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                {...register("amount", { valueAsNumber: true })}
                type="number"
                placeholder="Enter amount"
              />
              {errors?.amount && (
                <p className="text-red-500 text-sm">{errors?.amount?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Subscription...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Subscriptions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : subscriptions?.length > 0 ? (
          subscriptions?.map((subscription: any) => (
            <Card key={subscription?.id} className="mb-4">
              <CardHeader>
                <CardTitle>Subscription ID: {subscription?.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>User ID: {subscription?.userId}</p>
                <p>Amount: ${subscription?.paymentDetails?.amount}</p>
                <p>Payment Method: {subscription?.paymentDetails?.paymentMethod}</p>
                <p>Status: {subscription?.paymentDetails?.paymentStatus}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert>
            <AlertTitle>No Subscriptions Found</AlertTitle>
            <AlertDescription>
              You have not subscribed to any premium blogs yet.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;