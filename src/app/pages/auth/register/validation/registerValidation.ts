type RegisterForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
};

export type RegisterErrors = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

export function validateRegisterForm(
    form: RegisterForm
): RegisterErrors{
    const errors: RegisterErrors = {
        name: '',
        email: '',
        password:'',
        confirmPassword:'',
    };

    if(form.name === ''){
        errors.name = 'This field must be filled';
    } else if(form.name.length < 6){
        errors.name = 'Name must be more than 6 letters';
    }

    if(form.email === ''){
        errors.email = 'This field must be filled';
    } else if(form.name.length < 8){
        errors.email = 'Name must be more than 8 letters';
    } else if(form.name.includes('@')){
        errors.email = 'This section must contain @ ex: example@gmail.com'
    }

    if(form.password === ''){
        errors.password = 'This field must be filled';
    } else if(form.password.length < 6){
        errors.password = 'Name must be more than 6 letters';
    }

    if(form.confirmPassword === ''){
        errors.confirmPassword = 'This field must be filled';
    } else if(form.confirmPassword.length < 6){
        errors.confirmPassword = 'Name must be more than 6 letters';
    } else if(form.confirmPassword !== form.password){
        errors.confirmPassword = 'Password and Confirm Password must be same'
    }

    return errors;
}