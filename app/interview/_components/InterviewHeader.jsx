import React from 'react'
import Image from 'next/image'


function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image className='w-[140px]' src={'/image.png'} alt='logo' width={200} height={200}/>
    </div>
  )
}

export default InterviewHeader
