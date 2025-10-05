import React, { useState, useMemo } from 'react';
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
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const filteredGames = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return GAMES;
    return GAMES.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.publisher.toLowerCase().includes(query) ||
      game.short_desc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-[2px]">
        <Header />
        <main className="container mx-auto px-4">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          <FeaturedMods
            games={GAMES.slice(0, 10)}
            onDownloadClick={handleDownloadClick}
          />
          <OfferBanner />
          <AllGamesGrid
            allGames={filteredGames}
            onDownloadClick={handleDownloadClick}
          />
          <TrendingRightNow
            games={GAMES.slice(10, 20)}
            onDownloadClick={handleDownloadClick}
          />
          <TrustBadges />
          <FAQ />
        </main>
        <Footer />
        {selectedGame && <DownloadModal game={selectedGame} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default App;