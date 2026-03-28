"use client";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      setIsSubmitting(false);
      return;
    }
    const payload = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8080/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await response.json();
      const user = data.data;
      Cookies.set("user_id", user.user_id, { path: "/" });
      Cookies.set("token", user.token, { path: "/" });
      Cookies.set("username", user.username, { path: "/" });
      Cookies.set("role", user.role, { path: "/" });
      Cookies.set("department", user.department, { path: "/" });
      Cookies.set("name", user.name, { path: "/" });
      setSuccess("Login successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-lg shadow-lg shadow-gray-400">
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-md w-full text-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md w-full text-gray-700"
          />
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
