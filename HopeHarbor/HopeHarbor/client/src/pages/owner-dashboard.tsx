import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Mail, Smartphone, LogOut, Settings, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Donation, ContactMessage } from "@shared/schema";

export default function OwnerDashboard() {
  const { user, isAuthenticated, isOwner, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated || !isOwner) {
      setLocation("/");
    }
  }, [isAuthenticated, isOwner, setLocation]);

  // Fetch admin stats
  const { data: stats } = useQuery<{
    totalDonations: number;
    donationCount: number;
    pendingMessages: number;
    pendingGCashPayments: number;
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated && isOwner,
  });

  // Fetch donations
  const { data: donations = [] } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
    enabled: isAuthenticated && isOwner,
  });

  // Fetch messages
  const { data: messages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: isAuthenticated && isOwner,
  });

  // Fetch pending GCash payments
  const { data: gcashPayments = [] } = useQuery<Donation[]>({
    queryKey: ["/api/gcash/pending"],
    enabled: isAuthenticated && isOwner,
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

  if (!isAuthenticated || !isOwner) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-owner-dashboard-title">
              Owner Dashboard
            </h1>
            <p className="text-muted-foreground">Complete system overview and management</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" data-testid="button-system-settings">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <Button 
              onClick={handleLogout}
              variant="destructive"
              data-testid="button-owner-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Donations</h3>
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground" data-testid="text-owner-total-donations">
                {stats ? formatCurrency(stats.totalDonations) : '$0.00'}
              </div>
              <p className="text-xs text-muted-foreground mt-2">All-time donations received</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Donors</h3>
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-foreground" data-testid="text-owner-donation-count">
                {stats?.donationCount || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Unique donation records</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Contact Messages</h3>
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground" data-testid="text-owner-pending-messages">
                {stats?.pendingMessages || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Requiring attention</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">GCash Pending</h3>
                <Smartphone className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-foreground" data-testid="text-owner-pending-gcash">
                {stats?.pendingGCashPayments || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Payment Methods Breakdown</h3>
                <BarChart className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {(() => {
                  const paymentMethods = donations.reduce((acc, donation) => {
                    acc[donation.paymentMethod] = (acc[donation.paymentMethod] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);

                  return Object.entries(paymentMethods).map(([method, count]) => (
                    <div key={method} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          method === 'stripe' ? 'bg-primary' : 
                          method === 'paypal' ? 'bg-blue-600' : 
                          'bg-blue-500'
                        }`}></div>
                        <span className="text-sm font-medium capitalize">{method}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{count} donations</span>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="space-y-3">
                {donations.slice(0, 5).map((donation) => (
                  <div key={donation.id} className="flex items-center space-x-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      donation.paymentStatus === 'completed' ? 'bg-secondary' : 'bg-accent'
                    }`}></div>
                    <span className="flex-1">
                      {donation.isAnonymous ? 'Anonymous' : donation.donorName} donated {formatCurrency(donation.amount)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(donation.createdAt!)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-border px-6">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger value="overview" className="px-6 py-4" data-testid="tab-overview">
                  System Overview
                </TabsTrigger>
                <TabsTrigger value="donations" className="px-6 py-4" data-testid="tab-owner-donations">
                  All Donations
                </TabsTrigger>
                <TabsTrigger value="messages" className="px-6 py-4" data-testid="tab-owner-messages">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="settings" className="px-6 py-4" data-testid="tab-settings">
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Database Status</span>
                        <Badge className="bg-secondary text-secondary-foreground">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Payment Systems</span>
                        <Badge className="bg-secondary text-secondary-foreground">All Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last Backup</span>
                        <span className="text-sm text-foreground">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" data-testid="button-export-all">
                        Export All Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-backup">
                        Create Backup
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-system-logs">
                        View System Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Donations Tab */}
            <TabsContent value="donations" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">All Donations</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" data-testid="button-filter-donations">Filter</Button>
                  <Button data-testid="button-export-donations-owner">Export</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-owner-donations">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Donor</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Method</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 text-xs font-mono text-muted-foreground">
                          {donation.id.slice(0, 8)}...
                        </td>
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
                        <td className="py-4 text-foreground font-medium">
                          {formatCurrency(donation.amount)}
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="capitalize">
                            {donation.paymentMethod}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge variant="secondary" className="capitalize">
                            {donation.donationType}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge 
                            variant={donation.paymentStatus === "completed" ? "default" : 
                                   donation.paymentStatus === "failed" ? "destructive" : "secondary"}
                            className="capitalize"
                          >
                            {donation.paymentStatus}
                          </Badge>
                        </td>
                        <td className="py-4 text-muted-foreground text-sm">
                          {formatDate(donation.createdAt!)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Contact Messages</h2>
                <Button data-testid="button-owner-mark-all-read">Mark All Read</Button>
              </div>
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className={message.status === "unread" ? "border-primary/20 bg-primary/5" : ""}>
                    <CardContent className="p-4">
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
                      {message.subscribeUpdates && (
                        <p className="text-xs text-muted-foreground mb-3">
                          ✓ Subscribed to updates
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="p-6">
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-foreground mb-6">System Settings</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Payment Settings</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-foreground">Stripe Integration</span>
                            <p className="text-sm text-muted-foreground">Credit card payments</p>
                          </div>
                          <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-foreground">PayPal Integration</span>
                            <p className="text-sm text-muted-foreground">PayPal payments</p>
                          </div>
                          <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-foreground">GCash Integration</span>
                            <p className="text-sm text-muted-foreground">Manual verification</p>
                          </div>
                          <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">Two-Factor Authentication</span>
                          <Button variant="outline" size="sm" data-testid="button-setup-2fa">
                            Setup
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">Session Timeout</span>
                          <span className="text-sm text-muted-foreground">24 hours</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
