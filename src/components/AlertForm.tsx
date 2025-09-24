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
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-15 translate-y-48 -translate-x-48"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-elegant">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Alert Management</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Create and publish custom alerts to reach your audience instantly
          </p>
        </div>

        <Card className="shadow-elegant border-0 backdrop-blur-sm bg-card/80">
          <CardHeader className="pb-8 pt-8">
            <CardTitle className="text-2xl font-semibold text-center">Create New Alert</CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Craft your message and select your target audience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-semibold text-foreground">
                Alert Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your alert message..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="min-h-[140px] resize-none text-base leading-relaxed border-2 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {formData.message.length}/500 characters
                </p>
                {formData.message.length > 450 && (
                  <p className="text-sm text-destructive">Approaching character limit</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="link" className="text-base font-semibold text-foreground">
                Link (Optional)
              </Label>
              <Input
                id="link"
                type="url"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                className="text-base h-12 border-2 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-200"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="recipient" className="text-base font-semibold text-foreground">
                Recipient Type *
              </Label>
              <Select
                value={formData.recipientType}
                onValueChange={(value) => handleInputChange("recipientType", value)}
              >
                <SelectTrigger className="h-12 text-base border-2 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-200">
                  <SelectValue placeholder="Select recipient type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-2 shadow-large">
                  <SelectItem value="everyone" className="text-base py-3">Everyone</SelectItem>
                  <SelectItem value="audience" className="text-base py-3">Audience</SelectItem>
                  <SelectItem value="site" className="text-base py-3">Site Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-6">
              <Button
                onClick={handlePublish}
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-medium hover:shadow-large h-14 text-lg font-semibold rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Publishing Alert...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
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