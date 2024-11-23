import React, { Suspense } from 'react'
import ServerApp from './Server'
import Client from './Client'

const Page = () => {
  return (
    <div className="flex flex-col gap-2">
      <Client />

      <Suspense fallback={<div>Loading...</div>}>
        <ServerApp />
      </Suspense>
    </div>
  )
}
export default Page
