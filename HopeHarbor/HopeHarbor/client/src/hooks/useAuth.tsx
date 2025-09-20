import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  sessionId: string | null;
  login: (username: string, password: string, portal?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on load
    const storedSessionId = localStorage.getItem("sessionId");
    const storedUser = localStorage.getItem("user");
    
    if (storedSessionId && storedUser) {
      setSessionId(storedSessionId);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, portal?: string): Promise<boolean> => {
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password,
        portal
      });
      
      const data = await response.json();
      
      setUser(data.user);
      setSessionId(data.sessionId);
      
      // Store in localStorage
      localStorage.setItem("sessionId", data.sessionId);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user.username}!`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (sessionId) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}` 
          },
          credentials: "include",
        });
      }
    } catch (error) {
      // Silent fail on logout API call
    } finally {
      setUser(null);
      setSessionId(null);
      localStorage.removeItem("sessionId");
      localStorage.removeItem("user");
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const value: AuthContextType = {
    user,
    sessionId,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isOwner: user?.role === "owner",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
