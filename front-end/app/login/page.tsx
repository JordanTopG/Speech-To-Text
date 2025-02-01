"use client";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { quotes } from "../data/dashboardQuotes";


export default function Login () {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulMessage, setSuccessfulMessage] = useState ('');
    const [quote, setRandomQuote] = useState("");
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    useEffect(() => {
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }, []);

    const handleChange = (e: any) => {
      const {name, value} = e.target;
      setFormData ({...formData, [name]: value});
    }
    const handleLogin = async (event: React.MouseEvent) => {
            console.log("Logging in...");
            event.preventDefault();

            try {
              const response = await fetch("http://localhost:6000/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
        
              const responseData = await response.json();
        
              if (response.ok) {
        
                {responseData;}
        
                setSuccessfulMessage("You have successfully logged in! Redirecting you to Dashboard!");
                setTimeout(() => {router.push("/speech-dash-board"); }, 3000);
              } else {
                throw new Error("Failed to log in.");
              }
            } catch (error) {
              setErrorMessage("Failed to log in. please try again.");
              console.error;
            }
          };          
                

return (
 <div className="min-h-screen bg-gray-200">
    <div className="bg-gray-200 font-sans text-gray-700">
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-5xl text-center mb-12 font-thin">Login</h1>
          <h2 className="text-3xl text-center mb-12 font-bold">
                  {quote}
                </h2>


          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form
                method="POST"
                className=""
                action="#"
                
              >
                <div className="mb-5">
                  <label
                    id="email"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="password"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <button onClick={(e) => {handleLogin(e)}} className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow">
                  Login
                </button>
              </form>
            </div>


            <div className="flex justify-between p-8 text-md border-t border-gray-300 bg-gray-100">
              <Link href="/sign-up" className="font-medium text-blue-500">
                Create account
              </Link>

              <Link href="/forgotten-password-send-email" className="text-gray-600 text-md">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      { successfulMessage && <p className="success_message bg-teal-100 text-teal-600 text-center mt-4 rounded-md">{successfulMessage}</p> }
      { errorMessage && <p className="error_message bg-orange-100 text-red-600 text-center mt-4 rounded-md">{errorMessage}</p> }
    </div>
    </div>
  );
};

