
import React from 'react';
import { StarIcon } from './icons';

interface RatingStarsProps {
  rating: number; // A number from 0 to 10
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, className }) => {
  const stars = Math.round(rating / 2); // Convert 0-10 scale to 0-5 stars
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-4 h-4 ${
            index < stars ? 'text-yellow-400' : 'text-slate-600'
          }`}
        />
      ))}
      <span className="ml-2 text-xs font-bold text-slate-400">{(rating/2).toFixed(1)}</span>
    </div>
  );
};
