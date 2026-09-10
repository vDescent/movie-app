'use client';

import { useState } from "react";
import { validateRegisterForm } from "../validation/registerValidation";
import { registerUser } from "../services/registerUser";

export function useRegister(){
    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error state
    const [validateErrors, setValidateErrors]= useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // register

    const handleRegister = async () =>{

        // 1. validate form
        const errors = validateRegisterForm({name, email, password, confirmPassword});
        setValidateErrors(errors);

        // 2. check whether there is an error
        const hasError = Object.values(errors).some((error) => error !== '');

        if(hasError){
            return;
        }

        // 3. register firebase
        try{
            setIsLoading(true);

            await registerUser({name, email, password});

            alert('Success, now go to login and login with your account');
        } catch (error){
            console.error(error);

            alert(`Error Message: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return{name,email,password,confirmPassword, validateErrors, isLoading, setName, setEmail, setPassword, setConfirmPassword, handleRegister};
}