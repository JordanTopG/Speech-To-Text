"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function SignUp () {
    const router = useRouter();
    const [successfulMessage, setSuccessfulMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      firstname: "",
      surname: "",
      dob: "",
      email:"",
      address: "",
      password: "",
    });

    const handleChange = (e: any) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (event: React.MouseEvent) => {
        console.log("Signed up...");
        event.preventDefault();

        try {

          const response = await fetch('http://localhost:6000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json();

          if(response.ok) {
            setSuccessfulMessage('You have successfully created an account, We are now redirecting you to the login page...');
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          }  else { 
            throw new Error('Failed to create an account.');
          }
    } catch (error) {
      setErrorMessage('Failed to sign up. please try again.');
      console.error
    }
  }
  return (
    <div className="bg-gray-200 font-sans text-gray-700">
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">Sign up</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form
                method="POST"
                className=""
                action="#"
              >
                <div className="mb-5">
                  <label
                    id="First Name"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    name="First Name"
                    value={formData.firstname}
                    onChange={(e) => handleChange}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="Last Name"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Surname
                  </label>

                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => handleChange}
                    name="Last Name"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="Date  of birth"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => handleChange}
                    name="Date of Birth"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="Email"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange}
                    name="Email"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="Address"
                    
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Address
                  </label>

                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange}
                    name="Adress"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    id="Password"
                    className="block mb-2 text-md font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => handleChange}
                    name="Password"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <button onClick={(e) => {handleSubmit(e)}} className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow">
                  Sign up
                </button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-md border-t border-gray-300 bg-gray-100">
              <Link href="/login" className="font-medium text-blue-500">
                Already have an account? Login
              </Link>

            </div>
          </div>
          { successfulMessage && <p className="success_message bg-teal-100 text-teal-600 text-center mt-4 rounded-md">{successfulMessage}</p> }
          { errorMessage && <p className="success_message bg-teal-100 text-teal-600 text-center mt-4 rounded-md">{errorMessage}</p> }
        </div>
      </div>
    </div>
  );
};