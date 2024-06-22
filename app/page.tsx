'use client'
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import PoliteChicky from './PoliteChicky.json'
import { useRef } from "react";
export default function Home() {
  const ref = useRef<LottieRefCurrentProps>(null)
  return (
    <div className="flex  min-h-screen bg-[#000] w-full max-lg:flex-col items-center justify-center p-24 ">
      <div className="text-white flex items-center justify-center w-full   gap-2 flex-col">
        <h1>hello word</h1>
        <h2>hello next</h2>
      </div>

      <Lottie onComplete={() => {
        ref.current?.goToAndPlay(70,true)
      }} lottieRef={ref} animationData={PoliteChicky} loop={false} />
    </div>
  );
}
