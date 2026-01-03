import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FootprintIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-yellow-600 transform -rotate-45"
  >
    <path d="M4 16v-2.38c0-1.47 1.2-2.62 2.67-2.62h1.26c.56 0 1.07.22 1.44.6L10 12l-2.35 2.94c-.37.46-.95.7-1.54.7H4.5C4.22 15.64 4 15.86 4 16Z" />
    <path d="M10 16.12V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.33c0-.56-.22-1.07-.6-1.44L12 10l-1.48 1.85c-.38.47-.6 1.05-.6 1.63v.26c0 .4.14.78.38 1.08L10 16.12Z" />
    <path d="M17.5 10.75c-.55 0-1 .45-1 1V14c0 .55.45 1 1 1h1.5c.55 0 1-.45 1-1v-2.25c0-.55-.45-1-1-1h-1.5Z" />
    <path d="M20 8.88V5c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v3.33c0 .56.22 1.07.6 1.44L18 12l1.48-1.85c.38-.47.6-1.05.6-1.63v-.26a1.4 1.4 0 0 0-.38-1.08L20 8.88Z" />
  </svg>
);

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex items-center px-4 py-2 space-x-2 text-sm text-yellow-800 bg-yellow-100 bg-opacity-50 rounded-full">
      <Link to="/" className="font-bold hover:text-yellow-900">
        Campfire
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={name}>
            <FootprintIcon />
            {isLast ? (
              <span className="font-semibold text-yellow-900">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-yellow-900">
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
