import * as yup from 'yup'

export const signUpSchema = yup.object({
    name: yup.string().min(2).max(50).required("Please Enter your name"),
    email: yup.email,
    password: yup.string().min(8).max(50).required("Please Enter your password"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], "Passwords do not match"),
})