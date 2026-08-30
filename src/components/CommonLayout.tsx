import { useEffect, useState, type ReactNode } from 'react'

interface CommonLayoutProps {
  children: ReactNode
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('fidenz-theme')

    return savedTheme === 'dark' || (
      savedTheme !== 'light' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  })

  useEffect(() => {
    localStorage.setItem('fidenz-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <main className={`min-h-screen bg-gray-50 text-gray-900 ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <a href="/" className="text-xl font-semibold" aria-label="Fidenz home">
            Fidenz Technologies | Weather App
          </a>

          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="ml-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        {children}
      </div>
    </main>
  )
}
