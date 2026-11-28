type LoginForm = {
    email: string;
    password: string;
}

export type LoginErrors = {
    email: string;
    password: string;
}

export function validateLoginForm(form: LoginForm): LoginErrors{
    const errors: LoginErrors = {
        email:'',
        password:'',
    };

    if(form.email === ''){
        errors.email = 'This field must be filled';
    } else if(form.email.length < 8){
        errors.email = 'Email must be more than 8 letters';
    } else if(!form.email.includes('@')){
        errors.email = 'This section must contain @ ex: example@gmail.com'
    }

    if(form.password === ''){
        errors.password = 'This field must be filled';
    }

    return errors;
}