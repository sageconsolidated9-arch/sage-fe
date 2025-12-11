import { useState } from "react";

export const useSidebarCounts = () => {
  /* TODO: replace with SWR / React-Query / Zustand fetch */
  const [rulesCount] = useState(12); // mock

  // Return counts for different routes
  return {
    rules: rulesCount,
  };
};
