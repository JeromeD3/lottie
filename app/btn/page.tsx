import { Button } from '@/components/ui/button'
import ShimmerButton from '@/components/magicui/shimmer-button'

import { MoveRight } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Button className="group  ">
        <div className="relative  flex flex-col items-center">
          <p className="opacity-0">aaaa</p>
          <p className="absolute group-hover:-top-8 top-0 transition-all duration-300">button</p>
          <MoveRight className="absolute -bottom-8 group-hover:bottom-0 transition-all duration-300" />
        </div>
      </Button>

      <div className="z-10 flex min-h-[16rem] items-center justify-center">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">Shimmer Button</span>
        </ShimmerButton>
      </div>
    </div>
  )
}

export default page
