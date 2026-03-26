export default function ProfileCard({ profile }) {

  return (

    <div className="p-5 rounded-xl
    bg-gradient-to-r from-sky-200/80 via-cyan-200/80 to-indigo-200/80
    backdrop-blur-md border border-white/20
    shadow-md transition-all duration-300 hover:shadow-lg">

      {/* Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-wide">
        {profile.name}
      </h3>

      {/* Divider */}
      <div className="h-px bg-white/40 mb-3"></div>

      {/* Roll */}
      <p className="text-sm mb-1 text-gray-800">
        <span className="font-semibold text-gray-900">Roll:</span>{" "}
        <span className="font-medium text-gray-900">
          {profile.rollNumber}
        </span>
      </p>

      {/* Department */}
      <p className="text-sm text-gray-800">
        <span className="font-semibold text-gray-900">Department:</span>{" "}
        <span className="font-medium text-gray-900">
          {profile.department}
        </span>
      </p>

    </div>

  );

}
