import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Shield, 
  AlertTriangle, 
  Navigation, 
  Star,
  Building2,
  Plus,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const { toast } = useToast();

  const handleSOS = () => {
    setIsSOSActive(true);
    toast({
      title: "SOS Activated",
      description: "Emergency services have been notified. Stay calm.",
    });
    
    // Reset after demonstration
    setTimeout(() => {
      setIsSOSActive(false);
    }, 3000);
  };

  const safetyData = [
    { area: "Beach Road", score: 8.5, color: "success" },
    { area: "Market Street", score: 6.2, color: "warning" },
    { area: "Old Town", score: 4.1, color: "danger" },
  ];

  const nearbyPlaces = [
    { name: "Police Station", distance: "0.5 km", type: "police" },
    { name: "City Hospital", distance: "1.2 km", type: "hospital" },
    { name: "Tourist Helpline", distance: "0.8 km", type: "help" },
  ];

  const touristSpots = [
    { name: "Golden Temple", rating: 4.8, distance: "2.1 km" },
    { name: "Heritage Museum", rating: 4.6, distance: "1.5 km" },
    { name: "Beach Plaza", rating: 4.3, distance: "0.9 km" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Map Section */}
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary-glow/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 mx-auto text-primary" />
            <p className="text-foreground font-medium">Interactive Map</p>
            <p className="text-sm text-muted-foreground">
              Current Location: Downtown Area
            </p>
            <Badge variant="outline" className="text-success">
              Safe Zone
            </Badge>
          </div>
        </div>
        
        {/* Location Button */}
        <Button
          size="sm"
          className="absolute top-4 right-4 bg-white/90 text-foreground hover:bg-white"
        >
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* SOS Button */}
        <Card className="border-danger/20 bg-gradient-to-r from-danger/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-danger">Emergency SOS</h3>
                <p className="text-sm text-muted-foreground">
                  Press and hold for 3 seconds to activate
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleSOS}
                className={`
                  rounded-full w-16 h-16 bg-danger hover:bg-danger/90 
                  ${isSOSActive ? 'animate-pulse-sos shadow-sos' : ''}
                `}
              >
                <Phone className="h-8 w-8" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Area Safety Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {safetyData.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{area.area}</p>
                  <p className="text-sm text-muted-foreground">Community Rating</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={area.color === "success" ? "outline" : "destructive"}
                    className={
                      area.color === "success" ? "text-success border-success" :
                      area.color === "warning" ? "text-warning border-warning bg-warning/10" :
                      "text-danger border-danger"
                    }
                  >
                    {area.score}/10
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nearby Emergency Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Emergency Services Nearby
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {place.type === "police" && <Shield className="h-4 w-4 text-primary" />}
                    {place.type === "hospital" && <Plus className="h-4 w-4 text-primary" />}
                    {place.type === "help" && <Phone className="h-4 w-4 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{place.name}</p>
                    <p className="text-sm text-muted-foreground">{place.distance}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Call
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tourist Attractions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Popular Tourist Spots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {touristSpots.map((spot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-full">
                    <Building2 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{spot.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{spot.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">• {spot.distance}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Navigate
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Unsafe Areas Warning */}
        <Card className="border-warning/20 bg-gradient-to-r from-warning/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Areas to Avoid</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Old Town area has reported safety concerns. Consider alternative routes.
                </p>
                <Button size="sm" variant="outline" className="mt-2 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;