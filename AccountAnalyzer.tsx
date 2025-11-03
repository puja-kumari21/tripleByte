import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AnalysisResults } from "./AnalysisResults";

export const AccountAnalyzer = () => {
  const [platform, setPlatform] = useState<string>("");
  const [accountUrl, setAccountUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!platform || !accountUrl) {
      toast.error("Please select a platform and enter an account URL");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis (in real implementation, this would call an AI service)
    setTimeout(() => {
      const mockResults = {
        platform,
        accountUrl,
        isFake: Math.random() > 0.5,
        confidenceScore: Math.floor(Math.random() * 30) + 70,
        indicators: {
          profileAge: Math.random() > 0.5 ? "Suspicious" : "Normal",
          postingPattern: Math.random() > 0.5 ? "Suspicious" : "Normal",
          followerRatio: Math.random() > 0.5 ? "Suspicious" : "Normal",
          contentQuality: Math.random() > 0.5 ? "Suspicious" : "Normal",
          engagementRate: Math.random() > 0.5 ? "Suspicious" : "Normal",
        },
        timestamp: new Date().toISOString(),
      };
      
      setAnalysisData(mockResults);
      setShowResults(true);
      setIsAnalyzing(false);
      toast.success("Analysis complete");
    }, 2000);
  };

  return (
    <section id="analyzer" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Account Analysis Tool</h2>
            <p className="text-muted-foreground text-lg">
              Enter a social media account URL to analyze its authenticity
            </p>
          </div>

          <Card className="p-8 shadow-xl bg-gradient-card border-border">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-foreground font-medium">
                  Select Platform
                </Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform" className="bg-background">
                    <SelectValue placeholder="Choose a social media platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter / X</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountUrl" className="text-foreground font-medium">
                  Account URL or Handle
                </Label>
                <Input
                  id="accountUrl"
                  placeholder="https://www.instagram.com/username or @username"
                  value={accountUrl}
                  onChange={(e) => setAccountUrl(e.target.value)}
                  className="bg-background"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Account...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Account
                  </>
                )}
              </Button>
            </div>
          </Card>

          {showResults && analysisData && (
            <div className="mt-8">
              <AnalysisResults data={analysisData} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
