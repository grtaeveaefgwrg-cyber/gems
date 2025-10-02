import React, { useState, useEffect } from 'react';
import { FlameIcon } from './icons';

const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

export const OfferBanner: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 - 1); // 23:59:59

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-primary-600 rounded-2xl p-6 my-8 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <FlameIcon className="w-5 h-5" />
                        <h3 className="text-lg font-bold">Limited Time Offer!</h3>
                    </div>
                    <p className="text-sm text-primary-200">Get exclusive mod packs for free - Offer ends soon!</p>
                </div>
                <div className="bg-primary-700/80 rounded-lg px-4 py-2 font-mono text-xl tracking-wider">
                    {formatTime(timeLeft)}
                </div>
            </div>
        </section>
    );
};