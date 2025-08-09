// 'use client'
// import React from 'react'
// import { Link, Phone, Video } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// function CreateOption() {
//   const router = useRouter();
//   return (
//     <div  className='grid grid-cols-2 gap-5'>
//        <div className='bg-white border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'
//       onClick={() => router.push('/dashboard/create-interview')}
//       >
//                 <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
//                 <h2 className='font-bold'>Create New Interview</h2>
//                 <p className='text-gray-500'>Create AI Interviews and Schedule then with Candidates</p>
//        </div>
      
//     </div>
//   )
// }

// export default CreateOption


'use client'
import React from 'react'
import { Link, Phone, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

function CreateOption() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-5">
      <div
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-5 flex flex-col gap-2 cursor-pointer transition-colors duration-300"
        onClick={() => router.push('/dashboard/create-interview')}
      >
        <Video
          className="p-3 text-primary bg-blue-50 dark:bg-zinc-800 rounded-lg h-12 w-12 transition-colors duration-300"
        />
        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Create AI Interviews and Schedule then with Candidates
        </p>
      </div>
    </div>
  )
}

export default CreateOption
