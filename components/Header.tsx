import React from 'react';
import { GamepadIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-950/0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 p-2.5 rounded-xl">
             <GamepadIcon className="h-7 w-7 text-white"/>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">
              BEST GAME
            </h1>
            <p className="text-sm text-slate-400 -mt-1">Premium modded apps collection</p>
          </div>
        </div>
      </div>
    </header>
  );
};