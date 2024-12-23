import { storeArticleMapping } from "./services/articleTitleIdMappingDb";

interface Article {
  _id: string;
  title: string;
}

const articles: Article[] = [
  {
    _id: "6738659b99a9bce8a3989d13",
    title: "The Future of Quantum Computing",
  },
  {
    _id: "673866484a36d5e5907b4a7a",
    title: "Consciousness and Artificial Intelligence",
  },
  {
    _id: "673ba7a385c7c62270f29503",
    title: "Space Exploration with Humans",
  },
  {
    _id: "673ce468f1204a4bd39b124a",
    title: "Exploring the World of Python",
  },
  {
    _id: "673ce4daf1204a4bd39b124e",
    title: "The Rise of Quantum Computing",
  },
  {
    _id: "673ce501f1204a4bd39b1252",
    title: "AI and the Future of Healthcare",
  },
];

async function mapAllArticles() {
  console.log("Starting to map articles...");

  for (const article of articles) {
    await storeArticleMapping(article.title, article._id);
  }

  console.log("Finished mapping all articles");
}

// Execute the mapping
mapAllArticles().catch((error) => {
  console.error("Failed to map articles:", error);
  process.exit(1);
});
