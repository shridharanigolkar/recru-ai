import React from 'react'
import Image from 'next/image'


function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      {/* <Image className='w-[140px]' src={'/imagebg1.png'} alt='logo' width={200} height={200}/> */}
      <h2 className='font-bold text-xl text-primary'>RECRUAI</h2>
    </div>
  )
}

export default InterviewHeader
