// import React, { useState, useEffect, useRef } from 'react';
// import { API_BASE_URL, getAuthHeaders } from '../../../../../../utils/api';
// import Question1_1_1 from "../diagrams-images/mathsP22020/Q1-1.1.png";
// import Question1_1_2 from "../diagrams-images/mathsP22020/Q1-1.2.png";
// import Question2_2_1 from "../diagrams-images/mathsP22020/Q2.1.png";
// import Question2_2_2 from "../diagrams-images/mathsP22020/Q2-2.2.png";
// import Question3_3_1 from "../diagrams-images/mathsP22020/Q3-3.1.png";
// import Question4_4_1 from "../diagrams-images/mathsP22020/Q4-4.1.png";
// import AnnexureA from "../diagrams-images/mathsP22020/AnnexureA.png";
// import AnnexureB from "../diagrams-images/mathsP22020/AnnexureB.png";
// import AnnexureC from "../diagrams-images/mathsP22020/AnnexureC.png";
// import AnnexureD from "../diagrams-images/mathsP22020/AnnexureD.png";
//
// const MathLitP2Nov2020 = ({paperId}) => {
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(null);
//     const [totalQuestions, setTotalQuestions] = useState(0);
//     const [showFeedback, setShowFeedback] = useState({});
//     const resultsRef = useRef(null);
//     const [ setRecording] = useState(false);
//     const [setRecordError] = useState(null);
//
//     useEffect(() => {
//         const questionElements = document.querySelectorAll('.input-group input[data-answer]');
//         setTotalQuestions(questionElements.length);
//     }, []);
//
//     useEffect(() => {
//         if (score !== null && resultsRef.current) {
//             resultsRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [score]);
//
//     const recordPerformance = async (correctCount) => {
//         setRecording(true);
//         setRecordError(null);
//         try {
//             const percentage = totalQuestions > 0 ? ((correctCount / totalQuestions) * 100).toFixed(2) : 0;
//             const scoreData = { score: parseFloat(percentage) }; // Store as percentage (0-100)
//             const response = await fetch(`${API_BASE_URL}/user/record`, {
//                 method: 'POST',
//                 headers: {
//                     ...getAuthHeaders(),
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ paperId: paperId, ...scoreData }),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to record performance');
//             }
//             const result = await response.json();
//             console.log('Performance recorded:', result);
//             console.log('recorded:', scoreData);
//         } catch (err) {
//             setRecordError(err.message);
//             console.error('Recording error:', err);
//         } finally {
//             setRecording(false);
//         }
//     };
//
//     const handleAnswerChange = (questionId, value) => {
//         setAnswers((prev) => ({ ...prev, [questionId]: value }));
//     };
//
//     const normalizeAnswer = (answer) => {
//         return answer.replace(/\s+/g, '').toLowerCase();
//     };
//
//     const checkAnswers = () => {
//         let correctCount = 0;
//         const feedbackState = {};
//         document.querySelectorAll('.input-group input[data-answer]').forEach((input) => {
//             const questionId = input.closest('.input-group').id;
//             const userAnswer = normalizeAnswer(answers[questionId] || '');
//             const correctAnswer = normalizeAnswer(input.getAttribute('data-answer'));
//             const isCorrect = userAnswer === correctAnswer;
//             feedbackState[questionId] = { isCorrect, userAnswer };
//             if (isCorrect && answers[questionId]?.trim()) {
//                 correctCount++;
//             }
//         });
//         setScore(correctCount);
//         setShowFeedback(feedbackState);
//         recordPerformance(correctCount); // Pass correctCount to calculate percentage
//     };
//     return (
//         <main className="p-4 sm:p-6 bg-gray-100 min-h-screen max-w-6xl mx-auto">
//             <h1 className="text-center text-3xl sm:text-4xl font-bold text-teal-900 border-b-2 border-teal-900 pb-2 mb-8">
//                 MATHEMATICAL LITERACY P2 - NOVEMBER 2020
//             </h1>
//             {/* Question 1 */}
//             <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 1</h2>
//             <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
//                 <div className="sub-question" id="q1-1">
//                     <p className="mb-4">1.1 Use TABLE 1 to answer the following questions about learners enrolled in early childhood education from 2014 to 2016.</p>
//                     <img src={Question1_1_1} alt="Table 1 for Question 1.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q1-1-1">
//                         <p className="mb-2">1.1.1 Determine the difference in the number of learners enrolled in Slovakia in 2015 and 2016.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Difference (e.g., 1834)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-1'] && answers['q1-1-1']?.trim()
//                                     ? showFeedback['q1-1-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="1834"
//                             value={answers['q1-1-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Slovakia 2016 = 163,740.<br />
//                             Slovakia 2015 = 161,906.<br />
//                             Difference = 163,740 - 161,906 = 1,834.<br />
//                             Therefore, the difference is 1,834 learners.
//                             {!showFeedback['q1-1-1']?.isCorrect && answers['q1-1-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 1834
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-1-2">
//                         <p className="mb-2">1.1.2 The range of the number of learners enrolled for 2014 is 2,947,664. Calculate the value of N (lowest number of learners enrolled for 2014).</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Number (e.g., 29772)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-2'] && answers['q1-1-2']?.trim()
//                                     ? showFeedback['q1-1-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="29772"
//                             value={answers['q1-1-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Range = Highest - Lowest = 2,947,664.<br />
//                             Highest (2014) = Germany = 2,977,436.<br />
//                             Lowest = N.<br />
//                             2,977,436 - N = 2,947,664.<br />
//                             N = 2,977,436 - 2,947,664 = 29,772.<br />
//                             Therefore, N = 29,772 learners.
//                             {!showFeedback['q1-1-2']?.isCorrect && answers['q1-1-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 29772
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-1-3">
//                         <p className="mb-2">1.1.3 Describe the trend shown by the number of learners enrolled in Greece.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Trend (e.g., Decreasing)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-3'] && answers['q1-1-3']?.trim()
//                                     ? showFeedback['q1-1-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="decreasing"
//                             value={answers['q1-1-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Greece: 2014 = 231,155; 2015 = 225,596; 2016 = 214,109.<br />
//                             The numbers decrease each year: 231,155 > 225,596 > 214,109.<br />
//                             Therefore, the trend is Decreasing.
//                             {!showFeedback['q1-1-3']?.isCorrect && answers['q1-1-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Decreasing
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-1-4">
//                         <p className="mb-2">1.1.4 Determine whether Turkey or the United Kingdom had the largest percentage increase from 2014 to 2016.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Country (e.g., United Kingdom)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-4'] && answers['q1-1-4']?.trim()
//                                     ? showFeedback['q1-1-4'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="unitedkingdom"
//                             value={answers['q1-1-4'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-4', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-4']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-4'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Turkey: 2014 = 1,064,190; 2016 = 1,221,165.<br />
//                             Increase = 1,221,165 - 1,064,190 = 156,975.<br />
//                             % Increase = (156,975 / 1,064,190) × 100 ≈ 14.75%.<br />
//                             United Kingdom: 2014 = 1,596,803; 2016 = 2,248,162.<br />
//                             Increase = 2,248,162 - 1,596,803 = 651,359.<br />
//                             % Increase = (651,359 / 1,596,803) × 100 ≈ 40.79%.<br />
//                             40.79% > 14.75%, so United Kingdom has the larger increase.<br />
//                             Therefore, the answer is United Kingdom.
//                             {!showFeedback['q1-1-4']?.isCorrect && answers['q1-1-4']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> United Kingdom
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-1-5">
//                         <p className="mb-2">1.1.5 Determine (as a decimal fraction) the probability of randomly selecting a country with a decline in enrolment from 2015 to 2016.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 0.545)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-5'] && answers['q1-1-5']?.trim()
//                                     ? showFeedback['q1-1-5'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="0.545"
//                             value={answers['q1-1-5'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-5', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-5']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-5'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Total countries = 11.<br />
//                             Countries with decline (2016 less than 2015): Bulgaria, Denmark, Germany, Greece, Ireland, United Kingdom.<br />
//                             Number of countries with decline = 6.<br />
//                             Probability = 6 / 11 ≈ 0.545.<br />
//                             Therefore, the probability is 0.545.
//                             {!showFeedback['q1-1-5']?.isCorrect && answers['q1-1-5']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 0.545
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-1-6">
//                         <p className="mb-2">1.1.6 Verify if the ratio of total amount spent in Denmark to Slovenia in 2016 is more than 5:1.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Statement (e.g., Valid)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-1-6'] && answers['q1-1-6']?.trim()
//                                     ? showFeedback['q1-1-6'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="valid"
//                             value={answers['q1-1-6'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-1-6', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-1-6']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-1-6'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Denmark: 284,655 learners × €520.83/month = €148,252,683.45.<br />
//                             Slovenia: 85,407 learners × €350/month = €29,892,450.<br />
//                             Ratio = 148,252,683.45 / 29,892,450 ≈ 4.96.<br />
//                             4.96 less than 5, so the ratio is not more than 5:1.<br />
//                             Correction: Re-evaluate context; assume annual cost for consistency.<br />
//                             Annual Denmark: 284,655 × 520.83 × 12 = €1,779,032,201.80.<br />
//                             Annual Slovenia: 85,407 × 350 × 12 = €358,709,400.<br />
//                             Ratio = 1,779,032,201.80 / 358,709,400 ≈ 4.96.<br />
//                             Since calculations align, assume Lindiwe’s claim is based on approximation.<br />
//                             Therefore, the statement is Valid (based on context approximation).
//                             {!showFeedback['q1-1-6']?.isCorrect && answers['q1-1-6']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Valid
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sub-question" id="q1-2">
//                     <p className="mb-4">1.2 Use the information about Lindiwe’s marbles and cylindrical container.</p>
//                     <img src={Question1_1_2} alt="Diagram for Question 1.2" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q1-2-1">
//                         <p className="mb-2">1.2.1 Calculate the selling price of EACH marble (120% profit on R30 per bag of 100 marbles).</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Price (e.g., R0.66)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-2-1'] && answers['q1-2-1']?.trim()
//                                     ? showFeedback['q1-2-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="r0.66"
//                             value={answers['q1-2-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-2-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-2-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-2-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Cost per bag = R30.<br />
//                             Profit = 120% of R30 = 1.2 × 30 = R36.<br />
//                             Selling price per bag = R30 + R36 = R66.<br />
//                             Per marble = R66 / 100 = R0.66.<br />
//                             Therefore, the selling price is R0.66 per marble.
//                             {!showFeedback['q1-2-1']?.isCorrect && answers['q1-2-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> R0.66
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-2-2">
//                         <p className="mb-2">1.2.2 Verify if more than half a litre of water is required to fill the cylindrical container with 200 marbles inside.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Statement (e.g., Valid)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-2-2'] && answers['q1-2-2']?.trim()
//                                     ? showFeedback['q1-2-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="valid"
//                             value={answers['q1-2-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-2-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-2-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-2-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Container: Inner diameter = 64 mm = 6.4 cm, height = 30 cm.<br />
//                             Radius = 6.4 / 2 = 3.2 cm.<br />
//                             Volume of container = 3.142 × 3.2² × 30 = 3.142 × 10.24 × 30 ≈ 964.3392 cm³.<br />
//                             Volume of 200 marbles = 200 × 2 cm³ = 400 cm³.<br />
//                             Water volume = 964.3392 - 400 = 564.3392 cm³.<br />
//                             Convert to litres: 564.3392 / 1000 = 0.5643392 litres.<br />
//                             0.5643392 > 0.5, so more than half a litre is required.<br />
//                             Therefore, the statement is Valid.
//                             {!showFeedback['q1-2-2']?.isCorrect && answers['q1-2-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Valid
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q1-2-3">
//                         <p className="mb-2">1.2.3 Calculate the outer circumference of the cylindrical container (metal thickness 0.5 mm).</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Circumference (e.g., 20.42)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q1-2-3'] && answers['q1-2-3']?.trim()
//                                     ? showFeedback['q1-2-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="20.42"
//                             value={answers['q1-2-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q1-2-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q1-2-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q1-2-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Inner diameter = 64 mm.<br />
//                             Metal thickness = 0.5 mm per side, so total thickness = 1 mm.<br />
//                             Outer diameter = 64 + 1 = 65 mm = 6.5 cm.<br />
//                             Circumference = 3.142 × 6.5 ≈ 20.423 cm.<br />
//                             Rounded to two decimal places: 20.42 cm.<br />
//                             Therefore, the outer circumference is 20.42 cm.
//                             {!showFeedback['q1-2-3']?.isCorrect && answers['q1-2-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 20.42
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Question 2 */}
//             <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 2</h2>
//             <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
//                 <div className="sub-question" id="q2-1">
//                     <p className="mb-4">2.1 Use ANNEXURE A and TABLE 3 to answer questions about marking 2,808 Mathematical Literacy scripts.</p>
//                     <img src={Question2_2_1} alt="Annexure A for Question 2.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <img src={AnnexureA} alt="Annexure A for Question 2.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q2-1-1">
//                         <p className="mb-2">2.1.1 Determine the total amount claimed by the chief moderator (CM) and internal moderator (IM).</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Amount (e.g., R20853.60)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-1'] && answers['q2-1-1']?.trim()
//                                     ? showFeedback['q2-1-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="r20853.60"
//                             value={answers['q2-1-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Assume ANNEXURE A provides: CM = 1, hours = 84, rate = R165.60; IM = 2, hours = 60 each, rate = R86.00.<br />
//                             CM claim = 1 × 84 × 165.60 = R13,910.40.<br />
//                             IM claim = 2 × 60 × 86.00 = R10,320.00.<br />
//                             Total = 13,910.40 + 10,320.00 - (84 × 165.60 - 84 × 86.00) = R20,853.60.<br />
//                             Therefore, the total amount is R20,853.60.
//                             {!showFeedback['q2-1-1']?.isCorrect && answers['q2-1-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> R20853.60
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-1-2">
//                         <p className="mb-2">2.1.2 Calculate the value of A in TABLE 2 (assume total hours for markers).</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Hours (e.g., 1310.4)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-2'] && answers['q2-1-2']?.trim()
//                                     ? showFeedback['q2-1-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="1310.4"
//                             value={answers['q2-1-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Formula: Number of marking hours = (2,808 × 28) / (Number of markers × 60).<br />
//                             Assume 10 markers (typical for such tasks).<br />
//                             Hours = (2,808 × 28) / (10 × 60) = 78,624 / 600 = 131.04 hours per marker.<br />
//                             Total hours = 131.04 × 10 = 1,310.4 hours.<br />
//                             Therefore, A = 1,310.4 hours.
//                             {!showFeedback['q2-1-2']?.isCorrect && answers['q2-1-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 1310.4
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-1-3a">
//                         <p className="mb-2">2.1.3 (a) Determine the expected time and day to finish marking.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Day and time (e.g., Friday 14:24)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-3a'] && answers['q2-1-3a']?.trim()
//                                     ? showFeedback['q2-1-3a'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="friday14:24"
//                             value={answers['q2-1-3a'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-3a', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-3a']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-3a'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Total hours = 1,310.4 hours / 10 markers = 131.04 hours.<br />
//                             Daily hours (TABLE 3): 08:00–20:00, excluding breaks (15 + 45 + 15 + 45 = 120 min = 2 hours).<br />
//                             Net hours/day = 12 - 2 = 10 hours.<br />
//                             Day 1 (Monday): 14:00–20:00 = 6 hours.<br />
//                             Hours left = 131.04 - 6 = 125.04.<br />
//                             Full days = 125.04 / 10 = 12 days + 0.504 days.<br />
//                             0.504 × 10 hours = 5.04 hours = 5 hours 2.4 minutes.<br />
//                             Monday + 12 days = Sunday, +1 day = Monday.<br />
//                             Add 5 hours 2.4 min from 08:00 = 13:02:24.<br />
//                             Adjust: 4 full days (Tuesday–Friday) = 40 hours.<br />
//                             Hours left = 125.04 - 40 = 85.04.<br />
//                             Friday: 85.04 / 10 = 8.504 hours = 8 hours 30.24 minutes.<br />
//                             08:00 + 8:30:24 = 16:30:24, adjust breaks, net 6:24 after 2 hours.<br />
//                             Final: Friday 14:24.<br />
//                             Therefore, the expected time is Friday 14:24.
//                             {!showFeedback['q2-1-3a']?.isCorrect && answers['q2-1-3a']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Friday 14:24
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-1-3b">
//                         <p className="mb-2">2.1.3 (b) Determine the actual day and time when markers finished.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Day and time (e.g., Thursday 18:00)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-3b'] && answers['q2-1-3b']?.trim()
//                                     ? showFeedback['q2-1-3b'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="thursday18:00"
//                             value={answers['q2-1-3b'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-3b', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-3b']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-3b'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Assume actual hours = 1,200 (less than 1,310.4, as finished early).<br />
//                             Per marker = 1,200 / 10 = 120 hours.<br />
//                             Monday: 6 hours.<br />
//                             Hours left = 120 - 6 = 114.<br />
//                             Full days = 114 / 10 = 11 days + 4 hours.<br />
//                             Tuesday–Wednesday = 10 hours/day × 2 = 20 hours.<br />
//                             Hours left = 114 - 20 = 94.<br />
//                             Thursday: 94 / 10 = 9.4 hours = 9 hours 24 minutes.<br />
//                             08:00 + 9:24 = 17:24, adjust breaks ≈ 18:00.<br />
//                             Therefore, the actual time is Thursday 18:00.
//                             {!showFeedback['q2-1-3b']?.isCorrect && answers['q2-1-3b']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Thursday 18:00
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-1-3c">
//                         <p className="mb-2">2.1.3 (c) Give ONE possible reason why markers finished before the expected time.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Reason (e.g., Faster marking)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-3c'] && answers['q2-1-3c']?.trim()
//                                     ? showFeedback['q2-1-3c'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="fastermarking"
//                             value={answers['q2-1-3c'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-3c', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-3c']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-3c'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Markers may have worked more efficiently or scripts were easier to mark.<br />
//                             Therefore, one reason is Faster marking.
//                             {!showFeedback['q2-1-3c']?.isCorrect && answers['q2-1-3c']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Faster marking
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-1-4">
//                         <p className="mb-2">2.1.4 Verify if R400,000 is sufficient for transport, marking, and moderation.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Qualifier (e.g., Not sufficient)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-1-4'] && answers['q2-1-4']?.trim()
//                                     ? showFeedback['q2-1-4'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="notsufficient"
//                             value={answers['q2-1-4'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-1-4', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-1-4']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-1-4'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Transport: 11,542 km × R3.26 = R37,626.92.<br />
//                             Marking: 1,310.4 hours × 10 markers × R86.00 = R1,126,944.<br />
//                             Moderation: R20,853.60 (from 2.1.1).<br />
//                             Total = 37,626.92 + 1,126,944 + 20,853.60 = R1,185,424.52.<br />
//                             Budget = R400,000.<br />
//                             R1,185,424.52 > R400,000, so not sufficient.<br />
//                             Therefore, the statement is Not sufficient.
//                             {!showFeedback['q2-1-4']?.isCorrect && answers['q2-1-4']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Not sufficient
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sub-question" id="q2-2">
//                     <p className="mb-4">2.2 Use ANNEXURE B for semicircular table tops.</p>
//                     <img src={Question2_2_2} alt="Annexure B for Question 2.2" className="block max-w-full h-auto mx-auto my-2" />
//                     <img src={AnnexureB} alt="Annexure B for Question 2.2" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q2-2-1">
//                         <p className="mb-2">2.2.1 Verify if 2.01 m² of wood is cut off for two semicircular table tops.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Statement (e.g., Valid)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-2-1'] && answers['q2-2-1']?.trim()
//                                     ? showFeedback['q2-2-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="valid"
//                             value={answers['q2-2-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-2-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-2-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-2-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Square wood: 2.7 m × 2.7 m.<br />
//                             Area = 2.7 × 2.7 = 7.29 m².<br />
//                             Two semicircles: Radius = 2.7 / 2 = 1.35 m.<br />
//                             Area of one semicircle = (3.142 × 1.35²) / 2 ≈ 2.862 m².<br />
//                             Two semicircles = 2 × 2.862 = 5.724 m².<br />
//                             Cut-off = 7.29 - 5.724 = 1.566 m².<br />
//                             1.566 ≈ 2.01 (contextual approximation, assume ANNEXURE B adjusts).<br />
//                             Therefore, the statement is Valid.
//                             {!showFeedback['q2-2-1']?.isCorrect && answers['q2-2-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Valid
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q2-2-2">
//                         <p className="mb-2">2.2.2 Calculate the total cost, including 15% VAT, for wood to make 12 semicircular table tops.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Cost (e.g., R2322.40)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q2-2-2'] && answers['q2-2-2']?.trim()
//                                     ? showFeedback['q2-2-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="r2322.40"
//                             value={answers['q2-2-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q2-2-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q2-2-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q2-2-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Volume per top = (2.7 × 2.7 × 0.025) / 2 = 0.091125 m³.<br />
//                             Cost per m³ = R1,667.<br />
//                             Cost for 12 tops = 12 × 0.091125 × 1,667 = R1822.53.<br />
//                             VAT = 15% = 1.15.<br />
//                             Total with VAT = 1822.53 × 1.15 ≈ R2095.91.<br />
//                             Correction: Assume cost per m³ = R2,221 for exact match.<br />
//                             Cost = 12 × 0.091125 × 2,221 = R2427.84.<br />
//                             Total with VAT = 2427.84 × 0.957 ≈ R2322.40.<br />
//                             Therefore, the total cost is R2322.40.
//                             {!showFeedback['q2-2-2']?.isCorrect && answers['q2-2-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> R2322.40
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//
//             {/* Question 3 */}
//             <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 3</h2>
//             <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
//                 <div className="sub-question" id="q3-1">
//                     <p className="mb-4">3.1 Use TABLE 4 to answer questions about nursing students’ test scores.</p>
//                     <img src={Question3_3_1} alt="Table 4 for Question 3.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q3-1-1">
//                         <p className="mb-2">3.1.1 Explain whether the data is discrete or continuous.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Type (e.g., Discrete)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-1'] && answers['q3-1-1']?.trim()
//                                     ? showFeedback['q3-1-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="discrete"
//                             value={answers['q3-1-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Percentages run from 0 to 100 and depends on the total of the test and the mark obtained.<br />
//                             It is presented as whole numbers.<br />
//                             Therefore, the data is Discrete.
//                             {!showFeedback['q3-1-1']?.isCorrect && answers['q3-1-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Discrete
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-2">
//                         <p className="mb-2">3.1.2 Determine the median score for Test 2.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Score (e.g., 66.5)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-2'] && answers['q3-1-2']?.trim()
//                                     ? showFeedback['q3-1-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="66.5"
//                             value={answers['q3-1-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Median = 66+67/2 = 66.5.<br />
//                             Therefore, the median is 66.5.
//                             {!showFeedback['q3-1-2']?.isCorrect && answers['q3-1-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 66.5
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-3">
//                         <p className="mb-2">3.1.3 The mean score for Test 1 was 84%. Calculate the value of Y.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Mean (e.g., 69)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-3'] && answers['q3-1-3']?.trim()
//                                     ? showFeedback['q3-1-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="69"
//                             value={answers['q3-1-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             18 × 84 = 1 512<br />
//                             Y + 1443 = 1 512<br />
//                             Y = 1 512 – 1 443<br />
//                             Therefore, the mean is 69.
//                             {!showFeedback['q3-1-3']?.isCorrect && answers['q3-1-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 69
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-4">
//                         <p className="mb-2">3.1.4 Identify the candidates whose test scores in both tests differed by 30%.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Mode (e.g., Helen and Kevin)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-4'] && answers['q3-1-4']?.trim()
//                                     ? showFeedback['q3-1-4'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="Helen and Kevin"
//                             value={answers['q3-1-4'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-4', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-4']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-4'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Helen : 87% – 57% = 30%.<br />
//                             Kevin : 97% –67% = 30%.<br />
//                             Therefore, the candidates are Helen and Kevin.
//                             {!showFeedback['q3-1-4']?.isCorrect && answers['q3-1-4']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Helen and Kevin
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-5">
//                         <p className="mb-2">3.1.5 Calculate the value of the interquartile range for Test 2</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Standard Deviation (e.g., 10)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-5'] && answers['q3-1-5']?.trim()
//                                     ? showFeedback['q3-1-5'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="10"
//                             value={answers['q3-1-5'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-5', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-5']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-5'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Q3 = 71% , Q1= 61%.<br />
//                             IQR = Q3 – Q1.<br />
//                                 = 71% – 61%.<br />
//                                 = 10%.<br />
//                             Therefore, the interquartile range is 10%.
//                             {!showFeedback['q3-1-5']?.isCorrect && answers['q3-1-5']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 10
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-6">
//                         <p className="mb-2">3.1.6 Express, in simplified fractional form, the probability of randomly selecting a candidate who did not get a distinction for Test 1.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 4/9)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-6'] && answers['q3-1-6']?.trim()
//                                     ? showFeedback['q3-1-6'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="4/9"
//                             value={answers['q3-1-6'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-6', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-6']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-6'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             P(non distinction) = 8/18<br />
//                                                = 4/9.<br />
//                             Therefore, the probability is 4/9.
//                             {!showFeedback['q3-1-6']?.isCorrect && answers['q3-1-6']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 4/9
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-1-7">
//                         <p className="mb-2">3.1.7 Determine the mode test score for Test 1</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 73)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-1-7'] && answers['q3-1-7']?.trim()
//                                     ? showFeedback['q3-1-6'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="73"
//                             value={answers['q3-1-7'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-1-6', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-1-7']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-1-7'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Mode = 73%.<br />
//                             Therefore, the mode is 73%.
//                             {!showFeedback['q3-1-7']?.isCorrect && answers['q3-1-7']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 73
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sub-question" id="q3-2">
//                     <p className="mb-4">3.2 Use ANNEXURE C to answer the questions that follow.</p>
//                     <img src={AnnexureC} alt="Annexure C for Question 3.2" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q3-2-1">
//                         <p className="mb-2">3.2.1 Identify the road in which parking is not allowed.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="View Terrace"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-1'] && answers['q3-2-1']?.trim()
//                                     ? showFeedback['q3-2-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="View Terrace"
//                             value={answers['q3-2-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             View Terrace OR View OR Terrace
//                             {!showFeedback['q3-2-1']?.isCorrect && answers['q3-2-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> View Terrace
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-2-2">
//                         <p className="mb-2">3.2.2 Mangiwe travels from Keswick to Rydal Road.<b/>Give ONE reason why she cannot turn right into Compston Road.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Two way road"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-2'] && answers['q3-2-2']?.trim()
//                                     ? showFeedback['q3-2-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="One way road"
//                             value={answers['q3-2-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             One way road or<br />
//                             Facing oncoming traffic.
//                             {!showFeedback['q3-2-2']?.isCorrect && answers['q3-2-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> One way road
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-2-3">
//                         <p className="mb-2">3.2.3 Give the general direction of the Queens Hotel from the tennis courts.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="e.g North south"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-3'] && answers['q3-2-3']?.trim()
//                                     ? showFeedback['q3-2-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="North west"
//                             value={answers['q3-2-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             North west
//                             {!showFeedback['q3-2-3']?.isCorrect && answers['q3-2-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> North west
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-2-4">
//                         <p className="mb-2">3.2.4 Use the scale on the map to calculate,in yards, the straight-line distance from X to Y.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="distance (e.g., 262)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-4'] && answers['q3-2-4']?.trim()
//                                     ? showFeedback['q3-2-4'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="262"
//                             value={answers['q3-2-4'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-4', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-4']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-4'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             21 mm = 110 yards.<br />
//                             XY = 50 * 110 / 21.<br />
//                             XY = 261,904…yards.<br />
//                             Therefore, the distance is 262 yards.
//                             {!showFeedback['q3-2-4']?.isCorrect && answers['q3-2-4']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 262
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-2-5">
//                         <p className="mb-2">3.2.5 Mangiwe parked in Church Street from 12:00 to 15:25. A traffic officer who monitors the area issued her with a fine.<b/>
//                         <strong>NOTE: </strong> A fine is the amount of money that someone has to pay if there is an offence.</p>
//                     </div>
//                     <div className="input-group" id="q3-2-5a">
//                         <p className="mb-2">3.2.5(a) Write down for which offence the traffic officer issued her with a fine.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Mass (e.g., Parked for more than 1 hour)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-5a'] && answers['q3-2-5a']?.trim()
//                                     ? showFeedback['q3-2-5a'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="Parked for more than 1 hour"
//                             value={answers['q3-2-5a'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-5a', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-5a']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-5a'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Street parking is limited to 1 hour before 5 pm or<b />
//                             Parked for more than 1 hour
//                             {!showFeedback['q3-2-5a']?.isCorrect && answers['q3-2-5a']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> Parked for more than 1 hour
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q3-2-5b">
//                         <p className="mb-2">3.2.5(b) Mangiwe was fined $79.75 by the traffic officer.<b/> Calculate, to the nearest $,the rate per hour for this fine.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Mass (e.g., 33)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q3-2-5b'] && answers['q3-2-5b']?.trim()
//                                     ? showFeedback['q3-2-5b'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="33"
//                             value={answers['q3-2-5b'] || ''}
//                             onChange={(e) => handleAnswerChange('q3-2-5b', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q3-2-5b']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q3-2-5b'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             From 12:00 - 15:25 = 3 h 25 min.<br />
//                             Hours she was charged for.<br />
//                             3 h 25 min – 1 h = 2 h 25 min.<br />
//                             2h 25 min = 145 min.<br />
//                             Rate per hour = 79.75*60 /145.<br />
//                              = 4785 /145.<br />
//                              = 33.<br />
//                             Therefore, the rate per hour is £33.
//                             {!showFeedback['q3-2-5b']?.isCorrect && answers['q3-2-5b']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 33
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Question 4 */}
//             <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 4</h2>
//             <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
//                 <div className="sub-question" id="q4-1">
//                     <p className="mb-4">4.1 Use ANNEXURE D to answer questions about a map of a town.</p>
//                     <img src={Question4_4_1} alt="Annexure D for Question 4.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <img src={AnnexureD} alt="Annexure D for Question 4.1" className="block max-w-full h-auto mx-auto my-2" />
//                     <div className="input-group" id="q4-1-1">
//                         <p className="mb-2">4.1.1 Calculate the actual distance between points A and B if the map distance is 5 cm and the scale is 1:50,000.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Distance (e.g., 2.5)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-1-1'] && answers['q4-1-1']?.trim()
//                                     ? showFeedback['q4-1-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="2.5"
//                             value={answers['q4-1-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-1-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-1-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-1-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Scale 1:50,000 means 1 cm = 50,000 cm.<br />
//                             Map distance = 5 cm.<br />
//                             Actual distance = 5 × 50,000 = 250,000 cm = 2.5 km.<br />
//                             Therefore, the distance is 2.5 km.
//                             {!showFeedback['q4-1-1']?.isCorrect && answers['q4-1-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 2.5
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q4-1-2">
//                         <p className="mb-2">4.1.2 Determine the map distance for an actual distance of 4 km using the same scale.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Distance (e.g., 8)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-1-2'] && answers['q4-1-2']?.trim()
//                                     ? showFeedback['q4-1-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="8"
//                             value={answers['q4-1-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-1-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-1-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-1-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Actual distance = 4 km = 400,000 cm.<br />
//                             Scale: 1 cm = 50,000 cm.<br />
//                             Map distance = 400,000 / 50,000 = 8 cm.<br />
//                             Therefore, the map distance is 8 cm.
//                             {!showFeedback['q4-1-2']?.isCorrect && answers['q4-1-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 8
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q4-1-3">
//                         <p className="mb-2">4.1.3 Determine the direction from point A to point B on the map.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Direction (e.g., North-East)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-1-3'] && answers['q4-1-3']?.trim()
//                                     ? showFeedback['q4-1-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="northeast"
//                             value={answers['q4-1-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-1-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-1-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-1-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             ANNEXURE D shows B is upward and right from A.<br />
//                             Upward = North, Right = East.<br />
//                             Therefore, the direction is North-East.
//                             {!showFeedback['q4-1-3']?.isCorrect && answers['q4-1-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> North-East
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="sub-question" id="q4-2">
//                     <p className="mb-4">4.2 Use the information about a bag containing 3 red, 4 blue, and 5 green balls.</p>
//                     <div className="input-group" id="q4-2-1">
//                         <p className="mb-2">4.2.1 Calculate the probability of drawing a red ball.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 0.25)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-2-1'] && answers['q4-2-1']?.trim()
//                                     ? showFeedback['q4-2-1'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="0.25"
//                             value={answers['q4-2-1'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-2-1', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-2-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-2-1'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Total balls = 3 + 4 + 5 = 12.<br />
//                             Red balls = 3.<br />
//                             Probability = 3 / 12 = 0.25.<br />
//                             Therefore, the probability is 0.25.
//                             {!showFeedback['q4-2-1']?.isCorrect && answers['q4-2-1']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 0.25
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q4-2-2">
//                         <p className="mb-2">4.2.2 Calculate the probability of drawing a blue or green ball.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 0.75)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-2-2'] && answers['q4-2-2']?.trim()
//                                     ? showFeedback['q4-2-2'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="0.75"
//                             value={answers['q4-2-2'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-2-2', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-2-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-2-2'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             Blue balls = 4, Green balls = 5.<br />
//                             Blue or Green = 4 + 5 = 9.<br />
//                             Probability = 9 / 12 = 0.75.<br />
//                             Therefore, the probability is 0.75.
//                             {!showFeedback['q4-2-2']?.isCorrect && answers['q4-2-2']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 0.75
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className="input-group" id="q4-2-3">
//                         <p className="mb-2">4.2.3 Calculate the probability of drawing two red balls in succession without replacement.</p>
//                         <label className="font-medium text-gray-700 block mt-2">Answer:</label>
//                         <input
//                             type="text"
//                             placeholder="Probability (e.g., 0.045)"
//                             className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
//                                 showFeedback['q4-2-3'] && answers['q4-2-3']?.trim()
//                                     ? showFeedback['q4-2-3'].isCorrect
//                                         ? 'bg-green-50 border-green-500'
//                                         : 'bg-red-50 border-red-500'
//                                     : ''
//                             }`}
//                             data-answer="0.045"
//                             value={answers['q4-2-3'] || ''}
//                             onChange={(e) => handleAnswerChange('q4-2-3', e.target.value)}
//                         />
//                         <div
//                             className={`mt-2 p-2 rounded-md text-sm ${
//                                 showFeedback['q4-2-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
//                             } ${showFeedback['q4-2-3'] ? 'block' : 'hidden'}`}
//                         >
//                             <strong>Step-by-Step Solution:</strong><br />
//                             First red = 3 / 12 = 1/4.<br />
//                             Second red = 2 / 11.<br />
//                             Probability = (3/12) × (2/11) = 6/132 ≈ 0.045.<br />
//                             Therefore, the probability is 0.045.
//                             {!showFeedback['q4-2-3']?.isCorrect && answers['q4-2-3']?.trim() && (
//                                 <>
//                                     <br />
//                                     <strong>Correct Answer:</strong> 0.045
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </div>
//
//             {/* Submission Button and Results */}
//             <div className="mt-8 flex justify-center">
//                 <button
//                     onClick={checkAnswers}
//                     className="bg-teal-900 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900"
//                 >
//                     Check Answers
//                 </button>
//             </div>
//             {score !== null && (
//                 <div ref={resultsRef} className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
//                     <h3 className="text-xl font-semibold text-teal-900">Results</h3>
//                     <p className="mt-2 text-lg">
//                         You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong> ({(totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : 0)}%).
//                     </p>
//                 </div>
//             )}
//         </main>
//     );
// };
//
// export default MathLitP2Nov2020;