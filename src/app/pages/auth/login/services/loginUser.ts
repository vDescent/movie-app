import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/Init";

type LoginUserParams = {
    email: string;
    password: string;
}

export async function loginUser({email, password} : LoginUserParams){
        await signInWithEmailAndPassword(auth, email, password);
        console.log(`Sign in Success`);       
        // router.push(`/`);
        // console.log(`Sign in Error: `,error);
}