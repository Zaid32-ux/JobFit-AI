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

    </>
  );
}
