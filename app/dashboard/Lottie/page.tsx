'use client'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

import PoliteChicky from '@/app/PoliteChicky.json'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

export default function Home() {
  const ref = useRef<any>(null)
  const data = [{ value: 'hello' }, { value: 'hello' }, { value: 'hello' }]
  return (
    <>
      <div className="flex  min-h-screen bg-[#000] w-full max-lg:flex-col items-center justify-center p-24 ">
        <div className="text-white flex items-center justify-center w-full   gap-2 flex-col ">
          {data.map((item, index) => (
            <div className=" has-[.bg]:bg-red-200 group" key={index}>
              <h1 className="group-has-[.bg]:text-red-950" onClick={(e) => e.currentTarget.classList.add('bg')}>
                hello word
              </h1>
            </div>
          ))}
        </div>

        <Lottie
          onComplete={() => {
            ref.current?.goToAndPlay(70, true)
          }}
          lottieRef={ref}
          animationData={PoliteChicky}
          loop={false}
        />
      </div>
    </>
  )
}
