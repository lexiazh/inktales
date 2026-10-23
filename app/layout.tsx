import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'InkTales — Discover the stories behind Chinese characters',
 description: 'A little ink. A world of meaning. Learn your first Chinese characters through watercolor pictures, memorable stories, writing, and gentle practice.',
 icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
