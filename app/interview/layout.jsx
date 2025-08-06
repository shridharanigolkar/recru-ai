'use client'
import React from 'react'
import { useState } from 'react';
import { InterviewDataContext } from '@/context/InterviewDataContext'
import InterviewHeader from './_components/InterviewHeader'
function InterviewLayout({children}) {

  const[interviewInfo,setInterviewInfo]=useState();
  return (
    <InterviewDataContext.Provider value={{interviewInfo,setInterviewInfo}}>

    <div className='bg-secondary '>
      <InterviewHeader/>
      {children}
    </div>

    </InterviewDataContext.Provider>
    
  )
}

export default InterviewLayout
