import React from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <div className="relative my-6">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search for apps, games, developers..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
      />
    </div>
  );
};