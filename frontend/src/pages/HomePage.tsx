import HeroCarousel from '../components/homePage/HeroCarousel';
import TopicsTabLayout from '../layouts/homePage/TopicsTabLayout';
import MostLikedArticlesCard from '../components/homePage/MostLikedArticlesCard';
import { useEffect } from 'react';

function HomePage() {
  useEffect(() => {
    document.title = 'NEXIS';
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <HeroCarousel />
      </div>
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 mt-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Left section - Topics and Articles (spans 2 columns) */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-neutral-600 pb-4">
              Popular Topics
            </div>
            <TopicsTabLayout />
          </div>

          {/* Right section - Most Liked Articles */}
          <div className="lg:col-span-1">
            <MostLikedArticlesCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
