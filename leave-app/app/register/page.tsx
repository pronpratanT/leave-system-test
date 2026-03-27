"use client"
import React from 'react'
import { useState } from "react"

function RegisterPage() {
     const[username, setUsername] = useState("")
        const[password, setPassword] = useState("")
        const[confirmPassword, setConfirmPassword] = useState("")
        const[error, setError] = useState("test")
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className='text-2xl font-bold'>Register</h1>
          <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
          <input type="text" placeholder="Username" className="border p-2 rounded-md w-full" />
          <input type="password" placeholder="Password" className="border p-2 rounded-md w-full" />
          <input type="password" placeholder="Confirm Password" className="border p-2 rounded-md w-full" />
          {error && <p className="text-red-500 border border-red-500 rounded-md w-full p-2">{error}</p>}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full">Register</button>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
