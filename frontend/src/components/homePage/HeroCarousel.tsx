import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { ArticleItem } from '../../interfaces/articlelItem';
import { carouselItems as mockData } from '../../mocks/carouselData';
import { formatDate } from '../../utils/dateUtils';
import { DotLoader } from 'react-spinners';

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [carouselItems, setCarouselItems] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length,
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimating(false), 700); // Duration matches CSS transition
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get(`/api/articles`);
        setCarouselItems(response.data.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setCarouselItems(mockData); // Set to mock data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container">
      {isLoading ? (
        <div className="flex justify-center items-center h-56">
          <DotLoader color="#6B4DE6" />
        </div>
      ) : (
        <div id="carousel" className="relative w-full">
          {/* Carousel wrapper */}
          <div className="relative mt-4 h-56 overflow-hidden rounded-xl md:h-[50vh]">
            {carouselItems.length === 0 ? (
              <p>No items available</p>
            ) : (
              carouselItems.map((item, index) => (
                <Link
                  key={item._id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    currentSlide === index
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0'
                  }`}
                  to={`/article/${item._id}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
                  {/* Title, Published Date, and Read Time */}
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white m-2">
                    <h2 className="text-3xl mb-1 font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-sm">
                      {formatDate(item.postDate)} &bull; {item.readTime} min
                      read
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {carouselItems.map((item, index) => (
              <button
                key={item._id}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-primary-300' : 'bg-gray-100'
                }`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>

          {/* Previous Button */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
            onClick={handlePrev}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white/40 group-hover:bg-white/50 dark:group-hover:bg-gray-100/70">
              <svg
                className="w-4 h-4 text-white dark:text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1L1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white/40 group-hover:bg-white/50 dark:group-hover:bg-gray-100/70">
              <svg
                className="w-4 h-4 text-white dark:text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
