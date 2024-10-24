import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const raw = JSON.stringify({ email, password });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };

    try {
      const response = await fetch(
        "https://quiz-app-student-test.vercel.app/api/auth/login",
        requestOptions
      );
      const result = await response.json();
      if (response.ok) {
        const { token, user } = result;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);
        console.log("User ID stored:", user.id);
        toast.success("Login successful!");
        navigate(user.isAdmin ? "/admin" : "/quiz");
      } else {
        toast.error(
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 items-center justify-center h-screen bg-slate-200">
      <div className="hidden lg:block col-span-2">
        <img
          src="/test.jpg"
          alt="Test"
          className="w-full h-screen object-cover"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="col-span-3 flex flex-col space-y-4 p-8 lg:p-28 w-full max-w-lg mx-auto"
      >
        <div className="flex items-center flex-col justify-center mb-12 lg:mb-16">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[50px] lg:w-[70px] h-[50px] lg:h-[70px]"
          />
          <span className="font-bold text-2xl lg:text-3xl capitalize mt-4 text-center">
            Juadeb's Test App Login
          </span>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="py-3 px-5 border border-gray-300 rounded w-full"
        />
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="py-3 px-5 border border-gray-300 rounded w-full"
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button
          type="submit"
          className="py-3 px-5 bg-blue-500 text-white rounded w-full lg:w-[60%] mx-auto disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <Link to="/register" className="mt-4 mx-auto text-center">
          <span className="font-bold text-blue-500 hover:underline mr-2">
            Click Here
          </span>
          If You Don't Have An Account Already
        </Link>
      </form>
    </div>
  );
}

export default Login;
