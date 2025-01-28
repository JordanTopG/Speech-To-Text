"use client";
import React, { useEffect, useState } from "react";
import { quotes } from "../data/dashboardQuotes";
import AnimatedCircle from  "../data/animatedCircle";

export default function speechDashboard() {
  const [quote, setRandomQuote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true); // Start the animation when Play is pressed
  };

  const handlePause = () => {
    setIsPlaying(false); // Pause the animation when Pause is pressed
  };

  const handleStop = () => {
    setIsPlaying(false); // Stop the animation when Stop is pressed
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-gray-200 font-sans text-gray-700">
        <div className="container mx-auto p-8">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-7xl text-center mb-12 font-thin">
              Speech to Text
            </h1>
            <div className="flex justify-center">
              <main className="flex flex-col items-center text-center">
                <h2 className="text-3xl text-center mb-12 font-bold">
                  {quote}
                </h2>
                <AnimatedCircle isPlaying={isPlaying} />
                <textarea
                  className="mt-4 w-[600px] h-[300px] bg-black/5 border-b border-l border-solid border-white shadow-inner rounded-lg p-4 focus:outline-none focus:bg-white transition-colors ease-in-out"
                  placeholder="Press 'Play' to start recording..."
                ></textarea>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    gap: "20px",
                  }}
                >
                  <button className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow"
                  onClick={handlePlay}
                  >
                    Play
                  </button>
                  <button className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow"
                  onClick={handlePause}>
                    Pause
                  </button>
                  <button className="w-full text-2xl p-3 mt-4 bg-blue-600 text-white rounded shadow"
                  onClick={handleStop} >
                    Stop
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
