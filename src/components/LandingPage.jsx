import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#09090b] p-8">
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-t from-[#27272a] via-[#ffffff] to-[#fafafa] bg-clip-text text-transparent">
        Capture. Organize. Focus.
      </h1>

      <p className="mt-4 text-2xl text-center bg-gradient-to-t from-[#27272a] via-[#ffffff] to-[#fafafa] bg-clip-text text-transparent">
        Your Ultimate Markdown-Powered Note-Taking App
      </p>

      <p className="mt-6 text-center max-w-2xl text-[#d8d8d8] leading-relaxed">
        Effortlessly jot down ideas, create structured notes, and manage your thoughts with ease. 
        Our minimalist, distraction-free interface is designed to help you focus on what matters—your content. 
        With powerful Markdown support, you can format your notes seamlessly, making them clean, organized, and easy to read.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full text-gray-800">
        <div className="p-4 bg-white shadow-md rounded-xl">
          📝 <strong>Rich Markdown Editing:</strong> Write with simplicity, format with power.
        </div>
        <div className="p-4 bg-white shadow-md rounded-xl">
          🌙 <strong>Distraction-Free Mode:</strong> Stay focused with a clean, minimal design.
        </div>
        <div className="p-4 bg-white shadow-md rounded-xl">
            🔒 <strong>Secure Notes:</strong> Keep your thoughts private with end-to-end encryption for maximum security.
        </div>
        <div className="p-4 bg-white shadow-md rounded-xl">
          ☁️ <strong>Sync & Access Anywhere:</strong> Keep your notes with you, anytime, anywhere.
        </div>
      </div>

      <Link to='/login' className="mt-10 px-6 py-3 text-lg rounded-xl bg-gradient-to-r from-[#d8d8d8] to-[#fafafa] text-black hover:from-[#fafafa] hover:to-[#d8d8d8] transition duration-300">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
