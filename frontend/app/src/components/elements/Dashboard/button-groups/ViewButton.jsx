import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Target,
  FileText,
  Briefcase,
  View,
} from "lucide-react";
import { toast } from "sonner";
import { getDoc } from "@/utils/document";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function ViewButton({ doc }) {
  const [loading, setLoading] = useState(false);
  const [docData, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  const handleView = async () => {
    try {
      setLoading(true);
      const res = await getDoc(doc);

      if (res?.analysis?.summary) {
        res.analysis.summary = res.analysis.summary.replace(/\s+/g, " ");
      }

      if (res?.analysis) {
        setData(res);
        setIsOpen(true); 
        toast.success(res?.message || "Data retrieved successfully");
      } else {
        toast.error("No Data Available.");
        setIsOpen(false);
      }
    } catch (err) {
      toast.error("Failed to get data");
      console.error(err);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const hasResumeAnalysis =
    docData?.analysis?.resumeScore !== undefined &&
    docData?.analysis?.resumeScore !== null;

  return (
    <>
      <Button
        size="sm"
        className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2"
        onClick={handleView}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Viewing...</span>
          </>
        ) : (
          <>
            <View className="h-4 w-4" />
            <span className="hidden md:inline">View</span>
          </>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[85%] max-h-[90vh] overflow-hidden p-0">
          <div className="border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
            <DialogTitle className="text-2xl font-bold mb-2">
              {docData?.originalName || "Document Preview"}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {docData?.jobDescription
                ? "Resume Analysis Against Job Description"
                : "Document Analysis & Insights"}
            </p>
            {docData?.analysis?.processedAt && (
              <p className="text-xs text-muted-foreground mt-2">
                Analyzed: {formatDate(docData.analysis.processedAt)}
              </p>
            )}
          </div>

          <div
            className="p-6 overflow-y-auto"
            style={{ maxHeight: "calc(90vh - 140px)" }}
          >
            {!docData ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading content...</p>
                </div>
              </div>
            ) : (
              <Tabs
                defaultValue={hasResumeAnalysis ? "resume-score" : "summary"}
                className="w-full"
              >
                <TabsList className="mb-6 w-full justify-start flex-wrap h-auto gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  {docData.analysis && (
                    <>
                      {hasResumeAnalysis && (
                        <>
                          {docData?.jobDescription && (
                            <TabsTrigger
                              value="job-description"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Briefcase className="h-4 w-4" />
                              Job Description
                            </TabsTrigger>
                          )}
                          <TabsTrigger
                            value="resume-score"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <TrendingUp className="h-4 w-4" />
                            Resume Score
                          </TabsTrigger>
                          <TabsTrigger
                            value="matching-skills"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Matching Skills
                          </TabsTrigger>
                          <TabsTrigger
                            value="skill-gaps"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <AlertCircle className="h-4 w-4" />
                            Skill Gaps
                          </TabsTrigger>
                          <TabsTrigger
                            value="recommendations"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Target className="h-4 w-4" />
                            Recommendations
                          </TabsTrigger>
                        </>
                      )}
                      <TabsTrigger value="summary" className="cursor-pointer">
                        Summary
                      </TabsTrigger>
                      <TabsTrigger value="keyPoints" className="cursor-pointer">
                        Key Points
                      </TabsTrigger>
                      <TabsTrigger value="sentiment" className="cursor-pointer">
                        Sentiment
                      </TabsTrigger>
                      <TabsTrigger value="keywords" className="cursor-pointer">
                        Keywords
                      </TabsTrigger>
                      <TabsTrigger value="questions" className="cursor-pointer">
                        Questions
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>

              
                    </TabsContent>
                  </div>
                )}
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
