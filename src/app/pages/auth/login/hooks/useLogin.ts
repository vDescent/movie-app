'use client';

import { useState } from "react";
import { validateLoginForm } from "../validation/loginValidation";
import { loginUser } from "../services/loginUser";
import { useRouter } from "next/navigation";

export function useLogin(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validateErrors, setValidateErrors] = useState({
        email:'',
        password:'',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async ()=>{
        // 1. validate form
        const errors = validateLoginForm({email, password});
        setValidateErrors(errors);

        // 2. check whether there is an error
        const hasError = Object.values(errors).some((error) => error !== '');

        if(hasError){
            return;
        }

        // 3. login firebase services
        try{
            setIsLoading(true);
            
            await loginUser({email, password});

            alert('Login success');

            router.push('/');
        } catch (error){
            console.error(error);
            
            alert(`Error Message: ${error}`)
        } finally {
            setIsLoading(false);
        }
    };

    return{email, password, validateErrors, isLoading, setEmail, setPassword, handleLogin};
}