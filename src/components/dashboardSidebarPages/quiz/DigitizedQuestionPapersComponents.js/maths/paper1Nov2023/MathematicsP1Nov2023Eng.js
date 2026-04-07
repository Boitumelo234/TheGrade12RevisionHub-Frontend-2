// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import q4 from './q4.png';
// import q5 from './q5.png';
// import q9 from './q9.png';
//
// const MathematicsP1Nov2023Eng = ({ paperId }) => {
//     const navigate = useNavigate();
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(null);
//     const [showResults, setShowResults] = useState(false);
//     const [revealedAnswers, setRevealedAnswers] = useState({});
//     const [solutionModal, setSolutionModal] = useState({
//         open: false,
//         questionId: null,
//         content: ""
//     });
//
//     // Answer key for the November 2023 exam
//     const answerKey = {
//         // Question 1
//         'q1-1-1': ["3", "-4"],
//         'q1-1-2a': ["1.79", "1.79"],
//         'q1-1-2b': ["-1.12", "-1.12"],
//         'q1-1-3': ["4", "4"],
//         'q1-1-4': ["x < -1", "x > 3"],
//         'q1-2a-x': ["2", "2"],
//         'q1-2a-y': ["2", "2"],
//         'q1-2b-x': ["-1", "-1"],
//         'q1-2b-y': ["0.5", "0.5"],
//         'q1-3': ["3", "3"],
//
//         // Question 2
//         'q2-1-1': ["42", "42"],
//         'q2-1-2': ["220.5", "220.5"],
//         'q2-1-3': ["103", "103"],
//         'q2-2-1': ["111", "111"],
//         'q2-2-3': ["Increasing for all n", "Increasing for all n"],
//
//         // Question 3
//         'q3-1-1': ["3*2^(n-1)", "3*2^(n-1)"],
//         'q3-1-2': ["16", "16"],
//         'q3-2': ["6", "6"],
//
//         // Question 4
//         'q4-1': ["y = -4", "y = -4"],
//         'q4-2': ["(2, 0)", "(2, 0)"],
//         'q4-3': ["y = 2x - 4", "y = 2x - 4"],
//         'q4-4': ["1 unit", "1 unit"],
//         'q4-5': ["g(x) = 2^x", "g(x) = 2^x"],
//         'q4-6': ["x > 0", "x > 0"],
//         'q4-7': ["y = log₂x", "y = log₂x"],
//
//         // Question 5
//         'q5-1': ["6.5%", "6.5%"],
//         'q5-2': ["6.7%", "6.7%"],
//         'q5-3-1': ["5 years", "5 years"],
//         'q5-3-2': ["R230.50", "R230.50"],
//         'q5-4': ["96 months", "96 months"],
//
//         // Question 6
//         'q6-1': ["-8x", "-8x"],
//         'q6-2-1': ["6x^2 - 3", "6x^2 - 3"],
//         'q6-2-2': ["(14/3)x^(-1/3) - 10x^(-6)", "(14/3)x^(-1/3) - 10x^(-6)"],
//         'q6-3': ["-1.15 < x < 1.15", "-1.15 < x < 1.15"],
//
//         // Question 7
//         'q7-1': ["(1, 0) and (4, 0)", "(1, 0) and (4, 0)"],
//         'q7-3': ["k < 0 or k > 4", "k < 0 or k > 4"],
//         'q7-4': ["y = 3x - 5", "y = 3x - 5"],
//         'q7-5': ["71.57°", "71.57°"],
//
//         // Question 8
//         'q8-2': ["x = 12 cm", "x = 12 cm"],
//
//         // Question 9
//         'q9-1-1': ["0.25", "0.25"],
//         'q9-1-2': ["0.92", "0.92"],
//         'q9-2-2': ["0.66", "0.66"],
//         'q9-3-1': ["3,628,800", "3,628,800"],
//         'q9-3-2': ["0.022", "0.022"]
//     };
//
//     // Solutions for each question
//     const solutions = {
//         'q1-1-1': "x² + x - 12 = 0 → (x+4)(x-3) = 0 → x = 3 or x = -4",
//         'q1-1-2a': "Using quadratic formula: x = [2 ± √(4 + 72)]/6 = [2 ± √76]/6 ≈ 1.79",
//         'q1-1-2b': "Using quadratic formula: x = [2 ± √(4 + 72)]/6 = [2 ± √76]/6 ≈ -1.12",
//         'q1-1-3': "√(2x+1) = x-1 → 2x+1 = (x-1)² → 2x+1 = x² - 2x + 1 → x² - 4x = 0 → x(x-4)=0 → x=4 (x=0 is extraneous)",
//         'q1-1-4': "x² - 3 > 2x → x² - 2x - 3 > 0 → (x-3)(x+1) > 0 → x < -1 or x > 3",
//         'q1-2a-x': "From x+2=2y → y=(x+2)/2. Substitute into 1/x + 1/y = 1 → 1/x + 2/(x+2) = 1 → Solve: x=2",
//         'q1-2a-y': "When x=2, y=(2+2)/2=2",
//         'q1-2b-x': "From 1/x + 1/y = 1 and x+2=2y, second solution: x=-1",
//         'q1-2b-y': "When x=-1, y=(-1+2)/2=0.5",
//         'q1-3': "2^(n+1) + 2^n = 2^n(2+1) = 3·2^n. 3^(n+2) - 3^n = 3^n(9-1)=8·3^n. Equation: 3·2^n = 8·3^n → 3/8 = (3/2)^n → n=1",
//
//         'q2-1-1': "Arithmetic sequence: a=7, d=5. T₉ = 7 + 8×5 = 7 + 40 = 47",
//         'q2-1-2': "S₉ = 9/2 × (2×7 + 8×5) = 4.5 × (14 + 40) = 4.5 × 54 = 243",
//         'q2-1-3': "Tₙ = 7 + (n-1)×5 = 517 → 5(n-1) = 510 → n-1=102 → n=103",
//         'q2-2-1': "Quadratic pattern: Second differences constant. T₁=3, T₂=12, T₃=33, T₄=66, T₅=111",
//         'q2-2-3': "Tₙ = 6n² - 9n + 6. First difference: Tₙ - Tₙ₋₁ = 12n - 15 > 0 for n≥2, and T₂ > T₁",
//
//         'q3-1-1': "Geometric sequence: a=3, r=2. Tₙ = 3×2^(n-1)",
//         'q3-1-2': "Sum = 3(2^k - 1)/(2-1) = 3(2^k - 1) = 98301 → 2^k = 32768 → k=15",
//         'q3-2': "Let first term = a. Arithmetic sum: S₂₂ = 22/2 × (2a + 21×3) = 11(2a+63)=22a+693. Geometric sum: S∞ = a/(1-1/3)=1.5a. Equation: 22a+693 = 1.5a + 734 → 20.5a = 41 → a=2",
//
//         'q4-1': "As x → -∞, 2^x → 0, so f(x) → -4. Horizontal asymptote: y = -4",
//         'q4-2': "Set 2^x - 4 = 0 → 2^x = 4 → x=2. B=(2,0)",
//         'q4-3': "A=(0,-3), B=(2,0). Slope = (0+3)/(2-0)=1.5. Equation: y = 1.5x - 3",
//         'q4-4': "At x=1, f(1)=2-4=-2, k(1)=1.5-3=-1.5. Vertical distance = 0.5",
//         'q4-5': "g(x) = f(x) + 4 = 2^x",
//         'q4-6': "Domain of g⁻¹ is range of g, which is (0,∞)",
//         'q4-7': "g(x)=2^x → g⁻¹(x)=log₂x",
//
//         'q5-1': "A = P(1 + r/12)^6 → 19319.48 = 18500(1 + r/12)^6 → Solve: r ≈ 0.065 → 6.5%",
//         'q5-2': "Effective rate = (1 + 0.065/12)^12 - 1 ≈ 0.067 → 6.7%",
//         'q5-3-1': "Straight-line depreciation: Value decreases by 2000 per year (20% of 10000). Time to zero: 10000/2000 = 5 years",
//         'q5-3-2': "Future value of annuity: FV = P[(1+i)^n - 1]/i. i=0.087/12=0.00725, n=60. Solve: P ≈ 230.50",
//         'q5-4': "Present value of annuity: PV = P[1 - (1+i)^(-n)]/i. 1600000 = 20000[1 - (1+0.112/12)^(-n)]/(0.112/12). Solve: n ≈ 96 months",
//
//         'q6-1': "f'(x) = limₕ→₀ [f(x+h)-f(x)]/h = limₕ→₀ [-4(x+h)² + 4x²]/h = limₕ→₀ [-8xh -4h²]/h = -8x",
//         'q6-2-1': "f'(x) = 6x² - 3",
//         'q6-2-2': "D_x [7x^(2/3) + 2x^(-5)] = (14/3)x^(-1/3) - 10x^(-6)",
//         'q6-3': "f'(x) = -6x² + 8 > 0 → 6x² < 8 → x² < 4/3 → -1.155 < x < 1.155",
//
//         'q7-1': "f(x) = (x-1)²(-x+4). Turning points where f'(x)=0. f'(x) = -3x² + 12x - 9 = -3(x²-4x+3)=-3(x-1)(x-3). Critical points at x=1 and x=3",
//         'q7-3': "Three real roots when horizontal line y=k intersects graph three times. This occurs when k is between the local maximum and minimum values",
//         'q7-4': "Point of inflection where f''(x)=0. f''(x) = -6x + 12 = 0 → x=2. f(2)=6. f'(2)= -12+24-9=3. Tangent: y-6=3(x-2) → y=3x",
//         'q7-5': "Angle with x-axis: θ = arctan(m) = arctan(3) ≈ 71.57°",
//
//         'q8-2': "Area = (x+8)(432/x + 6) = 432 + 6x + 3456/x + 48 = 480 + 6x + 3456/x. Derivative: 6 - 3456/x² = 0 → x²=576 → x=24",
//
//         'q9-1-1': "P(A and B) = P(A)×P(B) = (1/3)×(3/4)=1/4=0.25",
//         'q9-1-2': "P(at least one) = 1 - P(none) = 1 - (2/3)×(1/4)=1 - 2/12=5/6≈0.833",
//         'q9-2-2': "P(not below 0°C) = 1 - P(below 0°C) = 1 - [0.05×0.72 + 0.95×0.35] = 1 - [0.036 + 0.3325] = 1 - 0.3685 = 0.6315",
//         'q9-3-1': "10! = 3,628,800",
//         'q9-3-2': "Total arrangements: 10!. Arrangements with 5 between youngest: 2×8!×6. Probability = (2×8!×6)/10! = 12/(9×10)=12/90=2/15≈0.133"
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
//         const percentage = ((correct / total) * 100).toFixed(2);
//         return { correct, total, percentage };
//     };
//
//     const submitAnswers = () => {
//         const scoreData = calculateScore();
//         setScore(scoreData);
//         setShowResults(true);
//     };
//
//     // Reset the exam for another attempt
//     const handleRetry = () => {
//         setAnswers({});
//         setScore(null);
//         setShowResults(false);
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
//                     className={`input ${isWide ? 'wide-input' : ''} ${isCorrect ? 'correct-answer' : ''} ${isIncorrect ? 'incorrect-answer' : ''}`}
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
//     const renderCoordinateInputs = (xId, yId, placeholderX, placeholderY) => (
//         <div className="input-group">
//             {renderInput(xId, placeholderX)}
//             <span>,</span>
//             {renderInput(yId, placeholderY)}
//         </div>
//     );
//
//     // Render paired inputs (e.g., "or" inputs)
//     const renderPairedInputs = (id1, id2, placeholder1, placeholder2) => (
//         <div className="input-group paired-inputs">
//             {renderInput(id1, placeholder1)}
//             <span className="or-divider">or</span>
//             {renderInput(id2, placeholder2)}
//         </div>
//     );
//
//     let p;
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
//                             onClick={() => setSolutionModal({open: false, questionId: null, content: ""})}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             <h1>MATHEMATICS P1 - NOVEMBER 2023</h1>
//
//             {/* QUESTION 1 */}
//             <div className="question-section">
//                 <h2>QUESTION 1</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>1.1 Solve for <i>x</i>:</p>
//
//                         <div className="sub-question">
//                             <p>1.1.1 <span className="equation">x² + x - 12 = 0</span></p>
//                             {renderPairedInputs(
//                                 'q1-1-1',
//                                 'q1-1-1b',
//                                 'x = 3',
//                                 'x = -4'
//                             )}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.1.2 <span className="equation">3x² - 2x = 6</span> (answers correct to TWO decimal
//                                 places)</p>
//                             {renderPairedInputs(
//                                 'q1-1-2a',
//                                 'q1-1-2b',
//                                 'x = 1.79',
//                                 'x = -1.12'
//                             )}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.1.3 <span className="equation">√(2x+1) = x-1</span></p>
//                             {renderInput('q1-1-3', 'x = 4')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.1.4 <span className="equation">x² - 3 > 2x</span></p>
//                             {renderPairedInputs(
//                                 'q1-1-4',
//                                 'q1-1-4b',
//                                 'x < -1',
//                                 'x > 3'
//                             )}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.2 Solve for <i>x</i> and <i>y</i> simultaneously:</p>
//                         <p><span className="equation">x + 2 = 2y</span> and <span
//                             className="equation">1/x + 1/y = 1</span></p>
//                         <label>First Solution:</label>
//                         {renderCoordinateInputs(
//                             'q1-2a-x',
//                             'q1-2a-y',
//                             'x = 2',
//                             'y = 2'
//                         )}
//                         <label>Second Solution:</label>
//                         {renderCoordinateInputs(
//                             'q1-2b-x',
//                             'q1-2b-y',
//                             'x = -1',
//                             'y = 0.5'
//                         )}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.3 Given: <span className="equation">2^(n+1) + 2^n = 3^(n+2) - 3^n</span> where m and n are
//                             integers.</p>
//                         <p>Determine the value of m + n.</p>
//                         {renderInput('q1-3', '3')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 2 */}
//             <div className="question-section">
//                 <h2>QUESTION 2</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>2.1 Given the arithmetic series: <span className="equation">7 + 12 + 17 + ...</span></p>
//
//                         <div className="sub-question">
//                             <p>2.1.1 Determine the value of T₉</p>
//                             {renderInput('q2-1-1', '47')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.1.2 Calculate S₉</p>
//                             {renderInput('q2-1-2', '243')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.1.3 Calculate the value of n for which Tₙ = 517</p>
//                             {renderInput('q2-1-3', '103')}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.2 The following information is given about a quadratic number pattern:</p>
//                         <p><span className="equation">T₁ = 3, T₂ - T₁ = 9</span> and <span className="equation">T₃ - T₂ = 21</span>
//                         </p>
//
//                         <div className="sub-question">
//                             <p>2.2.1 Show that T₅ = 111</p>
//                             {renderInput('q2-2-1', 'T₅ = 111')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.2.3 Show that the pattern is increasing for all n ∈ N.</p>
//                             {renderInput('q2-2-3', 'First differences positive')}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 3 */}
//             <div className="question-section">
//                 <h2>QUESTION 3</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>3.1 Given the geometric series: <span className="equation">3 + 6 + 12 + ...</span> to n
//                             terms.</p>
//
//                         <div className="sub-question">
//                             <p>3.1.1 Write down the general term of this series.</p>
//                             {renderInput('q3-1-1', 'Tₙ = 3×2^(n-1)', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.1.2 Calculate the value of k such that: <span className="equation">∑_{p = 1}^k (3/2)(2)^p = 98 301</span>
//                             </p>
//                             {renderInput('q3-1-2', '15')}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.2 A geometric sequence and an arithmetic sequence have the same first term.</p>
//                         <p>- The common ratio of the geometric sequence is 1/3</p>
//                         <p>- The common difference of the arithmetic sequence is 3</p>
//                         <p>- The sum of 22 terms of the arithmetic sequence is 734 more than the sum to infinity of the
//                             geometric sequence.</p>
//                         <p>Calculate the value of the first term.</p>
//                         {renderInput('q3-2', '2')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Continue with the remaining questions in a similar fashion */}
//             // Continue from where the code left off...
//
//             {/* QUESTION 4 */}
//             <div className="question-section">
//                 <h2>QUESTION 4</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>4.1 Write down the equation of the asymptote of f.</p>
//                         {renderInput('q4-1', 'y = -4')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.2 Determine the coordinates of B.</p>
//                         {renderInput('q4-2', '(2, 0)')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.3 Determine the equation of k, a straight line passing through A and B.</p>
//                         {renderInput('q4-3', 'y = 1.5x - 3', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.4 Calculate the vertical distance between k and f at x = 1.</p>
//                         {renderInput('q4-4', '0.5 units')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.5 Write down the equation of g if g(x) = f(x) + 4.</p>
//                         {renderInput('q4-5', 'g(x) = 2^x')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.6 Write down the domain of g⁻¹.</p>
//                         {renderInput('q4-6', 'x > 0')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.7 Write down the equation of g⁻¹ in the form y = ...</p>
//                         {renderInput('q4-7', 'y = log₂x', true)}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 5 */}
//             <div className="question-section">
//                 <h2>QUESTION 5</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>5.1.1 Calculate the value of r.</p>
//                         {renderInput('q5-1', '6.5%')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.1.2 Calculate the effective interest rate.</p>
//                         {renderInput('q5-2', '6.7%')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.2.1 After how many years will the laptop have a value of R0?</p>
//                         {renderInput('q5-3-1', '5 years')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.2.2 Calculate Kuda's monthly deposit.</p>
//                         {renderInput('q5-3-2', 'R230.50')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.3 How many withdrawals of R20,000 will Tino be able to make?</p>
//                         {renderInput('q5-4', '96 months')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 6 */}
//             <div className="question-section">
//                 <h2>QUESTION 6</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>6.1 Determine f'(x) from first principles if f(x) = -4x²</p>
//                         {renderInput('q6-1', '-8x')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.2.1 f'(x) if f(x) = 2x³ - 3x</p>
//                         {renderInput('q6-2-1', '6x² - 3')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.2.2 Dₓ(7∛x² + 2x⁻⁵)</p>
//                         {renderInput('q6-2-2', '(14/3)x^(-1/3) - 10x^(-6)', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.3 For which values of x will the tangent to f(x) = -2x³ + 8x have a positive gradient?</p>
//                         {renderInput('q6-3', '-1.15 < x < 1.15', true)}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 7 */}
//             <div className="question-section">
//                 <h2>QUESTION 7</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>7.1 Determine the coordinates of the turning points of f.</p>
//                         {renderInput('q7-1', '(1, 0) and (3, 4)')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.3 Use the graph to determine the value(s) of k for which -x³ + 6x² - 9x + 4 = k will have
//                             three real and unequal roots.</p>
//                         {renderInput('q7-3', '0 < k < 4')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.4 Determine the equation of the tangent g at the point of inflection of f.</p>
//                         {renderInput('q7-4', 'y = 3x - 5', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>7.5 Calculate the value of θ, the acute angle formed between g and the x-axis.</p>
//                         {renderInput('q7-5', '71.57°')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 8 */}
//             <div className="question-section">
//                 <h2>QUESTION 8</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>8.2 Determine the value of x such that the total area of the page is a minimum.</p>
//                         {renderInput('q8-2', 'x = 24 cm')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 9 */}
//             <div className="question-section">
//                 <h2>QUESTION 9</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>9.1.1 P(A and B)</p>
//                         {renderInput('q9-1-1', '0.25')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.1.2 P(at least ONE event occurs)</p>
//                         {renderInput('q9-1-2', '0.92')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.2.2 Calculate the probability that the temperature will NOT drop below 0°C.</p>
//                         {renderInput('q9-2-2', '0.66')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.3.1 In how many different ways can the ten learners stand in the line?</p>
//                         {renderInput('q9-3-1', '3,628,800')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.3.2 Calculate the probability that there will be 5 learners between the 2 youngest
//                             learners.</p>
//                         {renderInput('q9-3-2', '0.13')}
//                     </div>
//                 </div>
//             </div>
//
//             <div className="submission-section">
//                 <button
//                     className="submit-button"
//                     onClick={submitAnswers}
//                     disabled={showResults}
//                 >
//                     Submit Answers
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
//                         {/* Add Retry and Exit buttons */}
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
//                     box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//                 }
//
//                 h1 {
//                     font-size: 24px;
//                     color: #2c3e50;
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }
//
//                 h2 {
//                     font-size: 20px;
//                     color: #2c3e50;
//                     margin-bottom: 15px;
//                 }
//
//                 .question-section {
//                     margin-bottom: 20px;
//                     padding: 15px;
//                     background-color: white;
//                     border-radius: 8px;
//                     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//                 }
//
//                 .question {
//                     padding: 10px;
//                 }
//
//                 .sub-question {
//                     margin: 10px 0;
//                 }
//
//                 .equation {
//                     font-family: 'Times New Roman', serif;
//                     font-style: italic;
//                 }
//
//                 .input-container {
//                     margin-bottom: 10px;
//                 }
//
//                 .input {
//                     padding: 8px;
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                     font-size: 14px;
//                     width: 200px;
//                 }
//
//                 .wide-input {
//                     width: 400px;
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
//                 .input-group {
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                     margin: 10px 0;
//                 }
//
//                 .paired-inputs {
//                     flex-direction: column;
//                     align-items: flex-start;
//                 }
//
//                 .or-divider {
//                     font-size: 14px;
//                     color: #555;
//                 }
//
//                 .solution-buttons {
//                     display: flex;
//                     gap: 10px;
//                     margin-top: 5px;
//                 }
//
//                 .solution-button {
//                     padding: 5px 10px;
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     cursor: pointer;
//                 }
//
//                 .solution-button:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .revealed-answer {
//                     margin-top: 5px;
//                     padding: 8px;
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
//                     background-color: rgba(0, 0, 0, 0.7);
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     z-index: 1000;
//                 }
//
//                 .modal-content {
//                     background-color: white;
//                     padding: 20px;
//                     border-radius: 8px;
//                     max-width: 500px;
//                     width: 100%;
//                     max-height: 80vh;
//                     overflow-y: auto;
//                 }
//
//                 .modal-content h3 {
//                     margin-top: 0;
//                     color: #2c3e50;
//                 }
//
//                 .modal-close {
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     padding: 8px 16px;
//                     border-radius: 4px;
//                     cursor: pointer;
//                     margin-top: 10px;
//                 }
//
//                 .modal-close:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .submit-button {
//                     background-color: #2196F3;
//                     color: white;
//                     padding: 10px 20px;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 16px;
//                     cursor: pointer;
//                     margin: 20px auto;
//                     display: block;
//                 }
//
//                 .submit-button:hover {
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
//                     padding: 15px;
//                     border-radius: 8px;
//                     background-color: #f9f9f9;
//                     border: 1px solid #ddd;
//                     text-align: center;
//                 }
//
//                 .score-display h3 {
//                     margin: 0 0 10px;
//                 }
//
//                 .pass {
//                     color: #4CAF50;
//                     font-weight: bold;
//                 }
//
//                 .fail {
//                     color: #f44336;
//                     font-weight: bold;
//                 }
//
//                 .action-buttons {
//                     display: flex;
//                     justify-content: center;
//                     gap: 10px;
//                     margin-top: 15px;
//                 }
//
//                 .retry-button, .exit-button {
//                     padding: 8px 16px;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: 14px;
//                     cursor: pointer;
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
//             `}</style>
//         </div>
//     );
// };
//
// export default MathematicsP1Nov2023Eng;