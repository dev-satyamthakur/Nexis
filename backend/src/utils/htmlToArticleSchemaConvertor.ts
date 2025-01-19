import { JSDOM } from "jsdom";
import { IArticle, IArticleSection } from "../models/Article";

export function convertHtmlToArticle(
  htmlString: string,
  imageUrl: string, // Now required as a parameter
  articleTitle: string,
  author: number = 1,
  totalLikes: number = 0
): Partial<IArticle> {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const container = document.querySelector(".container");
  if (!container) throw new Error("Container not found");

  // Extract sections
  const sections = container.querySelectorAll("section");
  const articleSections: IArticleSection[] = [];

  // Process each section
  sections.forEach((section: Element) => {
    const id = section.getAttribute("id") || "";
    const heading = section.querySelector("h2")?.textContent || "";

    // Clone the section to manipulate it
    const sectionClone = section.cloneNode(true) as HTMLElement;

    // Remove the heading from the clone as it's stored separately
    const headingElement = sectionClone.querySelector("h2");
    if (headingElement) {
      headingElement.remove();
    }

    // Get the remaining HTML content (now including images)
    const body = sectionClone.innerHTML.trim();

    articleSections.push({
      id,
      heading,
      body,
    });
  });

  // Extract the main title from the first section
  const title = document.querySelector("h2")?.textContent || "";

  // Calculate approximate read time (assuming 200 words per minute)
  const text = document.body.textContent || "";
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  // Extract topics from headings
  const topics = Array.from(document.querySelectorAll("h2"))
    .map((heading) => heading.textContent?.trim() || "")
    .filter(Boolean);

  topics[0] = "Space"; // Ensure the first topic is always "Space"

  // Create the article object
  const article: Partial<IArticle> = {
    title: articleTitle,
    body: articleSections,
    imageUrl, // Ensure this is included
    author,
    totalLikes,
    postDate: Date.now(),
    readTime,
    topics,
  };

  return article;
}
