import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from './components/header/Header';
import { Provider } from './components/provider/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next-Nest App',
  description: 'App with nextjs annd nestjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
