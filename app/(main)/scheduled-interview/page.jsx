'use client'
import React, { useEffect, useState } from 'react';
import WelcomeContainer from '../dashboard/_components/WelcomeContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import InterviewCard from '../dashboard/_components/InterviewCard';
function Scheduledinterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
   const router = useRouter();
   
  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from('interviews')
      .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });

    console.log(result);
   setInterviewList(result.data || []);

  };

  return (
    <div>
      <WelcomeContainer />
       <div className='mt-5'>
             <h2 className='font-bold text-xl'>
              Interview List With Candidate Feedback
             </h2>

         
      {interviewList.length === 0 ? (
        <div className='p-5 flex flex-col gap-3 items-center mt-5'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created</h2>
           <Button onClick={() => router.push('/dashboard/create-interview')} >+ Create New Interview</Button>
         
        </div>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  m-5 px-4'>
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} 
            
            viewDetail={true}
            />
          ))}
        </div>
      )}

       </div>
         
    </div>
  );
}

export default Scheduledinterview;
