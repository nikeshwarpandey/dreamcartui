import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './LoginPage.css'

const LoginPageRHF = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log('errors...', errors)


    const handleLoginSubmit = (formData) => {
        console.log('formData....', formData)

    }



    return (
        <section className='align_center form_page'>
            <form className='authentication_form' onSubmit={handleSubmit(handleLoginSubmit)}>
                <h2>Login Form</h2>
                <div className='form_inputs'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name="name"
                            id="name"
                            className='form_text_input'
                            placeholder='Enter your name'
                            {...register("name", { required: true, minLength: 3 })}
                        />
                        {errors?.name?.type === "required" && <em em className="form_error">Please enter your name</em>}
                        {errors?.name?.type === "minLength" && <em em className="form_error">Name should be 3 or more characters</em>}
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone Number</label>
                        <input
                            type='number'
                            name="phone"
                            id='phone'
                            className='form_text_input'
                            placeholder='Enter your phone number'
                            {...register("phone", { valueAsNumber: true })}
                        />

                    </div>

                    <button type='submit' className='search_button form_submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section >
    )
}

export default LoginPageRHF