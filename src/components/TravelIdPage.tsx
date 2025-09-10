import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  IdCard, 
  QrCode, 
  Shield, 
  Eye, 
  EyeOff, 
  Copy, 
  Share, 
  Clock,
  Lock,
  Fingerprint,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TravelIdPage = () => {
  const [showTravelId, setShowTravelId] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [password, setPassword] = useState("");
  const [shareExpiry, setShareExpiry] = useState("24");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { toast } = useToast();

  // Mock blockchain ID - in real app this would come from backend
  const travelId = "TID-BLK-4F7A9C2E8D1B6533A90F2E7C4B8D5A92";
  const qrCodeData = `travelsafe://verify/${travelId}`;

  const handleAuthenticate = () => {
    if (password === "demo123") {
      setIsAuthenticated(true);
      setShowTravelId(true);
      toast({
        title: "Access Granted",
        description: "Your Travel ID is now visible",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter your login password",
      });
    }
  };

  const copyTravelId = () => {
    navigator.clipboard.writeText(travelId);
    toast({
      title: "Copied",
      description: "Travel ID copied to clipboard",
    });
  };

  const generateShareLink = () => {
    toast({
      title: "Share Link Generated",
      description: `Temporary access link valid for ${shareExpiry} hours`,
    });
  };

  const regenerateId = () => {
    toast({
      title: "ID Regenerated", 
      description: "A new Travel ID has been generated on the blockchain",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Travel Blockchain ID</h1>
          <p className="text-muted-foreground">
            Your unique, secure digital identity for travel verification
          </p>
        </div>

        {/* Security Notice */}
        <Alert className="border-primary/20 bg-primary/5">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Your Travel ID is protected by blockchain technology and requires password authentication to view.
          </AlertDescription>
        </Alert>

        {/* Authentication Card */}
        {!isAuthenticated && (
          <Card className="border-warning/20 bg-gradient-to-r from-warning/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Lock className="h-5 w-5" />
                Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Enter your login password to view your Travel ID
              </p>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  onKeyPress={(e) => e.key === "Enter" && handleAuthenticate()}
                />
              </div>
              <Button onClick={handleAuthenticate} className="w-full bg-primary hover:bg-primary/90">
                <Fingerprint className="h-4 w-4 mr-2" />
                Authenticate
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo password: demo123
              </p>
            </CardContent>
          </Card>
        )}

        {/* Travel ID Display */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IdCard className="h-5 w-5" />
                  Your Travel ID
                </div>
                <Badge variant="outline" className="text-success border-success">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-card p-6 rounded-lg border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Travel ID</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTravelId(!showTravelId)}
                    >
                      {showTravelId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {showTravelId ? (
                    <div className="font-mono text-sm bg-muted/50 p-3 rounded break-all">
                      {travelId}
                    </div>
                  ) : (
                    <div className="bg-muted/50 p-3 rounded">
                      <span className="text-muted-foreground">••••••••••••••••••••••••••••••••••••••••</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyTravelId}
                      disabled={!showTravelId}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy ID
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={regenerateId}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>

              {/* ID Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Generated:</span>
                  <p className="font-medium">Jan 15, 2024</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Expires:</span>
                  <p className="font-medium">Jan 15, 2025</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Blockchain:</span>
                  <p className="font-medium">Ethereum</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium text-success">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* QR Code Section */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code for Authorities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Show this QR code to hotels, authorities, or other verification points
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                {showQrCode ? (
                  <div className="bg-white p-4 rounded-lg border-2 border-muted">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-primary" />
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                    <div className="text-center">
                      <QrCode className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">QR Code Hidden</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowQrCode(!showQrCode)}
                  >
                    {showQrCode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showQrCode ? "Hide QR" : "Show QR"}
                  </Button>
                  <Button variant="outline" disabled={!showQrCode}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Temporary Sharing */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5" />
                Temporary Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Generate a temporary link to share your Travel ID with authorities
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Link expires in (hours)</Label>
                  <Input
                    id="expiry"
                    type="number"
                    value={shareExpiry}
                    onChange={(e) => setShareExpiry(e.target.value)}
                    placeholder="24"
                    min="1"
                    max="72"
                  />
                </div>
                
                <Button onClick={generateShareLink} className="w-full" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Generate Temporary Link
                </Button>
              </div>

              <Alert className="border-warning/20 bg-warning/5">
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Shared links automatically expire and can be revoked at any time for security.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TravelIdPage;