
import React, { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types';
import { XMarkIcon, CheckCircleIcon } from './icons';

interface DownloadModalProps {
  game: Game;
  onClose: () => void;
}

const steps = [
  "Checking device compatibility",
  "Preparing secure files",
  "Generating secure link",
  "Finalize"
];

export const DownloadModal: React.FC<DownloadModalProps> = ({ game, onClose }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
        setProgress(0);
      }, 1500 + Math.random() * 500);
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  useEffect(() => {
    if (step < steps.length) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 15);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg relative text-white">
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Downloading {game.title}</h2>
            <p className="text-sm text-slate-400">Version {game.id.split('-')[1]}.0</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step < steps.length ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-primary-400">{steps[step]}</p>
                <p className="text-sm font-medium">{Math.round(progress)}%</p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">Please wait, this process is fully automated...</p>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                 <CheckCircleIcon className="w-16 h-16 text-accent-500 mx-auto mb-3" />
                 <h3 className="text-2xl font-bold">Your Download is Ready!</h3>
                 <p className="text-slate-400">Click a link below to start your download.</p>
              </div>
              <div className="space-y-3">
                {game.download_links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel={link.rel}
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
              <p className="text-xs text-slate-500 mt-4 text-center">
                We do not host files. You will be redirected to an official or verified third-party source.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
