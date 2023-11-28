import { validateEmail, validatePassword } from './validators'

const signupErrormsg = {
    duplicateEmail: 'User with this email address already exists.',
    noEmail: "Email is required",
    noPassword: "Password is required",
    validEmail: 'Enter a valid email',
    strongPassword: 'Enter a strong password (At least 8 characters, one number, one Uppercase letter, one Lowecase letter and one symbol'
}

export const signupErrors = (signupValues) => {
    if (!signupValues.email && !signupValues.password){
        return signupErrormsg.noEmail + " and " + signupErrormsg.noPassword
    }
    if (!signupValues.email){
        return signupErrormsg.noEmail
    }
    if (!signupValues.password){
        return signupErrormsg.noPassword
    }
    if (!validateEmail(signupValues.email) && !validatePassword(signupValues.password)){
        return signupErrormsg.validEmail + " and " + "Enter a strong password!"
    }
    if (!validateEmail(signupValues.email)){
        return  signupErrormsg.validEmail
    }
    if (!validatePassword(signupValues.password)){
        return signupErrormsg.strongPassword
    }
    return ''
}

export const loginErrors = (error) =>{

    console.log(error)
    if (error.code && error.code === 11000){
        return errormsg.duplicateEmail
    }
}

