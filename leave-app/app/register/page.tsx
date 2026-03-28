"use client";
import { useRouter } from "next/dist/client/components/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

type Department = {
  id: string;
  name: string;
};

function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/departments",
        );
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

  const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !name ||
      !role ||
      !department
    ) {
      setError("Please fill in all fields");
      setIsSubmitting(false); // reset เฉพาะ validation error
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false); // reset เฉพาะ validation error
      return;
    }

    const payload = {
      username,
      password,
      name,
      role,
      department_id: Number(department),
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
      setSuccess("Registration successful!");
      // ไม่ setIsSubmitting(false) → ปุ่มยังถูก disable จนกว่าจะ redirect
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration");
      setIsSubmitting(false); // reset เฉพาะกรณี error เท่านั้น
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-lg shadow-gray-400">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className="text-2xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
          <div className="mb-2 w-full">
            <h1 className="mb-2 text-md font-bold text-gray-800">
              Personal Information
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md w-full col-span-2 text-gray-700"
              />
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded-md w-full text-gray-700"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              <select
                name="department"
                id="department"
                onChange={(e) => setDepartment(e.target.value)}
                className="border p-2 rounded-md w-full text-gray-700"
                value={department}
              >
                <option value="">Select Department</option>
                {departments &&
                  departments.length > 0 &&
                  departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mb-4 w-full">
            <h1 className="mb-2 text-md font-bold text-gray-800">
              Account Information
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded-md w-full col-span-2 text-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded-md w-full text-gray-700"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 rounded-md w-full text-gray-700"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 border border-red-500 rounded-md w-full p-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 border border-green-500 rounded-md w-full p-2">
              {success}
            </p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full disabled:opacity-50"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
