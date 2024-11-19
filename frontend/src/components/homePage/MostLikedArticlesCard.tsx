import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArticleItem } from '../../interfaces/articlelItem';
import { axiosInstance } from '../../config/axios';
import { formatDate } from '../../utils/dateUtils';

function MostLikedArticlesCard() {
  const [topArticles, setTopArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    const fetchTopArticles = async () => {
      const response = await axiosInstance.get('/api/articles/top');
      setTopArticles(response.data.data);
    };
    fetchTopArticles();
  }, []);

  return (
    <div className="bg-primary-400 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-neutral-50">
        Most Liked Articles
      </h2>
      <div className="text-neutral-50">
        {topArticles.map((article, index) => (
          <Link
            key={article._id}
            to={`/article/${article._id}`}
            className="block hover:bg-primary-500 rounded-lg p-4 transition duration-150"
          >
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-300 mr-4">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                <div className="flex items-center mt-2 text-sm font-medium text-neutral-400">
                  <span>{formatDate(article.postDate)}</span>
                  <span className="mx-2">·</span>
                  <span>{article.totalLikes} likes</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MostLikedArticlesCard;
