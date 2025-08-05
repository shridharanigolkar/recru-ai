// import { Loader, Loader2Icon } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';

// function QuestionsList({formData}) {
//   function GenerateQuestionList({formData}){
// const [loading, setLoading] = useState(true);


//   useEffect(()=>{
//    if(formData){
//     GenerateQuestionList();
//    }
//   },[formData])
   
//   const GenerateQuestionList = async () => {
//     setLoading(true);
//     try{
//       const result = await axios.post('/api/ai-model',{
//       ...formData
//     })
//     console.log(result.data);
//     setLoading(false);
//     }catch(e){
//       toast('server error try again');
//       setLoading(false);
//     }
   
// }

//   }
//   return (
//     <div>
//      {loading && <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>

//       <Loader2Icon className='animate-spin' />
//       <div>
//         <h2>Generating Interview Questions </h2>
//         <p>our AI is crafting personalizes questions based on your job description</p>
//       </div>
//      </div>}
//     </div>
//   )
// }

// export default QuestionsList


'use client';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListConatiner from './QuestionListConatiner';
import { useUser } from '@/app/Provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';

function QuestionsList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestions] = useState([]);
 const{user} = useUser();
 const[saveLoading,setSaveLoading] = useState(false);
  useEffect(() => {
    if (formData) {
      generateQuestions();
    }
  }, [formData]);


  const generateQuestions = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });
      // console.log(result.data);
      // const Content = result.data.content;
      // const FINAL_CONTENT = Content.replace('"```json','').replace('```','');

      // setQuestions(JSON.parse(FINAL_CONTENT)); // assuming API returns an array

      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace(/```json|```/g, '').trim();

      try {
       const parsed = JSON.parse(FINAL_CONTENT);
      const questionsArray = parsed?.interviewQuestions ?? [];

      setQuestions(Array.isArray(questionsArray) ? questionsArray : []);
        console.log(questionsArray);
      } catch (err) {
        toast.error("Couldn't parse questions from AI response.");
        console.error('JSON parsing error:', err);
      }

    } catch (e) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const onFinish = async ()=>{
    setLoading(true);
   const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('interviews')
      .insert([
        { 
          ...formData,
          questionList:questionList,
          userEmail : user?.email,
          interview_id : interview_id

         },
      ])
      .select()
      setLoading(false);
      console.log(data);    
      onCreateLink(interview_id)   
  } 



  return (
    <div>
      {loading ? (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2>Generating Interview Questions</h2>
            <p>Our AI is crafting personalized questions based on your job description...</p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Generated Questions:</h3>
          <ul className="list-disc ml-6">
            
          </ul>
        </div>
      )}

      {questionList?.length > 0 &&

      <div>
         <QuestionListConatiner questionList={questionList} />
        
      </div>
         
      }
      <div className='flex justify-end mt-10'>
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2  className='animated-spin'/>}
          Create Interview Link</Button>
      </div>


    </div>
  );
}

export default QuestionsList;
