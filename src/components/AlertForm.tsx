import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Send, Loader2 } from "lucide-react";

interface AlertFormData {
  message: string;
  link: string;
  recipientType: string;
}

const AlertForm = () => {
  const [formData, setFormData] = useState<AlertFormData>({
    message: "",
    link: "",
    recipientType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof AlertFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePublish = async () => {
    // Validate form
    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Message is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.recipientType) {
      toast({
        title: "Validation Error", 
        description: "Please select a recipient type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Publishing alert:", formData);
      
      toast({
        title: "Alert Published!",
        description: "Your alert has been successfully sent to the selected recipients.",
      });

      // Reset form
      setFormData({
        message: "",
        link: "",
        recipientType: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-medium">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Alert Management</h1>
          <p className="text-muted-foreground">Create and publish custom alerts to your audience</p>
        </div>

        <Card className="shadow-large border-0">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl">Create New Alert</CardTitle>
            <CardDescription>
              Fill in the details below to create and publish a new alert
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Alert Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your alert message..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {formData.message.length}/500 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-sm font-medium">
                Link (Optional)
              </Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-sm font-medium">
                Recipient Type *
              </Label>
              <Select
                value={formData.recipientType}
                onValueChange={(value) => handleInputChange("recipientType", value)}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select recipient type" />
                </SelectTrigger>
                <SelectContent className="bg-card border shadow-medium">
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="audience">Audience</SelectItem>
                  <SelectItem value="site">Site Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                onClick={handlePublish}
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium h-12 text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publish Alert
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertForm;