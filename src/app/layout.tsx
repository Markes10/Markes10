import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'phosphor — a blog you operate, not scroll',
  description: 'A developer blog that runs entirely in a terminal. Type help.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>",
  },
  openGraph: {
    title: 'phosphor — a blog you operate, not scroll',
    description: 'A developer blog that runs entirely in a terminal.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'phosphor — a blog you operate, not scroll',
    description: 'A developer blog that runs entirely in a terminal.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
