export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};
