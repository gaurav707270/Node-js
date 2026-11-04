import React, { useState } from 'react'

export default function userDashboard() {

  const [userdata, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || [];
  });

  console.log(userdata);

  return (
    <div>
      <nav style={{ height: "65px" }} className=' w-100 bg-secondary d-flex justify-content-between'>
        <div className='d-flex align-items-center justify-content-center w-25'>
          <h4 className=' text-white'>user Deshboard</h4>
        </div>

        <div className='d-flex justify-content-center align-items-center w-25'>
          <div
            style={{
              width: "45px",
              height: "45px"
            }}
            className='rounded-circle bg-black text-white d-flex justify-content-center align-items-center'
          >
            {
              userdata?.userName?.charAt(0).toUpperCase()
            }
          </div>

          <div className='d-flex justify-content-center fs-3 text-white mx-2 align-items-center'>
            {
              userdata.userName
            }
          </div>
        </div>
      </nav>

      <div className='contener vh-25 bg-black'>
      </div>


    </div>
  )
}
