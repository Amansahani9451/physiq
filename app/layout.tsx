import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Physiq',
  description: 'A social fitness and routine-planning platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
