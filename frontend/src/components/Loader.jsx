export default function Loader({ text = "Loading..." }) {

  return (

    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200">

      {/* Glass Card */}
      <div className="flex flex-col items-center gap-6
      px-8 py-6 rounded-2xl
      bg-white/40 backdrop-blur-lg border border-white/30
      shadow-xl animate-fadeIn">

        {/* Premium Spinner */}
        <div className="relative w-12 h-12">

          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full
          bg-gradient-to-r from-sky-400 to-indigo-500
          blur-md opacity-60 animate-pulse"></div>

          {/* Spinner Ring */}
          <div className="w-12 h-12 border-4 border-white/40 border-t-sky-500
          rounded-full animate-spin"></div>

        </div>

        {/* Text */}
        <p className="text-gray-700 font-semibold tracking-wide animate-pulse">
          {text}
        </p>

      </div>

    </div>

  );

}
