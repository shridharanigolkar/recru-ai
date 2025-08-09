// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// // Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function LogoutCard() {
//   const [userData, setUserData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchUser() {
//       // Step 1: Get logged-in auth user
//       const { data: authData } = await supabase.auth.getUser();
//       const authUser = authData?.user;

//       if (!authUser) {
//         router.push("/"); // Redirect if not logged in
//         return;
//       }

//       // Step 2: Fetch user record from Users table
//       let { data: Users } = await supabase
//         .from("Users")
//         .select("*")
//         .eq("email", authUser.email)
//         .single();

//       if (Users) {
//         setUserData(Users);
//       }
//     }

//     fetchUser();
//   }, [router]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push("/"); // Go back to homepage
//   };

//   if (!userData) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>Account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//         </CardContent>
//         <CardFooter>
//           <Button variant="destructive" className="w-full" onClick={handleLogout}>
//             Logout
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      // 1. Get logged-in auth user
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData?.user;

      if (!authUser) {
          toast('No user first login')
        router.push("/"); // redirect if no user
      
        return;
      }

      // 2. Fetch record from Users table
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
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
