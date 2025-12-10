// hooks/usePageTitle.ts
import { useLocation } from "react-router-dom";

const prettify = (s: string) =>
  s
    .replace(/[-_]/g, " ") // dash / underscore → space
    .replace(/\b\w/g, (c) => c.toUpperCase()); // start-case

export const usePageTitle = () => {
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter(Boolean) // remove empty strings
    .map(prettify);

  return segments;
};
