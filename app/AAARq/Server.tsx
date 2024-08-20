import Image from 'next/image'
import { getTranslation } from './actions'

// Server component
export default async function ServerApp() {
  const data = await getData()

  return (
    <div>
      Server
      <Image src={data[0].url} alt="cat" width={200} height={200} />
    </div>
  )
}

// Function to fetch data
async function getData() {
  // 阻塞线程两秒
  const res = await fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())

  console.log('===============', res)

  return res
}
