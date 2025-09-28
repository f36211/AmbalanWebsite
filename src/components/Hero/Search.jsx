import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchData } from '../../data/searchData';

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredResults = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative">
      <div
        className={`flex items-center bg-white/20 rounded-full transition-all duration-300 ${
          isFocused ? 'w-64' : 'w-48'
        }`}
      >
        <SearchIcon className="w-5 h-5 mx-3 text-white" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
          <div className="p-2">
            {results.map((result) => (
              <a
                key={result.url}
                href={result.url}
                className="flex items-center p-2 text-[#5c0b08] hover:bg-gradient-to-r hover:from-[#903d04] hover:to-[#5c0b08] hover:text-white rounded-lg transition-all duration-200"
              >
                <img src={result.imageUrl} alt={result.title} className="w-12 h-12 object-cover rounded-md mr-4" />
                <div>
                  <div className="font-semibold">{result.title}</div>
                  <div className="text-sm text-gray-500">{result.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
