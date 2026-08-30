import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getWeather } from '../api/weatherApi.js'
import { getWeatherTypeLabel, scoreTone } from '../utils/weather.js'
import type { WeatherCity, WeatherResponse } from '../types.js'

interface WeatherGlyphProps {
  description: string
}

function WeatherGlyph({ description }: WeatherGlyphProps) {
  return <span className="mr-2 text-sm text-gray-500">{getWeatherTypeLabel(description)}</span>
}

export default function Dashboard() {
  const { getAccessTokenSilently, logout } = useAuth0()
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadWeather() {
    setLoading(true)
    setError('')

    try {
      const token = await getAccessTokenSilently()
      const weather = await getWeather(token)
      setData(weather)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load weather data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadWeather()
  }, [])

  const cities: WeatherCity[] = data?.cities || []

  return (
    <div className="py-10">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold">Weather Dashboard</h1>
        <p className="mt-2 text-gray-600">Compare current weather conditions across cities.</p>
      </section>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => void loadWeather()} className="ml-3 font-medium underline">
            Try again
          </button>
        </div>
      )}

      <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="font-semibold">City Conditions</h2>
            <p className="mt-1 text-sm text-gray-500">Current weather and comfort scores</p>
          </div>

          <div className="flex items-center gap-4">
            {data?.cache && <span className="text-xs text-gray-500">Cache: {data.cache}</span>}

            <button
              type="button"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="text-sm font-medium text-gray-600 underline hover:cursor-pointer"
            >
              Log out
            </button>

            <button
              type="button"
              onClick={() => void loadWeather()}
              disabled={loading}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Conditions</th>
                <th className="px-6 py-3">Temperature</th>
                <th className="px-6 py-3">Humidity</th>
                <th className="px-6 py-3">Wind</th>
                <th className="px-6 py-3">Comfort</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Loading weather data...
                  </td>
                </tr>
              ) : (
                cities.map((city) => (
                  <tr key={city.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500">{city.rank}</td>

                    <td className="px-6 py-4">
                      <div className="font-medium">{city.name}</div>
                      <div className="text-xs text-gray-500">{city.country}</div>
                    </td>

                    <td className="px-6 py-4">
                      <WeatherGlyph description={city.description} />
                      {city.description}
                    </td>

                    <td className="px-6 py-4">{Math.round(city.temperature)}°C</td>
                    <td className="px-6 py-4">{city.humidity}%</td>
                    <td className="px-6 py-4">{city.windSpeed} m/s</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-md px-3 py-1 font-medium ${scoreTone(city.score)}`}>
                        {city.score}/100
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-gray-200 md:hidden">
          {loading ? (
            <div className="px-6 py-10 text-center text-sm text-gray-500">Loading weather data...</div>
          ) : (
            cities.map((city) => (
              <article key={city.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-xs text-gray-500">{city.country}</div>
                  </div>

                  <span className={`rounded-md px-3 py-1 text-sm font-medium ${scoreTone(city.score)}`}>
                    {city.score}/100
                  </span>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span>
                    <WeatherGlyph description={city.description} />
                    {city.description}
                  </span>

                  <span className="font-medium">{Math.round(city.temperature)}°C</span>
                </div>

                <div className="mt-4 flex gap-6 text-xs text-gray-500">
                  <span>
                    Humidity: <strong className="text-gray-700">{city.humidity}%</strong>
                  </span>

                  <span>
                    Wind: <strong className="text-gray-700">{city.windSpeed} m/s</strong>
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
