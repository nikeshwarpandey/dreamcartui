import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './SignupPage.css'
import user from '../../assets/user.webp'

const schema = z.object({
    name: z.string().min(3, { message: "Name should be at least 3 character" }),
    email: z.string().email({ message: "Please enter valid email address" }).min(3),
    password: z.string().min(8, { message: "Password should be at least 8 character." }),
    confirmpassword: z.string(),
    deliveryaddress: z.string().min(3, { message: "Enter valid address" })
}).refine(data => data.password === data.confirmpassword, {
    message: "Confirm password should be equal to password",
    path: ["confirmPassword"]
})

const SignupPage = () => {
    const [profilePic, setProfilePic] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    console.log('errors...', errors)


    const handleSignupSubmit = (formData) => {
        console.log('formData....', formData)

    }
    console.log('profilePic....', profilePic)
    return (
        <section>
            <form name="signupform" onSubmit={handleSubmit(handleSignupSubmit)}>
                <div>
                    <div>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id="file-ip-1-preview" />
                    </div>
                    <label htmlFor='file-ip-1'>upload image</label>
                    <input
                        type='file'
                        id="file-ip-1"
                        onChange={e => setProfilePic(e.target.files[0])} />
                </div>

                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Enter your name'
                    {...register("name", { required: true, minLength: 3 })}
                /><br />
                {errors.name && (<em className="form_error">{errors.name.message}</em>)}
                <br />
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter your email'
                    {...register("email", { required: true, minLength: 3 })}
                /><br />{errors.email && (<em className="form_error">{errors.email.message}</em>)}
                <br />
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Enter your password'
                    {...register("password", { required: true, minLength: 8 })}
                /><br />
                {errors.password && (<em className="form_error">{errors.password.message}</em>)}
                <br />
                <label htmlFor='confirmpassword'>Confirm password</label>
                <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder='Enter confirm password'
                    {...register("confirmpassword", { required: true, minLength: 8 })}
                /><br />
                {errors.confirmpassword && (<em className="form_error">{errors.confirmpassword.message}</em>)}
                <br />
                <label htmlFor='deliveryaddress'>Delivery Address</label>
                <textarea
                    type="text"
                    name="deliveryaddress"
                    id="deliveryaddress"
                    placeholder='Enter delivery address'
                    {...register("deliveryaddress", { required: true, minLength: 3 })}
                /><br />
                {errors.deliveryaddress && (<em className="form_error">{errors.deliveryaddress.message}</em>)}
                <br />
                <button type='submit'>Submit</button>
            </form>

        </section>
    )
}

export default SignupPage