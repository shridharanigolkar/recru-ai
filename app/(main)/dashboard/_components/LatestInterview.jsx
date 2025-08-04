'use client'
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import { Butterfly_Kids } from 'next/font/google';
import React, { useState } from 'react'

function LatestInterview() {
    const[interviewList,setInterviewList] = useState([]);

  return (
    <div className='my-5'>
       <h2 className='font-bold text-2xl pl-4.5'>Previously Created Interviews</h2>
       {interviewList?.length == 0 && 
       
        <div className='p-5 flex flex-col gap-3 items-center mt-5'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created</h2>
            <Button>+ Create New Interview</Button>
        </div>}
    
    </div>
    
  )
}

export default LatestInterview
