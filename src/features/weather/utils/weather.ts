export function scoreTone(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 60) return 'bg-yellow-100 text-yellow-700'
  return 'bg-orange-100 text-orange-700'
}

export function getWeatherTypeLabel(description: string): string {
  const lowerDescription = description.toLowerCase()

  if (lowerDescription.includes('rain')) return 'Rain'
  if (lowerDescription.includes('cloud')) return 'Cloudy'
  return 'Clear'
}
