// import React, { useState } from "react";
//
// import { useNavigate } from 'react-router-dom';
// import {API_BASE_URL} from "../../../../../../../utils/api";
//
// const TechnicalMathematicsP1Nov2024Eng = ({ paperId }) => {
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
//     // Complete answer key for all questions
//     const answerKey = {
//         // Question 1
//         'q1-1-1': ["0", "-7/2", "0,-3.5", "0, -3.5"],
//         'q1-1-2': ["2.19", "-0.86", "2.19,-0.86", "2.19 and -0.86"],
//         'q1-1-3': ["-5≤x≤2", "[-5,2]", "-5 to 2"],
//         'q1-2': ["x=2,y=4", "x=-4,y=-2", "x=2,y=4 or x=-4,y=-2"],
//         'q1-3-1': ["CV=SV(CR-1)", "CV = SV(CR - 1)"],
//         'q1-3-2': ["408", "408cm³", "408 cm³"],
//         'q1-4': ["14"],
//         'q1-5': ["111101010", "111101010₂"],
//
//         // Question 2
//         'q2-1-1': ["3"],
//         'q2-1-2': ["p>1/7", "p > 1/7"],
//         'q2-2': ["t≥-3/4", "t ≥ -0.75", "t ≥ -3/4"],
//
//         // Question 3
//         'q3-1-1': ["81"],
//         'q3-1-2': ["4", "4.00"],
//         'q3-1-3': ["1"],
//         'q3-1-4': ["3", "3.00"],
//         'q3-2': ["-1", "-1.00"],
//         'q3-3-1': ["1-i", "1 - i"],
//         'q3-3-2': ["1+i", "1 + i"],
//         'q3-3-4': ["√2cis(-45°)", "√2cis315°", "√2cis(-45)"],
//
//         // Question 4
//         'q4-1-1': ["y=-1"],
//         'q4-1-2': ["-5≤x≤5", "[-5,5]"],
//         'q4-1-3': ["0", "(0,0)"],
//         'q4-1-4': ["0", "(0,0)"],
//         'q4-1-6': ["x≥0", "x ≥ 0", "[0,∞)"],
//         'q4-2': ["g(x)=2x²-4x-2", "g(x)=2x^2-4x-2"],
//         'q4-3-1': ["x=0,y=2"],
//         'q4-3-2': ["2"],
//         'q4-3-3': ["2"],
//         'q4-3-4': ["h(x)=4/x+2", "h(x)=4/x + 2"],
//
//         // Question 5
//         'q5-1': ["8.8%", "8.80%", "8.8"],
//         'q5-2': ["57964", "57964.00"],
//         'q5-3-1': ["65000", "65000.00"],
//         'q5-3-2': ["10", "10 years"],
//         'q5-4': ["24250.45", "24250", "R24250.45"],
//
//         // Question 6
//         'q6-1': ["9"],
//         'q6-2': ["0"],
//         'q6-3-1': ["3x+3x⁻⁴", "3x + 3x^(-4)"],
//         'q6-3-2': ["3-12x⁻⁵", "3 - 12x^(-5)"],
//         'q6-4-1': ["x^(8/5)"],
//         'q6-4-2': ["(8/5)x^(3/5)-60x¹¹", "(8/5)x^(3/5) - 60x^11"],
//         'q6-5-1': ["-3x²+12x"],
//         'q6-5-2': ["-36"],
//         'q6-5-3': ["(4,32)", "4,32"],
//
//         // Question 7
//         'q7-1': ["60"],
//         'q7-2': ["A(-6,0)", "C(10,0)", "A(-6,0), C(10,0)"],
//         'q7-3': ["(2,-64)"],
//         'q7-4-1': ["-6≤x≤0", "[-6,0]"],
//         'q7-4-2': ["x<-2,x>2", "x<-2 or x>2"],
//
//         // Question 8
//         'q8-1': ["10000", "10000.00"],
//         'q8-2': ["-60x²+6000"],
//         'q8-3': ["59000", "59000.00"],
//
//         // Question 9
//         'q9-1-1': ["6x+C"],
//         'q9-1-2': ["x³+x²-8x+C"],
//         'q9-2-1': ["2^x/ln2 + C"],
//         'q9-2-2': ["valid", "yes", "true"]
//     };
//
//     // Solutions for each question
//     const solutions = {
//         'q1-1-1': "x(2x+7)=0 → x=0 or 2x+7=0 → x=0 or x=-7/2",
//         'q1-1-2': "3x²+x=6+5x → 3x²-4x-6=0 → x=[4±√(16+72)]/6 = [4±√88]/6 = [4±2√22]/6 ≈ 2.19 or -0.86",
//         'q1-1-3': "x²+3x-10≤0 → (x+5)(x-2)≤0 → -5≤x≤2",
//         'q1-2': "y=x+2, substitute: x²+(x+2)²=20 → x²+x²+4x+4=20 → 2x²+4x-16=0 → x²+2x-8=0 → (x+4)(x-2)=0 → x=-4,y=-2 or x=2,y=4",
//         'q1-3-1': "CR=(CV+SV)/SV → CR·SV=CV+SV → CV=CR·SV-SV → CV=SV(CR-1)",
//         'q1-3-2': "CV=48(9.5-1)=48×8.5=408 cm³",
//         'q1-4': "1110₂ = 1×2³ + 1×2² + 1×2¹ + 0×2⁰ = 8+4+2+0=14",
//         'q1-5': "1110₂=14, 14×35=490, 490 in binary: 490÷2=245R0, 245÷2=122R1, 122÷2=61R0, 61÷2=30R1, 30÷2=15R0, 15÷2=7R1, 7÷2=3R1, 3÷2=1R1, 1÷2=0R1 → 111101010₂",
//
//         'q2-1-1': "Undefined when denominator=0: 3-p=0 → p=3",
//         'q2-1-2': "Non-real when discriminant<0: 1-7p<0 → 7p>1 → p>1/7",
//         'q2-2': "3(x+1)=x²+t → 3x+3=x²+t → x²-3x+(t-3)=0. Real roots when discriminant≥0: 9-4(t-3)≥0 → 9-4t+12≥0 → 21≥4t → t≤21/4",
//
//         'q3-1-1': "27/3=9, 9²=81",
//         'q3-1-2': "(1+√3)²-√12 = 1+2√3+3-2√3 = 4",
//         'q3-1-3': "log_p p = 1",
//         'q3-1-4': "log₃81 - log₂sin30° - log₅√5 = 4 - log₂(1/2) - log₅(5^(1/2)) = 4 - (-1) - 1/2 = 4+1-0.5=4.5",
//         'q3-2': "5^(x+2)-5^x=24/5 → 25·5^x-5^x=24/5 → 24·5^x=24/5 → 5^x=1/5 → x=-1",
//         'q3-3-1': "z₂=2-2i, z₁=½z₂=1-i",
//         'q3-3-2': "Conjugate of 1-i is 1+i",
//         'q3-3-4': "r=√(1²+(-1)²)=√2, θ=arctan(-1/1)=-45° → z₁=√2cis(-45°)",
//
//         'q4-1-1': "As x→-∞, 3^x→0, so f(x)→-1. Horizontal asymptote: y=-1",
//         'q4-1-2': "h(x)=√(25-x²) defined when 25-x²≥0 → -5≤x≤5",
//         'q4-1-3': "f(x)=0 → 3^x-1=0 → 3^x=1 → x=0",
//         'q4-1-4': "f(0)=3^0-1=1-1=0",
//         'q4-1-6': "f(x)×h(x)≤0 when either f(x)≤0 and h(x)≥0 or f(x)≥0 and h(x)≤0. From graph: x≥0",
//         'q4-2': "g(x)=a(x-1)²-4, through (3,4): 4=a(3-1)²-4 → 4=4a-4 → a=2 → g(x)=2(x-1)²-4=2x²-4x-2",
//         'q4-3-1': "Vertical asymptote: x=0, Horizontal asymptote: y=2",
//         'q4-3-2': "A(k,4) on p(x)=x+2 → 4=k+2 → k=2",
//         'q4-3-3': "B has x-coordinate k=2",
//         'q4-3-4': "h(x)=a/x+2, through (2,4): 4=a/2+2 → a=4 → h(x)=4/x+2",
//
//         'q5-1': "i_eff=(1+i/m)^m-1 → 0.091=(1+i/4)^4-1 → 1.091=(1+i/4)^4 → i/4=1.091^(1/4)-1≈0.022 → i≈0.088=8.8%",
//         'q5-2': "A=50000(1+0.03)^5≈57964",
//         'q5-3-1': "25% of 260000=65000",
//         'q5-3-2': "260000(1-0.14)^n=65000 → 0.86^n=0.25 → n=log(0.25)/log(0.86)≈10 years",
//         'q5-4': "First 18 months: A=20000(1+0.10/12)^18≈23194. Next 18 months: A=23194(1+0.08/4)^6≈27850.45. After withdrawal: 27850.45-3000=24850.45. Last year: 24850.45(1+0.08/4)^4≈26920.63",
//
//         'q6-1': "f'(x)=lim(h→0)[(9(x+h)-6-(9x-6))/h]=lim(h→0)[9h/h]=9",
//         'q6-2': "f(x)=11π² (constant) → f'(x)=0",
//         'q6-3-1': "y=x(3+3/x⁵)=3x+3x⁻⁴",
//         'q6-3-2': "dy/dx=3-12x⁻⁵",
//         'q6-4-1': "⁵√(x⁸)=x^(8/5)",
//         'q6-4-2': "d/dx[x^(8/5)-5x¹²]=(8/5)x^(3/5)-60x¹¹",
//         'q6-5-1': "g'(x)=-3x²+12x",
//         'q6-5-2': "g'(-2)=-3(4)+12(-2)=-12-24=-36",
//         'q6-5-3': "g'(x)=-36 → -3x²+12x=-36 → -3x²+12x+36=0 → x²-4x-12=0 → (x-6)(x+2)=0 → x=6 or x=-2. x=-2 already known, so x=6, g(6)=-216+216=0 → point (6,0)",
//
//         'q7-1': "OD is y-intercept: f(0)=60",
//         'q7-2': "f(x)=0 → (x³+2x²-32x-60)/(x-6)=0 → x³+2x²-32x-60=0 → (x+6)(x-2)(x-5)=0 → x=-6,2,5 but x≠6 → A(-6,0), C(10,0)",
//         'q7-3': "G is maximum turning point. f'(x)=0 → solve for x, find maximum",
//         'q7-4-1': "f(x)≥0 when x<0: from graph, -6≤x≤0",
//         'q7-4-2': "f decreasing when f'(x)<0: from graph, x<-2 or x>2",
//
//         'q8-1': "P(0)=-10000 → loss of R10000",
//         'q8-2': "P'(x)=-60x²+6000",
//         'q8-3': "P'(x)=0 → -60x²+6000=0 → x²=100 → x=10 (positive). P(10)=-20000+60000-10000=30000",
//
//         'q9-1-1': "∫6 dx=6x+C",
//         'q9-1-2': "∫(3x-4)(x+2)dx=∫(3x²+2x-8)dx=x³+x²-8x+C",
//         'q9-2-1': "∫2^x dx=2^x/ln2 + C",
//         'q9-2-2': "A=∫[-2,0]2^x dx=[2^x/ln2](-2,0)=(1-1/4)/ln2=0.75/ln2≈1.082. B=∫[2,3]2^x dx=(8-4)/ln2=4/ln2≈5.77. B/A≈5.33≠4, so claim invalid"
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
//             // const API_BASE_URL = 'http://localhost:6262/api';
//             // const response = await fetch(`${API_BASE_URL}/user/record`, {
//             //     method: 'POST',
//             //     headers: {
//             //         // ...getAuthHeaders(),
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify({
//             //         paperId: paperId,
//             //         score: scoreData.percentage,
//             //         maxScore: scoreData.total
//             //     })
//             // });
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
//         const percentage = ((correct / total) * 100).toFixed(2);
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
//     const renderInput = (questionId, placeholder, isWide = false, isFile = false) => {
//         const value = answers[questionId] || '';
//         const revealedAnswer = revealedAnswers[questionId];
//
//         if (isFile) {
//             return (
//                 <input
//                     type="file"
//                     accept="image/*,application/pdf"
//                     disabled={showResults}
//                     className="file-input"
//                 />
//             );
//         }
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
//
//             <h1>TECHNICAL MATHEMATICS P1 - NOVEMBER 2024</h1>
//
//             {/* QUESTION 1 */}
//             <div className="question-section">
//                 <h2>QUESTION 1</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>1.1 Solve for x:</p>
//
//                         <div className="sub-question">
//                             <p>1.1.1 x(2x + 7) = 0</p>
//                             {renderInput('q1-1-1', 'x values (e.g., 0, -3.5)', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.1.2 3x² + x = 6 + 5x (correct to TWO decimal places)</p>
//                             {renderInput('q1-1-2', 'x values (e.g., 2.19, -0.86)', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.1.3 x² + 3x - 10 ≤ 0</p>
//                             {renderInput('q1-1-3', 'Inequality (e.g., -5≤x≤2)', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.2 Solve for x and y if: y - x = 2 and x² + y² = 20</p>
//                         {renderInput('q1-2', 'Solution pairs (e.g., x=2,y=4)', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.3 Compression ratio formula: CR = (CV + SV)/SV</p>
//
//                         <div className="sub-question">
//                             <p>1.3.1 Make CV the subject of the formula</p>
//                             {renderInput('q1-3-1', 'Formula for CV', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.3.2 Calculate CV if SV = 48 cm³ and CR = 9.5:1</p>
//                             {renderInput('q1-3-2', 'CV value with units', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.4 Express 1110₂ as a decimal number</p>
//                         {renderInput('q1-4', 'Decimal number', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>1.5 Evaluate 1110₂ × 35 and leave your answer as a binary number</p>
//                         {renderInput('q1-5', 'Binary number', true)}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 2 */}
//             <div className="question-section">
//                 <h2>QUESTION 2</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>Given: x = (-2 ± √(1 - 7p))/(3 - p)</p>
//
//                         <div className="sub-question">
//                             <p>2.1.1 Determine the numerical value(s) of p if x is undefined</p>
//                             {renderInput('q2-1-1', 'p value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.1.2 Determine the numerical value(s) of p if x is non-real</p>
//                             {renderInput('q2-1-2', 'p values', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>2.2 Determine the numerical value(s) of t for which the equation 3(x + 1) = x² + t will have real roots</p>
//                         {renderInput('q2-2', 't values', true)}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 3 */}
//             <div className="question-section">
//                 <h2>QUESTION 3</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>3.1 Simplify:</p>
//
//                         <div className="sub-question">
//                             <p>3.1.1 (27/3)²</p>
//                             {renderInput('q3-1-1', 'Value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.1.2 (1 + √3)² - √12</p>
//                             {renderInput('q3-1-2', 'Value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.1.3 logₚ p</p>
//                             {renderInput('q3-1-3', 'Value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.1.4 log₃81 - log₂sin30° - log₅√5</p>
//                             {renderInput('q3-1-4', 'Value', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.2 Solve for x: 5ˣ⁺² - 5ˣ = 24/5</p>
//                         {renderInput('q3-2', 'x value', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>3.3 Given complex numbers: z₁ = ½ × z₂ where z₂ = -2i + 2</p>
//
//                         <div className="sub-question">
//                             <p>3.3.1 Express z₁ in the form a + bi</p>
//                             {renderInput('q3-3-1', 'a + bi form', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.3.2 Write down the conjugate of z₁</p>
//                             {renderInput('q3-3-2', 'Conjugate', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.3.4 Express z₁ in the form r cis θ (θ in degrees)</p>
//                             {renderInput('q3-3-4', 'Polar form', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 4 */}
//             <div className="question-section">
//                 <h2>QUESTION 4</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>Given functions: f(x) = 3ˣ - 1 and h(x) = √(25 - x²)</p>
//
//                         <div className="sub-question">
//                             <p>4.1.1 Equation of the asymptote of f</p>
//                             {renderInput('q4-1-1', 'Equation', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.1.2 Domain of h</p>
//                             {renderInput('q4-1-2', 'Domain', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.1.3 x-intercept of f</p>
//                             {renderInput('q4-1-3', 'x-intercept', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.1.4 y-intercept of f</p>
//                             {renderInput('q4-1-4', 'y-intercept', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.1.6 Values of x for which f(x) × h(x) ≤ 0</p>
//                             {renderInput('q4-1-6', 'x values', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.2 Determine the equation of g in the form g(x) = ax² + bx + c</p>
//                         {renderInput('q4-2', 'Equation', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>4.3 Functions h(x) = a/x + q and p(x) = x + 2</p>
//
//                         <div className="sub-question">
//                             <p>4.3.1 Equations of the asymptotes of h</p>
//                             {renderInput('q4-3-1', 'Asymptotes', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.3.2 Numerical value of k</p>
//                             {renderInput('q4-3-2', 'k value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.3.3 x-coordinate of B</p>
//                             {renderInput('q4-3-3', 'x-coordinate', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.3.4 Defining equation of h</p>
//                             {renderInput('q4-3-4', 'Equation', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 5 */}
//             <div className="question-section">
//                 <h2>QUESTION 5</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>5.1 Annual effective interest rate = 9.1%. Calculate nominal interest rate compounded quarterly</p>
//                         {renderInput('q5-1', 'Interest rate', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.2 Population increased from 50,000 at 3% p.a. over 5 years</p>
//                         {renderInput('q5-2', 'Population', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.3 Engineering equipment cost R260,000 in 2018</p>
//
//                         <div className="sub-question">
//                             <p>5.3.1 Current value if depreciated to 25% of original</p>
//                             {renderInput('q5-3-1', 'Current value', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>5.3.2 Time to depreciate to that value at 14% p.a. reducing balance</p>
//                             {renderInput('q5-3-2', 'Time in years', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.4 R20,000 invested at 10% p.a. compounded monthly for 18 months, then 8% p.a. compounded quarterly, R3,000 withdrawn after 3 years</p>
//                         {renderInput('q5-4', 'Amount after 4 years', true)}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 6 */}
//             <div className="question-section">
//                 <h2>QUESTION 6</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>6.1 Given f(x) = 9x - 6, determine f'(x) using FIRST PRINCIPLES</p>
//                         {renderInput('q6-1', 'Derivative', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.2 Determine f'(x) if f(x) = 11π²</p>
//                         {renderInput('q6-2', 'Derivative', true)}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.3 Given: y = x(3 + 3/x⁵)</p>
//
//                         <div className="sub-question">
//                             <p>6.3.1 Simplify y</p>
//                             {renderInput('q6-3-1', 'Simplified expression', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.3.2 Determine dy/dx</p>
//                             {renderInput('q6-3-2', 'Derivative', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.4 Given: Dₓ[⁵√(x⁸) - 5x¹²]</p>
//
//                         <div className="sub-question">
//                             <p>6.4.1 Express ⁵√(x⁸) in exponential form</p>
//                             {renderInput('q6-4-1', 'Exponential form', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.4.2 Determine the derivative</p>
//                             {renderInput('q6-4-2', 'Derivative', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>6.5 Given: g(x) = -x³ + 6x²</p>
//
//                         <div className="sub-question">
//                             <p>6.5.1 Determine g'(x)</p>
//                             {renderInput('q6-5-1', 'Derivative', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.5.2 Gradient of tangent at x = -2</p>
//                             {renderInput('q6-5-2', 'Gradient', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.5.3 Coordinates of point of contact of another tangent with same gradient</p>
//                             {renderInput('q6-5-3', 'Coordinates', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 7 */}
//             <div className="question-section">
//                 <h2>QUESTION 7</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>Function f(x) = (x³ + 2x² - 32x - 60)/(x - 6)</p>
//
//                         <div className="sub-question">
//                             <p>7.1 Length of OD</p>
//                             {renderInput('q7-1', 'Length', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.2 Coordinates of points A and C</p>
//                             {renderInput('q7-2', 'Coordinates', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.3 Coordinates of point G</p>
//                             {renderInput('q7-3', 'Coordinates', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.4.1 Values of x for which f(x) &ge; 0 if x &lt; 0</p>
//                             {renderInput('q7-4-1', 'x values', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.4.2 Values of x for which f is decreasing</p>
//                             {renderInput('q7-4-2', 'x values', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 8 */}
//             <div className="question-section">
//                 <h2>QUESTION 8</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>Profit function: P(x) = -20x³ + 6000x - 10000</p>
//
//                         <div className="sub-question">
//                             <p>8.1 Loss if company closed for a week</p>
//                             {renderInput('q8-1', 'Loss amount', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>8.2 P'(x)</p>
//                             {renderInput('q8-2', 'Derivative', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>8.3 Maximum weekly profit</p>
//                             {renderInput('q8-3', 'Maximum profit', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 9 */}
//             <div className="question-section">
//                 <h2>QUESTION 9</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>9.1 Determine integrals:</p>
//
//                         <div className="sub-question">
//                             <p>9.1.1 ∫6 dx</p>
//                             {renderInput('q9-1-1', 'Integral', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>9.1.2 ∫(3x - 4)(x + 2) dx</p>
//                             {renderInput('q9-1-2', 'Integral', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>9.2 Function f(x) = 2ˣ</p>
//
//                         <div className="sub-question">
//                             <p>9.2.1 ∫2ˣ dx</p>
//                             {renderInput('q9-2-1', 'Integral', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>9.2.2 Verify if area B = 4 × area A</p>
//                             {renderInput('q9-2-2', 'Valid/Invalid', true)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
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
//             {/* CSS Styles */}
//             <style jsx>{`
//                 .math-exam {
//                     font-family: 'Arial', sans-serif;
//                     max-width: 1200px;
//                     margin: 0 auto;
//                     padding: clamp(1rem, 3vw, 1.5rem);
//                     background-color: #f9f9f9;
//                     border-radius: 10px;
//                     box-shadow: 0 0 20px rgba(0,0,0,0.1);
//                     min-height: 100vh;
//                 }
//
//                 h1 {
//                     font-size: clamp(1.5rem, 4vw, 2rem);
//                     color: #2c3e50;
//                     text-align: center;
//                     margin-bottom: clamp(1rem, 2vw, 1.5rem);
//                 }
//
//                 h2 {
//                     font-size: clamp(1.25rem, 3vw, 1.5rem);
//                     color: #2c3e50;
//                     margin-bottom: clamp(0.75rem, 2vw, 1rem);
//                 }
//
//                 .question-section {
//                     margin-bottom: clamp(1rem, 3vw, 1.5rem);
//                     padding: clamp(0.75rem, 2vw, 1rem);
//                     background-color: white;
//                     border-radius: 8px;
//                     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//                     overflow: hidden;
//                 }
//
//                 .question {
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem);
//                 }
//
//                 .sub-question {
//                     margin: clamp(0.5rem, 1.5vw, 0.75rem) 0;
//                 }
//
//                 .equation {
//                     font-family: 'Times New Roman', serif;
//                     font-style: italic;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                 }
//
//                 .input-container {
//                     margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
//                     width: 100%;
//                 }
//
//                 .input {
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem);
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                     width: 100%;
//                     box-sizing: border-box;
//                     transition: border-color 0.3s, background-color 0.3s;
//                 }
//
//                 .wide-input {
//                     max-width: 100%;
//                 }
//
//                 .file-input {
//                     width: 100%;
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem);
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
//                     flex-wrap: wrap;
//                     align-items: center;
//                     gap: clamp(0.5rem, 1.5vw, 0.75rem);
//                     margin: clamp(0.5rem, 1.5vw, 0.75rem) 0;
//                 }
//
//                 .solution-buttons {
//                     display: flex;
//                     flex-wrap: wrap;
//                     gap: clamp(0.5rem, 1.5vw, 0.75rem);
//                     margin-top: clamp(0.3rem, 1vw, 0.5rem);
//                 }
//
//                 .solution-button {
//                     padding: clamp(0.4rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.75rem);
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     border-radius: 4px;
//                     font-size: clamp(0.8rem, 2vw, 0.9rem);
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }
//
//                 .solution-button:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .revealed-answer {
//                     margin-top: clamp(0.3rem, 1vw, 0.5rem);
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem);
//                     background-color: #e9f7ef;
//                     border-left: 4px solid #28a745;
//                     border-radius: 4px;
//                     font-size: clamp(0.8rem, 2vw, 0.9rem);
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
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem);
//                 }
//
//                 .modal-content {
//                     background-color: white;
//                     padding: clamp(1rem, 3vw, 1.5rem);
//                     border-radius: 8px;
//                     max-width: clamp(300px, 90vw, 600px);
//                     width: 100%;
//                     max-height: 80vh;
//                     overflow-y: auto;
//                     box-shadow: 0 4px 20px rgba(0,0,0,0.25);
//                 }
//
//                 .modal-content h3 {
//                     margin-top: 0;
//                     color: #2c3e50;
//                     font-size: clamp(1.2rem, 3vw, 1.5rem);
//                     border-bottom: 2px solid #eee;
//                     padding-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
//                 }
//
//                 .modal-content p {
//                     line-height: 1.6;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                     white-space: pre-wrap;
//                 }
//
//                 .modal-close {
//                     background-color: #3498db;
//                     color: white;
//                     border: none;
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.25rem);
//                     border-radius: 4px;
//                     cursor: pointer;
//                     margin-top: clamp(0.75rem, 2vw, 1rem);
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                 }
//
//                 .modal-close:hover {
//                     background-color: #2980b9;
//                 }
//
//                 .submit-button {
//                     background-color: #2196F3;
//                     color: white;
//                     padding: clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem);
//                     border: none;
//                     border-radius: 4px;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                     margin: clamp(1rem, 2.5vw, 1.25rem) auto;
//                     display: block;
//                     width: clamp(150px, 40vw, 200px);
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
//                     margin-top: clamp(1rem, 2.5vw, 1.25rem);
//                     padding: clamp(0.75rem, 2vw, 1rem);
//                     border-radius: 8px;
//                     background-color: #f9f9f9;
//                     border: 1px solid #ddd;
//                     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                     text-align: center;
//                 }
//
//                 .score-display h3 {
//                     margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem);
//                     font-size: clamp(1.2rem, 3vw, 1.5rem);
//                     color: #333;
//                 }
//
//                 .pass {
//                     color: #4CAF50;
//                     font-weight: bold;
//                     margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                 }
//
//                 .fail {
//                     color: #f44336;
//                     font-weight: bold;
//                     margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                 }
//
//                 .error {
//                     color: #f44336;
//                     margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
//                     font-weight: bold;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                 }
//
//                 .action-buttons {
//                     display: flex;
//                     flex-wrap: wrap;
//                     justify-content: center;
//                     gap: clamp(0.5rem, 1.5vw, 0.75rem);
//                     margin-top: clamp(0.75rem, 2vw, 1rem);
//                 }
//
//                 .retry-button, .exit-button {
//                     padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.25rem);
//                     border: none;
//                     border-radius: 4px;
//                     font-size: clamp(0.9rem, 2.5vw, 1rem);
//                     cursor: pointer;
//                     transition: all 0.3s;
//                     font-weight: bold;
//                     width: clamp(120px, 30vw, 150px);
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
//                 /* Responsive styles */
//                 @media (max-width: 640px) {
//                     .math-exam {
//                         padding: clamp(0.5rem, 2vw, 0.75rem);
//                     }
//
//                     h1 {
//                         font-size: clamp(1.25rem, 3.5vw, 1.5rem);
//                     }
//
//                     h2 {
//                         font-size: clamp(1rem, 3vw, 1.25rem);
//                     }
//
//                     .question-section {
//                         padding: clamp(0.5rem, 1.5vw, 0.75rem);
//                     }
//
//                     .input-group {
//                         flex-direction: column;
//                         align-items: flex-start;
//                     }
//
//                     .input {
//                         font-size: clamp(0.8rem, 2.2vw, 0.9rem);
//                         padding: clamp(0.4rem, 1.2vw, 0.6rem);
//                     }
//
//                     .solution-button {
//                         font-size: clamp(0.7rem, 1.8vw, 0.8rem);
//                         padding: clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.5rem, 1.2vw, 0.6rem);
//                     }
//
//                     .submit-button {
//                         width: 100%;
//                         max-width: 100%;
//                     }
//
//                     .retry-button, .exit-button {
//                         width: 100%;
//                         max-width: 100%;
//                     }
//
//                     .modal-content {
//                         max-width: 90vw;
//                         padding: clamp(0.75rem, 2vw, 1rem);
//                     }
//
//                     .modal-content h3 {
//                         font-size: clamp(1rem, 2.5vw, 1.25rem);
//                     }
//
//                     .modal-content p {
//                         font-size: clamp(0.8rem, 2vw, 0.9rem);
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };
//
// export default TechnicalMathematicsP1Nov2024Eng;