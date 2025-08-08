'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/Provider';
import WelcomeContainer from '@/app/(main)/dashboard/_components/WelcomeContainer';
import InterViewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';


function InterviewDetail() {
    const {interview_id} = useParams();
    const {user} = useUser();
    const[interviewDetail,setInterviewDetail]=useState();


    useEffect(()=>{
        if(user){
            GetInterviewDetail();
        }
            
    },[user])

    const GetInterviewDetail = async () =>{
      const result = await supabase
      .from('interviews')
      .select('jobPosition,jobdescription,type,questionList,duration,interview_id,created_at,interview-feedback(userEmail,userName,feedback,recommendation,created_at)')
      .eq('userEmail', user?.email)
      .eq('interview_id',interview_id)
      
     setInterviewDetail(result.data[0])
    console.log(result);
    }

  return (
    <div>
        <WelcomeContainer />
        <div className='mt-5'>
          <h2 className='font-bold text-2xl'>Interview Detail</h2>
         {interviewDetail && (
                <>
                  <InterViewDetailContainer interviewDetail={interviewDetail} />

                  {Array.isArray(interviewDetail['interview-feedback']) &&
                    interviewDetail['interview-feedback'].length > 0 && (
                      <CandidateList candidateList={interviewDetail['interview-feedback']} />
                  )}
                </>
              )}

        </div>
      
    </div>
  )
}

export default InterviewDetail
