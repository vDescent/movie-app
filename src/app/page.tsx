"use client"
// import Image from "next/image";
// ini nanti bakalan jadi home protected route user and admin only, unauth gaboleh.
// import app from "./firebase/Init";
import ProtectedRoute from "./utils/ProtectedRoute";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/Init";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async ()=>{
    try{
      await signOut(auth);
      router.replace("/pages/auth/login")
      console.log("Logout berhasil");
    } catch(error) {
      console.error("Logout gagal:", error);
      
    }
  }
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <p>10 Movies and pagination</p>
          <p>Bulk movie via checkbox, and add to collection, then there is a modal to select what collection that user has, if user dont have collection yet in that modal user can create collection.</p>
          <p>But feature to create Collection is available either user have collection or not</p>
          <button onClick={handleLogout} className="cursor-pointer">Logout</button>
        </main>
      </div>
    </ProtectedRoute>
  );
}
