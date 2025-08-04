"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
function Login() {
/**Used to sign with google*/
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
     options: {
    redirectTo: 'http://localhost:3000/', // this forces a clean redirect
  }
  });
  if (error) console.error('OAuth sign-in error:', error.message);
};


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image src ={'/logo.jpeg'} alt ='logo' 
        width={100}
        height={100}
        className='w-[180px]'/>
        <div className='flex flex-col items-center '>
           <Image src ={'/login2.svg'} alt ='logo' 
            width={600}
            height={400}
            className='w-[400px] h-[250px] rounded-2xl'/>
            <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AiRecruiter</h2>
            <p className='text-grey-500 text-center'>Sign In With Google Authentication</p>
            <Button onClick={signInWithGoogle} className='mt-7 w-full'>Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
