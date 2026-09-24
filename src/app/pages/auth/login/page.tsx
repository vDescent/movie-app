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
            <div className='flex justify-center items-center flex-col min-h-screen'>
                <div className='flex flex-col gap-4 bg-surface hover:bg-surface-hover p-10 border-primary-text border-1 rounded-xl'>
                    <h1 className='text-3xl self-center text-primary-text font-bold'>Login</h1>
                    <h1 className='text-2xl self-center text-primary-text font-bold'>MyMovie</h1>
                    <div>
                        <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                        type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email'/>
                        {errors.email &&(
                            <p className='text-negative m-1'>{errors.email}</p>
                        )}
                    </div>
                    {/* <h3 style={{margin:'0'}}>Password</h3> */}

                    <div>
                        <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                        type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                        {errors.password &&(
                            <p className='text-negative m-1'>{errors.password}</p>
                        )}
                    </div>
                    <button className='bg-primary-text text-background rounded-xl font-thin w-full p-2 self-center hover:bg-background hover:cursor-pointer hover:text-primary-text'
                     onClick={handleLogin}>Login</button>
                    <p>Don't have account ? <Link className='text-positive-text hover:text-positive-text-hover' href='/pages/auth/register'>Go to Register Page</Link></p>
                </div>
                {/* <button onClick={goToLogin}>Go to login</button> */}
            </div>
    )
}
