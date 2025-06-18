// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsPersonCircle } from "react-icons/bs";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { createAccount } from "../Redux/Slices/AuthSlice.js";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     avatar: "",
//   });

//   const [previewImage, setPreviewImage] = useState("");

//   // Handle Input Changes
//   const handleUserInput = (e) => {
//     const { name, value } = e.target;
//     setSignupData({ ...signupData, [name]: value });
//   };

//   // Handle Avatar Upload
//   const getImage = (event) => {
//     event.preventDefault();
//     const uploadedImage = event.target.files[0];
//     if (uploadedImage) {
//       setSignupData({ ...signupData, avatar: uploadedImage });

//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.onload = () => setPreviewImage(fileReader.result);
//     }
//   };

//   // Validate Input Fields
//   const validateForm = () => {
//     if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar) {
//       toast.error("Please fill in all fields.");
//       return false;
//     }
//     if (signupData.fullName.length < 3) {
//       toast.error("Name must be at least 3 characters.");
//       return false;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
//       toast.error("Invalid email address.");
//       return false;
//     }
//     // if (!signupData.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
//     //   toast.error("Password must be 8+ characters with uppercase, lowercase, number & special character.");
//     //   return false;
//     // }
//     return true;
//   };

//   // Handle Signup Submission
//   const createNewAccount = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();
//     formData.append("fullName", signupData.fullName);
//     formData.append("email", signupData.email);
//     formData.append("password", signupData.password);
//     formData.append("avatar", signupData.avatar);

    

//     try {
//       const response = await dispatch(createAccount(formData)).unwrap(); // Wait for response
//       if (response.success) {
        
//         // Store user data in localStorage
//         localStorage.setItem("user", JSON.stringify(response.user));

//         // Navigate to layout2 after success
//         navigate("/layouts2");

//         // Reset form fields
//         setSignupData({ fullName: "", email: "", password: "", avatar: "" });
//         setPreviewImage("");
//       } else {
//         throw new Error(response.message || "Signup failed");
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
//         <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Create Your Account</h2>

//         <form onSubmit={createNewAccount} className="mt-4 space-y-3">
//           {/* Avatar upload */}
//           <div className="flex justify-center mb-4">
//             <label
//               htmlFor="image_upload"
//               className="cursor-pointer bg-white p-1 rounded-full transition duration-300 ease-in-out"
//             >
//               {previewImage ? (
//                 <img
//                   className="w-24 h-24 rounded-full border-4 border-white shadow-md"
//                   src={previewImage}
//                   alt="Preview"
//                 />
//               ) : (
//                 <BsPersonCircle className="w-24 h-24 text-gray-500" />
//               )}
//             </label>
//             <input
//               onChange={getImage}
//               className="hidden"
//               type="file"
//               name="image_upload"
//               id="image_upload"
//               accept=".jpg, .jpeg, .png, .svg"
//             />
//           </div>

//           {/* Full Name Field */}
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               placeholder="John Doe"
//               value={signupData.fullName}
//               onChange={handleUserInput}
//               className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-300"
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="john@example.com"
//               value={signupData.email}
//               onChange={handleUserInput}
//               className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-300"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="••••••••"
//               value={signupData.password}
//               onChange={handleUserInput}
//               className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-300"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Login Link */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 hover:text-indigo-500 hover:underline">
//             Log in here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
