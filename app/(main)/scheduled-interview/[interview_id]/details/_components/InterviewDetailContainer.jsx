import { Calendar, Clock, MessageCircleQuestion } from 'lucide-react'
import React from 'react'
import moment from 'moment'
function InterViewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
       <h2>{interviewDetail?.jobPosition}</h2>
       <div className='mt-4 flex items-center justify-between lg:pr-52 '>
           <div>
               <h2 className='text-sm text-gray-500'>Duration </h2>
               <h2 className='flex text-sm font-bold items-center gap-3 '><Clock className='h-4 w-4' /> { interviewDetail?.duration} Min </h2>
           </div>
           <div>
               <h2 className='text-sm text-gray-500'>Created On </h2>
               <h2 className='flex text-sm font-bold items-center gap-3 '><Calendar className='h-4 w-4' /> { moment (interviewDetail?.created_at).format('DD MM yyyy')}</h2>
           </div>
           <div>
               <h2 className='text-sm text-gray-500'>Type</h2>
               { interviewDetail?.type && <h2 className='flex text-sm font-bold items-center gap-3 '>
                  <Clock className='h-4 w-4' /> 
                  {JSON.parse(interviewDetail?.type)}
               </h2>}
           </div>
       </div>
        <div className='mt-6'>
           <h2 className='font-bold'>Job Description</h2>
           <p className='text-sm leading-6'>{interviewDetail?.jobdescription}</p>
        </div>

        <div className='mt-5 '> 
          <h2 className='font-bold'>Interview Questions</h2>
              <div className='grid grid-col-2 gap-3 mt-3'>
                   {interviewDetail?.questionList.map((item, index) => (
                    <h2 key={item?.question || index} className='text-xs flex'>
                        <MessageCircleQuestion className='h-4 w-4 text-primary' /> {index + 1}. {item?.question}
                    </h2>
                    ))}

              </div>
        </div>

    </div>
  )
}

export default InterViewDetailContainer
