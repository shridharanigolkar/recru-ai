
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useToast } from "@/components/mysonner";
export default function SettingsPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToast } = useToast();
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData?.user;

      if (!authUser) {
          toast('No user first login')
        router.push("/"); 
      
        return;
      }
      let { data: userFromDb } = await supabase
        .from("Users")
        .select("*")
        .eq("email", authUser.email)
        .single();

      if (userFromDb) {
        setUserData(userFromDb);
      }

      setLoading(false);
    }

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="p-8 text-center">No account found.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">

          <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
            <div >
              <h2 className='text-lg font-bold'>Welcome Back , {userData.name}</h2>
              <h2 className='text-gray-500'>AI-Driven Interviews , Hassel-Free Hiring</h2>
            </div>
           <Image className='rounded-4xl' src={userData?.picture} alt='userAvatar' width={50} height={50} />
          </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </CardContent>
        <CardFooter>
          <Button   className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
