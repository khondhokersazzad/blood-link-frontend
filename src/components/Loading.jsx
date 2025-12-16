import React from "react";

const Loading = ({ text = "Linking lives through blood..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      
      {/* Blood Drop Pulse */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-red-500/30 animate-ping"></div>
        <div className="h-10 w-10 rounded-full bg-red-500 animate-pulse"></div>
      </div>

      {/* Project Name */}
      <h1 className="mt-6 text-2xl font-semibold text-slate-800 dark:text-slate-100">
        Blood<span className="text-red-500">Link</span>
      </h1>

      {/* Tagline */}
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {text}
      </p>

      {/* Progress Dots */}
      <div className="mt-4 flex space-x-2">
        <span className="h-2 w-2 rounded-full bg-red-400 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 rounded-full bg-red-600 animate-bounce"></span>
      </div>
    </div>
  );
};

export default Loading;
