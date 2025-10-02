import React from 'react';
import { ShieldCheckIcon, NoMalwareIcon, CheckCircleIcon, BoltIcon } from './icons';

const badges = [
  { icon: ShieldCheckIcon, text: "100% Safe" },
  { icon: NoMalwareIcon, text: "No Malware" },
  { icon: CheckCircleIcon, text: "Verified Mods" },
  { icon: BoltIcon, text: "Fast Downloads" }
];

export const TrustBadges: React.FC = () => {
  return (
    <section id="trust" className="my-8 py-4">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {badges.map(badge => (
          <div key={badge.text} className="flex items-center gap-2 bg-slate-800/60 rounded-full px-4 py-2.5 text-sm shadow-inner shadow-black/20">
            <badge.icon className="w-5 h-5 text-primary-400" />
            <span className="text-slate-300 font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};