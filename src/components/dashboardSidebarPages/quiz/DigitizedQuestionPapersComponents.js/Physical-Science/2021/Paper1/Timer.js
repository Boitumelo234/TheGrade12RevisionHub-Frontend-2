// import React, { useState, useEffect } from "react";
//
// const Timer = ({ initialMinutes = 120, onTimeUp }) => {
//     const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
//
//     useEffect(() => {
//         if (secondsLeft <= 0) {
//             onTimeUp();
//             return;
//         }
//         const timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
//         return () => clearInterval(timer);
//     }, [secondsLeft]);
//
//     const min = Math.floor(secondsLeft / 60);
//     const sec = secondsLeft % 60;
//
//     return (
//         <div>
//             Time Left: {min.toString().padStart(2, "0")}:
//             {sec.toString().padStart(2, "0")}
//         </div>
//     );
// };
//
// export default Timer;
