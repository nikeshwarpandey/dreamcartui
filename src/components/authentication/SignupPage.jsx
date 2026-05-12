import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import "./SignupPage.css";
import user from "../../assets/user.webp";
import { getUser, signUp } from '../../services/userServices';
import { Navigate, useNavigate } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(3, { message: "Name should be at least 3 character" }),
    email: z.string().email({ message: "Please enter valid email address" }).min(3),
    password: z.string().min(8, { message: "Password should be at least 8 character." }),
    confirmpassword: z.string(),
    deliveryaddress: z.string().min(10, { message: "Enter valid address" })
}).refine(data => data.password === data.confirmpassword, {
    message: "Confirm password should be equal to password",
    path: ["confirmPassword"]
})

const SignupPage = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null)
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    console.log('errors...', errors)


    const handleSignupSubmit = async (formData) => {
        console.log('formData....', formData)
        try {
            await signUp(formData, profilePic)
            // localStorage.setItem('token', res.data.token)
            // navigate('/')
            window.location = '/';
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log('err...', err)
                setError(err.response.data.message)
            }
        }
    }
    console.log('profilePic....', profilePic)

    if (getUser()) {
        return <Navigate to="/" />
    }

    return (
        <section className='align_center form_page'>
            <form className='authentication_form signup_form' onSubmit={handleSubmit(handleSignupSubmit)}>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input type='file' id='file-ip-1' className='image_input'
                        onChange={e => setProfilePic(e.target.files[0])} />
                </div>

                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name", { required: true, minLength: 3 })}
                        />
                        {errors.name && (<em className="form_error">{errors.name.message}</em>)}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email", { required: true, minLength: 3 })}
                        />
                        {errors.email && (<em className="form_error">{errors.email.message}</em>)}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", { required: true, minLength: 8 })}
                        />
                        {errors.password && (<em className="form_error">{errors.password.message}</em>)}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("confirmpassword", { required: true, minLength: 8 })}
                        />
                        {errors.confirmPassword && (<em className="form_error">{errors.confirmPassword.message}</em>)}
                    </div>

                    <div className='signup_textares_section'>
                        <label htmlFor='deliveryaddress'>Delivery Address</label>
                        <textarea
                            id='deliveryaddress'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("deliveryaddress", { required: true, minLength: 10 })}
                        />
                        {errors.deliveryaddress && (<em className="form_error">{errors.deliveryaddress.message}</em>)}
                    </div>
                </div>
                {error && <em className='form_error'>{error}</em>}
                <button className='search_button form_submit' type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
