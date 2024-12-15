'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import { LoaderCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const PremiumContentPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [premiumContent, setPremiumContent] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchSubscriptionStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/subscription-status`);
        setSubscriptionStatus(res?.data?.data?.isActive);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionStatus();
  }, [session]);

  useEffect(() => {
    if (!subscriptionStatus) {
      return;
    }
    const fetchPremiumContent = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/premiumContent');
        setPremiumContent(res?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPremiumContent();
  }, [subscriptionStatus]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Premium Content</h2>
      {subscriptionStatus ? (
        premiumContent ? (
          <Card>
            <CardHeader>
              <CardTitle>{premiumContent?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{premiumContent?.content}</p>
            </CardContent>
          </Card>
        ) : (
          <div>No premium content available</div>
        )
      ) : (
        <Alert>
          <AlertTitle>Subscription Required</AlertTitle>
          <AlertDescription>
            You need an active subscription to access premium content. Please subscribe to continue.
          </AlertDescription>
          <Button variant="outline" onClick={() => toast('Redirecting to subscription page...')}>
            Subscribe Now
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default PremiumContentPage;