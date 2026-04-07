// // App.js
// import React, { useState, useEffect } from 'react';
// import QUIZ_DATA from './quizData';
// import { CheckCircle, XCircle, Clock, Send } from 'lucide-react';
// import './QuizQuestion.css';
//
// // --- Grade Icon ---
// const GradeIcon = ({ isCorrect, isSubmitted }) => {
//     if (!isSubmitted) return null;
//     const classes = "w-6 h-6 ml-3 transition-opacity duration-300";
//     return isCorrect ? <CheckCircle className={`${classes} text-green-500`} /> : <XCircle className={`${classes} text-red-500`} />;
// };
//
// // --- Question Component ---
// const Question = ({ question, answer, handleAnswerChange, isSubmitted }) => {
//     // Normalize user input and correct answer for comparison
//     const normalize = (str) =>
//         str
//             .toString()
//             .trim()
//             .replace(/\s+/g, '')
//             .toLowerCase();
//
//     const isCorrect = (() => {
//         if (!isSubmitted) return false;
//         if (!question.correctAnswer || !answer) return false;
//
//         const userParts = normalize(answer).split(',');
//         const correctParts = normalize(question.correctAnswer).split(',');
//
//         if (correctParts.length > 1) {
//             return correctParts.every(cp => userParts.includes(cp)) && userParts.every(up => correctParts.includes(up)) && correctParts.length === userParts.length;
//         }
//         return normalize(answer) === normalize(question.correctAnswer);
//     })();
//
//     if (question.type === 'instruction') {
//         return <div className="quiz-instruction">{question.text}</div>;
//     }
//
//     if (question.type === 'image') {
//         return (
//             <div className="quiz-image">
//                 <img src={question.image} alt={`Diagram for ${question.id}`} />
//             </div>
//         );
//     }
//
//     return (
//         <div className="quiz-card">
//             <p>{question.id}: {question.question || question.text}</p>
//             {question.type === 'text-input' && (
//                 <input
//                     type="text"
//                     value={answer || ''}
//                     onChange={e => handleAnswerChange(question.id, e.target.value)}
//                     disabled={isSubmitted}
//                     placeholder="Enter your answer..."
//                 />
//             )}
//             {isSubmitted && question.correctAnswer && !isCorrect && (
//                 <p className="text-gray-700 bg-yellow-100 p-2 rounded mt-2">
//                     Correct Answer: {question.correctAnswer}
//                 </p>
//             )}
//             <GradeIcon isCorrect={isCorrect} isSubmitted={isSubmitted} />
//         </div>
//     );
// };
//
// // --- Main App ---
// const TechnicalMathematicsP1Nov2022 = () => {
//     const [userAnswers, setUserAnswers] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [score, setScore] = useState(0);
//     const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
//
//     // --- Timer ---
//     useEffect(() => {
//         if (isSubmitted) return;
//         const timer = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev <= 1) {
//                     clearInterval(timer);
//                     handleSubmit(); // auto-submit
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//
//         return () => clearInterval(timer);
//     }, [isSubmitted]);
//
//     const formatTime = (seconds) => {
//         const m = Math.floor(seconds / 60);
//         const s = seconds % 60;
//         return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//     };
//
//     const handleAnswerChange = (id, value) => {
//         setUserAnswers(prev => ({ ...prev, [id]: value }));
//     };
//
//     const handleSubmit = () => {
//         let calculatedScore = 0;
//         QUIZ_DATA.forEach(q => {
//             if (!q.correctAnswer || !userAnswers[q.id]) return;
//
//             const normalize = (str) => str.toString().trim().replace(/\s+/g, '').toLowerCase();
//
//             const userParts = normalize(userAnswers[q.id]).split(',');
//             const correctParts = normalize(q.correctAnswer).split(',');
//
//             const correct = correctParts.length > 1
//                 ? correctParts.every(cp => userParts.includes(cp)) && userParts.every(up => correctParts.includes(up)) && correctParts.length === userParts.length
//                 : normalize(userAnswers[q.id]) === normalize(q.correctAnswer);
//
//             if (correct) calculatedScore += q.points || 0;
//         });
//         setScore(calculatedScore);
//         setIsSubmitted(true);
//     };
//
//     const handleReset = () => {
//         setUserAnswers({});
//         setIsSubmitted(false);
//         setScore(0);
//         setTimeLeft(90 * 60);
//     };
//
//     const maxScore = QUIZ_DATA.reduce((sum, q) => sum + (q.points || 0), 0);
//
//     return (
//         <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
//             <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-2xl">
//                 <header className="mb-8 border-b pb-4">
//                     <h1 className="text-4xl font-extrabold text-indigo-700">Digital Technical Mathematics Paper</h1>
//                     <p className="text-lg text-gray-600 mt-1 flex items-center justify-between">
//             <span className="flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-indigo-500" />
//               Interactive Quiz Mode - Total {maxScore} Points
//             </span>
//                         <span className="font-bold text-red-600">Time Left: {formatTime(timeLeft)}</span>
//                     </p>
//                 </header>
//
//                 {isSubmitted && (
//                     <div className="bg-indigo-50 p-6 rounded-xl mb-8 border-2 border-indigo-300">
//                         <h2 className="text-3xl font-bold text-indigo-800 mb-2">Quiz Results</h2>
//                         <p className="text-xl text-indigo-600">
//                             Your Score: <span className="font-extrabold">{score} / {maxScore}</span>
//                         </p>
//                         <button onClick={handleReset} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">
//                             Restart Quiz
//                         </button>
//                     </div>
//                 )}
//
//                 <section>
//                     {QUIZ_DATA.map(q => (
//                         <Question
//                             key={q.id}
//                             question={q}
//                             answer={userAnswers[q.id]}
//                             handleAnswerChange={handleAnswerChange}
//                             isSubmitted={isSubmitted}
//                         />
//                     ))}
//                 </section>
//
//                 {!isSubmitted && (
//                     <footer className="mt-8 pt-6 border-t flex justify-end">
//                         <button onClick={handleSubmit} className="px-8 py-3 bg-green-600 text-white rounded-xl flex items-center">
//                             <Send className="w-5 h-5 mr-2" />
//                             Submit Paper & Grade
//                         </button>
//                     </footer>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default TechnicalMathematicsP1Nov2022;
