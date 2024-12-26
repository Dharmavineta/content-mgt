"use client";
import { useAiStore } from "@/store";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Posts = () => {
  const { aiContent } = useAiStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <Card className="max-w-4xl mx-auto bg-white shadow-lg">
        <CardHeader className="border-b border-gray-100 bg-white">
          <h1 className="text-2xl font-semibold text-gray-800">
            AI Generated Content
          </h1>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <MDEditor.Markdown
              source={aiContent}
              className="min-h-[200px] max-h-[70vh] overflow-y-auto"
              style={{
                backgroundColor: "transparent",
                color: "inherit",
                fontFamily: "inherit",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Posts;
