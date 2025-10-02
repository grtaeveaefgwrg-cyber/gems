import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-slate-400 mt-8 border-t border-slate-800/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0">&copy; {currentYear} BEST GAME. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-6 text-center max-w-4xl mx-auto">
          Disclaimer: This site indexes information about games and provides links to legitimate sources. We do not host or distribute copyrighted files. All trademarks and registered trademarks are the property of their respective owners.
        </p>
      </div>
    </footer>
  );
};