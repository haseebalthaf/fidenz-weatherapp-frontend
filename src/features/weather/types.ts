export interface WeatherCity {
  id: number
  name: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  cloudiness: number
  description: string
  icon: string
  updatedAt: string
  score: number
  rank: number
  demo?: boolean
}

export interface WeatherResponse {
  cities: WeatherCity[]
  generatedAt: string
  source: string
  cityCount: number
  cache: 'HIT' | 'MISS'
}
