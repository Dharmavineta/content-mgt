"use client";
import React, { useState } from "react";
import { GNewsArticle } from "../page";
import Link from "next/link";
import {
  ExternalLink,
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";
import { PlatformType } from "@/lib/db/schema";
import { generateSocialPost } from "@/actions";
import { useAiStore } from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type NewsCardProps = {
  article: GNewsArticle;
};

type Platform = {
  name: PlatformType;
  icon: React.ReactNode;
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<
    PlatformType | "Select Platform"
  >("Select Platform");

  const [isLoading, setIsLoading] = useState(false);

  const { setAiContent } = useAiStore();
  const router = useRouter();

  const platforms: Platform[] = [
    { name: "facebook", icon: <Facebook className="h-4 w-4" /> },
    { name: "twitter", icon: <Twitter className="h-4 w-4" /> },
    { name: "linkedin", icon: <Linkedin className="h-4 w-4" /> },
    { name: "instagram", icon: <Instagram className="h-4 w-4" /> },
    { name: "blog", icon: <Globe className="h-4 w-4" /> },
  ];

  const handlePlatformSelect = (platform: PlatformType) => {
    setSelectedPlatform(platform);
    setIsDropdownOpen(false);
  };

  const handleGeneratePost = async () => {
    if (selectedPlatform === "Select Platform") {
      alert("Please select a platform first");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Generating Post...");
      const result = await generateSocialPost(article, selectedPlatform);
      toast.dismiss();
      toast.success("Posts Generated Successfully");
      setAiContent(result);
      router.push("/posts");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-visible flex flex-col h-full max-w-sm">
      <div className="relative">
        {article.image && (
          <div className="relative pt-[56.25%]">
            <img
              src={article.image}
              alt={article.title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
            />
          </div>
        )}
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-1.5" />
          Read More
        </Link>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {article.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {article.description}
        </p>

        <p className="text-xs text-gray-400">
          Published by {article.source.name} on{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="p-4 border-t border-gray-100 flex gap-2 bg-white rounded-b-lg">
        <div className="relative flex-1">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="flex items-center">
              {selectedPlatform === "Select Platform" ? (
                <span>Select Platform</span>
              ) : (
                <>
                  {platforms.find((p) => p.name === selectedPlatform)?.icon}
                  <span className="ml-2">{selectedPlatform}</span>
                </>
              )}
            </span>
            <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute left-0 bottom-full mb-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                <div className="py-1">
                  {platforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => handlePlatformSelect(platform.name)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-3">{platform.icon}</span>
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <Button
          disabled={isLoading}
          onClick={handleGeneratePost}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? <p>Generating... </p> : <p>Generate Post</p>}{" "}
        </Button>
      </div>
    </div>
  );
};

export default NewsCard;
