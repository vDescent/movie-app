'use client'
import { useLogin } from './hooks/useLogin'
import Link from 'next/link'

export default function LoginPage() {
    const { email, password, validateErrors, isLoading, authError, setEmail, setPassword, handleLogin} = useLogin();

    return (
            <div className='flex justify-center items-center flex-col min-h-screen'>
                <div className='flex flex-col gap-4 bg-surface hover:bg-surface-hover p-10 border-primary-text border-1 rounded-xl'>
                    <h1 className='text-2xl self-center text-primary-text font-bold'>MyMovie</h1>
                    <h1 className='text-2xl self-center text-primary-text font-bold'>Login</h1>
                    <div>
                        <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                        type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email'/>
                        {validateErrors.email &&(
                            <p className='text-negative m-1'>{validateErrors.email}</p>
                        )}
                        {authError &&(
                            <p className='text-negative m-1'>{authError}</p>
                        )}

                    </div>
                    {/* <h3 style={{margin:'0'}}>Password</h3> */}

                    <div>
                        <input className='bg-background text-primary-text p-2 pl-4 placeholder-primary-text border-border border-1 rounded-lg w-full'
                        type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
                        {validateErrors.password &&(
                            <p className='text-negative m-1'>{validateErrors.password}</p>
                        )}
                        {authError &&(
                            <p className='text-negative m-1'>{authError}</p>
                        )}
                    </div>
                    <button className='bg-primary-text text-background rounded-xl font-thin w-full p-2 self-center hover:bg-background hover:cursor-pointer hover:text-primary-text disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isLoading}
                    onClick={handleLogin}>Login</button>
                    <p>Don't have account ? <Link className='text-positive-text hover:text-positive-text-hover' href='/pages/auth/register'>Go to Register Page</Link></p>
                </div>
                {/* <button onClick={goToLogin}>Go to login</button> */}
            </div>
    )
}
