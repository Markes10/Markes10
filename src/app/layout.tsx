import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dweepan Gain — Portfolio OS',
  description:
    "A retro terminal portfolio by Dweepan Gain — AI/ML Engineer. Type 'help' to explore.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>",
  },
  openGraph: {
    title: 'Dweepan Gain — Portfolio OS',
    description:
      'AI/ML Engineer specializing in LLMs, NLP, and production-grade intelligent systems.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Dweepan Gain — Portfolio OS',
    description: 'A retro terminal portfolio by Dweepan Gain — AI/ML Engineer.',
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
      <body suppressHydrationWarning className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
