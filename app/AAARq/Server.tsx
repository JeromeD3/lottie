import { getTranslation } from './actions'

// Server component
export default async function ServerApp() {
  const data = await getData()

  return <div>Server {data.result.targetText}</div>
}

// Function to fetch data
async function getData() {
  // 阻塞线程两秒
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await getTranslation({
    currentId: 'dxxxxdd',
  })

  console.log('===============', res)

  return res
}
