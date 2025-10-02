import React from 'react';
import type { Game } from '../types';
import { StarIcon } from './icons';

interface TrendingCardProps {
  game: Game;
  onDownloadClick: (game: Game) => void;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ game, onDownloadClick }) => {
  return (
    <article className="h-full">
      <a 
        href="#download"
        onClick={(e) => { e.preventDefault(); onDownloadClick(game); }}
        className="flex h-full bg-slate-800/50 rounded-2xl overflow-hidden ring-1 ring-white/10 p-3 gap-4 group"
      >
        <div className="flex-shrink-0 w-20 h-20 relative">
          <img
            src={game.cover_url.replace('/533', '/400')}
            alt={game.title}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-white font-semibold text-base leading-tight">{game.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-slate-300 text-sm">{game.rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{game.short_desc}</p>
        </div>
      </a>
    </article>
  );
};