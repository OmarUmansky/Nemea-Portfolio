'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import AudioPlayer from '@/components/AudioPlayer';
import LoadingScreen from '@/components/LoadingScreen';
import EasterEggs from '@/components/EasterEggs';
import Navbar from '@/components/Navbar';
import NightEffects from '@/components/NightEffects';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          {!isLoading && (
            <>
              <NightEffects />
              <div className="retro-content">
                <Navbar />
                {children}
                <EasterEggs />
              </div>
              <AudioPlayer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
} 