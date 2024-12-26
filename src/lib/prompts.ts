import { GNewsArticle } from "@/app/(protected)/dashboard/page";

export const generateFacebookPrompt = (article: GNewsArticle) => {
  return `Write an engaging Facebook post about the following news article:

Headline: ${article.title}
Summary: ${article.description}
Source: ${article.source.name}
Link: ${article.url}

Include relevant emojis and hashtags. Encourage discussion.`;
};

export const generateTwitterPrompt = (article: GNewsArticle) => {
  return `Write a concise and attention-grabbing tweet about this news article:

Headline: ${article.title}
Summary: ${article.description}
Source: ${article.source.name}
Link: ${article.url}

Include relevant hashtags.`;
};

export const generateLinkedInPrompt = (article: GNewsArticle) => {
  return `Write a professional and insightful LinkedIn post about this news article:

Headline: ${article.title}
Summary: ${article.description}
Source: ${article.source.name}
Link: ${article.url}

Focus on the professional implications and encourage thoughtful discussion.`;
};

export const generateInstagramPrompt = (article: GNewsArticle) => {
  return `Write an engaging Instagram caption for a post about this news article:

Headline: ${article.title}
Summary: ${article.description}
Source: ${article.source.name}

Suggest relevant hashtags. Keep it relatively short and engaging.`;
};

export const generateBlogPrompt = (article: GNewsArticle) => {
  return `Write an SEO-optimized blog post based on the following information:

Title: ${article.title}
Content Summary: ${article.description}
Original Source: ${article.source.name}
Original Article URL: ${article.url}

The blog post should be well-structured with headings and subheadings. Focus on providing value to the reader and include relevant keywords naturally within the text for search engine optimization.`;
};
