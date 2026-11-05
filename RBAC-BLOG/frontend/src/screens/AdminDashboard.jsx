import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function AdminDashboard() {

  // currnet user
  const [userdata, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || [];
  });

  console.log(userdata);


  const titleRef = useRef(null)
  const descriptionRef = useRef(null)


  const handleAddBlog = async (blogDAta) => {
    try {

      const res = await axios.post("http://localhost:3000/api/addblog", blogDAta, {
        withCredentials: true
      })

      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmite = () => {

    const blogDAta = {
      title: titleRef.current.value,
      description: descriptionRef.current.value
    }

    console.log(blogDAta)

    handleAddBlog(blogDAta)

  }


  // blog fetchin

  const [allBlog, setAllBlog] = useState([])

  const handleBLogFetchig = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getblog", {
        withCredentials: true
      })

      setAllBlog(res.data.data)

      console.log("blogss", res.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleBLogFetchig()
  }, [])

  const handleLikeBlog = async(likeData) =>{
    try {

      const res = await axios.post("http://localhost:3000/api/likeblog",likeData,{
        withCredentials:true
      })

      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  }


  const handleLikeSubmite =  (blogId) =>{

    const likeData = {
      _id: blogId
    }

    console.log(likeData)

    handleLikeBlog(likeData)
  }

  return (
    <div>

      {/* navbar */}
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


      {/* add blog section */}
      <div className='contener vh-25 mt-3 d-flex justify-content-center  '>
        <div className=' w-75 shadow p-3 rounded '>
          <h3 className='text-center'> ADD BLOG</h3>

          <div className='d-flex'>

            <div className='d-flex flex-column  w-25 mx-5'>
              <label className='m-1 ' htmlFor=""> enter title :</label>
              <input ref={titleRef} className='h-75 p-1 rounded ' type="text" placeholder='enter title' />
            </div>

            <div className='d-flex flex-column w-25 mx-4'>
              <label htmlFor="" className='m-1'> enter descrption :</label>

              <textarea ref={descriptionRef} className=' w-100 rounded' placeholder='enter description' name="" id=""></textarea>
            </div>

            <div className='d-flex justify-content-center  w-25 mx-4    align-items-center'>
              <button onClick={() => {
                console.log("blog added")

                handleSubmite()
              }} className='btn btn-outline-primary mt-4 w-100'>
                ADD Blog
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* fetching blogs */}

      <div className='mt-4 '>
        <div className=' p-5'>
          <h3 className='text-center'> All Blogs</h3>

          <div className=' d-flex justify-content-center flex-wrap'>
            {

              allBlog.map((blog) => {
                return (
                  <div className="col-md-4 mb-4 m-2" key={blog._id}>

                    <div className="card shadow h-100">

                      <div className="card-body">

                        <h4 className="card-title">
                          {blog.title}
                        </h4>

                        <p className="card-text text-secondary">
                          {blog.description}
                        </p>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <small className="text-muted">
                            Author: {blog.autherId}
                          </small>

                          <button onClick={() => {
                            handleLikeSubmite(blog._id)
                          }} className="badge bg-primary">
                            Likes: {blog.like?.length || 0}
                          </button>
                        </div>

                        <div className="mt-3">
                          <small className="text-muted">
                            Created: {
                              new Date(blog.createdAt)
                                .toLocaleDateString()
                            }
                          </small>
                        </div>

                      </div>

                    </div>

                  </div>
                )
              })
            }

          </div>
        </div>
      </div>


    </div>
  )
}
