
'use client'
import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { toast } from 'sonner';
import WelcomeContainer from '../dashboard/_components/WelcomeContainer';
function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id',{ascending:false})
      

    if (error) {
      console.error('Error fetching interviews:', error);
    } else {
      setInterviewList(interviews || []);
    }
  };
 

  return (
    <div className='my-5'>
        <WelcomeContainer />
      <h2 className='font-bold text-2xl pl-4.5'>Previously Created Interviews</h2>

      {interviewList.length === 0 ? (
        <div className='p-5 flex flex-col gap-3 items-center mt-5'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created</h2>
          <Button>+ Create New Interview</Button>
        </div>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  m-5 px-4'>
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}


export default AllInterview
