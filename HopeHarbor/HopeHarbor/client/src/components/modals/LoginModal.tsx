import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  portal: z.enum(["", "admin", "owner"]).optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      portal: "",
    }
  });

  const watchedPortal = watch("portal");

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.username, data.password, data.portal);
    if (success) {
      onClose();
      reset();
      
      // Redirect based on portal selection
      if (data.portal === "admin" || data.portal === "owner") {
        setLocation("/admin-dashboard");
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-testid="modal-login">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Sign In
            </DialogTitle>
            <button 
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-login-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Access your account to manage donations and track impact.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username")}
              className={errors.username ? "border-destructive" : ""}
              data-testid="input-username"
            />
            {errors.username && (
              <p className="text-sm text-destructive mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={errors.password ? "border-destructive" : ""}
              data-testid="input-password"
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="portal">Portal</Label>
            <Select onValueChange={(value) => setValue("portal", value as any)}>
              <SelectTrigger data-testid="select-portal">
                <SelectValue placeholder="General Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">General Access</SelectItem>
                <SelectItem value="admin">Admin Portal</SelectItem>
                <SelectItem value="owner">Owner Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            data-testid="button-sign-in"
          >
            Sign In
          </Button>

          {/* Demo credentials info */}
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Owner: owner / owner123</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
