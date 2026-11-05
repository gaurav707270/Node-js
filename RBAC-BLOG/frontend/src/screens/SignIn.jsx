import axios from 'axios'
import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router";

export default function SignIn() {

    const navigate = useNavigate()

    let emailRef = useRef(null)
    let passwordRef = useRef(null)

    const signIn = async (userData) => {
        try {

            const res = await axios.post("http://localhost:3000/api/signin", userData,{
                withCredentials:true
            })

            console.log(res)
            alert("you signIn successfully")

            console.log("res data ", res.data.data.role)

            localStorage.setItem("userData",JSON.stringify(res.data.data))

            if (res.data.data.role == "user") {
                navigate("/userDashboard")
            }

            if (res.data.data.role == "admin") {
                navigate("/adminDashboard")
            }
            
            if (res.data.data.role == "viewer") {
                navigate("/viewerDashboard")
            }


        } catch (error) {
            console.log(error)
            console.log("signin failed")
        }
    }

    const handleSubmit = () => {

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        console.log(userData)

        signIn(userData)
    }

    const handleReSignIn = async() =>{
        try {
            const res = await axios.post("http://localhost:3000/api/refreshtoken",{},{
                withCredentials:true
            })

            console.log(res)

            
            if (res.data.data.role == "user") {
                navigate("/userDashboard")
            }

            if (res.data.data.role == "admin") {
                navigate("/adminDashboard")
            }
            
            if (res.data.data.role == "viewer") {
                navigate("/viewerDashboard")
            }

            
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>

            <div className='d-flex vh-100 justify-content-center position-relative align-items-center flex-column '>

                <button onClick={() =>{
                    handleReSignIn()
                    alert( "user re signIn successfully")
                }} className='position-absolute btn btn-outline-info top-0 end-0 m-5'>ReSignIn</button>

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
