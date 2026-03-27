"use client"
import React from 'react'
import { useState } from "react"
    
function LoginPage() {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("test")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className='text-2xl font-bold'>Login</h1>
          <p>Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a></p>
          <input type="text" placeholder="Username" className="border p-2 rounded-md w-full" />
          <input type="password" placeholder="Password" className="border p-2 rounded-md w-full" />
          {error && <p className="text-red-500 border border-red-500 rounded-md w-full p-2">{error}</p>}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full">Login</button>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
