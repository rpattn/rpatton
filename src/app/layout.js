import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Robert Patton',
  description: 'My Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const root = document.documentElement;
                  const body = document.body;
                  
                  if (stored === 'dark' || stored === 'light') {
                    // User has overridden theme
                    const isDark = stored === 'dark';
                    root.classList.toggle('dark', isDark);
                    root.dataset.theme = stored;
                    root.style.setProperty('color-scheme', stored);
                    if (body) {
                      body.classList.toggle('dark', isDark);
                      body.dataset.theme = stored;
                    }
                  } else {
                    // No override - let system preference work
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const theme = prefersDark ? 'dark' : 'light';
                    root.classList.toggle('dark', prefersDark);
                    root.style.setProperty('color-scheme', theme);
                    if (body) {
                      body.classList.toggle('dark', prefersDark);
                    }
                    // Don't set data-theme so CSS knows this is system preference
                  }
                } catch (e) {
                  // Ignore localStorage errors - fallback to light theme
                  const root = document.documentElement;
                  root.style.setProperty('color-scheme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
