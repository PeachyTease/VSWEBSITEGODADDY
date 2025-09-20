import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Users, CreditCard, Wallet, Smartphone, X, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertDonationSchema } from "@shared/schema";
import { z } from "zod";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayPalButton from "@/components/PayPalButton";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const donationFormSchema = insertDonationSchema.extend({
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number",
  }),
  donationType: z.enum(["one-time", "monthly", "sponsorship"]),
  paymentMethod: z.enum(["stripe", "paypal", "gcash"]),
});

type DonationFormData = z.infer<typeof donationFormSchema>;

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram?: string | null;
}

function StripePaymentForm({ 
  onSuccess, 
  formData, 
  isProcessing, 
  setIsProcessing 
}: {
  onSuccess: (paymentIntentId: string) => void;
  formData: DonationFormData;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Create payment intent
      const paymentIntentResponse = await apiRequest("POST", "/api/create-payment-intent", {
        amount: formData.amount,
        currency: "USD",
      });

      const { clientSecret } = await paymentIntentResponse.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.donorName,
            email: formData.donorEmail,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess(result.paymentIntent.id);
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Payment could not be processed",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border border-input rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#374151',
                '::placeholder': {
                  color: '#9CA3AF',
                },
              },
            },
          }}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!stripe || isProcessing}
        className="w-full"
        data-testid="button-confirm-stripe-payment"
      >
        {isProcessing ? "Processing..." : `Donate $${formData.amount}`}
      </Button>
    </div>
  );
}

export default function DonationModal({ isOpen, onClose, selectedProgram }: DonationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      currency: "USD",
      donationType: selectedProgram === "sponsorship" ? "sponsorship" : "one-time",
      paymentMethod: "stripe",
      isAnonymous: false,
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (selectedProgram === "sponsorship") {
      setValue("donationType", "sponsorship");
      setSelectedAmount(39);
      setValue("amount", "39");
    }
  }, [selectedProgram, setValue]);

  const createDonationMutation = useMutation({
    mutationFn: (data: DonationFormData & { stripePaymentIntentId?: string; paypalOrderId?: string }) =>
      apiRequest("POST", "/api/donations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Thank You!",
        description: "Your donation has been received and will make a real difference.",
      });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount.toString());
  };

  const handlePayPalSuccess = (paypalOrderId: string) => {
    const donationData = {
      ...watchedValues,
      paypalOrderId,
      paymentStatus: "completed",
    };
    createDonationMutation.mutate(donationData);
  };

  const handleStripeSuccess = (paymentIntentId: string) => {
    const donationData = {
      ...watchedValues,
      stripePaymentIntentId: paymentIntentId,
      paymentStatus: "completed",
    };
    createDonationMutation.mutate(donationData);
  };

  const handleGCashSubmit = () => {
    if (!watchedValues.referenceNumber || !watchedValues.senderNumber) {
      toast({
        title: "Missing Information",
        description: "Please provide both reference number and your GCash number.",
        variant: "destructive",
      });
      return;
    }

    const donationData = {
      ...watchedValues,
      paymentStatus: "pending",
    };
    createDonationMutation.mutate(donationData);
  };

  const onSubmit = (data: DonationFormData) => {
    if (data.paymentMethod === "gcash") {
      handleGCashSubmit();
    }
    // Stripe and PayPal are handled by their respective components
  };

  const predefinedAmounts = watchedValues.donationType === "sponsorship" 
    ? [39, 78, 117, 156] 
    : [25, 50, 100, 250];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-donation">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Make a Donation
            </DialogTitle>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-donation-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Your donation helps provide essential support to children and communities in need.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Donation Amount */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3">Donation Amount</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 border rounded-lg text-center transition-colors ${
                    selectedAmount === amount
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  }`}
                  data-testid={`button-amount-${amount}`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">$</span>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter custom amount"
                {...register("amount")}
                className={errors.amount ? "border-destructive" : ""}
                data-testid="input-custom-amount"
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Donation Type */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3">Donation Type</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "one-time", icon: Heart, label: "One-time", desc: "Single donation" },
                { value: "monthly", icon: Calendar, label: "Monthly", desc: "Recurring gift" },
                { value: "sponsorship", icon: Users, label: "Sponsorship", desc: "Support a child" },
              ].map((type) => (
                <label key={type.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={type.value}
                    {...register("donationType")}
                    className="sr-only"
                    data-testid={`radio-type-${type.value}`}
                  />
                  <div className={`py-4 px-6 border rounded-lg text-center transition-colors ${
                    watchedValues.donationType === type.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  }`}>
                    <type.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{type.label}</div>
                    <div className="text-sm text-muted-foreground">{type.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3">Payment Method</Label>
            <div className="space-y-3">
              {[
                { 
                  value: "stripe", 
                  icon: CreditCard, 
                  label: "Credit/Debit Card", 
                  desc: "Secure payment via Stripe",
                  badges: ["VISA", "MC"] 
                },
                { 
                  value: "paypal", 
                  icon: Wallet, 
                  label: "PayPal", 
                  desc: "Fast and secure PayPal payment",
                  badges: ["PayPal"] 
                },
                { 
                  value: "gcash", 
                  icon: Smartphone, 
                  label: "GCash", 
                  desc: "Mobile payment for Philippines",
                  badges: ["GCash"] 
                },
              ].map((method) => (
                <label key={method.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={method.value}
                    {...register("paymentMethod")}
                    className="sr-only"
                    data-testid={`radio-payment-${method.value}`}
                  />
                  <div className={`payment-method flex items-center p-4 border rounded-lg transition-all ${
                    watchedValues.paymentMethod === method.value ? "selected" : ""
                  }`}>
                    <div className="flex items-center space-x-3 flex-1">
                      <method.icon className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-semibold">{method.label}</div>
                        <div className="text-sm text-muted-foreground">{method.desc}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {method.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Donor Information */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Donor Information</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="donorName">Full Name</Label>
                <Input
                  id="donorName"
                  {...register("donorName")}
                  className={errors.donorName ? "border-destructive" : ""}
                  data-testid="input-donor-name"
                />
                {errors.donorName && (
                  <p className="text-sm text-destructive mt-1">{errors.donorName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="donorEmail">Email Address</Label>
                <Input
                  id="donorEmail"
                  type="email"
                  {...register("donorEmail")}
                  className={errors.donorEmail ? "border-destructive" : ""}
                  data-testid="input-donor-email"
                />
                {errors.donorEmail && (
                  <p className="text-sm text-destructive mt-1">{errors.donorEmail.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAnonymous"
                {...register("isAnonymous")}
                className="rounded border-border"
                data-testid="checkbox-anonymous"
              />
              <Label htmlFor="isAnonymous" className="text-sm text-muted-foreground">
                Make this donation anonymous
              </Label>
            </div>
          </div>

          {/* Payment Details */}
          {watchedValues.paymentMethod === "stripe" && stripePromise && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Details</h3>
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  onSuccess={handleStripeSuccess}
                  formData={watchedValues}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>
            </div>
          )}

          {watchedValues.paymentMethod === "paypal" && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">PayPal Payment</h3>
              <div className="bg-muted rounded-lg p-6 text-center">
                <PayPalButton
                  amount={watchedValues.amount || "0"}
                  currency="USD"
                  intent="CAPTURE"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  You will be redirected to PayPal to complete your donation
                </p>
              </div>
            </div>
          )}

          {watchedValues.paymentMethod === "gcash" && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">GCash Payment Instructions</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Send payment to:</h4>
                    <div className="space-y-1 text-blue-700">
                      <p>GCash Number: <span className="font-mono font-semibold">09123456789</span></p>
                      <p>Account Name: <span className="font-semibold">Hands With Care Foundation</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    placeholder="Enter GCash reference number"
                    {...register("referenceNumber")}
                    data-testid="input-gcash-reference"
                  />
                </div>
                <div>
                  <Label htmlFor="senderNumber">Your GCash Number</Label>
                  <Input
                    id="senderNumber"
                    placeholder="09XXXXXXXXX"
                    {...register("senderNumber")}
                    data-testid="input-gcash-sender"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={createDonationMutation.isPending}
                data-testid="button-submit-gcash"
              >
                {createDonationMutation.isPending ? "Submitting..." : `Submit Donation - $${watchedValues.amount || 0}`}
              </Button>
            </div>
          )}

          {/* Submit Button for non-GCash methods */}
          {watchedValues.paymentMethod !== "stripe" && watchedValues.paymentMethod !== "gcash" && (
            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground text-center mb-3">
                Your donation is secure and helps us continue our mission to empower children and communities.
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
