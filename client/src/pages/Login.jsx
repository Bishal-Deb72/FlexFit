// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { login } from "../Redux/Slices/AuthSlice";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // Handle Input Change
//   const handleUserInput = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   // Handle Login Submission
//   const onLogin = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!loginData.email || !loginData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     const loadingToast = toast.loading("Logging in...");

//     try {
//       // Dispatch Redux action for login
//       const response = await dispatch(login(loginData)).unwrap();

//       if (response.success) {
//         toast.success("Login successful!", { id: loadingToast });

//         // Store token & user info in localStorage
//         localStorage.setItem("token", response.token);
//         localStorage.setItem("user", JSON.stringify(response.user));

//         // Navigate to layout2 after login
//         navigate("/layouts2");

//         // Reset form fields
//         setLoginData({ email: "", password: "" });
//       } else {
//         throw new Error(response.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error(error.message || "Login failed. Please try again.", { id: loadingToast });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 font-serif">
//       <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-700">
//         <form noValidate className="mt-6 w-full" onSubmit={onLogin}>
//           <h1 className="text-5xl font-extrabold text-center text-blue-400">Login</h1>
//           <p className="text-lg text-gray-300 text-center mt-2 mb-4">Login to your account</p>

//           {/* Email Field */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={loginData.email}
//             onChange={handleUserInput}
//             className="w-full p-3 rounded-lg bg-gray-700 text-white mb-4 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />

//           {/* Password Field */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={handleUserInput}
//             className="w-full p-3 rounded-lg bg-gray-700 text-white mb-4 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-bold shadow-md"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Redirect to Register Page */}
//         <p className="mt-6 text-gray-300 text-center">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-400 hover:underline">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
