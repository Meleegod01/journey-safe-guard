import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import UserProfileForm from "@/components/UserProfileForm";
import MainLayout from "@/components/MainLayout";

type AppState = "auth" | "profile" | "main";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("auth");

  const handleAuth = () => {
    setCurrentState("profile");
  };

  const handleProfileComplete = () => {
    setCurrentState("main");
  };

  return (
    <div className="min-h-screen">
      {currentState === "auth" && <AuthPage onAuth={handleAuth} />}
      {currentState === "profile" && <UserProfileForm onComplete={handleProfileComplete} />}
      {currentState === "main" && <MainLayout />}
    </div>
  );
};

export default Index;
