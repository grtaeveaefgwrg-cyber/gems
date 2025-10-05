import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { Game } from './types';
import { GAMES } from './data/games';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { OfferBanner } from './components/OfferBanner';
import { FeaturedMods } from './components/FeaturedMods';
import { TrendingRightNow } from './components/TrendingRightNow';
import { AllGamesGrid } from './components/AllGamesGrid';
import { TrustBadges } from './components/TrustBadges';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { AnimatedBackground } from './components/AnimatedBackground';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(GAMES);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleRateGame = (gameId: string, starRating: number) => {
    setGames(prevGames =>
      prevGames.map(game => {
        if (game.id === gameId) {
          const newRatingCount = game.ratingCount + 1;
          // Convert 1-5 star rating to 0-10 scale for calculation
          const newRatingOnScale = starRating * 2;
          const newAverageRating =
            (game.rating * game.ratingCount + newRatingOnScale) / newRatingCount;
          
          return {
            ...game,
            rating: newAverageRating,
            ratingCount: newRatingCount,
          };
        }
        return game;
      })
    );
  };

  const filteredGames = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return games;
    return games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.publisher.toLowerCase().includes(query) ||
      game.short_desc.toLowerCase().includes(query)
    );
  }, [searchQuery, games]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-[2px]">
        <Header />
        <main className="container mx-auto px-4">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          <FeaturedMods
            games={games.slice(0, 10)}
            onDownloadClick={handleDownloadClick}
          />
          <OfferBanner />
          <AllGamesGrid
            allGames={filteredGames}
            onDownloadClick={handleDownloadClick}
          />
          <TrendingRightNow
            games={games.slice(10, 20)}
            onDownloadClick={handleDownloadClick}
          />
          <TrustBadges />
          <FAQ />
        </main>
        <Footer />
      </div>
      {selectedGame && createPortal(
          <DownloadModal 
            game={selectedGame} 
            onClose={handleCloseModal} 
            onRate={handleRateGame} 
          />,
          document.getElementById('modal-root')!
        )}
    </div>
  );
};

export default App;