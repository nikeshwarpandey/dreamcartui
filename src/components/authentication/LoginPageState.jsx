import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './LoginPage.css'

const LoginPageState = () => {
    const rhform = useForm();
    console.log('rhform...', rhform)
    const [loginForm, setLoginForm] = useState({ name: '', phone: '' })

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const user = {
            name: '',
            phone: ''
        };
        user.name = loginForm.name;
        user.phone = parseInt(loginForm.phone);

        console.log('user...', user)

    }
    const handleFormChange = (e) => {

        // console.log('handleFormChange...', e)
        if (e.target.name === 'name') {
            setLoginForm({ ...loginForm, name: e.target.value })
        } else if (e.target.name === 'phone') {
            setLoginForm({ ...loginForm, phone: e.target.value })
        }
        console.log('loginForm....', loginForm);
    }


    return (
        <section className='align_center form_page'>
            <form className='authentication_form' onSubmit={handleLoginSubmit}>
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
                            value={loginForm.name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone Number</label>
                        <input
                            type='number'
                            name="phone"
                            id='phone'
                            className='form_text_input'
                            placeholder='Enter your phone number'
                            value={loginForm.phone}
                            onChange={handleFormChange}
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

export default LoginPageState