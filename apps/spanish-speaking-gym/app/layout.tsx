import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spanish Speaking Gym',
  description: 'Local-first speaking drills and phrase practice app.',
};

const navRoutes = [
  { href: '/', label: 'Home' },
  { href: '/phrases', label: 'Phrases' },
  { href: '/drills', label: 'Drills' },
  { href: '/roleplays', label: 'Roleplays' },
  { href: '/weak-phrases', label: 'Weak Phrases' },
  { href: '/progress', label: 'Progress' },
  { href: '/settings', label: 'Settings' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Spanish Speaking Gym</h1>
          <p>
            Local-first by default: practice data can stay on-device, and voice tools are optional.
          </p>
          <nav aria-label="App sections">
            <ul>
              {navRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
