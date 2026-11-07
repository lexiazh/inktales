import type { Metadata } from 'next';
import './globals.css';
import './living-hanzi.css';
export const metadata: Metadata = {
 title: 'InkTales — Discover the stories behind Chinese characters',
 description: 'A little ink. A world of meaning. Learn your first Chinese characters through watercolor pictures, memorable stories, writing, and gentle practice.',
 icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><head><link rel="stylesheet" href="/assets/cormorant.css"/><link rel="stylesheet" href="/assets/dm-sans.css"/><link rel="stylesheet" href="/assets/brush.css"/></head><body>{children}</body></html>;}
