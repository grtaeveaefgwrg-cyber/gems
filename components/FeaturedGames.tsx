import React, { useEffect, useRef, useState } from 'react';
import type { Game } from '../types';
import { GameCard } from './GameCard';

interface FeaturedModsProps {
  games: Game[];
  onDownloadClick: (game: Game) => void;
}

const SectionHeader: React.FC<{title: string}> = ({ title }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <a href="#games" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
            View All →
        </a>
    </div>
);

export const FeaturedMods: React.FC<FeaturedModsProps> = ({ games, onDownloadClick }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Duplicate games for seamless looping effect
  const duplicatedGames = [...games, ...games];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scroll = () => {
      if (!isHovering) {
        // When the first half is scrolled out of view, reset to the beginning
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        } else {
          scroller.scrollLeft += 0.5; // Adjust speed here
        }
      }
      animationFrameId.current = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationFrameId.current = requestAnimationFrame(scroll);

    // Cleanup function
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovering]);

  return (
    <section id="featured" className="my-8">
        <SectionHeader title="Featured Mods" />
        <div className="relative -mx-4">
            <div
              ref={scrollerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex gap-4 overflow-x-auto pb-4 px-4 [--ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {duplicatedGames.map((game, index) => (
                    <div key={`${game.id}-${index}`} className="flex-shrink-0 w-36 sm:w-40">
                        {/* FIX: Removed unsupported 'variant' prop from GameCard. */}
                        <GameCard game={game} onDownloadClick={onDownloadClick} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};