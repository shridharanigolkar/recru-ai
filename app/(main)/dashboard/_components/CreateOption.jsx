'use client'
import React from 'react'
import { Link, Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

function CreateOption() {
  const router = useRouter();
  return (
    <div  className='grid grid-cols-2 gap-5'>
       <div className='bg-white border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
      onClick={() => router.push('/dashboard/create-interview')}
      >
                <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI Interviews and Schedule then with Candidates</p>
       </div>
        <div className='bg-white border-gray-200 rounded-lg p-5'>
                <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
                <h2 className='font-bold'>Create Phone Screening Call</h2>
                <p className='text-gray-500'>Schedule phone screening call</p>
       </div>
    </div>
  )
}

export default CreateOption
