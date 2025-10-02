import React from 'react';

export const SectionHeader: React.FC<{title: string}> = ({ title }) => (
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
