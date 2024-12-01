import { formatDate } from '../../utils/dateUtils';
import TopicChips from '../TopicChips';

interface IRelatedArticlesCard {
  topic: string;
  title: string;
  publishedDate: number;
  imageUrl: string;
  readingTime: number; // in minutes
}

const RelatedArticlesCard: React.FC<IRelatedArticlesCard> = (props) => {
  const { topic, title, publishedDate, imageUrl, readingTime } = props;

  return (
    <div className="max-w-sm bg-gray-100 h-full hover:cursor-pointer rounded-2xl overflow-hidden">
      <div className="px-4 mt-4">
        <img
          src={imageUrl}
          alt="heading"
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>
      <div className="px-4 mt-4">
        <TopicChips topic={topic} backgroundColor={false} />
      </div>
      <div className="px-4 mb-4">
        <h2 className="text-xl mt-2 font-semibold text-gray-800">{title}</h2>
        <div className="flex space-x-2 mt-2 items-center font-normal text-sm">
          <p>{formatDate(publishedDate)}</p>
          <p>&#8226;</p>
          <p>{readingTime} min Read</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticlesCard;
