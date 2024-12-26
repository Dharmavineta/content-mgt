import { create } from "zustand";
type props = {
  aiContent: string;
  setAiContent: (content: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const useAiStore = create<props>((set, get) => ({
  aiContent: "",
  isLoading: false,
  error: null,
  setAiContent: (content: string) => set({ aiContent: content }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error: error }),
}));
