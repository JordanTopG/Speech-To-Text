"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function speechDashboard () {

return(
<div className="bg-gray-200 font-sans text-gray-700">
  <div className="container mx-auto p-8 flex">
    <div className="max-w-md w-full mx-auto">
      <h1 className="text-4xl text-center mb-12 font-thin">Speech to Text</h1>
      <main className="flex flex-col items-center text-center flex-grow">
        <textarea
          className="mt-2 ml-12 w-[500px] h-[200px] bg-black/5 border-b border-l border-solid border-white shadow-inner rounded-lg p-2 focus:outline-none focus:bg-white transition-colors ease-in-out"
        ></textarea>
        <button className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow">
          Play
        </button>
      </main>
      <footer id="footer" className="text-center bg-gray-800 text-white fixed bottom-0 w-full py-4">
        Footer Content
      </footer>
    </div>
  </div>
</div>
);
};