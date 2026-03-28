"use client";
import { useRouter } from "next/dist/client/components/navigation";
import { useState, } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    const payload = { 
      username: username,
      password: password
     };
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-lg shadow-gray-400">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className="text-2xl font-bold">Login</h1>
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          {error && (
            <p className="text-red-500 border border-red-500 rounded-md w-full p-2">
              {error}
            </p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
