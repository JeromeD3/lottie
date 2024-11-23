export async function fetchRoutes() {
  try {
    const response = await fetch('/api/route')
    if (!response.ok) {
      throw new Error('Failed to fetch routes')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching routes:', error)
    return { directories: [] }
  }
}
