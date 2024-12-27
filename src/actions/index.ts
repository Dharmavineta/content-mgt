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

// interface TavilySearchResponse {
//   results: any[];
// }

// export const tavilySearch = async (
//   query: string
// ): Promise<TavilySearchResponse | null> => {
//   const apiUrl = "https://api.tavily.com/search";

//   const requestBody = {
//     api_key: process.env.TAVILY_API_KEY as string,
//     query: query,
//     include_images: true,
//     search_depth: "advanced",
//     max_results: 3,
//     include_raw_content: true,
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       console.error(`HTTP error! status: ${response.status}`);
//       return null;
//     }

//     const data = (await response.json()) as TavilySearchResponse;

//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data from Tavily:", error);
//     return null;
//   }
// };

export const fetchNewsAPI = async () => {};
