import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Button className='group  '>
        <div className='relative  flex flex-col items-center'>
          <p className='opacity-0'>aaaa</p>
          <p className='absolute group-hover:-top-8 top-0 transition-all duration-300'>
            button
          </p>
          <MoveRight className='absolute -bottom-8 group-hover:bottom-0 transition-all duration-300' />
        </div>
      </Button>
    </div>
  )
}

export default page
