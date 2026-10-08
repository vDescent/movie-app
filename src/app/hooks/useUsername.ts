"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Init";
import GetUserName from "../services/GetUserName";

export default function useUserName(){
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user) =>{
            if(!user){
                setName(null);
                setLoading(false);
                return;
            }

            try{
                const userName = await GetUserName(user.uid);
                setName(userName);
            } catch (error){
                console.error("Failed to fetch username:", error);
                setName(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return{name, loading};
}