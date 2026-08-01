"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/Init"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps{
    children: ReactNode
}

export default function ProtectedRoute({children}:ProtectedRouteProps){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(!user){
                router.replace("/pages/auth/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if(loading) {
        return <h2>Loading...</h2>
    };

    return children;
}