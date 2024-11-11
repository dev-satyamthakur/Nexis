import React from 'react';
import { getTopicColors } from '../utils/chipsUtils';

interface ITopicChips {
  topic: string;
  backgroundColor?: boolean;
}

const TopicChips: React.FC<ITopicChips> = ({
  topic,
  backgroundColor = true,
}) => {
  const topicColors = getTopicColors(topic);
  return (
    <div
      className={`inline-flex items-center transition-all space-x-2 ${backgroundColor ? topicColors?.bg : 'bg-white'} text-sm font-normal px-2 py-1 rounded-full`}
    >
      <span
        className={`w-3 h-3 rounded-full ${topicColors?.indicatorColor}`}
      ></span>
      <span className={`${topicColors?.primary} pr-2`}>{topic}</span>
    </div>
  );
};

export default TopicChips;
