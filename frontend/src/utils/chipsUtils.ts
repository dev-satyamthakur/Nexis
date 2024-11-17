type TopicColors = {
  primary: string;
  bg: string;
  indicatorColor: string;
};

const topicColorMap: Record<string, TopicColors> = {
  Physics: {
    primary: 'text-indigo-700',
    bg: 'bg-indigo-100',
    indicatorColor: 'bg-indigo-400',
  },
  Biology: {
    primary: 'text-green-700',
    bg: 'bg-green-100',
    indicatorColor: 'bg-green-400',
  },
  Space: {
    primary: 'text-blue-700',
    bg: 'bg-blue-100',
    indicatorColor: 'bg-blue-400',
  },
  Technology: {
    primary: 'text-purple-800',
    bg: 'bg-purple-200',
    indicatorColor: 'bg-purple-400',
  },
  'Artificial Intelligence': {
    primary: 'text-purple-700',
    bg: 'bg-purple-100',
    indicatorColor: 'bg-purple-400',
  },
  Philosophy: {
    primary: 'text-yellow-800',
    bg: 'bg-yellow-200',
    indicatorColor: 'bg-yellow-500',
  },
  Mathematics: {
    primary: 'text-red-700',
    bg: 'bg-red-100',
    indicatorColor: 'bg-red-400',
  },
  Chemistry: {
    primary: 'text-teal-700',
    bg: 'bg-teal-100',
    indicatorColor: 'bg-teal-400',
  },
  Psychology: {
    primary: 'text-pink-700',
    bg: 'bg-pink-100',
    indicatorColor: 'bg-pink-400',
  },
  Engineering: {
    primary: 'text-orange-700',
    bg: 'bg-orange-100',
    indicatorColor: 'bg-orange-400',
  },
};

export function getTopicColors(topic: string): TopicColors | undefined {
  return topicColorMap[topic];
}
