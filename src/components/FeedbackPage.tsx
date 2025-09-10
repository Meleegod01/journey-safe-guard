import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Star, 
  Camera, 
  MapPin, 
  Users, 
  ShoppingBag,
  Building,
  Car,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackPage = () => {
  const [safetyScore, setSafetyScore] = useState([7]);
  const [selectedArea, setSelectedArea] = useState("");
  const [amenityRatings, setAmenityRatings] = useState({
    shops: [7],
    attractions: [8],
    petrolPumps: [6],
    stays: [7],
  });
  const [friendlinessLevel, setFriendlinessLevel] = useState([6]);
  const [feedbackText, setFeedbackText] = useState("");
  const [dangerDetails, setDangerDetails] = useState("");
  
  const { toast } = useToast();

  const areas = [
    "Beach Road",
    "Market Street", 
    "Old Town",
    "Hotel District",
    "Shopping Complex",
    "Tourist Quarter"
  ];

  const communityFeedback = [
    {
      area: "Beach Road",
      avgScore: 8.5,
      reviews: 45,
      lastUpdate: "2 hours ago"
    },
    {
      area: "Market Street", 
      avgScore: 6.2,
      reviews: 32,
      lastUpdate: "5 hours ago"
    },
    {
      area: "Old Town",
      avgScore: 4.1,
      reviews: 28,
      lastUpdate: "1 day ago"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedArea) {
      toast({
        title: "Area Required",
        description: "Please select the area you're providing feedback for",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for contributing to community safety!",
    });

    // Reset form
    setSelectedArea("");
    setSafetyScore([7]);
    setFriendlinessLevel([6]);
    setFeedbackText("");
    setDangerDetails("");
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Share Your Experience</h1>
          <p className="text-muted-foreground">
            Help fellow travelers by sharing safety insights about the areas you've visited
          </p>
        </div>

        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Submit Area Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Area Selection */}
              <div className="space-y-2">
                <Label htmlFor="area">Visited Area *</Label>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the area you visited" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Safety Score */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Overall Safety Score *</Label>
                  <div className="px-3 py-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Very Unsafe</span>
                      <span className="text-lg font-semibold text-primary">{safetyScore[0]}/10</span>
                      <span className="text-sm text-muted-foreground">Very Safe</span>
                    </div>
                    <Slider
                      value={safetyScore}
                      onValueChange={setSafetyScore}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Amenity Ratings */}
              <div className="space-y-4">
                <Label>Rate Available Amenities</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(amenityRatings).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {key === "shops" && <ShoppingBag className="h-4 w-4" />}
                        {key === "attractions" && <Star className="h-4 w-4" />}
                        {key === "petrolPumps" && <Car className="h-4 w-4" />}
                        {key === "stays" && <Building className="h-4 w-4" />}
                        <span className="text-sm font-medium capitalize">
                          {key === "petrolPumps" ? "Petrol Pumps" : key}
                        </span>
                        <span className="text-sm text-muted-foreground">({value[0]}/10)</span>
                      </div>
                      <Slider
                        value={value}
                        onValueChange={(newValue) => 
                          setAmenityRatings(prev => ({ ...prev, [key]: newValue }))
                        }
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* People Friendliness */}
              <div className="space-y-2">
                <Label>Local People Friendliness *</Label>
                <div className="px-3 py-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Unfriendly</span>
                    <span className="text-lg font-semibold text-primary">{friendlinessLevel[0]}/10</span>
                    <span className="text-sm text-muted-foreground">Very Friendly</span>
                  </div>
                  <Slider
                    value={friendlinessLevel}
                    onValueChange={setFriendlinessLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Danger Details */}
              {safetyScore[0] < 5 && (
                <div className="space-y-2">
                  <Label htmlFor="dangerDetails">Why is it dangerous? How to stay safe?</Label>
                  <Textarea
                    id="dangerDetails"
                    value={dangerDetails}
                    onChange={(e) => setDangerDetails(e.target.value)}
                    placeholder="Please describe specific safety concerns and precautions..."
                    className="min-h-[100px]"
                  />
                </div>
              )}

              {/* Additional Feedback */}
              <div className="space-y-2">
                <Label htmlFor="feedback">Additional Comments</Label>
                <Textarea
                  id="feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share any other insights about this area..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Upload Photos/Videos (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos or videos to support your feedback
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Community Feedback Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Safety Index
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityFeedback.map((feedback, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{feedback.area}</p>
                    <p className="text-sm text-muted-foreground">
                      {feedback.reviews} reviews • Updated {feedback.lastUpdate}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={
                    feedback.avgScore >= 7 ? "outline" :
                    feedback.avgScore >= 5 ? "secondary" : "destructive"
                  }
                  className={
                    feedback.avgScore >= 7 ? "text-success border-success" :
                    feedback.avgScore >= 5 ? "text-warning border-warning bg-warning/10" :
                    "text-danger border-danger"
                  }
                >
                  {feedback.avgScore}/10
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;