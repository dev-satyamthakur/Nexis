import { useState } from 'react';
import { mockArticles } from '../../mocks/articleData';
import ArticleCard from '../../components/topicsPage/ArticleCard';
import { axiosInstance } from '../../config/axios';

function PopularArticlesSection() {
  const [selectedTopic, setSelectedTopic] = useState('Science');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(() => topicName);
    setCurrentPage(1);
  };

  // const fetchPopularArticlesByTopicName = (topicName: string) => {
  //   const response = await axiosInstance.get('');
  // };

  const filteredArticles = mockArticles;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="border rounded-lg p-2 space-y-2">
        {mockArticles.map((article, index) => (
          <div key={index}>
            <ArticleCard
              topic={article.topic}
              title={article.title}
              imageUrl={article.imageUrl}
              readTime={10}
              publishedDate="10 Oct"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PopularArticlesSection;
