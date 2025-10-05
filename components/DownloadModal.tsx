

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { Game, DownloadLink } from '../types';
import { XMarkIcon, DownloadIcon, PlayIcon, GearIcon, StarIcon, CheckCircleIcon } from './icons';

// Add locker script functions to the window object for TypeScript
declare global {
  interface Window {
    _uj?: () => void;
    // The locker script will call this global function upon completion.
    onLockerComplete?: (success: boolean) => void;
  }
}

// --- Cookie Helper Functions ---
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// --- Component ---
interface DownloadModalProps {
  game: Game;
  onClose: () => void;
  onRate: (gameId: string, rating: number) => void;
}

type ModalView = 'idle' | 'processing' | 'completed' | 'pending' | 'fallback';

const installationSteps = [
  "Verifying device compatibility",
  "Downloading mod files",
  "Applying modifications",
  "Finalizing installation"
];

export const DownloadModal: React.FC<DownloadModalProps> = ({ game, onClose, onRate }) => {
  const [view, setView] = useState<ModalView>('idle');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const targetLinkRef = useRef<DownloadLink | null>(null);

  // --- Dynamic Content Generation ---
  const downloads = useMemo(() => game.title === 'Rocket league mobile' ? '572K+' : `${(Math.floor(Math.random() * 850) + 100)}K+`, [game.id, game.title]);
  
  const testimonials = useMemo(() => [
    { quote: "Script plugin works flawlessly! Unlocked everything right away, no issues at all.", user: "John" },
    { quote: "Best mod I've ever used. The performance is amazing and it was super easy to install.", user: "Maria" },
    { quote: "I was skeptical at first, but this is legit. The features are exactly as described.", user: "Alex" },
    { quote: "Finally, a site that delivers what it promises. Highly recommended for all gamers!", user: "Chen" }
  ], []);

  const testimonial = useMemo(() => {
    if (game.title === 'Rocket league mobile') {
        return testimonials[3]; // The "Chen" testimonial
    }
    const index = (game.id.charCodeAt(game.id.length - 1) || 0) % testimonials.length;
    return testimonials[index];
  }, [game.id, game.title, testimonials]);

  const testimonialUsers = useMemo(() => game.title === 'Rocket league mobile' ? '124K' : `${(Math.floor(Math.random() * 150) + 10)}K`, [game.id, game.title]);


  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      if (window.onLockerComplete) {
        delete window.onLockerComplete;
      }
    };
  }, [handleEscape]);

  // Effect for handling the processing animation
  useEffect(() => {
    if (view === 'processing') {
      setProgress(0);
      setCurrentStep(0);

      const totalDuration = 5000; // 5 seconds for the animation
      const stepDuration = totalDuration / installationSteps.length;

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => Math.min(prev + 1, installationSteps.length));
      }, stepDuration);

      const progressInterval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
            setView('completed');
            return 100;
          }
          return p + (100 / (totalDuration / 100));
        });
      }, 100);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [view]);

  const handleDownloadClick = (link: DownloadLink) => {
    targetLinkRef.current = link;
    
    if (getCookie('bg_locker_done')) {
      window.open(link.url, '_blank', 'noopener noreferrer nofollow');
      onClose();
      return;
    }

    setView('pending');

    const fallbackTimeout = setTimeout(() => {
      console.warn('Locker timed out. Showing fallback.');
      setView('fallback');
      if (window.onLockerComplete) {
        window.onLockerComplete = () => {}; 
      }
    }, 8000);

    window.onLockerComplete = (success: boolean) => {
      clearTimeout(fallbackTimeout);
      if (success && targetLinkRef.current) {
        setCookie('bg_locker_done', 'true', 1);
        window.open(targetLinkRef.current.url, '_blank', 'noopener noreferrer nofollow');
        onClose();
      } else {
        console.warn('Locker reported failure. Showing fallback.');
        setView('fallback');
      }
    };

    try {
      if (typeof window._uj === 'function') {
        window._uj();
      } else {
        throw new Error('Content locker script not loaded.');
      }
    } catch (error) {
      console.error('Failed to trigger content locker:', error);
      clearTimeout(fallbackTimeout);
      setView('fallback');
    }
  };

  const handleRatingSubmit = () => {
    if (userRating > 0) {
        onRate(game.id, userRating);
    }
    if (game.download_links.length > 0) {
        handleDownloadClick(game.download_links[0]);
    } else {
        console.error("No download links available for this game.");
        setView('fallback');
    }
  }

  const renderContent = () => {
    switch (view) {
      case 'idle':
        return (
          <>
            <div className="h-40 bg-[#642831] rounded-t-lg relative flex items-center justify-center p-4">
                <img src={game.cover_url} alt={`${game.title} Poster`} className="h-[120%] w-auto object-contain rounded-lg shadow-2xl max-w-[120px]"/>
                <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 bg-black/30 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-black/50 transition-all">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="p-6 pt-8 space-y-4">
                <h2 id="download-modal-title" className="text-2xl font-bold text-white -mt-4">{game.title}</h2>
                <div className="flex items-center gap-2 text-slate-400">
                    <DownloadIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{downloads} downloads</span>
                </div>
                <blockquote className="border-l-4 border-blue-400 bg-black/20 p-4">
                    <p className="text-slate-300 italic">"{testimonial.quote}"</p>
                    <cite className="text-slate-400 text-sm mt-2 block not-italic">- {testimonial.user}, {testimonialUsers} users</cite>
                </blockquote>
                <p className="text-slate-400 text-sm">{game.short_desc}</p>
                <button
                    onClick={() => setView('processing')}
                    className="w-full bg-[#5270a8] hover:bg-[#6889ca] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg transition-colors duration-200">
                    <PlayIcon className="w-5 h-5" />
                    <span>Start the Installation</span>
                </button>
            </div>
          </>
        );
      case 'processing':
          return (
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">
              <div className="relative w-20 h-20 mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="#2c2f48" strokeWidth="8" fill="none" />
                  <circle className="transform-gpu -rotate-90 origin-center" cx="50" cy="50" r="45" stroke="#4f46e5" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="99.05" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <GearIcon className="w-10 h-10 text-slate-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Processing...</h3>
              <p className="text-slate-400 mt-1 mb-6">Preparing installation for {game.title}</p>
              <div className="w-full bg-slate-700/50 rounded-full h-1.5 my-2 overflow-hidden">
                <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-500 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
              <ul className="space-y-4 text-left w-full max-w-sm mt-6">
                {installationSteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${index <= currentStep ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-400'} ${index === currentStep ? 'ring-4 ring-primary-500/30' : ''}`}>
                      {index + 1}
                    </div>
                    <span className={`transition-colors duration-300 ${index === currentStep ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        case 'completed':
            return (
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <CheckCircleIcon className="w-16 h-16 text-accent-500 mb-4" />
                    <h3 className="text-2xl font-bold text-white">Installation Complete!</h3>
                    <p className="text-slate-400 mt-1 mb-6">Please rate your experience to continue.</p>
                    
                    <div 
                        className="flex items-center justify-center gap-2 my-4"
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <button
                                    key={ratingValue}
                                    type="button"
                                    aria-label={`Rate ${ratingValue} stars`}
                                    onClick={() => setUserRating(ratingValue)}
                                    onMouseEnter={() => setHoverRating(ratingValue)}
                                    className="p-1 transition-transform duration-150 ease-in-out hover:scale-125 focus:outline-none"
                                >
                                    <StarIcon className={`w-8 h-8 transition-colors ${ratingValue <= (hoverRating || userRating) ? 'text-yellow-400' : 'text-slate-600'}`} />
                                </button>
                            );
                        })}
                    </div>
                    
                    <button
                        onClick={handleRatingSubmit}
                        disabled={userRating === 0}
                        className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg transition-colors duration-200 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-primary-500 mt-4"
                    >
                        Submit & Continue
                    </button>
                </div>
            );
      case 'pending':
        return (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="flex justify-center items-center mb-4">
               <svg className="animate-spin h-12 w-12 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Waiting for completion...</h3>
            <p className="text-slate-400 mt-2 max-w-xs">Please complete the short offer in the new window to unlock your download.</p>
          </div>
        );
      case 'fallback':
        return (
           <div className="p-6 relative">
             <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 bg-slate-700/50 rounded-full p-1.5 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all">
                <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="text-center mb-6 mt-4">
               <h3 className="text-2xl font-bold">Verification Failed</h3>
               <p className="text-slate-400">The verification step could not be completed. You can try a direct link below.</p>
            </div>
            <div className="space-y-3">
              {game.download_links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer nofollow"
                      className="block w-full text-center text-white font-bold py-3 px-4 rounded-lg bg-accent-600 border-b-4 border-accent-800 hover:bg-accent-500 hover:-translate-y-0.5 active:border-b-2 active:translate-y-0.5 transition-all duration-150 ease-in-out transform">
                     {link.label} ({link.type})
                  </a>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="download-modal-title"
        onClick={onClose}
    >
      <div 
        className="bg-[#2a3045] text-white w-full max-w-md rounded-2xl relative animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
       <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-enter { animation: modal-enter 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};