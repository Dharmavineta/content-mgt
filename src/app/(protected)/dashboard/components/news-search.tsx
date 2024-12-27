import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { GNewsArticle } from "../page";
import { fetchNews } from "@/actions";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Wand2 } from "lucide-react";

type NewsSearchProps = {
  setNews: (news: GNewsArticle[]) => void;
};

type NewsSourceType = "Gnews" | "NewsApi";

const NewsSearch: React.FC<NewsSearchProps> = ({ setNews }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsSource, setNewsSource] = useState<NewsSourceType>("Gnews");
  console.log(newsSource);

  const handleSubmit = async () => {
    if (input.trim().length === 0) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Fetching News...");

      const data = await fetchNews(input);
      toast.dismiss();
      toast.success("News fetched successfully");

      if (data && data.articles) {
        localStorage.setItem("news-articles", JSON.stringify(data.articles));

        setNews(data.articles);
      } else {
        setNews([]);
        localStorage.removeItem("news-articles"); // Remove stored data if no articles found
        toast.error("No articles found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-x-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search News"
          className="min-w-[400px]"
        />
        <div className="flex gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={loading}>
                News Source
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select News Source</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={newsSource}
                onValueChange={(value) =>
                  setNewsSource(value as NewsSourceType)
                }
              >
                <DropdownMenuRadioItem value="Gnews">
                  Gnews
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="NewsApi">
                  News API
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button disabled={loading} size={"sm"} onClick={handleSubmit}>
            Search
          </Button>

          <Button
            onClick={() => {
              localStorage.removeItem("news-articles");
              setNews([]);
            }}
            variant={"outline"}
            size={"sm"}
          >
            Clear Cache
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsSearch;
