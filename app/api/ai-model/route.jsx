// import { NextResponse } from "next/server";
// import OpenAI from "openai"
// import { QUESTIONS_PROMPT } from "@/services/Constonts";
// export async function POST(req){
//     const{jobPosition,jobdescription,duration,type} = await req.json();
 
//     const FINAL_PROMPT = QUESTIONS_PROMPT
//     .replace('{{jobTitle}}',jobPosition)
//     .replace('{{jobDescription}}',jobdescription)
//     .replace('{{duration}}',duration)
//     .replace('{{type}}',type)

//     console.log(FINAL_PROMPT);


    
//      try{
//            const openai = new OpenAI({
//         baseURL:"https://api.deepseek.com",
//         apiKey: process.env.DEEP_SEEK_API_KEY,
//      })
//      const completion = await openai.chat.completions.create({
//         model: "deepseek-chat",
//         messages : [
//             { role : "user" , content : "You are a helpful assistant."}
//         ],
//      })
//      console.log(completion.choices[0].message);
//      return NextResponse.json(completion.choices[0].message)
//      }
//      catch(e){
//         console.log(e);
//         return NextResponse.json(e)
        
//      }
    
     
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QUESTIONS_PROMPT } from "@/services/Constonts";

export async function POST(req) {
  try {
    const { jobPosition, jobdescription, duration, type } = await req.json();

    // Validate required fields
    if (!jobPosition || !jobdescription || !duration || !type) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobdescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    // Setup DeepSeek-compatible OpenAI client
    const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        { role: "user", content: FINAL_PROMPT },

    ],
});

console.log(response.choices[0].message);

    return NextResponse.json(response.choices[0]?.message || {});

  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
