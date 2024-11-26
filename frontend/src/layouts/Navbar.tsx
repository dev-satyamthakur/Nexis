import { Link } from 'react-router-dom';
import LoginButton from '../components/loginComponents/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/loginComponents/LogoutButton';
import { useState, useRef, useEffect } from 'react';
import { CircleUserRound } from 'lucide-react';

function Navbar() {
  const { user, isAuthenticated } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-neutral-100 shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <a
              href="#"
              className="text-2xl sm:text-3xl font-space_grotesk font-bold text-primary-400"
            >
              NEXIS
            </a>
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-500"
            >
              <span className="block w-6 h-0.5 bg-neutral-500 mb-1"></span>
              <span className="block w-6 h-0.5 bg-neutral-500 mb-1"></span>
              <span className="block w-6 h-0.5 bg-neutral-500"></span>
            </button>
          </div>
          <div className={`hidden md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center">
              <div className="space-x-4">
                <Link
                  to="/"
                  onClick={() => {
                    setShowDropdown(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-primary-600 transition-colors"
                  >
                    Home
                  </a>
                </Link>
                <Link
                  to="/topics"
                  onClick={() => {
                    setShowDropdown(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-primary-600 transition-colors"
                  >
                    Topics
                  </a>
                </Link>
                <a
                  onClick={() => {
                    setShowDropdown(false);
                    setIsMenuOpen(false);
                  }}
                  className="text-neutral-500 hover:text-primary-600 transition-colors"
                >
                  Favorites
                </a>
              </div>
              <div className="ml-4 lg:ml-8 space-x-3 lg:space-x-6">
                {isAuthenticated ? (
                  <div className="relative" ref={dropdownRef}>
                    {user?.picture ? (
                      <div>
                        <img
                          src={user?.picture}
                          alt="Profile"
                          className="w-10 h-10 rounded-full cursor-pointer"
                          title={user?.name || 'User profile'}
                          onClick={() => setShowDropdown(!showDropdown)}
                          loading="eager"
                          decoding="async"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const sibling = e.currentTarget.nextElementSibling;
                            if (sibling)
                              (sibling as HTMLElement).style.display = 'block';
                          }}
                        />
                        <CircleUserRound
                          className="w-10 h-10 cursor-pointer text-neutral-500 hidden"
                          onClick={() => setShowDropdown(!showDropdown)}
                        />
                      </div>
                    ) : (
                      <CircleUserRound
                        className="w-10 h-10 cursor-pointer text-neutral-500"
                        onClick={() => setShowDropdown(!showDropdown)}
                      />
                    )}
                    {showDropdown && (
                      <div className="absolute right-0 mt-3 w-64 bg-neutral-50 rounded-b-lg shadow-xl py-2 z-20">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="font-semibold text-gray-700">
                            {user?.name}
                          </p>
                        </div>
                        <div className="mt-2 mx-2">
                          <LogoutButton />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <LoginButton />
                    <button className="h-10 rounded-xl bg-primary-400 hover:text-white px-6 transition-colors">
                      <div className="text-white font-semibold text-sm">
                        Getting Started
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              onClick={() => {
                setShowDropdown(false);
                setIsMenuOpen(false);
              }}
            >
              <a className="text-neutral-500 hover:text-primary-600 transition-colors">
                Home
              </a>
            </Link>
            <Link
              to="/topics"
              onClick={() => {
                setShowDropdown(false);
                setIsMenuOpen(false);
              }}
            >
              <a className="text-neutral-500 hover:text-primary-600 transition-colors">
                Topics
              </a>
            </Link>
            <a
              onClick={() => {
                setShowDropdown(false);
                setIsMenuOpen(false);
              }}
              className="text-neutral-500 hover:text-primary-600 transition-colors"
            >
              Favorites
            </a>
            {isAuthenticated && (
              <div className="px-4 py-2 border-t border-gray-200">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-semibold text-gray-700">{user?.name}</p>
                <LogoutButton />
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex items-center space-x-6">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
