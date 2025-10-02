import React from 'react';

interface IconProps {
  className?: string;
}

export const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.016 2.25c.393 0 .78.123 1.11.362l6.832 4.1c.78.468 1.258 1.36 1.258 2.288v5.292a3.75 3.75 0 01-.878 2.459l-2.32 3.103a3.75 3.75 0 01-5.428 1.303l-3.32-2.49a3.75 3.75 0 01-1.42-2.924V8.999a3.75 3.75 0 011.258-2.288l6.832-4.1a2.25 2.25 0 011.11-.362zm2.695 7.152a.75.75 0 00-1.06-1.06l-3.25 3.25-1.5-1.5a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.75-3.75z" clipRule="evenodd" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const GamepadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.5 8.5h.01m-12.01 0h.01M12 3a9 9 0 00-9 9v3h3v-3a6 6 0 016-6 6 6 0 016 6v3h3v-3a9 9 0 00-9-9zM4 15h16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z" />
  </svg>
);

export const StorageIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
  </svg>
);

export const NoMalwareIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.414,12l3.293-3.293a1,1,0,1,0-1.414-1.414L12,10.586,8.707,7.293a1,1,0,1,0-1.414,1.414L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414Z"/>
        <path d="M19.32,10.26a8,8,0,1,0-13.64,0,9.91,9.91,0,0,0-2.36,3.69,1,1,0,0,0,1,1.26H7.1a1,1,0,0,0,.87-1.45,7,7,0,0,1,8.06,0,1,1,0,0,0,.87,1.45h4.78a1,1,0,0,0,1-1.26A9.91,9.91,0,0,0,19.32,10.26ZM6,10a6,6,0,1,1,12,0,7.9,7.9,0,0,1-1.18,4H7.18A7.9,7.9,0,0,1,6,10Z"/>
    </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10.6,19.9a1,1,0,0,1-1.73-1L12.16,13H8a1,1,0,0,1-.89-1.45l4-8a1,1,0,0,1,1.78,0l4,8A1,1,0,0,1,16,13H11.84l-3.29,5.9A1,1,0,0,1,10.6,19.9Z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const FlameIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A24.75 24.75 0 0112 12.75c0 1.506.203 2.96.578 4.362A.75.75 0 0014.25 18v-2.625a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V18a.75.75 0 001.672.414A26.25 26.25 0 0012 12.75c-1.556 0-3.074.24-4.522.682A.75.75 0 006.75 15v2.25a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H6a.75.75 0 00-.75.75v3.75a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V18a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h12a.75.75 0 00.75-.75v-3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h.375a.75.75 0 00.75-.75v-8.25a24.75 24.75 0 00-3.038-10.052.75.75 0 00-1.052-1.071z" clipRule="evenodd" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);