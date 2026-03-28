"use client";
import React, { useEffect } from "react";
import { useState } from "react";

type Department = {
  id: string;
  name: string;
};


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/departments");
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data: Department[] = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  const handleRegister = () => {
    if (!username || !password || !confirmPassword || !name || !role || !department) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const payload = {
      username: username,
      password: password,
      name: name,
      role: role,
      department: department,
    };
    console.log("Registering user:", payload);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-lg shadow-gray-400">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className="text-2xl font-bold">Register</h1>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
          <div className="mb-2 w-full">
            <h1 className="mb-2 text-md font-bold">Personal Information</h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md w-full col-span-2"
              />
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              <select
                name="department"
                id="department"
                onChange={(e) => setDepartment(e.target.value)}
                className="border p-2 rounded-md w-full"
                value={department}
              >
                <option value="">Select Department</option>
                {departments && departments.length > 0 && departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4 w-full">
            <h1 className="mb-2 text-md font-bold">Account Information</h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded-md w-full col-span-2"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 border border-red-500 rounded-md w-full p-2">
              {error}
            </p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
