import React from 'react'
import { useEffect } from 'react'
import connectWS from './ws'
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from 'react';
import { useState } from 'react';

export default function App() {

  const scoket = useRef(null)

  const [userName, setUserName] = useState("")


  useEffect(() => {
    scoket.current = connectWS()

    scoket.current.on("connect", () => {
      
    })

  }, [])


  return (
    <div>
      <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='enter userName ' />
      <button onClick={() => {
        alert(userName)
        scoket.current.emit("joinRoom", userName)
      }}>join Room</button>
    </div>
  )
}
