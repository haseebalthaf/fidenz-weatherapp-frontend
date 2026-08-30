import type { WeatherResponse } from '../types.js'

export async function getWeather(token: string): Promise<WeatherResponse> {
  const response = await fetch('/api/weather', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(error.error || 'Unable to load weather data')
  }

  return response.json()
}
