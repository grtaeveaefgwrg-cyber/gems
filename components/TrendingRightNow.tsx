import React, { useEffect, useRef, useState } from 'react';
import type { Game } from '../types';
import { TrendingCard } from './TrendingCard';
import { SectionHeader } from './SectionHeader';

interface TrendingRightNowProps {
  games: Game[];
  onDownloadClick: (game: Game) => void;
}

export const TrendingRightNow: React.FC<TrendingRightNowProps> = ({ games, onDownloadClick }) => {
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
    <section id="trending" className="my-8">
        <SectionHeader title="Trending Right Now" />
        <div className="relative -mx-4">
            <div
              ref={scrollerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex gap-4 overflow-x-auto pb-4 px-4 [--ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {duplicatedGames.map((game, index) => (
                    <div key={`${game.id}-${index}`} className="flex-shrink-0 w-80 sm:w-96">
                        <TrendingCard game={game} onDownloadClick={onDownloadClick} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};