import React, { useEffect, useState } from 'react';
import { ISection } from '../../pages/ArticleDetail';

interface ArticleNavigationProps {
  sections: ISection[]; // Array of sections
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      }
    });
  };

  const scrollToSection = (id: string) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="sticky top-4">
      <h2 className="text-lg font-semibold">In this article</h2>
      <ul className="mt-2 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            className="flex items-center"
            onClick={() => scrollToSection(section.id)}
          >
            <span
              className={`w-2 h-8 rounded-md mr-2 ${
                activeSection === section.id
                  ? 'bg-primary-400'
                  : 'bg-primary-100'
              }`}
            ></span>
            <div
              className={`block w-full text-left p-2 rounded ${
                activeSection === section.id
                  ? ' text-primary-400 font-bold'
                  : 'text-primary-400'
              }`}
            >
              {section.title}
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default ArticleNavigation;
