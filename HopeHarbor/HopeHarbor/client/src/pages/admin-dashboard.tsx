import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Mail, Smartphone, LogOut, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Donation, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isOwner, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated || (!isAdmin && !isOwner)) {
      setLocation("/");
    }
  }, [isAuthenticated, isAdmin, isOwner, setLocation]);

  // Fetch admin stats
  const { data: stats } = useQuery<{
    totalDonations: number;
    donationCount: number;
    pendingMessages: number;
    pendingGCashPayments: number;
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated && (isAdmin || isOwner),
  });

  // Fetch donations
  const { data: donations = [] } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
    enabled: isAuthenticated && (isAdmin || isOwner),
  });

  // Fetch messages
  const { data: messages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: isAuthenticated && (isAdmin || isOwner),
  });

  // Fetch pending GCash payments
  const { data: gcashPayments = [] } = useQuery<Donation[]>({
    queryKey: ["/api/gcash/pending"],
    enabled: isAuthenticated && (isAdmin || isOwner),
  });

  // Verify GCash payment mutation
  const verifyGCashMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/gcash/${id}/verify`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gcash/pending"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Payment Updated",
        description: "GCash payment status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update payment status.",
        variant: "destructive",
      });
    },
  });

  // Update message status mutation
  const updateMessageMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/contact/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Message Updated",
        description: "Message status has been updated.",
      });
    },
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  if (!isAuthenticated || (!isAdmin && !isOwner)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-dashboard-title">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {user?.username}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="destructive"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Donations</h3>
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground" data-testid="text-total-donations">
                {stats ? formatCurrency(stats.totalDonations) : '$0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Donors</h3>
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground" data-testid="text-donation-count">
                {stats?.donationCount || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Pending Messages</h3>
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground" data-testid="text-pending-messages">
                {stats?.pendingMessages || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">GCash Pending</h3>
                <Smartphone className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-foreground" data-testid="text-pending-gcash">
                {stats?.pendingGCashPayments || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <Tabs defaultValue="donations" className="w-full">
            <div className="border-b border-border px-6">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger value="donations" className="px-6 py-4" data-testid="tab-donations">
                  Donations
                </TabsTrigger>
                <TabsTrigger value="messages" className="px-6 py-4" data-testid="tab-messages">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="gcash" className="px-6 py-4" data-testid="tab-gcash">
                  GCash Verification
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Donations Tab */}
            <TabsContent value="donations" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Donations</h2>
                <Button data-testid="button-export-donations">Export Data</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-donations">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Donor</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Method</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id} className="border-b border-border" data-testid={`donation-row-${donation.id}`}>
                        <td className="py-4">
                          <div>
                            <div className="font-medium text-foreground">
                              {donation.isAnonymous ? "Anonymous" : donation.donorName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {!donation.isAnonymous && donation.donorEmail}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-foreground">{formatCurrency(donation.amount)}</td>
                        <td className="py-4">
                          <Badge variant="outline" className="capitalize">
                            {donation.paymentMethod}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge 
                            variant={donation.paymentStatus === "completed" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {donation.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {formatDate(donation.createdAt!)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {donations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="text-no-donations">
                    No donations found.
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Contact Messages</h2>
                <Button data-testid="button-mark-all-read">Mark All Read</Button>
              </div>
              <div className="space-y-4" data-testid="messages-container">
                {messages.map((message) => (
                  <Card key={message.id} className={message.status === "unread" ? "border-primary/20 bg-primary/5" : ""}>
                    <CardContent className="p-4" data-testid={`message-${message.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {message.firstName} {message.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {message.email} • {message.inquiryType}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(message.createdAt!)}
                          </span>
                          {message.status === "unread" && (
                            <Badge variant="secondary" className="text-xs">Unread</Badge>
                          )}
                        </div>
                      </div>
                      <h4 className="font-medium text-foreground mb-2">{message.subject}</h4>
                      <p className="text-foreground mb-3">{message.message}</p>
                      <div className="flex space-x-3">
                        <Button 
                          size="sm"
                          data-testid={`button-reply-${message.id}`}
                        >
                          Reply
                        </Button>
                        {message.status === "unread" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateMessageMutation.mutate({ id: message.id, status: "read" })}
                            data-testid={`button-mark-read-${message.id}`}
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="text-no-messages">
                    No messages found.
                  </div>
                )}
              </div>
            </TabsContent>

            {/* GCash Verification Tab */}
            <TabsContent value="gcash" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">GCash Payment Verification</h2>
                <Button data-testid="button-refresh-gcash">Refresh</Button>
              </div>
              <div className="space-y-4" data-testid="gcash-payments-container">
                {gcashPayments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-4" data-testid={`gcash-payment-${payment.id}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-foreground">
                              {formatCurrency(payment.amount)}
                            </h3>
                            <Badge variant="outline" className="text-accent">
                              {payment.paymentStatus}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">Reference:</span>
                              <span className="font-mono text-foreground ml-1">
                                {payment.referenceNumber || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Sender:</span>
                              <span className="text-foreground ml-1">
                                {payment.senderNumber || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Donor:</span>
                              <span className="text-foreground ml-1">
                                {payment.isAnonymous ? "Anonymous" : payment.donorName}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Date:</span>
                              <span className="text-foreground ml-1">
                                {formatDate(payment.createdAt!)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              size="sm"
                              onClick={() => verifyGCashMutation.mutate({ id: payment.id, status: "verified" })}
                              disabled={verifyGCashMutation.isPending}
                              data-testid={`button-verify-${payment.id}`}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify Payment
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => verifyGCashMutation.mutate({ id: payment.id, status: "rejected" })}
                              disabled={verifyGCashMutation.isPending}
                              data-testid={`button-reject-${payment.id}`}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {gcashPayments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="text-no-gcash-payments">
                    No pending GCash payments found.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
