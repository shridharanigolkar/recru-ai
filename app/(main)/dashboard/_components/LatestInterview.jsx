// 'use client'
// import { useUser } from '@/app/Provider';
// import { Button } from '@/components/ui/button';
// import { Camera, Video } from 'lucide-react';
// import { Butterfly_Kids } from 'next/font/google';
// import React, { useEffect, useState } from 'react'
// import { supabase } from '@/services/supabaseClient'

// function LatestInterview() {
//     const[interviewList,setInterviewList] = useState([]);
//     const{user}=useUser();
//     useEffect(()=>{
//       user&&interviewList
//     },[user])
   
//     const GetInterviewList = async () => {
//         let { data: interviews, error } = await supabase
//         .from('interviews')
//         .select('*')
//         .eq('userEmail',user?.email);

//         console.log(interviews);
        
//      }
//   return (
//     <div className='my-5'>
//        <h2 className='font-bold text-2xl pl-4.5'>Previously Created Interviews</h2>
//        {interviewList?.length == 0 && 
//             <div className='p-5 flex flex-col gap-3 items-center mt-5'>
//             <Video className='h-10 w-10 text-primary'/>
//             <h2>You don't have any interview created</h2>

//             <Button >+ Create New Interview</Button>
//         </div>}
//       { GetInterviewList()};

//     </div>
    
//   )
// }

// export default LatestInterview

'use client'

import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';

function LatestInterview() {
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
      .limit(6)

    if (error) {
      console.error('Error fetching interviews:', error);
    } else {
      setInterviewList(interviews || []);
    }
  };
 

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl pl-4.5'>All Previously Created Interviews</h2>

      {interviewList.length === 0 ? (
        <div className='p-5 flex flex-col gap-3 items-center mt-5'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You don't have any interview created</h2>
          <Button>+ Create New Interview</Button>
        </div>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5  m-5 px-4'>
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterview;

