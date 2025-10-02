import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from './icons';
import { GAMES } from '../data/games';

const USER_NAMES = ["David", "Alex", "Maria", "Chen", "Yuki", "Leo", "Zoe"];

export const SocialProof: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activity, setActivity] = useState({ user: '', game: '' });

    useEffect(() => {
        const showNotification = () => {
            const randomUser = USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)];
            const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)].title;
            setActivity({ user: randomUser, game: randomGame });
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 4000); // Visible for 4 seconds
        };

        const intervalId = setInterval(showNotification, 8000); // Show every 8 seconds

        // Show one immediately on mount
        setTimeout(showNotification, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="h-10 my-4 flex items-center justify-center overflow-hidden">
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="bg-slate-800/60 rounded-full p-2 flex items-center gap-2 shadow-lg text-xs">
                    <UserCircleIcon className="w-5 h-5 text-slate-400" />
                    <p className="text-slate-300">
                        User <span className="font-bold text-white">{activity.user}</span> just downloaded <span className="font-bold text-white">{activity.game}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};