import { useState } from "react";
import { Home, MessageSquare, FileText, IdCard, Settings, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const currentPageItem = navigation.find(item => item.id === currentPage);

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

      {/* Bottom Navigation Dropdown */}
      <nav className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between bg-background hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  {currentPageItem && (
                    <>
                      <currentPageItem.icon className="h-4 w-4" />
                      <span>{currentPageItem.label}</span>
                    </>
                  )}
                </div>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="top" 
              className="w-56 bg-popover border border-border shadow-lg z-50"
            >
              {navigation.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    currentPage === item.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;