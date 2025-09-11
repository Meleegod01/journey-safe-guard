import { useState, useEffect } from "react";
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import AuthPage from "@/components/AuthPage";
import UserProfileForm from "@/components/UserProfileForm";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AppState = "auth" | "profile" | "main";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentState, setCurrentState] = useState<AppState>("auth");
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          setCurrentState("profile");
        } else {
          setCurrentState("auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        setCurrentState("profile");
      } else {
        setCurrentState("auth");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = () => {
    // Auth state will be managed by the useEffect above
  };

  const handleProfileComplete = () => {
    setCurrentState("main");
  };

  const createTouristAccounts = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-tourist-accounts');
      
      if (error) {
        toast({
          title: "Error",
          description: `Failed to create tourist accounts: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Tourist accounts created successfully. Check console for credentials.",
        });
        console.log("Tourist credentials:", data.credentials);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tourist accounts.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentState === "auth" && (
        <div>
          <AuthPage onAuth={handleAuth} />
          <div className="fixed top-4 right-4">
            <Button 
              onClick={createTouristAccounts}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Create Tourist Accounts
            </Button>
          </div>
        </div>
      )}
      {currentState === "profile" && <UserProfileForm onComplete={handleProfileComplete} />}
      {currentState === "main" && <MainLayout />}
    </div>
  );
};

export default Index;
