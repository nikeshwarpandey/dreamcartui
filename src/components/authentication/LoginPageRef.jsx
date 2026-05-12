import React, { useRef } from 'react'
import './LoginPage.css'

const LoginPageRef = () => {
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        console.log(nameRef)
        console.log(nameRef.current.value)
        console.log(phoneRef.current.value)
        const user = {
            name: '',
            phone: ''
        };
        user.name = nameRef.current.value;
        user.phone = parseInt(phoneRef.current.value);
        console.log('user...', user)

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
                            ref={nameRef}
                            id="name"
                            className='form_text_input'
                            placeholder='Enter your name'
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone Number</label>
                        <input
                            type='number'
                            ref={phoneRef}
                            id='phone'
                            className='form_text_input'
                            placeholder='Enter your phone number'
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

export default LoginPageRef