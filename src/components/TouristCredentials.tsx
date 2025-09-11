import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TouristCredentials = () => {
  const expectedCredentials = [
    { name: "John Smith", email: "john.smith@travelsafe.com", password: "American2024!" },
    { name: "Priya Patel", email: "priya.patel@travelsafe.com", password: "Indian2024!" },
    { name: "Emily Johnson", email: "emily.johnson@travelsafe.com", password: "British2024!" },
    { name: "Hans Mueller", email: "hans.mueller@travelsafe.com", password: "German2024!" },
    { name: "Yuki Tanaka", email: "yuki.tanaka@travelsafe.com", password: "Japanese2024!" },
    { name: "Sarah Wilson", email: "sarah.wilson@travelsafe.com", password: "Australian2024!" },
    { name: "Michael Brown", email: "michael.brown@travelsafe.com", password: "Canadian2024!" },
    { name: "Marie Dubois", email: "marie.dubois@travelsafe.com", password: "French2024!" },
    { name: "Rajesh Kumar", email: "rajesh.kumar@travelsafe.com", password: "Indian2024!" },
    { name: "Kim Min-jun", email: "kim.min-jun@travelsafe.com", password: "South Korean2024!" }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Tourist Account Credentials</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {expectedCredentials.map((cred, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
              <div>
                <strong>{cred.name}</strong>
              </div>
              <div className="text-sm font-mono">{cred.email}</div>
              <div className="text-sm font-mono">{cred.password}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TouristCredentials;