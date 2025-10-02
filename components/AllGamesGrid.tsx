import React from 'react';
import type { Game } from '../types';
import { GameCard } from './GameCard';
import { SectionHeader } from './SectionHeader';

interface AllGamesGridProps {
  allGames: Game[];
  onDownloadClick: (game: Game) => void;
}

export const AllGamesGrid: React.FC<AllGamesGridProps> = ({ allGames, onDownloadClick }) => {
  return (
    <section id="games" className="py-6 my-8">
        <SectionHeader title="All Modded Apps" />
        <div className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3 md:grid-cols-4
        ">
          {allGames.map(game => (
            <GameCard key={game.id} game={game} onDownloadClick={onDownloadClick} />
          ))}
        </div>
    </section>
  );
};