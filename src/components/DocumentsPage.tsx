import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Trash2,
  IdCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([
    {
      id: "1",
      type: "aadhar",
      name: "Aadhar Card",
      filename: "aadhar_card.pdf",
      uploadDate: "2024-01-15",
      verified: true,
      encrypted: true,
    },
    {
      id: "2", 
      type: "passport",
      name: "Passport",
      filename: "passport_copy.pdf",
      uploadDate: "2024-01-12",
      verified: true,
      encrypted: true,
    },
  ]);

  const [showDetails, setShowDetails] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleDocumentVisibility = (docId: string) => {
    setShowDetails(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "Supabase integration required for secure file storage",
    });
  };

  const handleDownload = (filename: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${filename}...`,
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document Deleted",
      description: "Document has been securely removed",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Document Vault</h1>
          <p className="text-muted-foreground">
            Securely store and manage your travel documents
          </p>
        </div>

        {/* Security Notice */}
        <Alert className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            All documents are encrypted end-to-end and stored securely. Only you can access your files.
          </AlertDescription>
        </Alert>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Upload Identity Documents
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
                <Button onClick={handleFileUpload} className="bg-primary hover:bg-primary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>Recommended documents:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Aadhar Card / Passport (Identity proof)</li>
                <li>Visa (if applicable)</li>
                <li>Travel Insurance</li>
                <li>Hotel Bookings</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Stored Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IdCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.verified && (
                        <Badge variant="outline" className="text-success border-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {doc.encrypted && (
                        <Badge variant="outline" className="text-primary border-primary">
                          <Shield className="h-3 w-3 mr-1" />
                          Encrypted
                        </Badge>
                      )}
                    </div>
                  </div>

                  {showDetails.includes(doc.id) && (
                    <div className="pt-3 border-t border-muted space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Filename:</span>
                        <span className="font-mono">{doc.filename}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-success flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Secure
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Document content is encrypted and hidden for security
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleDocumentVisibility(doc.id)}
                    >
                      {showDetails.includes(doc.id) ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.filename)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                      className="text-danger hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    All documents are encrypted before upload
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    Stored in compliance with data protection laws
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium">Access Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Only you can view and download your files
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium">Password Protected</h4>
                  <p className="text-sm text-muted-foreground">
                    Re-authentication required for sensitive actions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsPage;