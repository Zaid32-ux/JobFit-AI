import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  Upload,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const HomePage = () => {
  const [showDemoNote, setShowDemoNote] = useState(true);
  useDocumentTitle("Home | AI Document Analyzer");
  useEffect(() => {
    const demoNoteSeen = localStorage.getItem("demoNoteSeen");
    if (demoNoteSeen === "true") {
      setShowDemoNote(false);
    }

  }, []);

  // Handle dismiss and store in localStorage
  const handleDismiss = () => {
    setShowDemoNote(false);
    localStorage.setItem("demoNoteSeen", "true");
  };


  return (
    <div className="max-w-screen w-full mx-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {showDemoNote && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-500">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 mb-1">
                  📋 Demo Project Notice
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  The information in this project is for demonstration purposes
                  only.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDismiss}
                    className="text-xs h-7 px-3"
                  >
                    Got it
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Document Intelligence</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Documents into Insights
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Upload any PDF or text document and get instant AI-powered
                summaries, key points extraction, sentiment analysis, and more.
                Save hours of reading time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <span>Start Analyzing Free</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    No credit card required
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    10 free analyses
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer hover:border-blue-400">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium mb-1">
                      Drop your document here
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF or TXT, up to 10MB
                    </p>
                  </div>

                  {/* Sample Analysis Preview */}
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-1">
                            AI Summary
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            This document discusses artificial intelligence and
                            its impact on modern business operations...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="w-full">
                          <p className="text-sm font-semibold text-gray-800 mb-1">
                            Sentiment: Positive
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-green-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                            </div>
                            <span className="text-xs text-gray-600">85%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">30s</p>
                    <p className="text-xs text-gray-600">Avg. Analysis Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Documents Analyzed" },
              { value: "10K+", label: "Active Users" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
