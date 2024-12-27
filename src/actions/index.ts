"use server";

import { GNewsArticle } from "@/app/(protected)/dashboard/page";
import { PlatformType } from "@/lib/db/schema";
import { generateText, streamText } from "ai";
import {
  generateBlogPrompt,
  generateFacebookPrompt,
  generateInstagramPrompt,
  generateLinkedInPrompt,
  generateTwitterPrompt,
} from "@/lib/prompts";
import { auth } from "@clerk/nextjs/server";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

const model = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY as string,
});

export const fetchNews = async (query: string) => {
  const apiKey = process.env.GNEWS_API_KEY; // Ensure this is exposed in the client if running client-side
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

export async function generateSocialPost(
  article: GNewsArticle,
  platform: PlatformType
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let prompt = "";

  switch (platform) {
    case "facebook":
      prompt = generateFacebookPrompt(article);
      break;
    case "twitter":
      prompt = generateTwitterPrompt(article);
      break;
    case "linkedin":
      prompt = generateLinkedInPrompt(article);
      break;
    case "instagram":
      prompt = generateInstagramPrompt(article);
      break;
    case "blog":
      prompt = generateBlogPrompt(article);
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
  const result = await generateText({
    model: google("gemini-2.0-flash-exp"),
    prompt,
  });

  return result.text;
}
