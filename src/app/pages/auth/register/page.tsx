'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/Init';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/Init';
// import { db } from '../../firebase/Init';
import { doc } from 'firebase/firestore';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validateErrors, setValidateErrors] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    
    const handleRegister = async()=>{
        const newErrors = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
        }

        let isValid = true;

        if(name === ""){
            newErrors.name = "This field must be filled";
            isValid = false;
        } else if(name.length < 6){
            newErrors.name = "Name must be more than 6 letter"
            isValid = false;
        }

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
        } else if(password.length < 6){
            newErrors.password = "Password must be more than 6 letter"
            isValid = false;
        } else if(password !== confirmPassword){
            newErrors.password = "Password and Confirm Password must be same";
            isValid = false;
        }

        if(confirmPassword === ""){
            newErrors.confirmPassword = "This field must be filled";
            isValid = false;
        } else if(confirmPassword.length < 6){
            newErrors.confirmPassword = "Confirm Password must be more than 6 letters"
            isValid = false;
        } else if(confirmPassword !== password){
            newErrors.confirmPassword = "Password and Confirm Password must be same"
            isValid = false;
        }

        setValidateErrors(newErrors);

        if(!isValid) return;

        try{
            const userInfo = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userInfo.user.uid),{name, email, role:"user", createdAt: serverTimestamp()})
            await setDoc(doc(db, "tasks", userInfo.user.uid), {createdAt: serverTimestamp()});
            await setDoc(doc(db, "tasks", userInfo.user.uid, "tasks", "0"),
                {
                    value:"Create your next custom tasks",
                    isDone:false,
                }
            )
            console.log(`firestore success`);
            console.log(userInfo);
            alert(`Success, now go to login and login with your account`);
        } catch (error){
            // can add some UI fallback
            console.log(error);
            alert(`Error Message: ${error}`);
        }
    }



    return (
        <div>
            <div>
                <h1>Register Page</h1>
                <h3 style={{margin:'0'}}>Name</h3>
                <input type="text" name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
                {validateErrors.name &&(
                    <p>{validateErrors.name}</p>
                )}
                <h3 style={{margin:'0'}}>Email</h3>
                <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {validateErrors.email &&(
                    <p>{validateErrors.email}</p>
                )}
                <h3 style={{margin:'0'}}>Password</h3>
                <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {validateErrors.password &&(
                    <p>{validateErrors.password}</p>
                )}
                <h3 style={{margin:'0'}}>Confirm Password</h3>
                <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/> <br />
                {validateErrors.confirmPassword &&(
                    <p>{validateErrors.confirmPassword}</p>
                )}
                <button onClick={handleRegister}>Register</button>
                <p>Already have account ? <Link href='/pages/auth/login'>Go to Login Page</Link></p>
            </div>
            {/* <button onClick={goToLogin}>Go to login</button> */}
        </div>
    )
}