"use client";
import React from "react";
import Link from 'next/link'

 const Forgotpassword = () => {
    const handleSubmit = () => {
        console.log("New password email sent....");
    }
  return (
    <div className="bg-gray-200 font-sans text-gray-700">
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">Forgot Password?</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form
                method="POST"
                className=""
                action="#"
                onSubmit={handleSubmit}
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
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <button className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow">
                  Send Email
                </button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-md border-t border-gray-300 bg-gray-100">
              <Link href="/login" className="font-medium text-blue-500">
                Already have an account? Login
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
