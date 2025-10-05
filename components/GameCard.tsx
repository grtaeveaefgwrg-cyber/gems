import React from 'react';
import type { Game } from '../types';
import { StarIcon, CheckCircleIcon, DownloadIcon, StorageIcon } from './icons';

interface GameCardProps {
  game: Game;
  onDownloadClick: (game: Game) => void;
  variant?: 'full' | 'compact';
}

const formatSize = (mb: number) => {
    if (mb >= 1000) {
        return `${(mb / 1000).toFixed(1)} GB`;
    }
    return `${Math.round(mb)} MB`;
};

export const GameCard: React.FC<GameCardProps> = ({ game, onDownloadClick, variant = 'full' }) => {

  if (variant === 'compact') {
    return (
      <article className="h-full">
        <a 
          href="#download" 
          onClick={(e) => { e.preventDefault(); onDownloadClick(game); }} 
          className="block group bg-slate-800/50 rounded-2xl overflow-hidden ring-1 ring-white/5 h-full"
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={game.cover_url}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-2">
                <h3 className="text-white font-semibold text-xs leading-snug">{game.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span className="font-bold text-slate-300 text-[11px]">{(game.rating / 2).toFixed(1)}</span>
                </div>
            </div>
        </a>
      </article>
    );
  }

  return (
    <article className="bg-slate-800/50 rounded-2xl overflow-hidden flex flex-col ring-1 ring-white/5 h-full">
        <a href="#download" onClick={(e) => { e.preventDefault(); onDownloadClick(game); }} className="block group">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={game.cover_url.replace('/533', '/400')}
                    alt={game.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
        </a>
      <div className="p-2 sm:p-2.5 flex flex-col flex-grow">
        <div className="flex items-start gap-2">
            <h3 className="text-white font-semibold text-sm leading-tight flex-grow">{game.title}</h3>
            <CheckCircleIcon className="w-4 h-4 text-primary-500 flex-shrink-0 mt-px" />
        </div>
        <p className="text-xs text-slate-400 mt-0.5">by {game.publisher}</p>
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 min-h-[32px] flex-grow">{game.short_desc}</p>
        
        <div className="flex items-center justify-between text-slate-400 text-xs mt-2.5">
            <div className="flex items-center gap-2 font-semibold">
              {game.platforms.slice(0, 2).map(platform => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-1">
              <StorageIcon className="w-3.5 h-3.5 text-primary-400" />
              <span className="font-semibold text-xs">{formatSize(game.size_mb)}</span>
            </div>
            <div className="flex items-center gap-1">
                <StarIcon className="w-3 h-3 text-yellow-400" />
                <span className="font-bold text-slate-300 text-xs">{(game.rating/2).toFixed(1)}</span>
            </div>
        </div>

        <button 
          onClick={() => onDownloadClick(game)}
          className="mt-3 w-full bg-primary-600 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-sm hover:bg-primary-500 transition-colors"
        >
          <DownloadIcon className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>
    </article>
  );
};