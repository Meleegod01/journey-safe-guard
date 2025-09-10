import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, User, Phone, MapPin, Calendar, Building, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  fullName: string;
  age: string;
  phoneNumber: string;
  phoneVerified: boolean;
  profilePicture: string;
  destination: string;
  nationality: "indian" | "non-indian" | "";
  documentNumber: string;
  stayDays: string;
  hotelName: string;
  hotelRegistration: string;
}

const UserProfileForm = ({ onComplete }: { onComplete: () => void }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    age: "",
    phoneNumber: "",
    phoneVerified: false,
    profilePicture: "",
    destination: "",
    nationality: "",
    documentNumber: "",
    stayDays: "",
    hotelName: "",
    hotelRegistration: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const verifyPhone = () => {
    toast({
      title: "OTP Sent",
      description: "Please check your phone for verification code",
    });
    // Simulate verification for demo
    setTimeout(() => {
      setProfileData(prev => ({ ...prev, phoneVerified: true }));
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.phoneVerified) {
      toast({
        title: "Phone Verification Required",
        description: "Please verify your phone number first",
      });
      return;
    }
    
    toast({
      title: "Profile Complete",
      description: "Your profile has been saved successfully",
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Provide your travel details for enhanced safety features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.profilePicture} />
                  <AvatarFallback>
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" size="sm">
                  Upload Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                  <Button
                    type="button"
                    onClick={verifyPhone}
                    variant={profileData.phoneVerified ? "success" : "outline"}
                    size="sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {profileData.phoneVerified ? "Verified" : "Verify"}
                  </Button>
                </div>
                {profileData.phoneVerified && (
                  <Badge variant="outline" className="text-success">
                    Phone number verified
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Travel Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Travel Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination of Travel *</Label>
                <Input
                  id="destination"
                  value={profileData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  placeholder="e.g., Goa, India"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Select
                  value={profileData.nationality}
                  onValueChange={(value) => handleInputChange("nationality", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="non-indian">Non-Indian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentNumber">
                  {profileData.nationality === "indian" ? "Aadhar Number" : "Passport Number"} *
                </Label>
                <Input
                  id="documentNumber"
                  value={profileData.documentNumber}
                  onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                  placeholder={
                    profileData.nationality === "indian"
                      ? "1234 5678 9012"
                      : "A12345678"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stayDays">Number of Days Staying *</Label>
                <Input
                  id="stayDays"
                  type="number"
                  value={profileData.stayDays}
                  onChange={(e) => handleInputChange("stayDays", e.target.value)}
                  placeholder="7"
                  min="1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Accommodation Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Accommodation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hotelName">Hotel Name *</Label>
                <Input
                  id="hotelName"
                  value={profileData.hotelName}
                  onChange={(e) => handleInputChange("hotelName", e.target.value)}
                  placeholder="Grand Palace Hotel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotelRegistration">Hotel Registered Under *</Label>
                <Input
                  id="hotelRegistration"
                  value={profileData.hotelRegistration}
                  onChange={(e) => handleInputChange("hotelRegistration", e.target.value)}
                  placeholder="Owner/Company name"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;