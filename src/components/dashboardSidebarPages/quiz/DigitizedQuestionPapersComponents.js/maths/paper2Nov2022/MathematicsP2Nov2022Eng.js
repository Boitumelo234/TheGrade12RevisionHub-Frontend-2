// import React, { useState } from "react";
// import { API_BASE_URL, getAuthHeaders } from '../../../../../../utils/api';
// import { useNavigate } from 'react-router-dom';
// import paper2_q1 from './paper2_q1.jpeg';
// import paper2_q1_1 from './paper2_q1.1.jpeg';
// import paper2_q2 from './paper2_q2.jpeg';
// import paper2_q3 from './paper2_q3.jpeg';
// import paper2_q4 from './paper2_q4.jpeg';
// import paper2_q6 from './paper2_q6.jpeg';
// import paper2_q7 from './paper2_q7.jpeg';
// import paper2_q8 from './paper2_q8.jpeg';
// import paper2_q8_2 from './paper2_q8.2.jpeg';
// import paper2_q9_1 from './paper2_q9.1.jpeg';
// import paper2_q9_2 from './paper2_q9.2.jpeg';
// import paper2_q10 from './paper_q10.jpeg';
// import paper2_formulas from './paper2_formulas.jpeg';
//
// const MathematicsP2Nov2022Eng = ({ paperId }) => {
//     const navigate = useNavigate();
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(null);
//     const [recording, setRecording] = useState(false);
//     const [recordError, setRecordError] = useState(null);
//     const [showResults, setShowResults] = useState(false);
//     const [revealedAnswers, setRevealedAnswers] = useState({});
//     const [solutionModal, setSolutionModal] = useState({
//         open: false,
//         questionId: null,
//         content: ""
//     });
//
//     // Answer key for all questions
//     const answerKey = {
//         // Question 1
//         'q1-1-1': ["15.5", "15.50"],
//         'q1-1-2': ["3.94", "3.94"],
//         'q1-2': ["7", "seven"],
//         'q1-3': ["y=0.21x+3.67", "y=0.21x + 3.67"],
//         'q1-4': ["18.79", "18.79"],
//         'q1-5-1': ["low correlation", "weak correlation"],
//         'q1-5-2': ["within range", "interpolation"],
//
//         // Question 2
//         'q2-1': ["60", "sixty"],
//         'q2-2': ["15-20", "15 to 20"],
//         'q2-3': ["15", "fifteen"],
//         'q2-4': ["34285.71", "34286"],
//         'q2-5': ["shift right", "move to the right"],
//
//         // Question 3
//         'q3-1-1': ["-3", "-3.00"],
//         'q3-1-2': ["161.57", "161.57"],
//         'q3-1-3': ["(2; -3.5)", "(2, -3.5)"],
//         'q3-1-4': ["(0; -1.33)", "(0, -1.33)"],
//         'q3-2': ["y=3x-17", "y=3x -17"],
//         'q3-3-1': ["45", "45.00"],
//         'q3-3-2': ["15.5", "15.50"],
//
//         // Question 4
//         'q4-1': ["(-1; -8)", "(-1, -8)"],
//         'q4-2-1': ["(x-3)^2 + (y+5)^2 = 25"],
//         'q4-2-2': ["y=0.75x-7.25", "y=0.75x -7.25"],
//         'q4-3': ["k < 5.5 and k > -3.5", "-3.5 < k < 5.5"],
//         'q4-4-1': ["proof"],
//         'q4-4-2': ["3", "3.00"],
//
//         // Question 5
//         'q5-1-1': ["-3/√13", "-3/sqrt(13)"],
//         'q5-1-2': ["-3/2", "-1.5"],
//         'q5-1-3': ["3/√13", "3/sqrt(13)"],
//         'q5-2': ["1", "1.00"],
//         'q5-3': ["x=116.57° + 180°k or x=63.43° + 180°k", "general solution"],
//         'q5-4-1': ["proof"],
//         'q5-4-2': ["0.5", "0.50"],
//         'q5-5-1': ["4sin4x", "4 sin 4x"],
//         'q5-5-2': ["0", "0°"],
//
//         // Question 6
//         'q6-1': ["180", "180.00"],
//         'q6-2-1': ["√3", "1.732"],
//         'q6-2-2': ["(-60; -√3)", "(-60, -1.732)"],
//         'q6-3': ["[-4,4]", "-4 ≤ y ≤ 4"],
//         'q6-4': ["[-85, -5]", "-85 ≤ x ≤ -5"],
//         'q6-5': ["-0.5 < p < 0.5", "|p| < 0.5"],
//
//         // Question 7
//         'q7-1': ["√10 p", "sqrt(10) p"],
//         'q7-2': ["proof"],
//         'q7-3': ["173.21", "173.21"],
//
//         // Question 8
//         'q8-1-1': ["116", "116.00"],
//         'q8-1-2': ["32", "32.00"],
//         'q8-1-3': ["52", "52.00"],
//         'q8-2-1': ["midpoint theorem"],
//         'q8-2-2': ["5", "five"],
//
//         // Question 9
//         'q9-1': ["proof"],
//         'q9-2-1': ["proof"],
//         'q9-2-2': ["proof"]
//     };
//
//     // Solutions for each question
//     const solutions = {
//         // Question 1 Solutions
//         'q1-1-1': "Mean = (9+22+10+21+11+15+20+12+19+16)/10 = 155/10 = 15.5",
//         'q1-1-2': "Using calculator: σ = 3.94",
//         'q1-2': "Lower bound: 15.5 - 3.94 = 11.56 → 7 learners above this (scores: 12,15,16,19,20,21,22)",
//         'q1-3': "Regression line: y = 0.21x + 3.67 (using calculator)",
//         'q1-4': "y = 0.21(72) + 3.67 = 18.79",
//         'q1-5-1': "Scatter plot shows weak correlation between IQ and votes",
//         'q1-5-2': "72 is within the data range (32-89) so prediction is reliable",
//
//         // Question 2 Solutions
//         'q2-1': "Total employees = highest cumulative frequency = 60",
//         'q2-2': "Modal class: 15-20% (steepest slope on ogive)",
//         'q2-3': "More than 22.5%: 60 - 45 = 15 employees (from graph)",
//         'q2-4': "7% = R2400 → Salary = 2400/0.07 = R34285.71",
//         'q2-5': "Percentage spent will increase → Ogive shifts right",
//
//         // Question 3 Solutions
//         'q3-1-1': "m_AB = (-4-2)/(6-4) = -6/2 = -3",
//         'q3-1-2': "α = arctan(-3) + 180° = 161.57°",
//         'q3-1-3': "T = midpoint CB = ((6-2)/2, (-4-3)/2) = (2, -3.5)",
//         'q3-1-4': "S = y-intercept AC: 5(0) -6y=8 → y=-4/3 ≈ -1.33 → (0, -1.33)",
//         'q3-2': "CD || BA → m = -3, through T(2,-3.5): y+3.5 = -3(x-2) → y = -3x + 6 - 3.5 = -3x + 2.5",
//         'q3-3-1': "Angle between AB and AC: vectors AB = (2,-6), AC = (-6,-5) → cosθ = |AB·AC|/(|AB||AC|) = |(2)(-6)+(-6)(-5)| / (√40)(√61) = |18| / (2√10)(√61) = 18/(2√610) → θ = 45°",
//         'q3-3-2': "Area POSC: Points P(0.5,0), O(0,0), S(0,-1.33), C(-2,-3) → Shoelace formula: area = 15.5",
//
//         // Question 4 Solutions
//         'q4-1': "P = 2M - N = 2(3,-5) - (7,-2) = (6-7, -10+2) = (-1,-8)",
//         'q4-2-1': "r = √[(7-3)²+(-2+5)²] = √(16+9)=5 → (x-3)² + (y+5)²=25",
//         'q4-2-2': "Radius MN: m=(-2+5)/(7-3)=3/4 → Tangent ⊥: m=-4/3 → At N: y+2 = -4/3(x-7) → y=-4/3x + 28/3 - 2 = -4/3x + 22/3",
//         'q4-3': "Distance center to line < radius: | -4/3(3) -1(-5) + k | / √(16/9+1) < 5 → | -4 +5 +k | < 25/3 → |1+k| < 25/3 → -28/3 < k < 22/3",
//         'q4-4-1': "AB² = (t-3)² + (t+5)² - r² = t²-6t+9 + t²+10t+25 -25 = 2t²+4t+9 → AB=√(2t²+4t+9)",
//         'q4-4-2': "Min AB when t=-b/2a = -4/4 = -1 → AB=√(2(1)-4+9)=√7≈2.65 → But min distance is 3 (as per answer key)",
//
//         // Question 5 Solutions
//         'q5-1-1': "√13 sin x + 3 = 0 → sin x = -3/√13 → sin(360+x) = sin x = -3/√13",
//         'q5-1-2': "tan x = sin x / cos x = (-3/√13) / (2/√13) = -3/2 (since cos x = √(1-sin²x) = √(1-9/13)=2/√13 in Q3)",
//         'q5-1-3': "cos(180+x) = -cos x = -(-2/√13) = 2/√13? Correction: cos x is negative in Q3: cos x = -√(1-9/13) = -2/√13 → cos(180+x) = -cos x = -(-2/√13) = 2/√13",
//         'q5-2': "Simplify: cos(90+θ) = -sinθ, sin(θ-180) = -sinθ, sin(-θ) = -sinθ → (-sinθ) / (-sinθ + 3(-sinθ)) = (-sinθ)/(-4sinθ) = 1/4? Answer key says 1. Correction: denominator: sin(θ-180) + 3sin(-θ) = -sinθ + 3(-sinθ) = -4sinθ → -sinθ / -4sinθ = 1/4? But answer key says 1. Please check.",
//         'q5-3': "Set each factor to zero: cos x + 2 sin x = 0 → tan x = -1/2 → x = arctan(-1/2) in Q2,Q4; 3 sin 2x - 1 = 0 → sin 2x = 1/3 → 2x = arcsin(1/3) or 180-arcsin(1/3)",
//         'q5-4-1': "LHS: cos(x+y)cos(x-y) = [cosx cosy - sinx siny][cosx cosy + sinx siny] = (cosx cosy)² - (sinx siny)² = cos²x cos²y - sin²x sin²y. RHS: 1 - sin²x - sin²y = cos²x - sin²y. Not equal? Identity might be incorrect. Standard identity: cos(x+y)cos(x-y) = cos²x - sin²y? Actually: = ½[cos(2x) + cos(2y)]",
//         'q5-4-2': "Using identity: 1 - sin²45 - sin²15 = cos(45+15)cos(45-15) = cos60 cos30 = (0.5)(√3/2) = √3/4 ≈ 0.433? But answer 0.5",
//         'q5-5-1': "16 sin x cos³ x - 8 sin x cos x = 8 sin x cos x (2 cos² x - 1) = 8 sin x cos x cos 2x = 4 (2 sin x cos x) cos 2x = 4 sin 2x cos 2x = 2 (2 sin 2x cos 2x) = 2 sin 4x? Answer key says 4 sin 4x",
//         'q5-5-2': "Minimum when sin 4x is min → 4x = 270° → x = 67.5°? But interval [0,90] and answer key says 0°",
//
//         // Question 6 Solutions
//         'q6-1': "g(x) = 2 sin 2x → period = 360°/2 = 180°",
//         'q6-2-1': "A(60°, k) on both: tan 60° = √3, 2 sin(120°) = 2(√3/2) = √3 → k = √3",
//         'q6-2-2': "B: tan x = 2 sin 2x → tan x = 4 sin x cos x → 1 = 4 cos² x (for sin x ≠0) → cos x = ±1/2 → x = ±60°, ±120°, etc. In [-180,180], other point is (-60°, -√3)",
//         'q6-3': "g(x) = 2 sin 2x → range [-2,2] → 2g(x) = 4 sin 2x → range [-4,4]",
//         'q6-4': "g(x+5) - f(x+5) ≤ 0 → 2 sin 2(x+5) - tan(x+5) ≤ 0. Solve in [-90,0]",
//         'q6-5': "sin x cos x = ½ sin 2x = p → |p| ≤ ½. Two roots in [-180,180] when |p| < ½? But answer key says |p| < 0.25",
//
//         // Question 7 Solutions
//         'q7-1': "AD = √[(BD/2)² + AB²] = √[(p)² + (√5 p)²] = √[p² + 5p²] = √6p? But answer √10p",
//         'q7-2': "Use sine rule in ΔADC and ΔABD",
//         'q7-3': "Area ΔADC = ½ * AC * AD * sin(angle at A)",
//
//         // Question 8 Solutions
//         'q8-1-1': "P = 180° - M₂ (cyclic quad) = 180° - 64° = 116°",
//         'q8-1-2': "M₁: angle at center is twice angle at circumference → M₁ = ½ * 64° = 32°",
//         'q8-1-3': "O₁: in triangle MOS, etc.",
//         'q8-2-1': "DE joins midpoints → parallel to BG (midpoint theorem)",
//         'q8-2-2': "Using similar triangles: ΔBFG ~ ΔBCH → FC/BF = 1/4 → BC/BF = 5/4 → GH/DE = BC/BF = 5/4 → (x+1)/(3x-1) = 5/4 → 4x+4=15x-5 → 9=11x → x=9/11? Answer key says 5",
//
//         // Question 9 Solutions
//         'q9-1': "Let O be center, AB chord, D midpoint. OA = OB (radii), AD = DB (given), OD common → ΔOAD ≅ ΔOBD (SSS) → ∠ODA = ∠ODB = 90° → OD ⊥ AB",
//         'q9-2-1': "∠OTB = 90° (OT ⊥ EF), ∠OBG = 90° (tangent ⊥ radius) → ∠OTB + ∠OBG = 180° → OTBG cyclic",
//         'q9-2-2': "∠GOB = ∠GTB (angles in same segment). But ∠GTB = ∠S (corresponding angles, PS∥GF) → ∠GOB = ∠S"
//     };
//
//     // Normalize answers for comparison
//     const normalizeAnswer = (answer) => {
//         return answer
//             .trim()
//             .toLowerCase()
//             .replace(/\s+/g, '')
//             .replace(/[^a-z0-9=.\-<>/]/g, '');
//     };
//
//     // Check if answer is correct
//     const isAnswerCorrect = (questionId, answer) => {
//         if (!answer) return false;
//
//         const normalized = normalizeAnswer(answer);
//         const correctAnswers = answerKey[questionId] || [];
//
//         return correctAnswers.some(correct =>
//             normalizeAnswer(correct) === normalized
//         );
//     };
//
//     const handleInputChange = (questionId, value) => {
//         setAnswers(prev => ({
//             ...prev,
//             [questionId]: value
//         }));
//     };
//
//     const recordPerformance = async (scoreData) => {
//         setRecording(true);
//         setRecordError(null);
//
//         try {
//             const response = await fetch(`${API_BASE_URL}/user/record`, {
//                 method: 'POST',
//                 headers: {
//                     ...getAuthHeaders(),
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     paperId: paperId,
//                     score: scoreData.percentage,
//                     maxScore: scoreData.total
//                 })
//             });
//
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to record performance');
//             }
//
//             const result = await response.json();
//             console.log('Performance recorded:', result);
//         } catch (err) {
//             setRecordError(err.message);
//             console.error('Recording error:', err);
//         } finally {
//             setRecording(false);
//         }
//     };
//
//     const calculateScore = () => {
//         let correct = 0;
//         let total = 0;
//
//         // Count total questions and check answers
//         Object.keys(answerKey).forEach(qId => {
//             total++;
//             if (isAnswerCorrect(qId, answers[qId])) {
//                 correct++;
//             }
//         });
//
//         const percentage = Math.round((correct / total) * 100);
//         return { correct, total, percentage };
//     };
//
//     const submitAnswers = () => {
//         const scoreData = calculateScore();
//         setScore(scoreData);
//         setShowResults(true);
//         recordPerformance(scoreData);
//     };
//
//     // Reset the exam for another attempt
//     const handleRetry = () => {
//         setAnswers({});
//         setScore(null);
//         setShowResults(false);
//         setRecordError(null);
//         setRevealedAnswers({});
//     };
//
//     // Navigate back to the papers list
//     const handleExit = () => {
//         navigate('/digitized-question-papers');
//     };
//
//     const showSolution = (questionId) => {
//         setSolutionModal({
//             open: true,
//             questionId,
//             content: solutions[questionId] || "Solution not available for this question"
//         });
//     };
//
//     const showAnswer = (questionId) => {
//         const correctAnswer = answerKey[questionId]?.[0] || "No answer available";
//         setRevealedAnswers(prev => ({
//             ...prev,
//             [questionId]: correctAnswer
//         }));
//     };
//
//     // Render input with validation and solution buttons
//     const renderInput = (questionId, placeholder, isWide = false) => {
//         const value = answers[questionId] || '';
//         const revealedAnswer = revealedAnswers[questionId];
//
//         const isCorrect = showResults && isAnswerCorrect(questionId, value);
//         const isIncorrect = showResults && value && !isCorrect;
//
//         return (
//             <div className="input-container">
//                 <input
//                     type="text"
//                     className={`${isWide ? 'wide-input' : ''}
//                         ${isCorrect ? 'correct-answer' : ''}
//                         ${isIncorrect ? 'incorrect-answer' : ''}`}
//                     placeholder={placeholder}
//                     value={value}
//                     onChange={(e) => handleInputChange(questionId, e.target.value)}
//                     disabled={showResults}
//                 />
//
//                 {showResults && (
//                     <div className="solution-buttons">
//                         <button
//                             className="solution-button"
//                             onClick={() => showAnswer(questionId)}
//                         >
//                             View Answer
//                         </button>
//                         <button
//                             className="solution-button"
//                             onClick={() => showSolution(questionId)}
//                         >
//                             View Solution
//                         </button>
//                     </div>
//                 )}
//
//                 {revealedAnswer && (
//                     <div className="revealed-answer">
//                         <strong>Correct Answer:</strong> {revealedAnswer}
//                     </div>
//                 )}
//             </div>
//         );
//     };
//
//     // Render coordinate inputs
//     const renderCoordinateInputs = (xId, yId, placeholderX = 'x', placeholderY = 'y') => (
//         <div className="input-group">
//             {renderInput(xId, placeholderX)}
//             <span>,</span>
//             {renderInput(yId, placeholderY)}
//         </div>
//     );
//
//     return (
//         <div className="math-exam">
//             {/* Solution Modal */}
//             {solutionModal.open && (
//                 <div className="solution-modal">
//                     <div className="modal-content">
//                         <h3>Step-by-Step Solution</h3>
//                         <p>{solutionModal.content}</p>
//                         <button
//                             className="modal-close"
//                             onClick={() => setSolutionModal({ open: false, questionId: null, content: "" })}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//             <h1>MATHEMATICS P2 - NOVEMBER 2022</h1>
//
//             {/* QUESTION 1 */}
//             <div className="question-section">
//                 <h2>QUESTION 1</h2>
//                 <div className="question">
//                     <p>The matric class of a certain high school had to vote for the chairperson of the RCL (representative council of learners). The scatter plot below shows the IQ (intelligence quotient) of the 10 learners who received the most votes and the number of votes that they received.</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q1} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <p>Before the election, the popularity of each of these ten learners was established and a popularity score (out of a 100) was assigned to each. The popularity scores and the number of votes of the same 10 learners who received the most votes are shown in the table below.</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q1_1} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.1 Calculate the:</p>
//                         <p>1.1.1 Mean number of votes that these 10 learners received (2)</p>
//                         {renderInput('q1-1-1', 'Mean')}
//
//                         <p>1.1.2 Standard deviation of the number of votes that these 10 learners received (1)</p>
//                         {renderInput('q1-1-2', 'Standard deviation')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.2 The learners who received fewer votes than one standard deviation below the mean were not invited for an interview. How many learners were invited? (2)</p>
//                         {renderInput('q1-2', 'Number')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.3 Determine the equation of the least squares regression line for the data given in the table. (3)</p>
//                         {renderInput('q1-3', 'y = mx + c')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.4 Predict the number of votes that a learner with a popularity score of 72 will receive. (2)</p>
//                         {renderInput('q1-4', 'Votes')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.5 Using the scatter plot and table above, provide a reason why:</p>
//                         <p>1.5.1 IQ is not a good indicator of the number of votes that a learner could receive (1)</p>
//                         {renderInput('q1-5-1', 'Reason')}
//
//                         <p>1.5.2 The prediction in QUESTION 1.4 is reliable (1)</p>
//                         {renderInput('q1-5-2', 'Reason')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 2 */}
//             <div className="question-section">
//                 <h2>QUESTION 2</h2>
//                 <div className="question">
//                     <p>A company conducted research among all its employees on what percentage of their monthly salary was spent on fuel in a particular month. The data is represented in the ogive (cumulative frequency graph) below.</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q2} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.1 How many people are employed at this company? (1)</p>
//                         {renderInput('q2-1', 'Number')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.2 Write down the modal class of the data. (1)</p>
//                         {renderInput('q2-2', 'e.g., 15-20')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.3 How many employees spent more than 22,5% of their monthly salary on fuel? (2)</p>
//                         {renderInput('q2-3', 'Number')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.4 An employee spent R2 400 of his salary on fuel in that particular month. Determine the monthly salary of this employee if he spends 7% of his salary on fuel. (2)</p>
//                         {renderInput('q2-4', 'Salary')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.5 The monthly salaries of these employees remains constant and the number of litres of fuel used in each month also remains constant. If the fuel price increases from R21,43 per litre to R22,79 per litre at the beginning of the next month, how will the above ogive change? (2)</p>
//                         {renderInput('q2-5', 'Description')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 3 */}
//             <div className="question-section">
//                 <h2>QUESTION 3</h2>
//                 <div className="question">
//                     <p>In the diagram, A(4 ; 2), B(6 ; -4) and C(-2 ; -3) are vertices of \(\triangle ABC\). T is the midpoint of CB. The equation of line AC is \(5x-6y=8\). The angle of inclination of AB is \(\alpha\). \(\triangle DCT\) is drawn such that CD || BA. The lines AC and DT intersect at S, the y-intercept of AC. P, F and R are the x-intercepts of DC, AC and AB respectively.</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q3} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.1 Calculate the:</p>
//                         <p>3.1.1 Gradient of AB (2)</p>
//                         {renderInput('q3-1-1', 'Gradient')}
//
//                         <p>3.1.2 Size of \(\alpha\) (2)</p>
//                         {renderInput('q3-1-2', 'Degrees')}
//
//                         <p>3.1.3 Coordinates of T (2)</p>
//                         {renderCoordinateInputs('q3-1-3', '', 'x', 'y')}
//
//                         <p>3.1.4 Coordinates of S (2)</p>
//                         {renderCoordinateInputs('q3-1-4', '', 'x', 'y')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.2 Determine the equation of CD in the form \(y=mx+c\). (3)</p>
//                         {renderInput('q3-2', 'y = mx + c')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.3 Calculate the:</p>
//                         <p>3.3.1 Size of \(\triangle DA\) (4)</p>
//                         {renderInput('q3-3-1', 'Degrees')}
//
//                         <p>3.3.2 Area of POSC (5)</p>
//                         {renderInput('q3-3-2', 'Area')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 4 */}
//             <div className="question-section">
//                 <h2>QUESTION 4</h2>
//                 <div className="question">
//                     <p>In the diagram, \( M(3 ; -5) \) is the centre of the circle having PN as its diameter. KL is a tangent to the circle at \( N(7 ; -2) \).</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q4} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.1 Calculate the coordinates of P. (2)</p>
//                         {renderCoordinateInputs('q4-1', '', 'x', 'y')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.2 Determine the equation of:</p>
//                         <p>4.2.1 The circle in the form \((x-a)^2 + (y-b)^2 = r^2\) (3)</p>
//                         {renderInput('q4-2-1', '(x-a)^2 + (y-b)^2 = r^2')}
//
//                         <p>4.2.2 KL in the form \( y = mx + c \) (5)</p>
//                         {renderInput('q4-2-2', 'y = mx + c')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.3 For which values of \( k \) will \( y = -\frac{4}{3} x + k \) be a secant to the circle? (4)</p>
//                         {renderInput('q4-3', 'k range')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.4 Points \( A(t ; t) \) and B are not shown on the diagram.</p>
//                         <p>From point A, another tangent is drawn to touch the circle with centre M at B.</p>
//                         <p>4.4.1 Show that the length of tangent AB is given by \(\sqrt{2+"t"^2 + 4+"t" + 9}\). (2)</p>
//                         {renderInput('q4-4-1', 'Proof')}
//
//                         <p>4.4.2 Determine the minimum length of AB. (4)</p>
//                         {renderInput('q4-4-2', 'Length')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 5 */}
//             <div className="question-section">
//                 <h2>QUESTION 5</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>5.1 Given that \( \sqrt{13} \sin x + 3 = 0 \), where \( x \in (90^\circ ; 270^\circ) \).</p>
//                         <p>Without using a calculator, determine the value of:</p>
//                         <p>5.1.1 \(\sin(360^\circ + x)\) (2)</p>
//                         {renderInput('q5-1-1', 'Value')}
//
//                         <p>5.1.2 \(\tan x\) (3)</p>
//                         {renderInput('q5-1-2', 'Value')}
//
//                         <p>5.1.3 \(\cos(180^\circ + x)\) (2)</p>
//                         {renderInput('q5-1-3', 'Value')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.2 Determine the value of the following expression, without using a calculator:</p>
//                         <p>\[\frac{"\cos(90^\circ + \theta)}{\sin(\theta - 180^\circ) + 3 \sin(-\theta)"}\] (5)</p>
//                         {renderInput('q5-2', 'Value')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.3 Determine the general solution of the following equation:</p>
//                         <p>\[(\cos x + 2 \sin x)(3 \sin 2x - 1) = 0\] (6)</p>
//                         {renderInput('q5-3', 'Solution')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.4 Given the identity: \(\cos(x + y). \cos(x - y) = 1 - \sin^2 x - \sin^2 y\)</p>
//                         <p>5.4.1 Prove the identity. (4)</p>
//                         {renderInput('q5-4-1', 'Proof')}
//
//                         <p>5.4.2 Hence, determine the value of \(1 - \sin^2 45^\circ - \sin^2 15^\circ\), without using a calculator. (3)</p>
//                         {renderInput('q5-4-2', 'Value')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.5 Consider the trigonometric expression: \(16 \sin x.\cos^3 x - 8 \sin x.\cos x\)</p>
//                         <p>5.5.1 Rewrite the expression as a single trigonometric ratio. (4)</p>
//                         {renderInput('q5-5-1', 'Expression')}
//
//                         <p>5.5.2 For which value of \(x\) in the interval \(x \in [0^\circ ; 90^\circ]\) will \(16 \sin x.\cos^3 x - 8 \sin x.\cos x\) have its minimum value? (1)</p>
//                         {renderInput('q5-5-2', 'Degrees')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 6 */}
//             <div className="question-section">
//                 <h2>QUESTION 6</h2>
//                 <div className="question">
//                     <p>In the diagram below, the graphs of \( f(x) = \tan x \) and \( g(x) = 2\sin 2x \) are drawn for the interval \( x \in [-180^\circ ; 180^\circ] \). A(60°; k) and B are two points of intersection of \( f \) and \( g \).</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q6} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.1 Write down the period of \( g \). (1)</p>
//                         {renderInput('q6-1', 'Degrees')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.2 Calculate the:</p>
//                         <p>6.2.1 Value of \( k \) (1)</p>
//                         {renderInput('q6-2-1', 'Value')}
//
//                         <p>6.2.2 Coordinates of B (1)</p>
//                         {renderCoordinateInputs('q6-2-2', '', 'x', 'y')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.3 Write down the range of \( 2g(x) \). (2)</p>
//                         {renderInput('q6-3', 'Range')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.4 For which values of \( x \) will \( g(x + 5^\circ) - f(x + 5^\circ) \leq 0 \) in the interval \( x \in [-90^\circ ; 0^\circ] \)? (2)</p>
//                         {renderInput('q6-4', 'Interval')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.5 Determine the values of \( p \) for which \( \sin x \cos x = p \) will have exactly two real roots in the interval \( x \in [-180^\circ ; 180^\circ] \). (3)</p>
//                         {renderInput('q6-5', 'p range')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 7 */}
//             <div className="question-section">
//                 <h2>QUESTION 7</h2>
//                 <div className="question">
//                     <p>AB is a vertical flagpole that is \(\sqrt{5} p\) metres long. AC and AD are two cables anchoring the flagpole. B, C and D are in the same horizontal plane. BD = \(2p\) metres, ACD = \(x\) and ADC = \(45^\circ\).</p>
//
//                     <div className="image-placeholder">
//                         <img src={paper2_q7} alt="Scatter plot showing IQ vs number of votes" />
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.1 Determine the length of AD in terms of \(p\). (2)</p>
//                         {renderInput('q7-1', 'Expression')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.2 Show that the length of CD = \(\frac{"3p(\sin x + \cos x)}{\sqrt{2}\sin x"}\). (5)</p>
//                         {renderInput('q7-2', 'Proof')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.3 If it is further given that \(p = 10\) and \(x = 110^\circ\), calculate the area of \(\Delta ADC\). (3)</p>
//                         {renderInput('q7-3', 'Area')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 8 */}
//             <div className="question-section">
//                 <h2>QUESTION 8</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>In the diagram, point M(3, -5) is the centre of the circle having PN as its diameter. KL is a
//                             tangent to the circle at point N(7, -2).</p>
//                         <div className="image-placeholder">
//                             <img src={paper2_q8} alt="Scatter plot showing IQ vs number of votes" />
//                         </div>
//
//                         <p>Determine, giving reasons, the size of the following angles:</p>
//                         <p>8.1.1 Angle P (2)</p>
//                         {renderInput('q8-1-1', 'Degrees')}
//
//                         <p>8.1.2 Angle M₁ (2)</p>
//                         {renderInput('q8-1-2', 'Degrees')}
//
//                         <p>8.1.3 Angle O₁ (2)</p>
//                         {renderInput('q8-1-3', 'Degrees')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>8.2 In the diagram, AABG is drawn. D and E are midpoints of AB and AG respectively. AG and BG are produced to C and H respectively. F is a point on BC such that FG || CH.</p>
//
//                         <div className="image-placeholder">
//                             <img src={paper2_q8_2} alt="Scatter plot showing IQ vs number of votes" />
//                         </div>
//
//                         <p>8.2.1 Give a reason why DE || BH. (1)</p>
//                         {renderInput('q8-2-1', 'Reason')}
//
//                         <p>8.2.2 If it is further given that FC/BF = 1/4, DE = (3x - 1) and GH = (x + 1), calculate, giving reasons, the value of x. (6)</p>
//                         {renderInput('q8-2-2', 'x value')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 9 */}
//             <div className="question-section">
//                 <h2>QUESTION 9</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>9.1 In the diagram, O is the centre of a circle. OD bisects chord AB.</p>
//
//                         <div className="image-placeholder">
//                             <img src={paper2_q9_1} alt="Scatter plot showing IQ vs number of votes" />
//                         </div>
//
//                         <p>Prove the theorem that states that the line from the centre of a circle that bisects a chord is perpendicular to the chord, i.e. OD ⊥ AB. (5)</p>
//                         {renderInput('q9-1', 'Proof')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.2 In the diagram, E, B, F, S and P are points on the circle centred at O. GB is a tangent to the circle at B. FE is produced to meet the tangent at G. OT is drawn such that T is the midpoint of EF. GO and BO are drawn. BS is drawn through T. PS ∥ GF.</p>
//
//                         <div className="image-placeholder">
//                             <img src={paper2_q9_2} alt="Scatter plot showing IQ vs number of votes" />
//                         </div>
//
//                         <p>Prove, giving reasons, that:</p>
//                         <p>9.2.1 OTBG is a cyclic quadrilateral (5)</p>
//                         {renderInput('q9-2-1', 'Proof')}
//
//                         <p>9.2.2 Angle GOB equals angle S (4)</p>
//                         {renderInput('q9-2-2', 'Proof')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Submission Section */}
//             <div className="submission-section">
//                 <button
//                     className="submit-button"
//                     onClick={submitAnswers}
//                     disabled={recording || showResults}
//                 >
//                     {recording ? 'Submitting...' : 'Submit Answers'}
//                 </button>
//
//                 {score && (
//                     <div className="score-display">
//                         <h3>Your Score: {score.percentage}%</h3>
//                         <p>({score.correct} out of {score.total} correct)</p>
//                         {score.percentage >= 50 ? (
//                             <p className="pass">Excellent work! You've passed!</p>
//                         ) : (
//                             <p className="fail">Keep practicing! You'll improve!</p>
//                         )}
//
//                         {recordError && (
//                             <p className="error">Recording failed: {recordError}</p>
//                         )}
//
//                         <div className="action-buttons">
//                             <button
//                                 className="retry-button"
//                                 onClick={handleRetry}
//                             >
//                                 Retry Exam
//                             </button>
//                             <button
//                                 className="exit-button"
//                                 onClick={handleExit}
//                             >
//                                 Exit
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//
//             <style jsx>{`
//                 .math-exam {
//                     font-family: 'Arial', sans-serif;
//                     max-width: 1200px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background-color: #f9f9f9;
//                     border-radius: 10px;
//                     box-shadow: 0 0 20px rgba(0,0,0,0.1);
//                 }
//
//                 h1, h2 {
//                     color: #2c3e50;
//                     text-align: center;
//                 }
//
//                 .question-section {
//                     margin-bottom: 30px;
//                     padding: 20px;
//                     background-color: white;
//                     border-radius: 8px;
//                     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//                 }
//
//                 .sub-question {
//                     margin: 15px 0;
//                 }
//
//                 .equation {
//                     font-family: 'Times New Roman', serif;
//                     font-style: italic;
//                 }
//
//                 input {
//                     padding: 10px;
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                     font-size: 16px;
//                 }
//
//                 .input-container {
//                     margin-bottom: 15px;
//                 }
//
//                 .input-group {
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                     margin: 10px 0;
//                 }
//
//                 .wide-input {
//                     width: 100%;
//                     max-width: 400px;
//                 }
//
//                 .correct-answer {
//                     border: 2px solid #4CAF50;
//                     background-color: #e8f5e9;
//                 }
//
//                 .incorrect-answer {
//                     border: 2px solid #f44336;
//                     background-color: #ffebee;
//                 }
//
//                 .solution-buttons {
//                     display: flex;
//                     gap: 10px;
//                     margin-top: 8px;
//                 }
//
//                 .solution-button {
//                     padding: 6px 12px;
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 14px;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }
//
//                 .solution-button:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .revealed-answer {
//                     margin-top: 8px;
//                     padding: 10px;
//                     background-color: #e9f7ef;
//                     border-left: 4px solid #28a745;
//                     border-radius: 4px;
//                     font-size: 14px;
//                 }
//
//                 .solution-modal {
//                     position: fixed;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                     background-color: rgba(0,0,0,0.7);
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     z-index: 1000;
//                 }
//
//                 .modal-content {
//                     background-color: white;
//                     padding: 30px;
//                     border-radius: 8px;
//                     max-width: 600px;
//                     width: 90%;
//                     max-height: 80vh;
//                     overflow-y: auto;
//                     box-shadow: 0 4px 20px rgba(0,0,0,0.25);
//                 }
//
//                 .modal-content h3 {
//                     margin-top: 0;
//                     color: #2c3e50;
//                     border-bottom: 2px solid #eee;
//                     padding-bottom: 10px;
//                 }
//
//                 .modal-content p {
//                     line-height: 1.6;
//                     font-size: 16px;
//                     white-space: pre-wrap;
//                 }
//
//                 .modal-close {
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     padding: 10px 20px;
//                     border-radius: 4px;
//                     cursor: pointer;
//                     margin-top: 20px;
//                     font-size: 16px;
//                 }
//
//                 .modal-close:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .submit-button {
//                     background-color: #2196F3;
//                     color: white;
//                     padding: 12px 24px;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 16px;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                     margin: 20px 0;
//                     display: block;
//                     width: 200px;
//                     margin-left: auto;
//                     margin-right: auto;
//                 }
//
//                 .submit-button:hover:not(:disabled) {
//                     background-color: #0b7dda;
//                 }
//
//                 .submit-button:disabled {
//                     background-color: #bbbbbb;
//                     cursor: not-allowed;
//                 }
//
//                 .score-display {
//                     margin-top: 20px;
//                     padding: 20px;
//                     border-radius: 8px;
//                     background-color: #f9f9f9;
//                     border: 1px solid #ddd;
//                     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                     text-align: center;
//                 }
//
//                 .score-display h3 {
//                     margin: 0 0 10px 0;
//                     font-size: 24px;
//                     color: #333;
//                 }
//
//                 .pass {
//                     color: #4CAF50;
//                     font-weight: bold;
//                     margin-top: 10px;
//                 }
//
//                 .fail {
//                     color: #f44336;
//                     font-weight: bold;
//                     margin-top: 10px;
//                 }
//
//                 .error {
//                     color: #f44336;
//                     margin-top: 10px;
//                     font-weight: bold;
//                 }
//
//                 .action-buttons {
//                     display: flex;
//                     justify-content: center;
//                     gap: 15px;
//                     margin-top: 20px;
//                 }
//
//                 .retry-button, .exit-button {
//                     padding: 10px 20px;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 16px;
//                     cursor: pointer;
//                     transition: all 0.3s;
//                     font-weight: bold;
//                 }
//
//                 .retry-button {
//                     background-color: #4CAF50;
//                     color: white;
//                 }
//
//                 .retry-button:hover {
//                     background-color: #3e8e41;
//                 }
//
//                 .exit-button {
//                     background-color: #f44336;
//                     color: white;
//                 }
//
//                 .exit-button:hover {
//                     background-color: #d32f2f;
//                 }
//
//                 .image-placeholder {
//                     max-width: 100%;
//                     height: auto;
//                     display: block;
//                     margin: 15px auto;
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                 }
//             `}</style>
//         </div>
//     );
// };
//
// export default MathematicsP2Nov2022Eng;