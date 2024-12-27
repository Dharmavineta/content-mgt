import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: "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",
});

export const tavilyAnswer = async (question: string) => {
  const response = await tvly.searchQNA("Latest news on OpenAI", {});

  console.log(response);
};

console.log(await tavilyAnswer("What's the latest news on OpenAI?"));
