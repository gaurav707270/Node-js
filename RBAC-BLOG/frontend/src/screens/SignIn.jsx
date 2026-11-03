import axios from 'axios'
import React, { useRef } from 'react'
import { Link } from "react-router";

export default function SignIn() {

    let emailRef = useRef(null)
    let passwordRef = useRef(null)

    const signIn = async(userData) => {
        try {

            const res = await axios.post("http://localhost:3000/api/signin",userData)

            console.log(res)
            alert("you signIn successfully")

        } catch (error) {
            console.log(error)
            console.log("signin failed")
        }
    }

    const handleSubmit = () =>{

        const userData = {
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

        console.log(userData)

        signIn(userData)
    }



    return (
        <div>
            <div className='d-flex vh-100 justify-content-center align-items-center'>

                <div className='d-flex flex-column w-25 shadow bg-light p-3 rounded'>

                    <h2 className='text-center mb-2'>SignIn</h2>


                    <div className='my-2'>
                        <label className='fs-5'>Enter Email</label>

                        <input
                            ref={emailRef}
                            className='rounded p-2 w-100'
                            type="email"
                            placeholder='Enter email'
                        />
                    </div>

                    <div className='my-2'>
                        <label className='fs-5'>Enter Password</label>

                        <input
                            ref={passwordRef}
                            className='p-2 w-100 rounded'
                            type="password"
                            placeholder='Enter password'
                        />
                    </div>

                    <div className='my-2 d-flex justify-content-center'>
                        <button
                            onClick={handleSubmit}
                            className='w-50 btn btn-outline-primary'
                        >
                            SignUp
                        </button>
                    </div>

                    <div>
                        <span>You don't have an account? </span>
                        <Link to="/signUp">SignUp</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
