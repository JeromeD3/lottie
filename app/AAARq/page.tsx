'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import B from './B'

const Page = () => {
  const data = ['我是谁', '我是ddd', '你是DDB']

  const [currentId, setcurrentId] = useState(data[0])
  return (
    <div className='flex flex-col gap-2'>
      <h1>currentId :{currentId}</h1>
      {data.map((item, index) => {
        return (
          <Button onClick={() => setcurrentId(item)} key={index}>
            {item}
          </Button>
        )
      })}

      <B currentId={currentId} />
    </div>
  )
}
export default Page
