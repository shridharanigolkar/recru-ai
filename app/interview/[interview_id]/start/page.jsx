// 'use client'
// import { InterviewDataContext } from '@/context/InterviewDataContext'
// import React, { useContext, useEffect,useMemo,useRef, useState } from 'react'
// import { Mic, Timer } from 'lucide-react';
// import Image from 'next/image';
// import { Phone } from 'lucide-react';
// import Vapi from '@vapi-ai/web';
// import AlertConfirmtaion from './_components/AlertConfirmtaion';
// import { toast } from 'sonner'

// function StartInterview() {
//     const{interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//     const[activeUser,setActiveUser]=useState(false);
//     const[conversation,setConversation]=useState();

//     useEffect(()=>{
//         interviewInfo&&startCall();
//     },[interviewInfo])
//     const startCall = () =>{
//       let questionList;
//       interviewInfo?.interviewData?.questionList.forEach((item,index)=>{

//         questionList = item?.question + "," + questionList;
//       });
//      const assistantOptions = {
//                   name: "AI Recruiter",
//                   firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.jobPosition+" ?",
//                   transcriber: {
//                     provider: "deepgram",
//                     model: "nova-2",
//                     language: "en-US"
//                   },
//                   voice: {
//                     provider: "playht",
//                     voiceId: "jennifer"
//                   },
//                   model: {
//                             provider: "openai",
//                             model: "gpt-4",
//                             messages: [ {
//                                   role: "system",
//                                   content: `You are an AI voice assistant conducting interviews.
//                                   Your job is to ask candidates provided interview questions, assess their responses.
//                                   Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example: "Hey there! Welcome to your `+interviewInfo?.interviewData?.jobPosition+` interview. Let's get started with a few questions!
//                                   Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are
//                                   the questions ask one by one:
//                                   If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
//                                   Questions: `+questionList+`
//                                   "Need a hint? Think about how React tracks component updates!"
//                                   Provide brief, encouraging feedback after each answer. Example:
//                                   "Nice! That's a solid answer."
//                                   " Hmm, not quite! Want to try again?"
//                                   Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
//                                   After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
//                                   " End on a positive note:
//                                   That was great! You handled some tough questions well. Keep sharpening your skills!"
//                                   "Thanks for chatting! Hope to see you crushing projects soon!"
//                                   Key Guidelines:
//                                   Be friendly, engaging, and witty
//                                   Keep responses short and natural, like a real conversation
//                                   Adapt based on the candidate's confidence level Ensure the interview remains focused on React
//                                   `.trim(),
//                             },
//                             ],
//                   },
//      };
//     vapi.start(assistantOptions);


//     }

//     const stopInterview = () =>{
//       vapi.stop();
//     }


//      vapi.on("call-start",()=>{
//      console.log("Callhas started");
//      toast('Call Connected..')
//     });


//     vapi.on("speech-start",()=>{
//      console.log("Assistant speech has started");
//      setActiveUser(false);
//     });

//      vapi.on("speech-end",()=>{
//      console.log("Assistant speech has ended");
//      setActiveUser(true);
//     });

    


//      vapi.on("call-end",()=>{
//      console.log("Call has ended");
//      toast('Interview Ended..');
//      GenerateFeedback();
//     });

//     vapi.on("message",(message) =>{
//       console.log(message?.conversation);
//       setConversation(message?.conversation);
//     });

//     const GenerateFeedback = async ()=>{
//         const result = await axios.post('api/ai-feedback',{
//          conversation:conversation
//         });
//         console.log(result?.data);
//         const Content = result.data.content;
//         const FINAL_CONTENT = Content.replace('```json```').replace('```','');
//         //save to databse
//         console.log(FINAL_CONTENT);
        

        
//     }



//   return (
//     <div className='p-20 lg:px-48 xl:px-56'>
//         <h2 className=' font-bold text-xl flex justify-between'>AI Interview Session
//           <span className='flex gap-2 items-center'>
//             <Timer/>
//             00:00:00
//           </span>

//         </h2>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
//            <div className='bg-white h-[400px] rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
//              <div className='relative'>
//                 {!activeUser&& <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
//                   <Image
//                     src={'/ai.png'}
//                     alt='ai'
//                     width={100}
//                     height={100}
//                     className='w-[60px] h-[60px] rounded-full object-cover'
//                   />
//              </div>
//                 <p className='mt-3 text-lg font-semibold'>AI Recruiter</p>
//            </div>
//             <div className='bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center'>
//               <div className='relative'>
//                 {!activeUser&& <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
//                      <div className='w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold'>
//                      {interviewInfo?.userName?.[0] ?? "?"}</div>
//               </div>
//               <p className='mt-3 text-lg font-semibold'>{interviewInfo?.userName}</p>
//             </div>
//         </div>
//         <div className='flex items-center gap-5 justify-center mt-7'>
//           <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
//           <AlertConfirmtaion stopInterview={()=>stopInterview()}>
//           <Phone className='h-12 w-12 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer'/>
//           </AlertConfirmtaion>
//         </div>
//         <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress</h2>
//     </div>
//   )
// }
// export default StartInterview



//----------------------------------------
//--genearting feed back fails but end call is working correctly 

// 'use client';

// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Mic, Timer, Phone } from 'lucide-react';
// import Image from 'next/image';
// import Vapi from '@vapi-ai/web';
// import AlertConfirmtaion from './_components/AlertConfirmtaion';
// import { toast } from 'sonner';

// function StartInterview() {
//   const { interviewInfo } = useContext(InterviewDataContext);
//   const vapiRef = useRef(null);
//   const [activeUser, setActiveUser] = useState(false); // true = user speaking
//   const [remainingTime, setRemainingTime] = useState(0); // in seconds
//   const timerRef = useRef(null);
//   const callStartedRef = useRef(false);

//   // Format seconds to HH:MM:SS
//   const formatTime = (sec) => {
//     const hrs = Math.floor(sec / 3600);
//     const mins = Math.floor((sec % 3600) / 60);
//     const secs = sec % 60;
//     return [hrs, mins, secs].map((v) => v.toString().padStart(2, '0')).join(':');
//   };

//   useEffect(() => {
//     if (!interviewInfo) return;

//     const initialDuration = parseInt(interviewInfo?.interviewData?.duration || 0, 10);
//     setRemainingTime(initialDuration * 60); // assuming duration is in minutes

//     if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
//       vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//     }

//     const vapi = vapiRef.current;
//     startCall(vapi);

//     const handleCallStart = () => {
//       console.log('✅ Call has started');
//       toast('Call Connected...');
//       callStartedRef.current = true;
//     };

//     const handleSpeechStart = () => {
//       console.log('🗣️ Assistant speech started');
//       setActiveUser(false); // pause timer
//     };

//     const handleSpeechEnd = () => {
//       console.log('✅ Assistant speech ended');
//       setActiveUser(true); // resume timer
//     };

//     const handleCallEnd = () => {
//       console.log('❌ Call has ended');
//       toast('Interview Ended');
//       stopTimer();
//       callStartedRef.current = false;
//     };

//     const handleMessage = (message) => {
//       console.log('📥 Message received:', message);
//     };

//     vapi.on('call-start', handleCallStart);
//     vapi.on('speech-start', handleSpeechStart);
//     vapi.on('speech-end', handleSpeechEnd);
//     vapi.on('call-end', handleCallEnd);
//     vapi.on('message', handleMessage);

//     return () => {
//       vapi.off('call-start', handleCallStart);
//       vapi.off('speech-start', handleSpeechStart);
//       vapi.off('speech-end', handleSpeechEnd);
//       vapi.off('call-end', handleCallEnd);
//       vapi.off('message', handleMessage);
//       stopTimer();
//     };
//   }, [interviewInfo]);

//   // ⏱️ Timer effect: decrease time only when user is active
//   useEffect(() => {
//     if (activeUser && callStartedRef.current) {
//       if (!timerRef.current) {
//         timerRef.current = setInterval(() => {
//           setRemainingTime((prev) => {
//             if (prev <= 1) {
//               clearInterval(timerRef.current);
//               timerRef.current = null;
//               vapiRef.current?.stop(); // End call automatically
//               toast('⏳ Interview time is up. Ending call.');
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
//       }
//     } else {
//       stopTimer();
//     }

//     return () => stopTimer();
//   }, [activeUser]);

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   const startCall = (vapi) => {
//     let questionList = '';
//     interviewInfo?.interviewData?.questionList?.forEach((item) => {
//       questionList += item?.question + ', ';
//     });

//     const assistantOptions = {
//       name: 'AI Recruiter',
//       firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
//       transcriber: {
//         provider: 'deepgram',
//         model: 'nova-2',
//         language: 'en-US',
//       },
//       voice: {
//         provider: 'playht',
//         voiceId: 'jennifer',
//       },
//       model: {
//         provider: 'openai',
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'system',
//             content: `You are an AI voice assistant conducting interviews.
//             Ask questions one by one from the list below:
//             ${questionList}
//             Be helpful and professional. End the interview politely after 5-7 questions.`,
//           },
//         ],
//       },
//     };

//     vapi.start(assistantOptions);
//   };

//   const stopInterview = () => {
//     vapiRef.current?.stop();
//   };

//   return (
//     <div className='p-20 lg:px-48 xl:px-56'>
//       <h2 className='font-bold text-xl flex justify-between'>
//         AI Interview Session
//         <span className='flex gap-2 items-center'>
//           <Timer />
//           {formatTime(remainingTime)}
//         </span>
//       </h2>

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
//         <div className='bg-white h-[400px] rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
//           <div className='relative'>
//             {!activeUser && (
//               <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
//             )}
//             <Image
//               src={'/ai.png'}
//               alt='ai'
//               width={100}
//               height={100}
//               className='w-[60px] h-[60px] rounded-full object-cover'
//             />
//           </div>
//           <p className='mt-3 text-lg font-semibold'>AI Recruiter</p>
//         </div>

//         <div className='bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center'>
//           <div className='relative'>
//             {!activeUser && (
//               <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
//             )}
//             <div className='w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold'>
//               {interviewInfo?.userName?.[0] ?? '?'}
//             </div>
//           </div>
//           <p className='mt-3 text-lg font-semibold'>{interviewInfo?.userName}</p>
//         </div>
//       </div>

//       <div className='flex items-center gap-5 justify-center mt-7'>
//         <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
//         <AlertConfirmtaion stopInterview={stopInterview}>
//           <Phone className='h-12 w-12 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer' />
//         </AlertConfirmtaion>
//       </div>

//       <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress</h2>
//     </div>
//   );
// }

// export default StartInterview;

//-------------------------------------------------------------------------------------
'use client';

import { InterviewDataContext } from '@/context/InterviewDataContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Mic, Timer, Phone } from 'lucide-react';
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import AlertConfirmtaion from './_components/AlertConfirmtaion';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const timerRef = useRef(null);
  const callStartedRef = useRef(false);
//--------------------------------------
  const{interview_id}=useParams();
  const router = useRouter();
//------------------------------------
  const [conversation, setConversation] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const assistantBufferRef = useRef('');

  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return [hrs, mins, secs].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  useEffect(() => {
    if (!interviewInfo) return;

    const initialDuration = parseInt(interviewInfo?.interviewData?.duration || 0, 10);
    setRemainingTime(initialDuration * 60);

    if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }

    const vapi = vapiRef.current;
    startCall(vapi);

    const handleCallStart = () => {
      console.log('✅ Call has started');
      toast('Call Connected...');
      callStartedRef.current = true;
    };

    const handleSpeechStart = () => {
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      setActiveUser(true);
    };

    const handleMessage = (message) => {
      console.log('📥 Raw message received:', message);

      // ✅ USER's full voice input
      if (message?.type === 'voice-input' && message.input?.trim()) {
        const userMessage = {
          role: 'user',
          content: message.input.trim(),
        };
        console.log('👤 User message:', userMessage);
        setConversation((prev) => [...prev, userMessage]);
      }

      // ✅ ASSISTANT's streaming output
      if (message?.type === 'model-output' && message.output?.trim()) {
        assistantBufferRef.current += message.output.trim() + ' ';
      }

      // ✅ When assistant speech starts, store full assistant message
      if (
        message?.type === 'speech-update' &&
        message.status === 'started' &&
        message.role === 'assistant'
      ) {
        const fullAssistantMessage = assistantBufferRef.current.trim();

        if (fullAssistantMessage) {
          const assistantMessage = {
            role: 'assistant',
            content: fullAssistantMessage,
          };
          console.log('🤖 Assistant message:', assistantMessage);
          setConversation((prev) => [...prev, assistantMessage]);
          assistantBufferRef.current = '';
        }
      }
    };

    const handleCallEnd = async () => {
      console.log('❌ Call has ended');
      toast('Interview Ended');
      stopTimer();
      callStartedRef.current = false;

      const cleanedConversation = conversation.filter(
        (msg) => msg.content && msg.content.trim() !== ''
      );

      console.log('🧩 Total conversation messages:', cleanedConversation.length);

      const formattedConversation = cleanedConversation
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n');

      console.log('🧾 Final Conversation to send:\n', formattedConversation);

      try {
        const res = await fetch('/api/ai-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversation: cleanedConversation }),
        });

        const data1 = await res.json();
        console.log('🎯 Feedback:', data1);
        //setFeedback(data1.feedback);
    //----------------------------------------
try {
  const cleanJSON = data1.raw.replace(/```json\n|```/g, '').trim();
  const feedbackJSON = JSON.parse(cleanJSON);
  const feedbackObject = feedbackJSON.feedback;

  if (!feedbackObject) {
    console.error('❌ Feedback missing in parsed JSON');
    return;
  }

  setFeedback(feedbackObject);

  const { data, error } = await supabase
    .from('interview-feedback')
    .insert([
      {
        userName: interviewInfo?.userName,
        userEmail: interviewInfo?.userEmail,
        interview_id: interview_id,
        feedback: feedbackObject, // works if column type is jsonb
        recommendation: false,
      },
    ])
    .select();

  if (error) {
    console.error('❌ Supabase insert error:', error);
  } else {
    //console.log('✅ Feedback saved:', data);
    router.replace('/interview/' + interview_id + '/completed');
  }

} catch (err) {
  console.error('❌ JSON parse failed:', err, data1.raw);
}

//---------------------------------------------------
       // toast('✅ Feedback received');
      } catch (error) {
        console.error('❌ Error fetching feedback:', error);
        toast('❌ Failed to get feedback');
      }
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('call-end', handleCallEnd);
    vapi.on('message', handleMessage);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('call-end', handleCallEnd);
      vapi.off('message', handleMessage);
      stopTimer();
    };
  }, [interviewInfo, conversation]);

  useEffect(() => {
    if (activeUser && callStartedRef.current) {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              vapiRef.current?.stop();
              toast('⏳ Interview time is up. Ending call.');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [activeUser]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startCall = (vapi) => {
    let questionList = '';
    interviewInfo?.interviewData?.questionList?.forEach((item) => {
      questionList += item?.question + ', ';
    });

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an AI voice assistant conducting interviews.
              Ask questions one by one from the list below:
              ${questionList}
              Be helpful and professional. End the interview politely after 5-7 questions.`,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapiRef.current?.stop();
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer />
          {formatTime(remainingTime)}
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
          <div className='relative'>
            {!activeUser && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
            )}
            <Image
              src={'/ai.png'}
              alt='ai'
              width={100}
              height={100}
              className='w-[60px] h-[60px] rounded-full object-cover'
            />
          </div>
          <p className='mt-3 text-lg font-semibold'>AI Recruiter</p>
        </div>

        <div className='bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center'>
          <div className='relative'>
            {!activeUser && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
            )}
            <div className='w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold'>
              {interviewInfo?.userName?.[0] ?? '?'}
            </div>
          </div>
          <p className='mt-3 text-lg font-semibold'>{interviewInfo?.userName}</p>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
        <AlertConfirmtaion stopInterview={stopInterview}>
          <Phone className='h-12 w-12 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer' />
        </AlertConfirmtaion>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress</h2>

      {feedback && (
        <div className='mt-10 p-5 bg-green-50 border rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>Feedback Summary</h3>
          <pre className='text-sm whitespace-pre-wrap'>{JSON.stringify(feedback, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default StartInterview;
