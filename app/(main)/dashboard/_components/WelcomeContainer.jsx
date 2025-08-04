'use client'
import { useUser } from '@/app/Provider'
import React from 'react'
import Image from 'next/image';

function WelcomeContainer() {

    const {user} = useUser();

  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
      <div >
        <h2 className='text-lg font-bold'>Welcome Back , {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interviews , Hassel-Free Hiring</h2>
      </div>
      {user && <Image className='rounded-4xl' src={user?.picture} alt='userAvatar' width={50} height={50} />}
    </div>
  )
}

export default WelcomeContainer
