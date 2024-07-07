import { useState, useEffect } from 'react';

async function fetchRoutes() {
  const res = await fetch('/api/route');
  const data = await res.json();
  return data;
}

export default function useGetRoutes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes().then(data => setRoutes(data));
  }, []);

  return routes;
}
