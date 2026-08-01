'use client'
import React, { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase/Init'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email:"",
        password:"",
    })

    const handleLogin = async()=>{
        const newErrors = {
            email:"",
            password:"",
        };

        let isValid = true;

        if(email === ""){
            newErrors.email = "This field must be filled";
            isValid = false;
        } else if(!email.includes('@')){
            newErrors.email = "This section must contain @ ex: example@gmail.com"
            isValid = false;
        }

        if(password === ""){
            newErrors.password = "This field must be filled";
            isValid = false;
        } 

        setErrors(newErrors);

        if(!isValid) return;

        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(`Sign in Success`);

            router.push(`/`);
        } catch (error) {
            console.log(`Error ${error}`);
        }
        


    }
    

    return (
            <div>
                <div>
                    <h1>Login Page</h1>
                    <h3 style={{margin:'0'}}>Email</h3>
                    <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {errors.email &&(
                        <p>{errors.email}</p>
                    )}
                    <h3 style={{margin:'0'}}>Password</h3>
                    <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {errors.password &&(
                        <p>{errors.password}</p>
                    )}
                    <button onClick={handleLogin}>Login</button>
                    <p>Don't have account ? <Link href='/pages/auth/register'>Go to Register Page</Link></p>
                </div>
                {/* <button onClick={goToLogin}>Go to login</button> */}
            </div>
    )
}
