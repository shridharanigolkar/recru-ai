'use client'
import { UserDetailContext } from '@/context/UserDeatailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
function Provider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const CreateNewUser = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser()
      const user = authData?.user

      if (!user) return

      // Check if user already exists
      const { data: existingUsers, error: selectError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.email)

      if (selectError) {
        console.error('Error selecting user:', selectError)
        return
      }

      if (existingUsers.length === 0) {
        const { data: insertedUser, error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: user.user_metadata?.name || 'No Name',
              email: user.email,
              picture: user.user_metadata?.picture || '',
            },
          ])
          .select() // returns inserted row(s)

        if (insertError) {
          console.error('Error inserting user:', insertError)
        } else {
          console.log('Inserted new user:', insertedUser)
          setUser(insertedUser[0])
        }
      } else {
        console.log('User already exists:', existingUsers[0])
        setUser(existingUsers[0])
      }
    }

    CreateNewUser()
  }, [])

  return (
     <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
    </PayPalScriptProvider>
  )
}

export default Provider
export const useUser = () =>{
  const context = useContext(UserDetailContext);
  return context;
}