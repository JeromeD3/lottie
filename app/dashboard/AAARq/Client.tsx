'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import B from './B'

const Client = () => {
  const data = ['我是谁', '我是ddd', '你是DDB']

  const [currentId, setcurrentId] = useState(data[0])
  return (
    <>
      <h1>currentId :{currentId}</h1>
      {data.map((item, index) => {
        return (
          <Button onClick={() => setcurrentId(item)} key={index}>
            {item}
          </Button>
        )
      })}
      <B currentId={currentId} />
    </>
  )
}

export default Client
