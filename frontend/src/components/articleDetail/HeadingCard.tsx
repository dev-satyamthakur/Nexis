import React, { useEffect, useState } from 'react';
import TopicChips from '../TopicChips';
import { Heart } from 'lucide-react';
import { axiosInstance } from '../../config/axios';
import { refreshAuthToken } from '../../utils/authUtils';
import { useAuth0 } from '@auth0/auth0-react';

interface IHeadingCard {
  articleId: string;
  topic: string;
  title: string;
  imageUrl: string;
  publishedDate: string;
  readTime: number; // in minutes
}

const HeadingCard: React.FC<IHeadingCard> = ({
  articleId,
  topic,
  imageUrl,
  title,
  publishedDate,
  readTime,
}) => {
  const [liked, setLiked] = useState(false); // State to track if liked
  const [showPopover, setShowPopover] = useState(false); // State to control popover visibility
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { logout } = useAuth0();

  const checkIfLikedByUser = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axiosInstance.get(
        `/api/favorite/check/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLiked(response.data.isFavorite);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        try {
          // Retry the original request with the new token
          const newToken = await refreshAuthToken();
          const retryResponse = await axiosInstance.get(
            `/api/favorite/check/${articleId}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            },
          );
          setLiked(retryResponse.data.isFavorite);
        } catch (refreshErr) {
          console.error('Error refreshing token:', refreshErr);
          // Handle refresh token failure (e.g., redirect to login)
        }
      } else {
        console.error('Error liking article:', err);
      }
    }
  };

  const handleLike = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!jwtToken || !refreshToken) {
      logout({
        logoutParams: {
          returnTo: `${window.location.origin}`,
        },
      });
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 2000);
      return;
    }

    try {
      setLiked(!liked);
      const token = localStorage.getItem('jwtToken');
      await axiosInstance.post(
        `/api/favorite`,
        { articleId: articleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err: any) {
      // Check if error is due to unauthorized access (401)
      if (err.response?.status === 401) {
        try {
          // Retry the original request with the new token
          const newToken = await refreshAuthToken();

          const retryResponse = await axiosInstance.post(
            `/api/favorite`,
            { articleId: articleId },
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            },
          );
          setLiked(retryResponse.data.isLiked);
        } catch (refreshErr) {
          console.error('Error refreshing token:', refreshErr);
          // Handle refresh token failure (e.g., redirect to login)
        }
      } else {
        console.error('Error liking article:', err);
      }
    }
  };

  const toggleLike = async () => {
    await handleLike();
    setShowPopover(true); // Show the popover
    setTimeout(() => setShowPopover(false), 2000); // Hide popover after 2 seconds
  };

  useEffect(() => {
    checkIfLikedByUser();
  }, [articleId]);

  return (
    <>
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <p className="text-lg font-semibold mb-4">Please login first</p>
          </div>
        </div>
      )}
      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-20 h-80 max-w-full mx-auto sm:px-8 sm:pb-8 sm:pt-40 sm:h-96">
        <img
          src={imageUrl}
          alt="University of Southern California"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <div className="z-10">
          <TopicChips topic={topic} />
        </div>
        <h3 className="z-10 mt-2 text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h3>
        <div className="flex flex-col sm:flex-row justify-between lg:items-end sm:items-start">
          <div className="flex z-10 gap-x-2 font-normal overflow-hidden text-sm leading-6 text-gray-300 sm:gap-x-3">
            <div>{publishedDate}</div>
            <p>&#8226;</p>
            <div>{readTime} min read</div>
          </div>
          <div className="flex flex-row-reverse sm:flex-row justify-end items-center z-10 mt-2 sm:mt-0">
            {showPopover && (
              <div className={`text-white text-sm ml-2 mr-2 transition-all`}>
                {liked ? 'Added to your favorites' : 'Removed from favorites'}
              </div>
            )}
            <div
              onClick={toggleLike}
              className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                liked ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <Heart color={liked ? 'white' : 'black'} size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingCard;
