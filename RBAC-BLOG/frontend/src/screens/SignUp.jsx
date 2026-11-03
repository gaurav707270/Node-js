
import React, { useRef } from 'react'
import { Link } from "react-router";
import axios from 'axios';

export default function SignUp() {

  const roleRef = useRef(null)
  const userNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const signUp = async (userData) => {
    try {

      console.log("signup started")

      const response = await axios.post(
        "http://localhost:3000/api/signup",
        userData
      )

      console.log(response.data)

      alert("Signup successfully")

    } catch (error) {
      console.log(error.response?.data || error.message)
      console.log("signup failed")
    }
  }

  const handleSubmit = () => {

    const userData = {
      role: roleRef.current.value,
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    console.log(userData)

    signUp(userData)
  }

  return (
    <div>
      <div className='d-flex vh-100 justify-content-center align-items-center'>

        <div className='d-flex flex-column w-25 shadow bg-light p-3 rounded'>

          <h2 className='text-center mb-2'>SignUp</h2>

          <div className='my-2'>
            <label className='fs-5'>Select Role</label>

            <select ref={roleRef} className='p-2 rounded w-100'>
              <option value="">Select Role</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="viewer">viewer</option>
            </select>
          </div>

          <div className='my-2'>
            <label className='fs-5'>Enter UserName</label>

            <input
              ref={userNameRef}
              className='rounded p-2 w-100'
              type="text"
              placeholder='Enter user name'
            />
          </div>

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
            <span>You already have an account? </span>
            <Link to="/">Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
