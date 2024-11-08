import { Link } from 'react-router-dom';

interface PopularArticle {
  id: number;
  title: string;
  likes: number;
  author: string;
}

function PopularArticlesCard() {
  const popularArticles: PopularArticle[] = [
    /* Mock data - replace with your actual data */
    {
      id: 1,
      title: 'Understanding the Basics of Quantum Computing',
      likes: 1234,
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Understanding the Basics of Quantum Computing',
      likes: 1234,
      author: 'John Doe',
    },
    {
      id: 3,
      title: 'Understanding the Basics of Quantum Computing',
      likes: 1234,
      author: 'John Doe',
    },
    // Add more articles...
  ];

  return (
    <div className="bg-primary-400 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-neutral-50">
        Most Liked Articles
      </h2>
      <div className="text-neutral-50">
        {popularArticles.map((article, index) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="block hover:bg-primary-500 rounded-lg p-4 transition duration-150"
          >
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-300 mr-4">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                <div className="flex items-center mt-2 text-sm text-neutral-400">
                  <span>{article.author}</span>
                  <span className="mx-2">·</span>
                  <span>{article.likes} likes</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularArticlesCard;
