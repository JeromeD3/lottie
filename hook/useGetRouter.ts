export async function fetchRoutes() {
  const res = await fetch('/api/route')
  const data = await res.json()
  return data
}
