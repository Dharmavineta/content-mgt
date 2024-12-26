"use client";
import React, { useEffect } from "react";
import NewsSearch from "./components/news-search";
import NewsCard from "./components/news-card";
import { Button } from "@/components/ui/button";
import { generateSocialPost } from "@/actions";

export type GNewsResponse = {
  totalArticles: number;
  articles: GNewsArticle[];
};

export type GNewsArticle = {
  title: string;
  description: string;
  content?: string; // Optional property, might not be available depending on subscription
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

const Dashboard = () => {
  const [news, setNews] = React.useState<GNewsArticle[]>([]); // Properly typed state

  useEffect(() => {
    const storedNews = localStorage.getItem("news-articles");
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    }
  }, []);

  return (
    <div>
      <div className="h-4" />
      <div className="justify-center flex">
        <NewsSearch setNews={setNews} />
      </div>
      <div className="h-4" />

      {news.length > 0 ? (
        <div className="px-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex text-muted-foreground text-sm justify-center w-full px-5 h-[500px] items-center">
          <p>No articles found. Try searching for something!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
