const Page = () => {};
export default Page;

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignInPage() {
//   const [userInfo, setUserInfo] = useState({ login: "", password: "" });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(""); // Reset error state

//     // Attempt to sign in using credentials
//     const result = await signIn("credentials", {
//       redirect: false,  // Prevent automatic redirect, handle it manually
//       username: userInfo.login,
//       password: userInfo.password,
//     });

//     if (result?.error) {
//       setError(result.error);  // Handle sign-in error
//     } else {
//       // Redirect to a page after successful sign-in
//       router.push("/prototype/home");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black"> {/* Inverted background color */}
//       <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
//         <h1 className="text-2xl font-semibold text-center text-black">Sign In</h1> {/* Text color changed to black */}
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && <p className="text-red-500">{error}</p>}

//           <div>
//             <label htmlFor="login" className="block text-sm font-medium text-white">Login (Username or Email)</label> {/* Text color changed to white */}
//             <input
//               type="text"
//               id="login"
//               value={userInfo.login}
//               onChange={(e) => setUserInfo({ ...userInfo, login: e.target.value })}
//               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Username or Email"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-white">Password</label> {/* Text color changed to white */}
//             <input
//               type="password"
//               id="password"
//               value={userInfo.password}
//               onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
//               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
