export default function ProfileCard({profile}){

  return(

    <div className="bg-white shadow p-4 rounded">

      <h3 className="text-lg font-bold">

        {profile.name}

      </h3>

      <p>

        Roll: {profile.rollNumber}

      </p>

      <p>

        Department: {profile.department}

      </p>

    </div>

  );

}