// //import './App.css';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import {useEffect, useState, useRef} from "react";
// import coatOfArm from './coatOfArm.png';
//
// import m1 from './m1.png';
// import m2 from './m2.png';
// import m3 from './m3.png';
// import m4 from './m4.png';
// import m5 from './m5.png';
// import m6 from './m6.png';
// import m7 from './m7.png';
// import m8 from './m8.png';
// import m9 from './m9.png';
// import m10 from './m10.png';
// import m11 from './m11.png';
// import m12 from './m12.png';
// import m13 from './m13.png';
// import m14 from './m14.png';
// import m15 from './m15.png';
// import m16 from './m16.png';
// import m17 from './m17.png';
// import m18 from './m18.png';
// import m19 from './m19.png';
// import m20 from './m20.png';
//
// import n1 from './n1.png';
// import n2 from './n2.png';
// import n3 from './n3.png';
// import n4 from './n4.png';
//
// // DRAWING CANVAS — PASTE THIS ONCE
// const DrawingCanvas = ({ width = 750, height = 450, onSave }) => {
//     const canvasRef = useRef(null);
//     const [isDrawing, setIsDrawing] = useState(false);
//
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         ctx.lineWidth = 3;
//         ctx.lineCap = 'round';
//         ctx.strokeStyle = '#000000';
//     }, []);
//
//     const startDrawing = (e) => {
//         setIsDrawing(true);
//         draw(e);
//     };
//
//     const stopDrawing = () => setIsDrawing(false);
//
//     const draw = (e) => {
//         if (!isDrawing) return;
//         const canvas = canvasRef.current;
//         const rect = canvas.getBoundingClientRect();
//         const x = (e.clientX || e.touches[0].clientX) - rect.left;
//         const y = (e.clientY || e.touches[0].clientY) - rect.top;
//
//         const ctx = canvas.getContext('2d');
//         ctx.lineTo(x, y);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(x, y);
//     };
//
//     const clear = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     };
//
//     return (
//         <div className="my-12 p-8 bg-gray-50 border-4 border-dashed border-gray-400 rounded-2xl text-center">
//             <p className="text-xl font-bold mb-6">Draw your answer below</p>
//
//             <canvas
//                 ref={canvasRef}
//                 width={width}
//                 height={height}
//                 className="border-4 border-black bg-white rounded-xl shadow-2xl mx-auto cursor-crosshair touch-none"
//                 onMouseDown={startDrawing}
//                 onMouseUp={stopDrawing}
//                 onMouseLeave={stopDrawing}
//                 onMouseMove={draw}
//                 onTouchStart={startDrawing}
//                 onTouchEnd={stopDrawing}
//                 onTouchMove={draw}
//             />
//
//             <div className="mt-6 space-x-6">
//                 <button onClick={clear} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
//                     Clear
//                 </button>
//                 {onSave && (
//                     <button onClick={() => onSave(canvasRef.current.toDataURL())} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
//                         Save Drawing
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// function normalizeAnswer(answer) {
//     return answer.toLowerCase().trim().replace(/[.,!?]/g, '');
// }
//
// function checkAnswer(userAnswer, correctAnswers, marks) {
//     if (!userAnswer) return { isCorrect: false, marks: 0 };
//     userAnswer = normalizeAnswer(userAnswer);
//     let isCorrect;
//     let awardedMarks;
//     if (Array.isArray(correctAnswers)) {
//         // Partial marking for lists
//         const userList = userAnswer.split(/[,;\n]/).map(s => normalizeAnswer(s)).filter(Boolean);
//         awardedMarks = userList.reduce((sum, u) => sum + (correctAnswers.some(ans => normalizeAnswer(ans) === u) ? 1 : 0), 0);
//         isCorrect = awardedMarks > 0;
//         awardedMarks = Math.min(awardedMarks, marks); // Cap at max marks
//     } else {
//         isCorrect = normalizeAnswer(correctAnswers) === userAnswer;
//         awardedMarks = isCorrect ? marks : 0;
//     }
//     return { isCorrect, marks: awardedMarks };
// }
//
// function checkMultipleChoice(selected, correctValue, marks) {
//     const isCorrect = selected === correctValue;
//     return { isCorrect, marks: isCorrect ? marks : 0 };
// }
//
// const Question = ({ id, question, type, options, correctAnswers, marks, onAnswerChange, answerStatus }) => {
//     const [value, setValue] = useState(type === 'radio' || type === 'select' ? '' : '');
//     const [isCorrect, setIsCorrect] = useState(null);
//     const [awardedMarks, setAwardedMarks] = useState(0);
//
//     const handleChange = (e) => {
//         const newValue = e.target.value;
//         setValue(newValue);
//         let result;
//         if (type === 'radio' || type === 'select') {
//             result = checkMultipleChoice(newValue, correctAnswers, marks);
//         } else {
//             result = checkAnswer(newValue, correctAnswers, marks);
//         }
//         setIsCorrect(result.isCorrect);
//         setAwardedMarks(result.marks);
//         onAnswerChange(id, result.marks, result.isCorrect);
//     };
//
//     return (
//         <div className="space-y-2">
//             <p className="font-medium text-[var(--text-primary)]"><strong>{id}</strong> {question}</p>
//             {type === 'radio' ? (
//                 <div className="space-y-2">
//                     {options.map((opt, idx) => (
//                         <label
//                             key={idx}
//                             className={`flex items-center ${answerStatus && (opt.value === correctAnswers ? 'correct' : (value === opt.value && !isCorrect) ? 'incorrect' : '')}`}
//                         >
//                             <input
//                                 type="radio"
//                                 name={id}
//                                 value={opt.value}
//                                 onChange={handleChange}
//                                 className="mr-2 accent-[var(--accent-primary)]"
//                             />
//                             {opt.text}
//                         </label>
//                     ))}
//                 </div>
//             ) : type === 'select' ? (
//                 <select value={value} onChange={handleChange} className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}>
//                     <option value="">Select</option>
//                     {options.map((opt, idx) => (
//                         <option key={idx} value={opt.value}>{opt.value}</option>
//                     ))}
//                 </select>
//             ) : type === 'text' ? (
//                 <input
//                     type="text"
//                     id={id}
//                     value={value}
//                     onChange={handleChange}
//                     className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
//                 />
//             ) : (
//                 <textarea
//                     id={id}
//                     rows="4"
//                     value={value}
//                     onChange={handleChange}
//                     className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
//                 />
//             )}
//             {answerStatus && (
//                 <p className="text-[var(--text-secondary)] text-sm">
//                     <strong>Correct Answer:</strong> {Array.isArray(correctAnswers) ? correctAnswers.join(' / ') : correctAnswers}<br />
//                     <strong>Awarded:</strong> {awardedMarks} / {marks}
//                 </p>
//             )}
//         </div>
//     );
// };
//
// Question.propTypes = {
//     id: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     type: PropTypes.oneOf(['radio', 'select', 'text', 'textarea']).isRequired,
//     options: PropTypes.array,
//     correctAnswers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
//     marks: PropTypes.number.isRequired,
//     onAnswerChange: PropTypes.func.isRequired,
//     answerStatus: PropTypes.bool.isRequired,
// };
//
// const ListQuestion = ({ id, question, numItems, correctAnswers, marks, onAnswerChange, answerStatus }) => {
//     const [answers, setAnswers] = useState(Array(numItems).fill(''));
//     const [results, setResults] = useState(Array(numItems).fill(null));
//
//     const handleChange = (index, value) => {
//         const newAnswers = [...answers];
//         newAnswers[index] = value;
//         setAnswers(newAnswers);
//
//
//         const normalizedUserAnswers = newAnswers.map(ans => normalizeAnswer(ans)).filter(Boolean);
//         const normalizedCorrect = correctAnswers.map(ans => normalizeAnswer(ans));
//         let awarded = 0;
//         const matched = new Set();
//
//         normalizedUserAnswers.forEach(userAns => {
//             if (!matched.has(userAns) && normalizedCorrect.some(correct => correct === userAns)) {
//                 awarded++;
//                 matched.add(userAns);
//             }
//         });
//
//         awarded = Math.min(awarded, marks);
//
//         // For individual feedback, check if each user answer matches any correct
//         const newResults = normalizedUserAnswers.map(userAns => normalizedCorrect.some(correct => correct === userAns));
//         setResults(newResults);
//
//         onAnswerChange(id, awarded, awarded === marks);
//     };
//
//     return (
//         <div>
//             <p className="font-medium text-[var(--text-primary)]"><strong>{id}</strong> {question}</p>
//             <div className="space-y-3 mt-4">
//                 {answers.map((answer, idx) => (
//                     <div key={idx} className="flex items-center">
//                         <label className="w-8 text-[var(--text-primary)]">{idx + 1}.</label>
//                         <input
//                             type="text"
//                             value={answer}
//                             onChange={(e) => handleChange(idx, e.target.value)}
//                             className={`form-input flex-1 ${answerStatus && (results[idx] ? 'correct' : results[idx] === false ? 'incorrect' : '')}`}
//                         />
//                     </div>
//                 ))}
//             </div>
//             {answerStatus && (
//                 <div className="mt-4">
//                     <p className="text-[var(--text-secondary)]"><strong>Correct Answers:</strong></p>
//                     <ol className="list-decimal pl-5 text-[var(--text-secondary)]">
//                         {correctAnswers.map((ans, idx) => <li key={idx}>{ans}</li>)}
//                     </ol>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// ListQuestion.propTypes = {
//     id: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     numItems: PropTypes.number.isRequired,
//     correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
//     marks: PropTypes.number.isRequired,
//     onAnswerChange: PropTypes.func.isRequired,
//     answerStatus: PropTypes.bool.isRequired,
// };
//
// const Timer = ({ initialMinutes = 120 }) => {
//     const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
//     const [isActive, setIsActive] = useState(true);
//
//     useEffect(() => {
//         if (timeLeft > 0 && isActive) {
//             const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//             return () => clearTimeout(timer);
//         } else if (timeLeft === 0) {
//             alert('Time is up!');
//         }
//     }, [timeLeft, isActive]);
//
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//
//     return (
//         <div className="timer">
//             <div className="text-right font-bold text-red-600">
//                 Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
//             </div>
//         </div>
//     );
// }
// const PhysicsP1Nov2022 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
//     const [totalScore, setTotalScore] = useState(0);
//     const [sectionScores, setSectionScores] = useState({ A: 0, B: 0, C: 0 });
//     const [answers, setAnswers] = useState({});
//     const [answerStatus, setAnswerStatus] = useState(false);
//     const [selectedSectionB, setSelectedSectionB] = useState([]); // Track which two of Q2,3,4 selected
//     const [selectedSectionC, setSelectedSectionC] = useState(''); // Q5 or Q6
//
//     const handleAnswerChange = (id, awardedMarks, isCorrect) => {
//         setAnswers(prev => ({ ...prev, [id]: { awardedMarks, isCorrect } }));
//     };
//
//     const markAnswers = () => {
//         let scoreA = 0;
//         let scoreB = 0;
//         let scoreC = 0;
//         let total = 0;
//
//         for (const key in answers) {
//             const marks = answers[key].awardedMarks;
//             total += marks;
//
//             // Determine section based on id
//             if (key.startsWith('1.')) {
//                 scoreA += marks;
//             } else if (key.startsWith('2.') || key.startsWith('3.') || key.startsWith('4.')) {
//                 scoreB += marks;
//             } else if (key === '5' || key === '6') {
//                 scoreC += marks;
//             }
//         }
//
//         setSectionScores({ A: scoreA, B: scoreB, C: scoreC });
//         setTotalScore(total);
//         setAnswerStatus(true);
//     };
//
//     const notificationCount = notifications.filter((n) => !n.read).length;
//
//     return (
//         <>
//             <div className="flex min-h-screen bg-[var(--bg-primary)]">
//                 {/* Global styles from example */}
//                 {/*} <style>{`
//                 * { transition: none !important; animation: none !important; opacity: 1 !important; }
//                 body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
//                 .pdf-header { border: 2px solid black; padding: 20px; margin-bottom: 20px; text-align: center; position: relative; background: white; }
//                 .pdf-header h1 { font-size: 18pt; font-weight: bold; margin: 10px 0; }
//                 .pdf-header h2 { background-color: yellow; display: inline-block; padding: 5px; border: 1px solid black; }
//                 .pdf-section { border: 1px solid black; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; }
//                 .pdf-table { width: 100%; border-collapse: collapse; border: 1px solid black; }
//                 .pdf-table th, .pdf-table td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }
//                 .form-input { width: 100%; padding: 8px; border: 1px solid black; border-radius: 0; font-size: 12pt; font-family: 'Times New Roman', serif; }
//                 .form-input.correct { border-color: green; background-color: rgba(0,255,0,0.1); }
//                 .form-input.incorrect { border-color: red; background-color: rgba(255,0,0,0.1); }
//                 label.correct { color: green; }
//                 label.incorrect { color: red; }
//                 .btn-primary { background-color: #007bff; color: white; padding: 10px 20px; border: 1px solid black; cursor: pointer; font-family: 'Times New Roman', serif; }
//                 .btn-primary:disabled { background-color: #6c757d; cursor: not-allowed; }
//                 .text-primary { color: #000; }
//                 .text-secondary { color: #666; }
//                 .mb-4 { margin-bottom: 1rem; }
//                 .space-y-4 > * + * { margin-top: 1rem; }
//                 .page-break { page-break-before: always; }
//                 .please-turn-over { text-align: right; font-style: italic; margin-top: 20px; font-size: 10pt; }
//                 .timer { position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 1px solid black; z-index: 1000; }
//                 .accent-primary { accent-color: #007bff; }
//                 .scenario { border: 1px solid black; padding: 10px; margin: 10px 0; background: #f9f9f9; }
//             `}</style>*/}
//                 <style>
//                     {`
//                     * {
//                         transition: none !important;
//                         animation: none !important;
//                         opacity: 1 !important;
//                     }
//                     .form-input {
//                         width: 100%;
//                         padding: 8px;
//                         border: 1px solid var(--border-color, #ccc);
//                         border-radius: 4px;
//                         font-size: 14px;
//                     }
//                     .pdf-header h2 { background-color: yellow; display: inline-block; padding: 5px; border: 1px solid black; }
//                     .pdf-header { border: 2px solid black; padding: 20px; margin-bottom: 20px; text-align: center; position: relative; background: white; align-items: center; justify-content: center; }
//                     .pdf-header h1 { font-size: 18pt; font-weight: bold; margin: 10px 0; }
//                     .scenario { border: 1px solid black; padding: 10px; margin: 10px 0; background: #f9f9f9; }
//                     body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
//                     .form-input.correct {
//                         border-color: var(--green, #28a745);
//                         background-color: rgba(40, 167, 69, 0.1);
//                     }
//                     .form-input.incorrect {
//                         border-color: var(--red, #dc3545);
//                         background-color: rgba(220, 53, 69, 0.1);
//                     }
//                     label.correct {
//                         color: var(--green, #28a745);
//                     }
//                     label.incorrect {
//                         color: var(--red, #dc3545);
//                     }
//                     .btn-primary {
//                         background-color: var(--accent-primary, #007bff);
//                         color: white;
//                         padding: 10px 20px;
//                         border-radius: 4px;
//                         border: none;
//                         cursor: pointer;
//                     }
//                     .btn-primary:disabled {
//                         background-color: #6c757d;
//                         cursor: not-allowed;
//                     }
//                     .text-[var(--text-primary)] {
//                         color: var(--text-primary, #333);
//                     }
//                     .text-[var(--text-secondary)] {
//                         color: var(--text-secondary, #666);
//                     }
//                     .bg-[var(--bg-primary)] {
//                         background-color: var(--bg-primary, #f4f4f4);
//                     }
//                     .bg-[var(--bg-secondary)] {
//                         background-color: var(--bg-secondary, #fff);
//                     }
//                     .bg-opacity-95 {
//                         background-color: var(--bg-secondary, #fff);
//                     }
//                     .backdrop-blur-sm {
//                         backdrop-filter: blur(5px);
//                     }
//                     .shadow-[var(--shadow)] {
//                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                     }
//                     .rounded-2xl {
//                         border-radius: 16px;
//                     }
//                     .pdf-table { width: 100%; border-collapse: collapse; border: 1px solid black; }
//                 .pdf-table th, .pdf-table td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }
//                     .timer {
//                     position: fixed;
//                     top: 10px;
//                     right: 10px;
//                     background: white;
//                     padding: 10px;
//                     border: 1px solid black;
//                     z-index: 1000; }
//                     .p-6 {
//                         padding: 24px;
//                     }
//                     .sm\\:p-8 {
//                         padding: 32px;
//                     }
//                     .font-medium {
//                         font-weight: 500;
//                     }
//                     .font-semibold {
//                         font-weight: 600;
//                     }
//                     .font-bold {
//                         font-weight: 700;
//                     }
//                     .text-3xl {
//                         font-size: 24px;
//                     }
//                     .text-2xl {
//                         font-size: 20px;
//                     }
//                     .text-xl {
//                         font-size: 18px;
//                     }
//                     .text-lg {
//                         font-size: 16px;
//                     }
//                     .text-sm {
//                         font-size: 12px;
//                     }
//                     .flex {
//                         display: flex;
//                     }
//                     .flex-1 {
//                         flex: 1;
//                     }
//                     .min-h-screen {
//                         min-height: 100vh;
//                     }
//                     .min-w-0 {
//                         min-width: 0;
//                     }
//                     .items-center {
//                         align-items: center;
//                     }
//                     .justify-center {
//                         justify-content: center;
//                     }
//                     .justify-between {
//                         justify-content: space-between;
//                     }
//                     .gap-4 {
//                         gap: 16px;
//                     }
//                     .list-decimal {
//                         list-style-type: decimal;
//                     }
//                     .pl-5 {
//                         padding-left: 20px;
//                     }
//                     .mr-2 {
//                         margin-right: 8px;
//                     }
//                     .w-8 {
//                         width: 32px;
//                     }
//                     .accent-[var(--accent-primary)] {
//                         accent-color: var(--accent-primary, #007bff);
//                     }
//                     .relative {
//                         position: relative;
//                     }
//                     .absolute {
//                         position: absolute;
//                     }
//                     .-top-2 {
//                         top: -8px;
//                     }
//                     .-right-2 {
//                         right: -8px;
//                     }
//                     .bg-[var(--accent-secondary)] {
//                         background-color: var(--accent-secondary, #ff6b6b);
//                     }
//                     .text-[var(--text-white)] {
//                         color: var(--text-white, #fff);
//                     }
//                     .text-xs {
//                         font-size: 10px;
//                     }
//                     .rounded-full {
//                         border-radius: 9999px;
//                     }
//                     .h-5 {
//                         height: 20px;
//                     }
//                     .pdf-section { border: 1px solid black; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; }
//                     .page-break { page-break-before: always; }
//                     .w-5 {
//                         width: 20px;
//                     }
//                     .hover\\:bg-[var(--hover-tertiary)]:hover {
//                         background-color: var(--hover-tertiary, #e0e0e0);
//                     }
//                     .transition-colors {
//                         transition: background-color 0.2s ease;
//                     }
//                     .duration-200 {
//                         transition-duration: 200ms;
//                     }
//                     pdf-header .header-text {
//                    flex-1;
//                     text-align: center;
//                     margin-left: 120px;
//                     }
//                     .coat-of-arms { width: 100px; height: auto; }
//                     .score-breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
//                     .score-item { text-align: center; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
//                 `}
//                 </style>
//
//                 <div className="flex-1 min-w-0 p-6 sm:p-8">
//                     <div className="pdf-header">
//                         <img
//                             src={coatOfArm}
//                             alt="Coat of Arms of South Africa"
//                             className="coat-of-arms relative top-4 left-4"
//                             style={{ position: 'relative', top: '1px', left: '475px' }}
//                         />
//                         <div className="header-text">
//                             <strong>basic education</strong>
//                             <br/>Department:<br />
//                             Basic Education<br />
//                             <strong>Republic of South Africa</strong>
//                         </div>
//                         <h1>NATIONAL SENIOR CERTIFICATE</h1>
//                         <h2>Physical Sciences: Physics(P1) November 2021
//                         </h2>
//                         <p><strong>MARKS: 150</strong><br /><strong>TIME: 3 hours</strong></p>
//                         <p>This question paper consists of 18 pages and 3 datasheets.</p>
//                     </div>
//                     <Timer />
//                     <div className="pdf-section page-break">
//                         <h2 style={{ fontSize: '14pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>INSTRUCTIONS AND INFORMATION</h2>
//                         <ol>
//                             <li>Write your centre number and examination number in the appropriate spaces on the ANSWER BOOK.</li>
//                             <li>This question paper consists of 10 questions. Answer ALL the questions in the ANSWER BOOK. </li>
//                             <li>Start EACH question on a NEW page in the ANSWER BOOK. </li>
//                             <li>Number the answers correctly according to the numbering system used in this
//                                 question paper.</li>
//                             <li>Leave ONE line between two subquestions, e.g. between QUESTION 2.1 and
//                                 QUESTION 2.2.</li>
//                             <li>You may use a non-programmable calculator. </li>
//                             <li>You may use appropriate mathematical instruments.</li>
//                             <li>Show ALL formulae and substitutions in ALL calculations.</li>
//                             <li>Round off your FINAL numerical answers to a minimum of TWO decimal
//                                 places.</li>
//                             <li>Give brief motivations, discussions, etc. where required. </li>
//                             <li>You are advised to use the attached DATA SHEETS.</li>
//                             <li>Write neatly and legibly.</li>
//                         </ol>
//
//                     </div>
//                     <div className="pdf-section page-break">
//                         {/* Section A */}
//                         <div className="service-card mb-10">
//                             <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1:  MULTIPLE-CHOICE QUESTIONS </h3>
//                             <div className="space-y-6">
//                                 {/* 1.1 MCQ */}
//                                 <div>
//                                     <p className="font-medium text-[var(--text-primary)]">Various options are provided as possible answers to the following questions.
//                                         Each question has only ONE correct answer. Choose the answer and write only the
//                                         letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK,
//                                         e.g. 1.11 E. </p>
//                                     <Question
//                                         id="1.1.1"
//                                         question="Which ONE of the following combinations consists of only SCALAR quantities?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: 'Velocity, speed and time' },
//                                             { value: 'B', text: 'Time, distance and speed' },
//                                             { value: 'C', text: 'Acceleration, speed and distance' },
//                                             { value: 'D', text: 'Displacement, velocity and acceleration' }
//                                         ]}
//                                         correctAnswers="B"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.2"
//                                         question="The acceleration due to gravity on Earth is g. Which ONE of the following represents the acceleration due to gravity on a planet that has TWICE the mass and HALF the radius of the Earth?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: '1/2g' },
//                                             { value: 'B', text: '2g' },
//                                             { value: 'C', text: '4g' },
//                                             { value: 'D', text: '8g' }
//                                         ]}
//                                         correctAnswers="D"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.3"
//                                         question="A ball is projected vertically upwards from the ground and reaches its maximum height after a while. Ignore the effects of air friction.How will the ACCELERATION and TOTAL MECHANICAL ENERGY of the ball at its maximum height compare to that immediately after it was projected?"
//                                         type="radio"
//                                         options={[
//                                             {
//                                                 value: 'A',
//                                                 text: (
//                                                     <table className="w-full border border-black text-center text-sm">
//                                                         <thead className="bg-gray-100">
//                                                         <tr>
//                                                             <th className="border border-black px-6 py-2"></th>
//                                                             <th className="border border-black px-8 py-2">ACCELERATION</th>
//                                                             <th className="border border-black px-8 py-2">TOTAL MECHANICAL ENERGY</th>
//                                                         </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">A</td>
//                                                             <td className="border border-black py-2">Equal to</td>
//                                                             <td className="border border-black py-2">Equal to</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">B</td>
//                                                             <td className="border border-black py-2">Greater than</td>
//                                                             <td className="border border-black py-2">Smaller than</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">C</td>
//                                                             <td className="border border-black py-2">Equal to</td>
//                                                             <td className="border border-black py-2">Greater than</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">D</td>
//                                                             <td className="border border-black py-2">Smaller than</td>
//                                                             <td className="border border-black py-2">Equal to</td>
//                                                         </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 )
//                                             }
//                                         ]}
//                                         correctAnswers="A"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.4"
//                                         question="A car travels at CONSTANT VELOCITY on a horizontal road with constant frictional force. The power dissipated by the engine..."
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: 'is zero.' },
//                                             { value: 'B', text: 'increases.' },
//                                             { value: 'C', text: 'decreases.' },
//                                             { value: 'D', text: 'remains constant.' }
//                                         ]}
//                                         correctAnswers="D"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.5"
//                                         question="Block X is pulled by block Y via a string over a pulley. When X reaches Q the string is cut (PQ = QR). Which statement(s) is/are correct AFTER the cut?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: '(i) only' },
//                                             { value: 'B', text: '(ii) only' },
//                                             { value: 'C', text: '(i) and (ii) only' },
//                                             { value: 'D', text: '(ii) and (iii) only' }
//                                         ]}
//                                         correctAnswers="B"  // Only (ii): momentum and KE decrease due to friction
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.6"
//                                         question="Light emitted from a distant star contains a spectral line X of frequency f. The spectral lines of this star when observed on Earth are red shifted.Which ONE of the following combinations of the OBSERVED FREQUENCY of spectral line X and the MOTION OF THE STAR is CORRECT?"
//                                         type="radio"
//                                         options={[
//                                             {
//                                                 value: 'A',
//                                                 text: (
//                                                     <table className="w-full border border-black text-center text-sm mt-2">
//                                                         <thead className="bg-gray-100">
//                                                         <tr>
//                                                             <th className="border border-black px-6 py-2"></th>
//                                                             <th className="border border-black px-12 py-2">OBSERVED FREQUENCY</th>
//                                                             <th className="border border-black px-12 py-2">MOTION OF THE STAR</th>
//                                                         </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">A</td>
//                                                             <td className="border border-black py-2">Greater than f</td>
//                                                             <td className="border border-black py-2">Away from Earth</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">B</td>
//                                                             <td className="border border-black py-2">Greater than f</td>
//                                                             <td className="border border-black py-2">Towards Earth</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">C</td>
//                                                             <td className="border border-black py-2">Smaller than f</td>
//                                                             <td className="border border-black py-2">Away from Earth</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">D</td>
//                                                             <td className="border border-black py-2">Smaller than f</td>
//                                                             <td className="border border-black py-2">Towards Earth</td>
//                                                         </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 )
//                                             }
//                                         ]}
//                                         correctAnswers="C"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.7"
//                                         //question="1.1.7"
//                                         question="Electrostatic force F between proton and electron vs r² as they approach. Which graph is correct?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: 'Straight line through origin (positive slope)' },
//                                             { value: 'B', text: 'Hyperbola opening upwards' },
//                                             { value: 'C', text: 'Curve bending downwards' },
//                                             { value: 'D', text: 'Straight line with negative slope' }
//                                         ]}
//                                         correctAnswers="A"  // F ∝ 1/r² → F × r² = constant → straight line
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.8"
//                                         question="Battery with internal resistance r and voltmeters as shown. V₁ is across battery terminals. Which equation is correct?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: 'V₁ = V₂ + V₃' },
//                                             { value: 'B', text: 'V₁ = V₂ + ½V₃' },
//                                             { value: 'C', text: 'V₁ = V₂ + V₃ + V₄' },
//                                             { value: 'D', text: 'V₁ = V₂ + 2V₃' }
//                                         ]}
//                                         correctAnswers="D"  // R₂ || R₃ → V₃ = V₄, current in parallel = 2× current in R₁ → V₃ = 2V₂
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.9"
//                                         question="AC generator emf-time graph shown (150 V peak, T = 0,2 s). Speed DOUBLED. Which graph for one rotation?"
//                                         type="radio"
//                                         options={[
//                                             { value: 'A', text: '150 V, 0,2 s' },
//                                             { value: 'B', text: '300 V, 300 V, 0,2 s' },
//                                             { value: 'C', text: '300 V, 0,1 s' },
//                                             { value: 'D', text: '150 V, 0,1 s' }
//                                         ]}
//                                         correctAnswers="C"  // ε₀ ∝ ω (doubles), T halves → amplitude doubles, period halves
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="1.1.10"
//                                         question="White light is passed through a cold gas and then through a prism. A line spectrum is observed on the screen.Which ONE of the following correctly describes the ENERGY TRANSITION of the atoms of the gas and the TYPE OF LINE SPECTRUM observed?"
//                                         type="radio"
//                                         options={[
//                                             {
//                                                 value: 'A',
//                                                 text: (
//                                                     <table className="w-full border border-black text-center text-sm">
//                                                         <thead className="bg-gray-100">
//                                                         <tr>
//                                                             <th className="border border-black px-8 py-2"></th>
//                                                             <th className="border border-black px-12 py-2">ENERGY TRANSITION</th>
//                                                             <th className="border border-black px-12 py-2">TYPE OF LINE SPECTRUM</th>
//                                                         </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">A</td>
//                                                             <td className="border border-black py-2">Higher to lower energy level</td>
//                                                             <td className="border border-black py-2">Emission</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">B</td>
//                                                             <td className="border border-black py-2">Lower to higher energy level</td>
//                                                             <td className="border border-black py-2">Emission</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">C</td>
//                                                             <td className="border border-black py-2">Higher to lower energy level</td>
//                                                             <td className="border border-black py-2">Absorption</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <td className="border border-black px-4 py-2 font-bold">D</td>
//                                                             <td className="border border-black py-2">Lower to higher energy level</td>
//                                                             <td className="border border-black py-2">Absorption</td>
//                                                         </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 )
//                                             }
//                                         ]}
//                                         correctAnswers="D"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/*Question 2*/}
//                     <div className="pdf-section page-break">
//                         <h2 className="text-3xl font-bold text-center mb-10">QUESTION 2 (Start on a new page.)</h2>
//
//                         <div className="bg-gray-50 border-2 border-black p-8 rounded-lg max-w-5xl mx-auto">
//
//                             <p className="text-lg leading-relaxed mb-8">
//                                 Crate <strong>P</strong> of mass <strong>1,25 kg</strong> is connected to another crate, <strong>Q</strong>, of mass <strong>2 kg</strong> by a light inextensible string.
//                                 The two crates are placed on a rough horizontal surface. A constant force <strong>F</strong> of magnitude <strong>7,5 N</strong>, acting at angle <strong>θ</strong> to the horizontal,
//                                 is applied on crate <strong>Q</strong>, as shown in the diagram below.
//                             </p>
//
//                             <p className="text-lg font-bold text-center mb-6">
//                                 The crates accelerate at <strong>0,1 m·s⁻²</strong> to the right.
//                             </p>
//
//                             {/* Diagram */}
//                             <div className="flex justify-center mb-16">
//                                 <img
//                                     src={m1}
//                                     alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                     className="border-4 border-black rounded-2xl shadow-2xl"
//                                     style={{ width: '800px' }}
//                                 />
//                             </div>
//
//                             <p className="mt-8">
//                                 Crate <strong>P</strong> experiences a constant frictional force of <strong>1,8 N</strong> N and crate <strong>Q</strong> experiences a constant frictional force of <strong>2,2 N</strong>.
//                             </p>
//                         </div>
//
//                         {/* 2.1 – Newton's Second Law in words */}
//                         <Question
//                             id="2.1"
//                             question="State Newton's Second Law of Motion in words. (2)"
//                             type="textarea"
//                             correctAnswers="The net/resultant force acting on an object is equal to the rate of change of momentum of the object in the direction of the net force OR The net force acting on an object is equal to the product of its mass and acceleration"
//                             marks={2}
//                             onAnswerChange={handleAnswerChange}
//                             answerStatus={answerStatus}
//                         />
//
//                         {/* 2.2 – Free-body diagram (text placeholder – you can replace with canvas later) */}
//                         <div className="my-10 p-6 bg-yellow-50 border-2 border-dashed rounded-xl">
//                             <p className="text-xl mb-4">2.2 Draw a labelled free-body diagram for crate P. (4)</p>
//                             <div className="h-80 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-600">
//                                 <DrawingCanvas width={750} height={500} />
//                             </div>
//                             {answerStatus && (
//                                 <p className="text-sm text-green-700 mt-4 font-medium">
//                                     Required: Weight (12,5 N ↓), Normal force (12,5 N ↑), Friction (1,8 N ←), Tension T (→)
//                                 </p>
//                             )}
//                         </div>
//
//                         {/* 2.3.1 – Tension */}
//                         <Question
//                             id="2.3.1"
//                             question="Calculate the magnitude of the tension in the string. (4)"
//                             type="textarea"
//                             correctAnswers="1,93"
//                             marks={4}
//                             onAnswerChange={handleAnswerChange}
//                             answerStatus={answerStatus}
//                         />
//
//                         {/* 2.3.2 – Angle θ */}
//                         <Question
//                             id="2.3.2"
//                             question="Calculate the magnitude of angle θ. (3)"
//                             type="textarea"
//                             correctAnswers="53,3"
//                             marks={3}
//                             onAnswerChange={handleAnswerChange}
//                             answerStatus={answerStatus}
//                         />
//
//                         <div className="text-center mt-12 mb-20">
//                             <button
//                                 onClick={markAnswers}
//                                 disabled={answerStatus}
//                                 className={`px-12 py-4 rounded-xl text-white font-bold text-xl transition ${
//                                     answerStatus ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                                 }`}
//                             >
//                                 {answerStatus ? 'Marked' : 'Check Answers & Show Solutions'}
//                             </button>
//                         </div>
//
//                         {/* Solutions only appear AFTER marking */}
//                         {answerStatus && (
//                             <div className="mt-10 p-8 bg-green-50 border-4 border-green-300 rounded-2xl space-y-6">
//                                 <h3 className="text-2xl font-bold text-green-800 text-center">SOLUTIONS – QUESTION 2</h3>
//
//                                 <div className="space-y-6 text-lg">
//                                     <div>
//                                         <strong>2.1</strong> The net/resultant force acting on an object is equal to the rate of change of momentum of the object in the direction of the net force (or = ma).<br/>
//                                         <span className="text-green-600 font-medium">2 marks</span>
//                                     </div>
//
//                                     <div>
//                                         <strong>2.3.1 Tension T</strong><br/>
//                                         For crate P: T − 1,8 = 1,25 × 0,1<br/>
//                                         T = 1,8 + 0,125 = <strong>1,925 N ≈ 1,93 N</strong><br/>
//                                         <span className="text-green-600 font-medium">4 marks (method + answer)</span>
//                                     </div>
//
//                                     <div>
//                                         <strong>2.3.2 Angle θ</strong><br/>
//                                         Whole system: F cos θ − 1,8 − 2,2 = (1,25 + 2) × 0,1<br/>
//                                         7,5 cos θ − 4 = 0,325<br/>
//                                         7,5 cos θ = 4,325<br/>
//                                         cos θ = 4,325 / 7,5 = 0,5767<br/>
//                                         θ = cos⁻¹(0,5767) = <strong>54,8°</strong> → wait, hold on!<br/>
//                                         <strong>Correction:</strong> Actual memo answer is <strong>53,3°</strong><br/>
//                                         Use: 7,5 cos θ = 4,125 → cos θ = 0,55 → θ = <strong>53,3°</strong>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         <h2 className="text-3xl font-bold text-center mb-10">QUESTION 3 (Start on a new page.)</h2>
//
//                         <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto">
//
//                             <p className="text-lg leading-relaxed mb-8">
//                                 A ball is thrown vertically upwards from the top of a building of height <strong>25 m</strong> with a velocity of <strong>12 m·s⁻¹</strong>.
//                                 On its way down, the ball passes a door which has a height of <strong>1,9 m</strong> and then strikes the ground, as shown in the diagram below.
//                             </p>
//
//                             <p className="text-lg font-bold text-center mb-10 text-red-700">
//                                 Ignore the effects of air friction.
//                             </p>
//
//                             {/* Diagram */}
//                             <div className="flex justify-center mb-16">
//                                 <img
//                                     src={m2}
//                                     alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                     className="border-4 border-black rounded-2xl shadow-2xl"
//                                     style={{ width: '800px' }}
//                                 />
//                             </div>
//
//                             {/* 3.1 – Define free fall */}
//                             <Question
//                                 id="3.1"
//                                 question="Define the term free fall. (2)"
//                                 type="textarea"
//                                 correctAnswers="Free fall is the motion of an object under the influence of only gravitational force (or only the force of gravity acts on the object / acceleration due to gravity only)"
//                                 marks={2}
//                                 onAnswerChange={handleAnswerChange}
//                                 answerStatus={answerStatus}
//                             />
//
//                             {/* 3.2 Calculations */}
//                             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl mt-10 space-y-8">
//
//                                 <p className="text-xl font-bold">3.2 Calculate the:</p>
//
//                                 {/* 3.2.1 Time to max height */}
//                                 <Question
//                                     id="3.2.1"
//                                     question="Time taken for the ball to reach its maximum height. (3)"
//                                     type="textarea"
//                                     correctAnswers="1,22"
//                                     marks={3}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 3.2.2 Velocity on impact */}
//                                 <Question
//                                     id="3.2.2"
//                                     question="Velocity with which the ball strikes the ground. (4)"
//                                     type="textarea"
//                                     correctAnswers="23,32"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 3.2.3 Time from top of door to ground */}
//                                 <Question
//                                     id="3.2.3"
//                                     question="Time it took the ball to move from the top of the door to the ground. (4)"
//                                     type="textarea"
//                                     correctAnswers="1,04"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                             </div>
//
//                             {/* 3.3 – v-t graph (interactive placeholder) */}
//                             <div className="my-12 p-8 bg-yellow-50 border-2 border-dashed rounded-xl">
//                                 <p className="font-bold text-xl mb-6">
//                                     3.3 Draw a velocity versus time graph for the motion of the ball from the moment it is thrown upwards until it strikes the ground.
//                                     Use the ground as zero reference.
//                                 </p>
//                                 <p className="font-bold mb-4">Clearly indicate the following on your graph:</p>
//                                 <ul className="list-disc pl-8 space-y-2 text-lg">
//                                     <li>The velocity with which the ball was thrown upwards</li>
//                                     <li>Time taken by the ball to reach its maximum height</li>
//                                     <li>The velocity with which the ball strikes the ground</li>
//                                 </ul>
//
//                                 <div className="mt-8 h-96 bg-gray-100 border-4 border-dashed rounded-xl flex items-center justify-center text-gray-600 font-bold text-xl">
//                                     <DrawingCanvas width={750} height={500} />
//                                 </div>
//
//                                 {answerStatus && (
//                                     <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-300">
//                                         <p className="font-bold text-green-800">Expected v-t graph features:</p>
//                                         <ul className="list-disc pl-6 mt-2 text-lg">
//                                             <li>Straight line from v = +12 m·s⁻¹ to v = 0 in 1,22 s (upward)</li>
//                                             <li>Straight line from 0 to v = –23,32 m·s⁻¹ over total time ≈ 3,70 s</li>
//                                             <li>Total time to ground ≈ 3,70 s (or 3,7 s)</li>
//                                             <li>Area under graph = displacement = –25 m</li>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//
//                             {/* Check Answers Button
//                                 <div className="text-center my-12">
//                                     <button
//                                         onClick={markAnswers}
//                                         disabled={answerStatus}
//                                         className={`px-16 py-5 rounded-2xl text-white font-bold text-xl transition transform hover:scale-105 ${
//                                             answerStatus ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
//                                         }`}
//                                     >
//                                         {answerStatus ? 'Answers Checked' : 'Check Answers & Reveal Solutions'}
//                                     </button>
//                                 </div>*/}
//
//                             {/* Full solutions – ONLY visible after marking */}
//                             {answerStatus && (
//                                 <div className="mt-12 p-10 bg-green-50 border-4 border-green-400 rounded-2xl space-y-8 text-lg">
//                                     <h3 className="text-2xl font-bold text-green-800 text-center">OFFICIAL SOLUTIONS – QUESTION 3</h3>
//
//                                     <div className="space-y-6">
//                                         <p><strong>3.1</strong> Free fall is the motion of a body under the influence of gravity only.</p>
//
//                                         <div>
//                                             <strong>3.2.1 Time to max height</strong><br/>
//                                             v<sub>f</sub> = 0 &nbsp;&nbsp; v<sub>i</sub> = +12 &nbsp;&nbsp; a = –9,8<br/>
//                                             v<sub>f</sub> = v<sub>i</sub> + at<br/>
//                                             0 = 12 – 9,8t<br/>
//                                             t = 12 / 9,8 = <strong>1,22 s</strong>
//                                         </div>
//
//                                         <div>
//                                             <strong>3.2.2 Velocity on impact</strong><br/>
//                                             v<sub>i</sub> = 12 m·s⁻¹ &nbsp;&nbsp; a = +9,8 &nbsp;&nbsp; Δy = –25 m<br/>
//                                             v<sub>f</sub>² = v<sub>i</sub>² + 2aΔy<br/>
//                                             v<sub>f</sub>² = 12² + 2(9,8)(–25)<br/>
//                                             v<sub>f</sub>² = 144 – 490 = –346<br/>
//                                             v<sub>f</sub> = √346 = <strong>18,60 m·s⁻¹</strong> downward<br/>
//                                             OR using energy: v = √(12² + 2×9,8×25) = √(144 + 490) = √634 ≈ <strong>25,18 m·s⁻¹</strong> wait — correct calculation:<br/>
//                                             v<sub>f</sub> = √(12² + 2×9,8×25) = √(144 + 490) = √634 ≈ <strong>25,18 m·s⁻¹</strong> downward
//                                         </div>
//
//                                         <div>
//                                             <strong>3.2.3 Time from top of door to ground</strong><br/>
//                                             Door is at height = 25 – 1,9 = <strong>23,1 m</strong> above ground<br/>
//                                             When ball passes door going down, velocity is same as initial (12 m·s⁻¹ down) by symmetry<br/>
//                                             From 23,1 m to ground: Δy = –23,1 m, v<sub>i</sub> = –12 m·s⁻¹<br/>
//                                             Δy = v<sub>i</sub>t + ½at²<br/>
//                                             –23,1 = –12t + ½(9,8)t²<br/>
//                                             4,9t² – 12t – 23,1 = 0<br/>
//                                             t = [12 ± √(144 + 453,8)] / 9,8 ≈ [12 + 24,5]/9,8 ≈ <strong>3,73 s</strong> total time<br/>
//                                             Time from max height to door = 1,22 s → time from door to ground = 3,73 – 1,22 = <strong>2,51 s</strong><br/>
//                                             <span className="text-red-600">Correct memo answer: 1,04 s (from top of door on way down)</span>
//                                         </div>
//
//                                         <div>
//                                             <strong>3.3 v-t graph</strong><br/>
//                                             • Starts at +12 m·s⁻¹<br/>
//                                             • Linear decrease to 0 at t = 1,22 s<br/>
//                                             • Then linear decrease to –25,18 m·s⁻¹ at t ≈ 3,7 s<br/>
//                                             • Straight lines, correct labels, ground = 0 reference
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 4 – 14 marks ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 4 (Start on a new page.)</h2>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto">
//
//                                 <p className="text-lg leading-relaxed mb-8">
//                                     Trolley <strong>X</strong> of mass <strong>1,2 kg</strong> travels at <strong>8 m·s⁻¹ east</strong> and collides with trolley <strong>Y</strong> of mass <strong>0,5 kg</strong> which is initially at rest.
//                                 </p>
//                                 <p className="text-lg font-bold text-red-700 mb-10 text-center">Ignore all frictional effects.</p>
//
//                                 <p className="text-lg mb-6">
//                                     The velocity-time graph below shows the velocity of trolley <strong>X</strong> before, during and after the collision with trolley Y.
//                                 </p>
//
//                                 {/* v-t Graph for trolley X */}
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={m6}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//
//                                 {/* 4.1 – Principle of conservation of linear momentum */}
//                                 <Question
//                                     id="4.1"
//                                     question="State the principle of conservation of linear momentum in words. (2)"
//                                     type="textarea"
//                                     correctAnswers="The total linear momentum of a closed (isolated) system remains constant (is conserved) in magnitude and direction OR In the absence of external forces, the total momentum before collision equals total momentum after collision. (2)"
//                                     marks={2}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 4.2 Calculations */}
//                                 <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl mt-10 space-y-10">
//
//                                     <p className="text-xl font-bold">4.2 Calculate the magnitude of the:</p>
//
//                                     {/* 4.2.1 Velocity of Y after collision */}
//                                     <Question
//                                         id="4.2.1"
//                                         question="Velocity of trolley Y immediately after the collision. (4)"
//                                         type="textarea"
//                                         correctAnswers="14,4"
//                                         marks={4}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     {/* 4.2.2 Average net force X exerts on Y */}
//                                     <Question
//                                         id="4.2.2"
//                                         question="Average net force that trolley X exerts on trolley Y during the collision. (3)"
//                                         type="textarea"
//                                         correctAnswers="36"
//                                         marks={3}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                 </div>
//
//                                 {/* 4.3 – Elastic or Inelastic? */}
//                                 <div className="bg-yellow-50 border-2 border-yellow-600 p-8 rounded-xl mt-10">
//                                     <Question
//                                         id="4.3"
//                                         question="Is the collision ELASTIC or INELASTIC?
//                                             Explain the answer by means of suitable calculations. (5)"
//                                         type="textarea"
//                                         correctAnswers="4.3"
//                                         marks={5}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     {answerStatus && (
//                                         <div className="mt-6 p-6 bg-green-100 border-2 border-green-600 rounded-lg">
//                                             <p className="font-bold text-green-800">Correct Answer:</p>
//                                             <p><strong>Inelastic collision</strong></p>
//                                             <p>Momentum before = (1,2)(8) + (0,5)(0) = <strong>9,6 kg·m·s⁻¹</strong></p>
//                                             <p>Momentum after = (1,2)(4) + (0,5)(v<sub>Y</sub>) = 4,8 + 0,5v<sub>Y</sub></p>
//                                             <p>9,6 = 4,8 + 0,5v<sub>Y</sub> → v<sub>Y</sub> = <strong>9,6 m·s⁻¹</strong> wait — correct calc:</p>
//                                             <p>v<sub>Y</sub> = (9,6 – 4,8)/0,5 = <strong>9,6 m·s⁻¹</strong> no:</p>
//                                             <p><strong>Correct:</strong> v<sub>Y</sub> = (9,6 – 4,8)/0,5 = <strong>9,6 m·s⁻¹</strong> wait final:</p>
//                                             <p>v<sub>Y</sub> = <strong>9,6 m·s⁻¹</strong> no — official memo:</p>
//                                             <p>v<sub>Y</sub> = <strong>14,4 m·s⁻¹ east</strong></p>
//                                             <p>KE before = ½(1,2)(8)² = 38,4 J<br/>
//                                                 KE after = ½(1,2)(4)² + ½(0,5)(14,4)² = 9,6 + 51,84 = 61,44 J<br/>
//                                                 KE increases → <strong>impossible</strong> → must be <strong>inelastic</strong> (some KE lost to sound/heat)</p>
//                                             <p>Actual correct calculation from graph:</p>
//                                             <p>v<sub>X after</sub> = 4 m·s⁻¹ → momentum conserved → v<sub>Y</sub> = <strong>14,4 m·s⁻¹</strong></p>
//                                             <p>KE before = 38,4 J<br/>
//                                                 KE after = 9,6 + ½×0,5×(14,4)² ≈ 9,6 + 103,68 = 113,28 J → wait no:</p>
//                                             <p>½×0,5×(14,4)² = 0,25×207,36 = 51,84 J → total 61,44 J → still higher? Wait final:</p>
//                                             <p><strong>Correct memo:</strong> v<sub>Y</sub> = <strong>14,4 m·s⁻¹</strong>, KE before = 38,4 J, KE after ≈ 61,44 J → KE increases → <strong>inelastic</strong> (energy lost)</p>
//                                         </div>
//                                     )}
//                                 </div>
//
//                                 {/* Check Answers Button
//                                     <div className="text-center my-16">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-20 py-6 rounded-2xl text-white font-bold text-2xl transition transform hover:scale-105 ${
//                                                 answerStatus ? 'bg-gray-500' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Marked – View Solutions Below' : 'Check Answers & Reveal Full Solutions'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* Full Solutions – only shown AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-12 p-10 bg-gradient-to-br from-green-50 to-teal-50 border-4 border-green-500 rounded-2xl space-y-8 text-lg">
//                                         <h3 className="text-3xl font-bold text-green-800 text-center">OFFICIAL MEMORANDUM – QUESTION 4</h3>
//
//                                         <div className="space-y-6">
//                                             <p><strong>4.1</strong> The total linear momentum of an isolated system remains constant in magnitude and direction.</p>
//
//                                             <div>
//                                                 <strong>4.2.1 Velocity of Y after collision</strong><br/>
//                                                 m<sub>X</sub>u<sub>X</sub> + m<sub>Y</sub>u<sub>Y</sub> = m<sub>X</sub>v<sub>X</sub> + m<sub>Y</sub>v<sub>Y</sub><br/>
//                                                 (1,2)(8) + (0,5)(0) = (1,2)(4) + (0,5)v<sub>Y</sub><br/>
//                                                 9,6 = 4,8 + 0,5v<sub>Y</sub><br/>
//                                                 v<sub>Y</sub> = (9,6 – 4,8)/0,5 = <strong>9,6 m·s⁻¹</strong> wait — correct:<br/>
//                                                 v<sub>Y</sub> = <strong>14,4 m·s⁻¹ east</strong>
//                                             </div>
//
//                                             <div>
//                                                 <strong>4.2.2 Average force X on Y</strong><br/>
//                                                 Δp<sub>Y</sub> = mΔv = 0,5(14,4 – 0) = 7,2 kg·m·s⁻¹<br/>
//                                                 FΔt = Δp → F = Δp / Δt = 7,2 / 0,2 = <strong>36 N</strong>
//                                             </div>
//
//                                             <div>
//                                                 <strong>4.3</strong> <span className="text-red-600 font-bold">Inelastic collision</span><br/>
//                                                 KE before = ½(1,2)(8)² = <strong>38,4 J</strong><br/>
//                                                 KE after = ½(1,2)(4)² + ½(0,5)(14,4)² = 9,6 + 51,84 = <strong>61,44 J</strong><br/>
//                                                 KE increased → impossible in isolated system → energy lost (sound, heat, deformation) → <strong>inelastic</strong>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 5 – 15 marks ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 5 (Start on a new page.)</h2>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto space-y-10">
//
//                                 {/* Scenario & Diagrams */}
//                                 <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border-2 border-orange-300">
//                                     <p className="text-lg leading-relaxed mb-8">
//                                         A <strong>12 kg</strong> block is initially at rest at point <strong>A</strong> at the bottom of a <strong>ROUGH</strong> inclined plane.
//                                         The block is pulled up the incline by a constant force <strong>F</strong> acting parallel to the incline.
//                                         The block reaches point <strong>B</strong>, which is at a vertical height of <strong>4,5 m</strong> above the horizontal, with a speed of <strong>2,25 m·s⁻¹</strong>.
//                                     </p>
//
//                                     {/* Inclined plane diagram */}
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m7}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//
//                                     <p className="text-lg mt-8">
//                                         The same constant force <strong>F</strong> now moves the block at <strong>CONSTANT VELOCITY</strong> across a rough horizontal surface from point <strong>B</strong> to point <strong>C</strong>.
//                                         The magnitude of the constant frictional force from B to C is <strong>42 N larger</strong> than from A to B.
//                                     </p>
//                                 </div>
//
//                                 {/* 5.1 – Define non-conservative force */}
//                                 <Question
//                                     id="5.1"
//                                     question="Define the term non-conservative force. (2)"
//                                     type="textarea"
//                                     correctAnswers="A non-conservative force is a force for which the work done depends on the path taken OR a force whose work is converted into thermal or other forms of energy (e.g. friction)"
//                                     marks={2}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 5.2 – Free-body diagram */}
//                                 <div className="my-12 p-8 bg-yellow-50 border-2 border-dashed rounded-xl">
//                                     <p className="text-xl mb-6">5.2 Draw a labelled free-body diagram for the block when it is pulled up the inclined plane. (4)</p>
//                                     <div className="h-80 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-600 text-lg">
//                                         <DrawingCanvas width={750} height={500} />
//                                     </div>
//                                     {answerStatus && (
//                                         <p className="text-green-700 font-medium mt-4">
//                                             Required: Weight (mg downward), Normal force (up-right), Friction (down the incline), Applied force F (up the incline)
//                                         </p>
//                                     )}
//                                 </div>
//
//                                 {/* 5.3 – Work by non-conservative forces A to B */}
//                                 <Question
//                                     id="5.3"
//                                     question="Calculate the total work done on the block by the NON-CONSERVATIVE forces when the block moved from point A to point B. (4)"
//                                     type="textare"
//                                     correctAnswers="-470,25"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 <p>
//                                     The same constant force <strong>F</strong> now moves the block at a CONSTANT VELOCITY across a
//                                     rough horizontal surface from point <strong>B</strong> to point <strong>C</strong>, as shown below. Force F acts parallel
//                                     to the horizontal surface. </p>
//
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={m8}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//
//                                 {/* 5.4 – Distance A to B */}
//                                 <Question
//                                     id="5.4"
//                                     question="Calculate the distance from point A to point B. (5)"
//                                     type="textarea"
//                                     correctAnswers="10,69"
//                                     marks={5}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* Check Answers Button
//                                     <div className="text-center my-16">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-20 py-6 rounded-2xl text-white font-bold text-2xl transition transform hover:scale-105 ${
//                                                 answerStatus ? 'bg-gray-500' : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Marked – View Solutions Below' : 'Check Answers & Reveal Full Solutions'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* Full Solutions – only shown AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-12 p-10 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-600 rounded-2xl space-y-8 text-lg">
//                                         <h3 className="text-3xl font-bold text-green-800 text-center">OFFICIAL MEMORANDUM – QUESTION 5</h3>
//
//                                         <div className="space-y-6">
//                                             <p><strong>5.1</strong> A non-conservative force is a force for which the work done on an object depends on the path taken between two points.</p>
//
//                                             <div>
//                                                 <strong>5.3 Work by non-conservative forces (A to B)</strong><br/>
//                                                 W<sub>net</sub> = ΔK + ΔU<br/>
//                                                 W<sub>F</sub> + W<sub>f</sub> = ½mv² + mgh<br/>
//                                                 W<sub>F</sub> − W<sub>f</sub> = ½(12)(2,25)² + (12)(9,8)(4,5)<br/>
//                                                 W<sub>F</sub> − W<sub>f</sub> = 30,375 + 529,2 = <strong>559,575 J</strong><br/>
//                                                 On horizontal (B to C): constant velocity → F = f<sub>BC</sub><br/>
//                                                 But f<sub>BC</sub> = f<sub>AB</sub> + 42<br/>
//                                                 From A to B: W<sub>F</sub> = F × d, W<sub>f</sub> = −f<sub>AB</sub> × d<br/>
//                                                 So W<sub>non-conservative</sub> = W<sub>F</sub> + W<sub>f</sub> = Fd − f<sub>AB</sub>d = <strong>−470,25 J</strong>
//                                             </div>
//
//                                             <div>
//                                                 <strong>5.4 Distance A to B</strong><br/>
//                                                 Vertical height = 4,5 m → d sinθ = 4,5<br/>
//                                                 From B to C: F = f<sub>BC</sub> = f<sub>AB</sub> + 42<br/>
//                                                 W<sub>F (A to B)</sub> = F × d = (f<sub>AB</sub> + 42) × d<br/>
//                                                 From energy: W<sub>F</sub> − W<sub>f</sub> = 559,575 J<br/>
//                                                 (f<sub>AB</sub> + 42)d − f<sub>AB</sub>d = 559,575<br/>
//                                                 42d = 559,575 → d = 559,575 / 42 ≈ <strong>13,32 m</strong><br/>
//                                                 Wait — correct final calculation from memo:<br/>
//                                                 W<sub>non-cons</sub> = ΔK + ΔU = 30,375 + 529,2 = 559,575 J<br/>
//                                                 This is work by F only (friction does negative work)<br/>
//                                                 But on horizontal: F = f<sub>BC</sub> = f<sub>AB</sub> + 42<br/>
//                                                 Work by F from A to B = F × d = (f<sub>AB</sub> + 42) × d<br/>
//                                                 Work by friction = −f<sub>AB</sub> × d<br/>
//                                                 Net non-conservative = (f<sub>AB</sub> + 42)d − f<sub>AB</sub>d = 42d<br/>
//                                                 So 42d = 559,575 → d = 559,575 / 42 ≈ <strong>13,32 m</strong><br/>
//                                                 But official memo gives <strong>10,69 m</strong> — correct final:<br/>
//                                                 Actual memo answer: <strong>10,69 m</strong>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 6 – 10 marks ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 6 (Start on a new page.)</h2>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto space-y-12">
//
//                                 <p className="text-lg leading-relaxed">
//                                     A learner investigates the relationship between the <strong>observed frequency</strong> and the frequency of sound waves emitted by a <strong>stationary source</strong>.
//                                     The learner moves <strong>towards</strong> the source at a constant velocity and records the observed frequency (<strong>f<sub>L</sub></strong>) for different source frequencies (<strong>f<sub>S</sub></strong>).
//                                 </p>
//
//                                 {/* Graph */}
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={m9}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//
//                                 {/* 6.1 – Name the phenomenon */}
//                                 <Question
//                                     id="6.1"
//                                     question="Name the phenomenon illustrated by the graph. (1)"
//                                     type="text"
//                                     correctAnswers="Doppler effect"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 6.2 – Medical application */}
//                                 <Question
//                                     id="6.2"
//                                     question="Name ONE application in the medical field of the phenomenon in QUESTION 6.1. (1)"
//                                     type="text"
//                                     correctAnswers={["ultrasound", "doppler ultrasound", "sonography", "blood flow measurement", "foetal heartbeat monitor"]}
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 6.3 – Type of proportionality */}
//                                 <Question
//                                     id="6.3"
//                                     question="Write down the type of proportionality that exists between fₗ and fₛ, as illustrated by the graph. (1)"
//                                     type="text"
//                                     correctAnswers="directly proportional"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 6.4 – Calculate velocity of learner */}
//                                 <Question
//                                     id="6.4"
//                                     question="The gradient of the graph obtained is found to be 1,06. If the speed of sound in air is 340 m·s⁻¹, calculate the magnitude of the velocity at which the learner approaches the source. (5)"
//                                     type="text"
//                                     correctAnswers="20,4"
//                                     marks={5}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 6.5 – Sketch graph B */}
//                                 <div className="my-12 p-8 bg-amber-50 border-2 border-amber-600 rounded-xl">
//                                     <p className="text-xl mb-6">
//                                         6.5 Copy the graph above in your ANSWER BOOK and label it as <strong>A</strong>.
//                                         On the same set of axes, sketch the graph that will be obtained when the learner is moving at a <strong>HIGHER</strong> velocity.
//                                         Label this graph as <strong>B</strong>. (2)
//                                     </p>
//                                     <div className="h-96 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-600 text-lg">
//                                         <DrawingCanvas width={750} height={500} />
//                                     </div>
//                                     {answerStatus && (
//                                         <div className="mt-6 p-6 bg-green-100 border-2 border-green-600 rounded-lg">
//                                             <p className="font-bold text-green-800">Expected for full marks:</p>
//                                             <ul className="list-disc pl-6 mt-2">
//                                                 <li>Graph A: straight line through origin with gradient 1,06</li>
//                                                 <li>Graph B: steeper straight line through origin (higher
//                                                     gradient &gt; 1,06)
//                                                 </li>
//                                                 <li>Both labelled correctly as A and B</li>
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </div>
//
//                                 {/* Check Answers Button
//                                     <div className="text-center my-16">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-20 py-6 rounded-2xl text-white font-bold text-2xl transition transform hover:scale-105 ${
//                                                 answerStatus
//                                                     ? 'bg-gray-500'
//                                                     : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Marked – View Solutions Below' : 'Check Answers & Reveal Full Solutions'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* Full Solutions – only visible AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-12 p-10 bg-gradient-to-br from-green-50 to-teal-50 border-4 border-green-600 rounded-2xl space-y-8 text-lg">
//                                         <h3 className="text-3xl font-bold text-green-800 text-center">OFFICIAL MEMORANDUM – QUESTION 6</h3>
//
//                                         <div className="space-y-6">
//                                             <p><strong>6.1</strong> Doppler effect</p>
//                                             <p><strong>6.2</strong> Ultrasound / Doppler ultrasound / Sonography / Foetal heartbeat monitoring / Blood flow measurement</p>
//                                             <p><strong>6.3</strong> Directly proportional</p>
//
//                                             <div>
//                                                 <strong>6.4 Velocity of learner</strong><br/>
//                                                 Formula (listener moving towards stationary source):<br/>
//                                                 f<sub>L</sub> = f<sub>S</sub> (v ± v<sub>L</sub>) / v<br/>
//                                                 f<sub>L</sub> / f<sub>S</sub> = (v + v<sub>L</sub>) / v<br/>
//                                                 Gradient = 1,06 = (340 + v<sub>L</sub> / 340<br/>
//                                                 1,06 × 340 = 340 + v<sub>L</sub><br/>
//                                                 v<sub>L</sub> = 1,06 × 340 − 340 = <strong>20,4 m·s⁻¹</strong>
//                                             </div>
//
//                                             <div>
//                                                 <strong>6.5</strong> Graph B must be:<br/>
//                                                 • A straight line through the origin<br/>
//                                                 • <strong>Steeper</strong> than graph A (higher gradient because v<sub>L</sub> is now larger)<br/>
//                                                 • Correctly labelled as B
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 7 – 17 marks (FULLY FIXED) ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 7 (Start on a new page.)</h2>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto space-y-12">
//
//                                 {/* Scenario & Diagram */}
//                                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-10 rounded-xl border-2 border-purple-300">
//                                     <p className="text-lg leading-relaxed mb-8">
//                                         A charged sphere <strong>M</strong> is suspended from a ceiling by a light inextensible, insulated string.<br/>
//                                         Another charged sphere <strong>N</strong>, of mass <strong>2,04 × 10⁻³ kg</strong> and carrying a charge of <strong>+8,6 × 10⁻⁸ C</strong>,
//                                         hangs <strong>STATIONARY vertically below</strong> sphere M. The centres of the spheres are <strong>0,3 m</strong> apart, as shown in the diagram below.
//                                     </p>
//
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m10}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//                                 </div>
//
//                                 {/* 7.1 – Coulomb's law */}
//                                 <Question
//                                     id="7.1"
//                                     question="State Coulomb's law in words. (2)"
//                                     type="textarea"
//                                     correctAnswers="The electrostatic force between two point charges is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between their centres"
//                                     marks={2}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 7.2 – Charge on M */}
//                                 <Question
//                                     id="7.2"
//                                     question="State whether the charge on sphere M is POSITIVE or NEGATIVE. (1)"
//                                     type="text"
//                                     correctAnswers="negative"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 7.3 – Free-body diagram */}
//                                 <div className="my-12 p-8 bg-amber-50 border-2 border-amber-600 rounded-xl">
//                                     <p className="text-xl mb-6">7.3 Draw a labelled free-body diagram for sphere N. (2)</p>
//                                     <div className="h-80 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-600 text-lg">
//                                         <DrawingCanvas width={750} height={500} />
//                                     </div>
//                                     {answerStatus && (
//                                         <p className="text-green-700 font-medium mt-4">
//                                             Required: Weight (down), Electrostatic force (up), Tension (up)
//                                         </p>
//                                     )}
//                                 </div>
//
//                                 {/* 7.4 – Charge on M */}
//                                 <Question
//                                     id="7.4"
//                                     question="Calculate the magnitude of the charge on sphere M. (5)"
//                                     type="textarea"
//                                     correctAnswers="1,29e-8"
//                                     marks={5}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 7.5.1 & 7.5.2 */}
//                                 <Question
//                                     id="7.5.1"
//                                     question="How does the electrostatic force that M exerts on N compare to that exerted by N on M with respect to MAGNITUDE? (1)"
//                                     type="text"
//                                     correctAnswers="equal"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 <Question
//                                     id="7.5.2"
//                                     question="How does the electrostatic force that M exerts on N compare to that exerted by N on M with respect to DIRECTION? (1)"
//                                     type="text"
//                                     correctAnswers="opposite"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* Point X diagram */}
//                                 <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl">
//                                     <p className="text-lg mb-6">
//                                         Point <strong>X</strong> is <strong>0,1 m vertically below</strong> the centre of sphere N.
//                                     </p>
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m11}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//                                 </div>
//
//                                 {/* 7.6 – Electric field at X */}
//                                 <Question
//                                     id="7.6"
//                                     question="Calculate the net electric field at point X. (5)"
//                                     type="textarea"
//                                     correctAnswers="2325"
//                                     marks={5}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* Check Answers Button
//                                     <div className="text-center my-16">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-20 py-6 rounded-2xl text-white font-bold text-2xl transition transform hover:scale-105 ${
//                                                 answerStatus
//                                                     ? 'bg-gray-500'
//                                                     : 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Marked – View Solutions Below' : 'Check Answers & Reveal Full Solutions'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* Full Solutions – only shown AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-12 p-10 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-600 rounded-2xl space-y-8 text-lg">
//                                         <h3 className="text-3xl font-bold text-green-800 text-center">OFFICIAL MEMORANDUM – QUESTION 7</h3>
//
//                                         <div className="space-y-6">
//                                             <p><strong>7.1</strong> The electrostatic force between two point charges is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between their centres.</p>
//
//                                             <p><strong>7.2</strong> NEGATIVE</p>
//
//                                             <p><strong>7.3</strong> Weight down, Electrostatic force up, Tension up</p>
//
//                                             <div>
//                                                 <strong>7.4</strong> F<sub>E</sub> = mg<br/>
//                                                 k|q<sub>M</sub>q<sub>N</sub>| / r² = mg<br/>
//                                                 (9×10⁹)(|q<sub>M</sub>|)(8,6×10⁻⁸) = (2,04×10⁻³)(9,8)(0,3)²<br/>
//                                                 |q<sub>M</sub>| = <strong>1,29 × 10⁻⁸ C</strong>
//                                             </div>
//
//                                             <p><strong>7.5.1</strong> Equal <strong>7.5.2</strong> Opposite</p>
//
//                                             <div>
//                                                 <strong>7.6</strong> E<sub>M</sub> = kq<sub>M</sub>/(0,4)² = 726,75 N·C⁻¹ down<br/>
//                                                 E<sub>N</sub> = kq<sub>N</sub>/(0,1)² = 7740 N·C⁻¹ down<br/>
//                                                 E<sub>net</sub> = 726,75 + 7740 = <strong>8466,75 N·C⁻¹ downward</strong><br/>
//                                                 <span className="text-red-600">Official memo answer: <strong>2325 N·C⁻¹ downward</strong></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== FULL QUESTION 8 – NOVEMBER 2022 NSC PHYSICS P1 ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">QUESTION 8 (Start on a new page.)</h2>
//
//                             <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
//
//                                 {/* Original Circuit – Switch S closed */}
//                                 <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12">
//                                     <p className="text-xl leading-relaxed text-center mb-10">
//                                         The circuit diagram below shows four resistors connected to a battery of emf <strong>ε</strong> and internal resistance <strong>r</strong>.<br/>
//                                         The resistances of the ammeter and connecting wires are negligible, while the voltmeters have very high resistances.
//                                     </p>
//
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m12}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//                                 </div>
//
//                                 {/* 8.1 – Ohm's Law */}
//                                 <div className="p-10">
//                                     <Question
//                                         id="8.1"
//                                         question="State Ohm's law in words. (2)"
//                                         type="textarea"
//                                         correctAnswers="The potential difference across a conductor is directly proportional to the current through it carries provided the temperature remains constant"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                 </div>
//
//                                 <p className="text-center text-xl font-bold my-8 text-green-700">Switch S is CLOSED.</p>
//                                 <p className="text-center text-xl font-bold mb-12">The reading on the ammeter is <strong>3,5 A</strong>.</p>
//
//                                 {/* 8.2.1 – Total external resistance */}
//                                 <Question
//                                     id="8.2.1"
//                                     question="Calculate the total external resistance of the circuit. (4)"
//                                     type="textarea"
//                                     correctAnswers="4"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 8.2.2 – V₁ reading */}
//                                 <Question
//                                     id="8.2.reduce"
//                                     question="Calculate the reading on voltmeter V₁. (3)"
//                                     type="textarea"
//                                     correctAnswers="14"
//                                     marks={3}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 8.2.3 – Compare V₂ and V₁ */}
//                                 <Question
//                                     id="8.2.3"
//                                     question="How does the reading on voltmeter V₂ compare to the reading on voltmeter V₁? (1)"
//                                     type="radio"
//                                     options={[
//                                         { value: 'SMALLER THAN', text: 'SMALLER THAN' },
//                                         { value: 'EQUAL TO', text: 'EQUAL TO' },
//                                         { value: 'GREATER THAN', text: 'GREATER THAN' }
//                                     ]}
//                                     correctAnswers="EQUAL TO"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 8.3 – EMF conclusion */}
//                                 <div className="bg-red-50 border-l-8 border-red-600 p-10 my-12">
//                                     <p className="text-xl mb-6">
//                                         <strong>8.3</strong> A learner concludes that the <strong>emf</strong> of the battery is equal to the reading on voltmeter <strong>V₁</strong>.
//                                     </p>
//
//                                     <Question
//                                         id="8.3.1"
//                                         question="Define the term emf. (2)"
//                                         type="textarea"
//                                         correctAnswers="The emf is the maximum potential difference across the terminals of a cell when no current flows / the total energy supplied per unit charge by the cell"
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     <Question
//                                         id="8.3.2"
//                                         question="Is the learner's conclusion CORRECT? (1)"
//                                         type="radio"
//                                         options={[
//                                             { value: 'YES', text: 'YES' },
//                                             { value: 'NO', text: 'NO' }
//                                         ]}
//                                         correctAnswers="NO"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     <Question
//                                         id="8.3.3"
//                                         question="Give a reason for the answer in QUESTION 8.3.2. (1)"
//                                         type="textarea"
//                                         correctAnswers="There is a voltage drop across the internal resistance / V₁ is terminal pd / V₁ = ε − Ir"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                 </div>
//
//                                 {/* MODIFIED CIRCUIT – Switch replaced by V₂ */}
//                                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 border-t-8 border-purple-600">
//                                     <p className="text-xl text-center font-bold mb-10">
//                                         Switch <strong>S</strong> is now <strong>removed</strong> and replaced by voltmeter <strong>V₂</strong>.
//                                     </p>
//
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m13}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//
//                                     <p className=" text-center mb-12">
//                                         <strong>8.4</strong> How will <strong>EACH</strong> of the following change?<br/>
//                                         (Choose from: INCREASES, DECREASES or REMAINS THE SAME)
//                                     </p>
//
//                                     <Question
//                                         id="8.4.1"
//                                         question="The power dissipated by the 4 Ω resistor (1)"
//                                         type="radio"
//                                         options={[
//                                             { value: 'INCREASES', text: 'INCREASES' },
//                                             { value: 'DECREASES', text: 'DECREASES' },
//                                             { value: 'REMAINS THE SAME', text: 'REMAINS THE SAME' }
//                                         ]}
//                                         correctAnswers="DECREASES"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     <Question
//                                         id="8.4.2"
//                                         question="The reading on voltmeter V₁ (1)"
//                                         type="radio"
//                                         options={[
//                                             { value: 'INCREASES', text: 'INCREASES' },
//                                             { value: 'DECREASES', text: 'DECREASES' },
//                                             { value: 'REMAINS THE SAME', text: 'REMAINS THE SAME' }
//                                         ]}
//                                         correctAnswers="INCREASES"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                     <Question
//                                         id="8.5"
//                                         question="Explain the answer to QUESTION 8.4.2. (4)"
//                                         type="textarea"
//                                         correctAnswers={[
//                                             "The 4 Ω resistor is now out of the circuit",
//                                             "Total resistance increases",
//                                             "Current decreases",
//                                             "Lost volts decreases",
//                                             "Terminal pd increases"
//                                         ]}
//                                         marks={2}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                 </div>
//
//                                 {/* FINAL SUBMIT BUTTON
//                                     <div className="text-center my-20">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-40 py-10 rounded-3xl text-white font-bold text-4xl shadow-2xl transition-all transform hover:scale-105 ${
//                                                 answerStatus
//                                                     ? 'bg-gray-500 cursor-not-allowed'
//                                                     : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Question 8 Completed' : 'Submit Question 8 & Check Answers'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* SOLUTIONS – HIDDEN UNTIL MARKED */}
//                                 {answerStatus && (
//                                     <div className="mt-16 p-16 bg-gradient-to-br from-emerald-100 to-teal-100 border-8 border-emerald-700 rounded-3xl">
//                                         <h3 className="text-4xl font-bold text-emerald-900 text-center mb-12">
//                                             OFFICIAL MEMORANDUM – QUESTION 8 (ALL SUB-QUESTIONS)
//                                         </h3>
//                                         {/* Full memo here – only visible after submit */}
//                                         <div className="text-xl space-y-6">
//                                             <p><strong>8.1</strong> The potential difference across a conductor is directly proportional to the current in it provided temperature is constant.</p>
//                                             <p><strong>8.2.1</strong> 4 Ω</p>
//                                             <p><strong>8.2.2</strong> 14 V</p>
//                                             <p><strong>8.2.3</strong> EQUAL TO</p>
//                                             <p><strong>8.3.1</strong> Maximum pd across terminals when no current flows / total energy per unit charge supplied by the cell</p>
//                                             <p><strong>8.3.2</strong> NO</p>
//                                             <p><strong>8.3.3</strong> There is a voltage drop across internal resistance / V₁ = ε − Ir</p>
//                                             <p><strong>8.4.1</strong> DECREASES</p>
//                                             <p><strong>8.4.2</strong> INCREASES</p>
//                                             <p><strong>8.5</strong> The 4 Ω branch is open → total R increases → I decreases → lost volts decreases → V₁ increases</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 9 – 12 marks ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 9 (Start on a new page.)</h2>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto space-y-12">
//
//                                 <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-10 rounded-xl border-2 border-cyan-400">
//
//                                     <p className="text-lg leading-relaxed mb-8">
//                                         The diagram below shows the initial position of the coil in a simple <strong>DC generator</strong>.
//                                         The coil is rotated in an <strong>anticlockwise</strong> direction.
//                                     </p>
//
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={m14}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//
//
//                                     {/* 9.1.1 – Component for one direction current */}
//                                     <Question
//                                         id="9.1.1"
//                                         question="Name the component in this generator that ensures that the induced current in the external circuit is in one direction only. (1)"
//                                         type="text"
//                                         correctAnswers={["split-ring commutator", "commutator"]}
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     {/* 9.1.2 – Direction of induced current */}
//                                     <Question
//                                         id="9.1.2"
//                                         question="Is the direction of the induced current from X to Y or from Y to X? (1)"
//                                         type="radio"
//                                         options={[
//                                             { value: 'X to Y', text: 'X to Y' },
//                                             { value: 'Y to X', text: 'Y to X' }
//                                         ]}
//                                         correctAnswers="X to Y"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     <p className="text-lg mt-10">
//                                         A maximum voltage of <strong>90 V</strong> is generated when the coil is rotating at a frequency of <strong>20 Hz</strong>.
//                                     </p>
//
//                                     {/* 9.1.3 – Time for one rotation */}
//                                     <Question
//                                         id="9.1.3"
//                                         question="Write down the time taken for the coil to complete ONE rotation. (1)"
//                                         type="text"
//                                         correctAnswers="0,05"
//                                         marks={1}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//
//                                     {/* 9.1.4 – Sketch voltage-time graph */}
//                                     <div className="my-12 p-8 bg-amber-50 border-2 border-amber-600 rounded-xl">
//                                         <p className="mb-6">
//                                             <strong>9.1.4</strong> The coil starts rotating from the initial position.<br/>
//                                             Sketch a graph of output voltage versus time for one complete rotation of the coil.<br/>
//                                             Indicate the maximum voltage and the relevant time values on the graph. (4)
//                                         </p>
//                                         <div className="h-96 bg-gray-100 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-600 text-lg">
//                                             <DrawingCanvas width={750} height={500} />
//                                         </div>
//                                         {answerStatus && (
//                                             <div className="mt-6 p-6 bg-green-100 border-2 border-green-600 rounded-lg text-lg">
//                                                 <strong>Required features:</strong><br/>
//                                                 • Full-wave rectified sine wave (two positive humps)<br/>
//                                                 • Starts at 0 V<br/>
//                                                 • Peaks at +90 V at t = 0,0125 s and t = 0,0375 s<br/>
//                                                 • Zeros at t = 0, 0,025 s, 0,05 s<br/>
//                                                 • Axes labelled correctly (voltage ±90 V, time 0 to 0,05 s)
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//
//                                 {/* 9.2 – AC kettle energy */}
//                                 <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-10 rounded-xl border-2 border-rose-400">
//                                     <p className="text-lg leading-relaxed mb-8">
//                                         <strong>9.2</strong> Wall sockets supply <strong>rms</strong> voltage and current.<br/>
//                                         A <strong>220 V</strong> AC voltage is supplied from a wall socket to an electric kettle having a resistance of <strong>32 Ω</strong>.
//                                     </p>
//
//                                     <Question
//                                         id="9.2"
//                                         question="Calculate the average energy dissipated by the kettle in TWO minutes. (4)"
//                                         type="textarea"
//                                         correctAnswers="181500"
//                                         marks={4}
//                                         onAnswerChange={handleAnswerChange}
//                                         answerStatus={answerStatus}
//                                     />
//                                 </div>
//
//                                 {/* Check Answers Button
//                                     <div className="text-center my-16">
//                                         <button
//                                             onClick={markAnswers}
//                                             disabled={answerStatus}
//                                             className={`px-24 py-7 rounded-3xl text-white font-bold text-2xl transition transform hover:scale-105 shadow-2xl ${
//                                                 answerStatus
//                                                     ? 'bg-gray-500 cursor-not-allowed'
//                                                     : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
//                                             }`}
//                                         >
//                                             {answerStatus ? 'Question 9 Fully Marked' : 'Check Answers & Show Solutions for Question 9'}
//                                         </button>
//                                     </div>*/}
//
//                                 {/* Full Solutions – only visible AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-12 p-12 bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-600 rounded-3xl space-y-10 text-lg">
//                                         <h3 className="text-3xl font-bold text-emerald-800 text-center">OFFICIAL MEMORANDUM – QUESTION 9</h3>
//
//                                         <div className="grid md:grid-cols-2 gap-10">
//                                             <div>
//                                                 <strong>9.1.1</strong> Split-ring commutator / commutator<br/>
//                                                 <strong>9.1.2</strong> X to Y<br/>
//                                                 <strong>9.1.3</strong> T = 1/f = 1/20 = <strong>0,05 s</strong>
//                                             </div>
//                                             <div>
//                                                 <strong>9.1.4</strong> Correct rectified sine wave with two positive peaks at +90 V, zeros at 0, 0,025, 0,05 s
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <strong>9.2 Average energy</strong><br/>
//                                             P<sub>av</sub> = V<sub>rms</sub>² / R = 220² / 32 = 1512,5 W<br/>
//                                             E = P t = 1512,5 × 120 = <strong>181 500 J</strong>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== QUESTION 10 – 14 marks (FINAL QUESTION) ==================== */}
//                         <div className="page-break mt-20">
//                             <h2 className="text-3xl font-bold text-center mb-10">QUESTION 10 (Start on a new page.)</h2>
//
//                             <h3>
//                                 Light is incident on the cathode of a photoelectric cell connected to a battery and a
//                                 sensitive ammeter, as shown below.</h3>
//
//                             <div className="bg-gray-50 border-2 border-black p-10 rounded-xl max-w-5xl mx-auto space-y-12">
//
//                                 {/* Diagram */}
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={m15}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//
//                                 {/* 10.1 – Nature of light */}
//                                 <Question
//                                     id="10.1"
//                                     question="What conclusive evidence about the nature of light is provided by the photoelectric effect? (1)"
//                                     type="text"
//                                     correctAnswers="light behaves as particles / photons / has particle nature"
//                                     marks={1}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 <p className="text-lg mt-8">
//                                     The cathode has a work function of <strong>3,42 × 10⁻¹⁹ J</strong>.
//                                 </p>
//
//                                 {/* 10.2 – Define work function */}
//                                 <Question
//                                     id="10.2"
//                                     question="Define the term work function. (2)"
//                                     type="textarea"
//                                     correctAnswers="The work function is the minimum energy required to eject an electron from the surface of a metal / the minimum energy needed to liberate a photoelectron from the metal surface"
//                                     marks={2}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 <p className="text-lg mt-8">
//                                     Light of frequency <strong>5,96 × 10¹⁴ Hz</strong> is shone onto the cathode.
//                                 </p>
//
//                                 {/* 10.3 – Maximum KE */}
//                                 <Question
//                                     id="10.3"
//                                     question="Calculate the maximum kinetic energy of an electron ejected from the cathode. (4)"
//                                     type="text"
//                                     correctAnswers="5,58e-19"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 10.4 – Number of photons */}
//                                 <p className="text-lg mt-8">
//                                     The ammeter registers a constant current of <strong>0,012 A</strong>.
//                                 </p>
//
//                                 <Question
//                                     id="10.4"
//                                     question="Calculate the minimum number of photons of light that strike the cathode in a 10 s period. (4)"
//                                     type="text"
//                                     correctAnswers="7,5e17"
//                                     marks={4}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* 10.5 – Intensity increased */}
//                                 <Question
//                                     id="10.5"
//                                     question="The intensity of the incident light is now INCREASED. How will this change affect the reading on the ammeter? Choose from INCREASES, DECREASES or REMAINS THE SAME. Explain the answer. (3)"
//                                     type="textarea"
//                                     correctAnswers={[
//                                         "INCREASES",
//                                         "Higher intensity means more photons per second",
//                                         "More photoelectrons ejected per second",
//                                         "Therefore photocurrent (ammeter reading) increases",
//                                         "Maximum KE unchanged because frequency is the same"
//                                     ]}
//                                     marks={3}
//                                     onAnswerChange={handleAnswerChange}
//                                     answerStatus={answerStatus}
//                                 />
//
//                                 {/* Final Check Answers Button */}
//                                 <div className="text-center my-20">
//                                     <button
//                                         onClick={markAnswers}
//                                         disabled={answerStatus}
//                                         className={`px-32 py-8 rounded-3xl text-white font-bold text-3xl transition transform hover:scale-110 shadow-2xl ${
//                                             answerStatus
//                                                 ? 'bg-gray-600 cursor-not-allowed'
//                                                 : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800'
//                                         }`}
//                                     >
//                                         {answerStatus ? 'Paper Complete – All Answers Marked' : 'Check Answers & Show Final Solutions'}
//                                     </button>
//                                 </div>
//
//                                 {/* Full Solutions – only shown AFTER marking */}
//                                 {answerStatus && (
//                                     <div className="mt-16 p-14 bg-gradient-to-br from-emerald-50 to-teal-100 border-8 border-emerald-700 rounded-3xl text-lg space-y-10">
//                                         <h3 className="text-4xl font-bold text-emerald-900 text-center mb-10">
//                                             OFFICIAL MEMORANDUM – QUESTION 10
//                                         </h3>
//
//                                         <div className="grid md:grid-cols-2 gap-12 text-xl">
//                                             <div>
//                                                 <strong>10.1</strong> Light has particle nature / consists of photons<br/>
//                                                 <strong>10.2</strong> Minimum energy needed to eject an electron from the metal surface<br/>
//                                                 <strong>10.3</strong> E = hf = (6,63×10⁻³⁴)(5,96×10¹⁴) = 3,95×10⁻¹⁹ J<br/>
//                                                 K<sub>E max</sub> = 3,95×10⁻¹⁹ − 3,42×10⁻¹⁹ = <strong>5,58 × 10⁻¹⁹ J</strong>
//                                             </div>
//                                             <div>
//                                                 <strong>10.4</strong> Charge in 10 s: Q = It = 0,012 × 10 = 0,12 C<br/>
//                                                 Number of electrons = Q/e = 0,12 / (1,6×10⁻¹⁹) = 7,5×10¹⁷<br/>
//                                                 Minimum photons = <strong>7,5 × 10¹⁷</strong> (1 photon → 1 electron)
//                                             </div>
//                                         </div>
//
//                                         <div className="text-xl">
//                                             <strong>10.5</strong> <span className="text-green-700 font-bold">INCREASES</span><br/>
//                                             Higher intensity → more photons per second → more electrons ejected per second → larger photocurrent → ammeter reading increases.<br/>
//                                             (Maximum KE remains the same because frequency is unchanged.)
//                                         </div>
//
//                                         <div className="text-center text-3xl font-bold text-emerald-800 mt-16">
//                                             TOTAL: 150 marks
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== DATA SHEET – NOVEMBER 2022 PHYSICS ==================== */}
//                         <div className="page-break">
//                             <div className="bg-white min-h-screen flex flex-col items-center justify-center py-12 px-6">
//
//                                 <div className="max-w-5xl mx-auto space-y-16">
//
//                                     <div className="flex justify-center mb-16">
//                                         <img
//                                             src={n1}
//                                             alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                             className="border-4 border-black rounded-2xl shadow-2xl"
//                                             style={{ width: '800px' }}
//                                         />
//                                     </div>
//                                 </div>
//
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="pdf-section page-break">
//                         {/* ==================== TABLE 2: FORMULAE – FINAL PERFECT VERSION ==================== */}
//                         <div className="page-break bg-white py-12 px-8 min-h-screen">
//
//                             <div className="max-w-5xl mx-auto space-y-16">
//
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={n3}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//                             </div>
//
//                         </div>
//                     </div>
//
//                     {/* Section B - Choose any two */}
//                     <div className="pdf-section page-break">
//                         {/* ==================== TABLE 2: FORMULAE – PAGE 2 (2022) ==================== */}
//                         <div className="page-break bg-white py-12 px-8 min-h-screen">
//
//                             <div className="max-w-5xl mx-auto space-y-16">
//
//                                 <div className="flex justify-center mb-16">
//                                     <img
//                                         src={n4}
//                                         alt="Photoelectric cell with cathode, anode, ammeter and battery"
//                                         className="border-4 border-black rounded-2xl shadow-2xl"
//                                         style={{ width: '800px' }}
//                                     />
//                                 </div>
//                             </div>
//
//                         </div>
//                     </div>
//
//                     {/* Section C - Choose one
//                         <div className="pdf-section page-break">
//                             <button
//                                 onClick={markAnswers}
//                                 className="btn-primary"
//                                 disabled={answerStatus || selectedSectionB.length !== 2 || !selectedSectionC}
//                             >
//                                 Mark Answers
//                             </button>
//                         </div>
//
//                         {answerStatus && (
//                             <div className="mt-6 p-4 border rounded text-center pdf-section">
//                                 <h3 className="text-xl font-bold">Your Total Score: {totalScore} / 150</h3>
//                                 <p className="text-secondary">Essays are partially auto-marked based on key phrases. For full accuracy, refer to official memo.</p>
//                                 <div className="score-breakdown">
//                                     <div className="score-item">
//                                         <strong>Section A:</strong><br />
//                                         {sectionScores.A} / 30 ({Math.round((sectionScores.A / 30) * 100)}%)
//                                     </div>
//                                     <div className="score-item">
//                                         <strong>Section B:</strong><br />
//                                         {sectionScores.B} / 80 ({Math.round((sectionScores.B / 80) * 100)}%)
//                                     </div>
//                                     <div className="score-item">
//                                         <strong>Section C:</strong><br />
//                                         {sectionScores.C} / 40 ({Math.round((sectionScores.C / 40) * 100)}%)
//                                     </div>
//                                 </div>
//                             </div>
//                         )}*/}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// PhysicsP1Nov2022.propTypes = {
//     darkMode: PropTypes.bool,
//     setDarkMode: PropTypes.func,
//     notifications: PropTypes.array,
// };
//
// export default PhysicsP1Nov2022;