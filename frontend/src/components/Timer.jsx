import { useEffect, useState } from "react";

export default function Timer({ duration, onTimeUp }) {

  const [time, setTime] = useState(duration);

  useEffect(() => {

    const interval = setInterval(() => {

      setTime((t) => {

        if (t <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }

        return t - 1;

      });

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (

    <div className="text-center text-xl font-bold mb-4">

      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}

    </div>

  );

}