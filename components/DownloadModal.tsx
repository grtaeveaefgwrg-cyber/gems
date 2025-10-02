
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Game, DownloadLink } from '../types';
import { XMarkIcon, CheckCircleIcon } from './icons';

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
}

type LockerState = 'idle' | 'pending' | 'fallback';

export const DownloadModal: React.FC<DownloadModalProps> = ({ game, onClose }) => {
  const [lockerState, setLockerState] = useState<LockerState>('idle');
  // Use a ref to store the link, so we don't need to pass it to the global callback
  const targetLinkRef = useRef<DownloadLink | null>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Clean up global callback on unmount
      if (window.onLockerComplete) {
        delete window.onLockerComplete;
      }
    };
  }, [handleEscape]);

  const handleDownloadClick = (link: DownloadLink) => {
    targetLinkRef.current = link;
    
    // 1. Check for cookie to bypass locker
    if (getCookie('bg_locker_done')) {
      window.open(link.url, '_blank', 'noopener noreferrer nofollow');
      onClose();
      return;
    }

    setLockerState('pending');

    // 2. Set up a timeout for fallback
    const fallbackTimeout = setTimeout(() => {
      console.warn('Locker timed out. Showing fallback.');
      setLockerState('fallback');
      if (window.onLockerComplete) {
        // Neutralize the callback to prevent it from firing after timeout
        window.onLockerComplete = () => {}; 
      }
    }, 8000); // 8-second timeout

    // 3. Define the global callback for the locker script
    window.onLockerComplete = (success: boolean) => {
      clearTimeout(fallbackTimeout);
      if (success && targetLinkRef.current) {
        setCookie('bg_locker_done', 'true', 1); // Set cookie for 1 day
        window.open(targetLinkRef.current.url, '_blank', 'noopener noreferrer nofollow');
        onClose();
      } else {
        console.warn('Locker reported failure. Showing fallback.');
        setLockerState('fallback');
      }
    };

    // 4. Trigger the locker script
    try {
      if (typeof window._uj === 'function') {
        window._uj();
      } else {
        throw new Error('Content locker script not loaded.');
      }
    } catch (error) {
      console.error('Failed to trigger content locker:', error);
      clearTimeout(fallbackTimeout);
      setLockerState('fallback');
    }
  };

  const renderContent = () => {
    switch (lockerState) {
      case 'pending':
        return (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
               <svg className="animate-spin h-12 w-12 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Waiting for completion...</h3>
            <p className="text-slate-400 mt-2">Please complete the short offer in the new window to unlock your download.</p>
          </div>
        );
      case 'fallback':
        return (
          <div>
            <div className="text-center mb-6">
               <h3 className="text-2xl font-bold">Verification Failed</h3>
               <p className="text-slate-400">The verification step could not be completed. You can try a direct link below.</p>
            </div>
            <div className="space-y-3">
              {game.download_links.map((link, index) => (
                  <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="
                        block w-full text-center text-white font-bold py-3 px-4 rounded-lg
                        bg-accent-600 border-b-4 border-accent-800
                        hover:bg-accent-500 hover:-translate-y-0.5
                        active:border-b-2 active:translate-y-0.5
                        transition-all duration-150 ease-in-out transform
                      "
                  >
                     {link.label} ({link.type})
                  </a>
              ))}
            </div>
          </div>
        );
      case 'idle':
      default:
        return (
          <div>
            <div className="text-center mb-6">
               <CheckCircleIcon className="w-16 h-16 text-accent-500 mx-auto mb-3" />
               <h3 className="text-2xl font-bold">Your Download is Ready!</h3>
               <p className="text-slate-400">Please complete a short verification to unlock.</p>
            </div>
            <div className="space-y-3">
              {game.download_links.map((link, index) => (
                  <button
                      key={index}
                      onClick={() => handleDownloadClick(link)}
                      className="
                        block w-full text-center text-white font-bold py-3 px-4 rounded-lg
                        bg-accent-600 border-b-4 border-accent-800
                        hover:bg-accent-500 hover:-translate-y-0.5
                        active:border-b-2 active:translate-y-0.5
                        transition-all duration-150 ease-in-out transform
                      "
                  >
                     {link.label} ({link.type})
                  </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              You will be shown a short offer to unlock the download. We do not host copyrighted files. All links lead to third-party sources.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="download-modal-title">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg relative text-white animate-fade-in-up">
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div>
            <h2 id="download-modal-title" className="text-xl font-bold">Downloading {game.title}</h2>
            <p className="text-sm text-slate-400">Version {game.id.split('-')[1]}.0</p>
          </div>
          <button onClick={onClose} aria-label="Close download dialog" className="text-slate-400 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
