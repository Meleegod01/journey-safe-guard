import { useState } from "react";
import { Home, MessageSquare, FileText, IdCard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HomePage from "./HomePage";
import FeedbackPage from "./FeedbackPage";
import DocumentsPage from "./DocumentsPage";
import TravelIdPage from "./TravelIdPage";

type Page = "home" | "feedback" | "documents" | "travel-id" | "settings";

const MainLayout = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigation = [
    { id: "home", label: "Home", icon: Home },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "travel-id", label: "Travel ID", icon: IdCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "feedback":
        return <FeedbackPage />;
      case "documents":
        return <DocumentsPage />;
      case "travel-id":
        return <TravelIdPage />;
      case "settings":
        return <div className="p-6"><h1>Settings Page</h1></div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">TravelSafe</h1>
          <div className="text-sm opacity-90">
            Welcome back, Traveler
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(item.id as Page)}
                className={cn(
                  "flex-col gap-1 h-auto py-2 px-3 text-xs",
                  currentPage === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;