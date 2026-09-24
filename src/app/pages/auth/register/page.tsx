'use client';

import Link from 'next/link';
import { useRegister } from './hooks/useRegister';

export default function Register() {

    const { name, email, password, confirmPassword, validateErrors, isLoading, setName, setEmail, setPassword, setConfirmPassword, handleRegister,} = useRegister();

    return (    
        <div  className='flex justify-center items-center flex-col min-h-screen'>
            <div className='flex flex-col gap-4 bg-surface hover:bg-surface-hover p-10 border-primary-text border-1 rounded-xl'>
                <h1 className='text-2xl font-bold text-primary-text self-center'>MyMovie</h1>
                {/* <p className='text-primary-text self-center'>Collection of your favorite movie</p> */}
                <h1 className='text-2xl font-bold text-primary-text self-center'>Register</h1>
                <div>
                    <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full' 
                    placeholder='Your name' type="text" name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
                    {validateErrors.name &&(
                        <p className='text-negative m-0'>{validateErrors.name}</p>
                    )}
                </div>

                <div>
                    <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full' 
                    placeholder='Your Email'
                    type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {validateErrors.email &&(
                        <p className='text-negative m-1'>{validateErrors.email}</p>
                    )}
                </div>
                {/* <h3 className='m-0 text-2xl text-primary-text'>Email</h3> */}
                {/* <h3 style={{margin:'0'}}>Password</h3> */}

                <div>
                    <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                    placeholder='Your Password'
                    type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {validateErrors.password &&(
                        <p className='text-negative m-1'>{validateErrors.password}</p>
                    )}
                </div>
                {/* <h3 style={{margin:'0'}}>Confirm Password</h3> */}
                <div>
                    <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                    placeholder='Confirm Password'
                    type="password" name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    {validateErrors.confirmPassword &&(
                        <p className='text-negative m-1'>{validateErrors.confirmPassword}</p>
                    )}
                </div>
                <button 
                className='bg-primary-text text-background rounded-xl font-thin w-full p-2 self-center hover:bg-background hover:cursor-pointer hover:text-primary-text'
                onClick={handleRegister}>Register</button>
                <p className='text-primary-text'>Already have account ? <Link className='text-positive-text hover:text-positive-text-hover' href='/pages/auth/login'>Go to Login Page</Link></p>
            </div>
            {/* <button onClick={goToLogin}>Go to login</button> */}
        </div>
    )
}