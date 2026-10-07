"use client";

import { useRouter } from "next/navigation";
import HandleAuthLogout from "../services/HandleAuthLogout";

export default function useLogout(){
    const router = useRouter();

    const logout = async ()=>{
        try{
            await HandleAuthLogout();
            console.log(`Logout success`);
            router.replace("/pages/auth/login");
        } catch (error){
            console.error(`Logout Failed:`, error);
        }
    };

    return logout;
}