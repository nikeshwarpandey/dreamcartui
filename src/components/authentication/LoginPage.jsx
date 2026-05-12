import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './LoginPage.css'
import { getUser, login } from '../../services/userServices'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = z.object({
    email: z.string().email({ message: "Please enter valid email address" }).min(3),
    password: z.string().min(8, { message: "Password should be at least 8 character." })
})

const LoginPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const location = useLocation();
    console.log("Login location", location);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    console.log('errors...', errors)


    const handleLoginSubmit = async (formData) => {
        console.log('formData....', formData)
        try {
            const data = await login(formData)
            console.log('data', data)
            // localStorage.setItem('token', data.token)
            // navigate('/')
            const { state } = location
            window.location = state ? state.form : '/';
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log('err...', err)
                setError(err.response.data.message)
            }
        }
    }

    if (getUser()) {
        return <Navigate to="/" />
    }

    return (
        <section className='align_center form_page'>
            <form className='authentication_form' onSubmit={handleSubmit(handleLoginSubmit)}>
                <h2>Login Form</h2>
                <div className='form_inputs'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name="email"
                            id="email"
                            className='form_text_input'
                            placeholder='Enter your email address'
                            {...register("email", { required: true, minLength: 3 })}
                        />
                        {errors.email && (<em className="form_error">{errors.email.message}</em>)}

                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name="password"
                            id='password'
                            className='form_text_input'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && (<em className="form_error">{errors.password.message}</em>)}
                    </div>
                    {error && <em className='form_error'>{error}</em>}
                    <button type='submit' className='search_button form_submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section >
    )
}

export default LoginPage