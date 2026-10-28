
import React from 'react'
import { useEffect } from 'react'
import connectWS from './ws'
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from 'react';
import { useState } from 'react';

export default function App() {

  const scoket = useRef(null)

  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    scoket.current = connectWS()

    scoket.current.on("connect", () => {
      scoket.current.on("roomNotice", (userName) => {
        setMessages((prev) => [
          ...prev,
          { type: "notice", text: `${userName} is joined group` }
        ])
      })

      scoket.current.on("chatMessage", (msg) => {
        setMessages((prev) => [...prev, msg])
      })
    })

    return () => {
      scoket.current?.disconnect()
    }
  }, [])

  return (
    <div className="container-fluid vh-100 p-0 bg-light">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 text-white"
        style={{ backgroundColor: "#075e54" }}>
        <h3 className="mb-0">💬 WhatsApp Chat</h3>
        <span>🟢 Online</span>
      </div>

      <div className="row g-0" style={{ height: "calc(100vh - 65px)" }}>

        {/* Sidebar */}
        <div className="col-md-4 col-lg-3 bg-white border-end p-3">

          <h5 className="mb-3">Sign In</h5>

          <input
            className="form-control mb-3"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />

          <button
            className="btn w-100 text-white mb-4"
            style={{ backgroundColor: "#128c7e" }}
            onClick={() => {
              scoket.current.emit("joinRoom", userName)
            }}
          >
            Join Room
          </button>

          <hr />

          <h5 className="mb-3">Chat Messages</h5>

          <div className="list-group">
            {messages.map((msg, index) => (
              <div className="list-group-item" key={index}>
                {typeof msg === "string"
                  ? msg
                  : msg.type === "notice"
                    ? msg.text
                    : msg.message || JSON.stringify(msg)}
              </div>
            ))}
          </div>

        </div>

        {/* Chat Area */}
        <div className="col-md-8 col-lg-9 d-flex flex-column">

          {/* Chat Header */}
          <div className="bg-white border-bottom p-3">
            <h5 className="mb-1">Group Chat</h5>
            <small className="text-success">Online</small>
          </div>

          {/* Messages */}
          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{ backgroundColor: "#efeae2" }}
          >
            {messages.map((msg, index) => {

              const isNotice = msg?.type === "notice"

              const text = typeof msg === "string"
                ? msg
                : isNotice
                  ? msg.text
                  : msg.message || JSON.stringify(msg)

              return (
                <div key={index} className="mb-3">

                  {isNotice ? (
                    <div className="text-center">
                      <span className="badge bg-white text-secondary shadow-sm p-2">
                        {text}
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <div
                        className="p-3 rounded shadow-sm"
                        style={{
                          backgroundColor: "#d9fdd3",
                          maxWidth: "75%",
                          overflowWrap: "anywhere"
                        }}
                      >
                        <div>{text}</div>
                        <small className="text-secondary d-block text-end mt-1">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </small>
                      </div>
                    </div>
                  )}

                </div>
              )
            })}
          </div>

          {/* Message Input */}
          <div className="bg-white border-top p-3">
            <div className="d-flex gap-2">

              <input
                className="form-control rounded-pill px-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    scoket.current.emit("chatMessage", message)
                    setMessage("")
                  }
                }}
              />

              <button
                className="btn text-white rounded-pill px-4"
                style={{ backgroundColor: "#128c7e" }}
                disabled={!message.trim()}
                onClick={() => {
                  scoket.current.emit("chatMessage", message)
                  setMessage("")
                }}
              >
                Send
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
