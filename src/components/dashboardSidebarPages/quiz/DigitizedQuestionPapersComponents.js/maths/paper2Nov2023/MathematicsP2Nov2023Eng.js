// import React, { useState } from "react";
// import { API_BASE_URL, getAuthHeaders } from '../../../../../../utils/api';
// import { useNavigate } from 'react-router-dom';
// // import q1_1 from './q1-1.png';
// // import q1_5 from './q1-5.png';
// // import q2 from './q2.png';
// // import q3 from './q3.png';
// // import q4 from './q4.png';
// // import q6 from './q6.png';
// // import q7 from './q7.png';
// // import q8_1 from './q8-1.png';
// // import q8_2 from './q8-2.png';
// // import q8_3 from './q8-3.png';
// // import q9 from './q9.png';
// // import q10 from './q10.png';
//
// const MathematicsP2Nov2023Eng = ({ paperId }) => {
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
//     // Answer key for Mathematics P2 November 2023
//     const answerKey = {
//         // Question 1
//         'q1-1': ["y = 0.18x - 11.6", "y = 0.18x - 11.60"],
//         'q1-2': ["87.4", "87.40"],
//         'q1-3': ["0.96"],
//         'q1-4': ["Strong positive correlation"],
//         'q1-5-1': ["150"],
//         'q1-5-2': ["53.54"],
//         'q1-5-3': ["2"],
//
//         // Question 2
//         'q2-1-0-2': ["5"],
//         'q2-1-2-4': ["20"],
//         'q2-1-4-6': ["33"],
//         'q2-1-6-8': ["38"],
//         'q2-1-8-10': ["40"],
//         'q2-2': ["40"],
//         'q2-3': ["33"],
//         'q2-4': ["10"],
//
//         // Question 3
//         'q3-1': ["4√5"],
//         'q3-2': ["4/3", "1.33"],
//         'q3-3': ["53.13°", "53.13"],
//         'q3-4': ["36.87°", "36.87"],
//         'q3-5': ["y = (4/3)x + 19/3", "y = 1.33x + 6.33"],
//         'q3-6': ["20"],
//         'q3-7': ["(1, 1)"],
//         'q3-8': ["90°", "90"],
//
//         // Question 4
//         'q4-1': ["4"],
//         'q4-2': ["(8, 6)"],
//         'q4-3': ["y = -2x + 6"],
//         'q4-4': ["10"],
//         'q4-5': ["x² + y² - 20x + 64 = 0"],
//         'q4-6': ["6", "-14"],
//
//         // Question 5
//         'q5-1-1': ["-2√2/3", "-0.94"],
//         'q5-1-2': ["4√2/9", "0.63"],
//         'q5-1-3': ["-2√2/3", "-0.94"],
//         'q5-2-2': ["270°"],
//         'q5-2-3': ["2"],
//         'q5-3-2': ["x = 21° + 180°k or x = 69° + 180°k", "x = 21 + 180k or x = 69 + 180k"],
//         'q5-4': ["tan x", "tan(x)"],
//
//         // Question 6
//         'q6-1': ["180°", "180"],
//         'q6-2': ["[-1, 0.71]", "-1 ≤ y ≤ 0.71"],
//         'q6-3-1': ["0° < x < 90° or 135° < x < 180°", "0 < x < 90 or 135 < x < 180"],
//         'q6-3-2': ["150° ≤ x ≤ 180°", "150 ≤ x ≤ 180"],
//         'q6-4': ["15°", "75°", "135°", "15, 75, 135"],
//         'q6-5': ["y = -cos x", "y = -cos(x)"],
//
//         // Question 7
//         'q7-1': ["2q/(p sin α)"],
//         'q7-2': ["(2q tan β)/(p sin α)"],
//         'q7-3': ["30°", "30"],
//
//         // Question 8
//         'q8-2': ["16°", "16"],
//         'q8-3-1': ["90°", "90"],
//         'q8-3-2': ["10√3", "17.32"],
//
//         // Question 9
//         'q9-1': ["9"],
//         'q9-3': ["6"],
//     };
//
//     // Solutions for each question
//     const solutions = {
//         'q1-1': "Using the least squares regression formula with the given data points, the equation is y = 0.18x - 11.6",
//         'q1-2': "Substitute x = 550 into the regression equation: y = 0.18(550) - 11.6 = 87.4 minutes",
//         'q1-3': "Using the correlation coefficient formula with the given data, r = 0.96",
//         'q1-4': "A correlation coefficient of 0.96 indicates a strong positive relationship between distance traveled and rest time",
//         'q1-5-1': "Mean = (100+150+130+200+50+180+200+190)/8 = 150",
//         'q1-5-2': "Standard deviation = 53.54 (calculated using standard deviation formula)",
//         'q1-5-3': "One standard deviation below mean = 150 - 53.54 = 96.46. Two values below this: 100 and 50",
//
//         // Additional solutions would be added here for other questions
//         'q2-4': "Let k be the number of absent teachers. New mean = (40*current_mean + (k/2)*1 + (k/2)*5)/(40+k) = 4. Solving gives k = 10",
//
//         'q3-1': "Distance formula: SL = √[(4 - (-4))² + (5 - 1)²] = √(64 + 16) = √80 = 4√5",
//         'q3-2': "Gradient of SN = (5 - (-3))/(4 - (-2)) = 8/6 = 4/3",
//         'q3-3': "Angle of inclination θ = arctan(4/3) = 53.13°",
//         'q3-4': "Since SLN = 90°, and using trigonometry, LNS = arctan(LS/LN) = 36.87°",
//         'q3-5': "Parallel to SN so gradient = 4/3. Through L(-4,1): y - 1 = (4/3)(x + 4) → y = (4/3)x + 19/3",
//         'q3-6': "Area = 1/2 * base * height = 1/2 * LN * LS = 1/2 * √80 * √20 = 1/2 * √1600 = 1/2 * 40 = 20",
//         'q3-7': "Circumcenter is equidistant from L, S, N. Solving equations gives P(1,1)",
//         'q3-8': "Since P is circumcenter, and angle at the center is twice the angle at circumference, LPS = 2 * LNS = 90°",
//
//         // Continue with solutions for other questions as needed
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
//             <h1>MATHEMATICS P2 - NOVEMBER 2023</h1>
//
//             {/* QUESTION 1 */}
//             <div className="question-section">
//                 <h2>QUESTION 1</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>Truck drivers travel a certain distance and have a rest before travelling further. A driver kept record of the distance he travelled (in km) on 8 trips and the amount of time he rested (in minutes) before he continued his journey.</p>
//
//                         <div className="sub-question">
//                             <p>1.1 Determine the equation of the least squares regression line for the data.</p>
//                             {renderInput('q1-1', 'y = ...', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.2 If a truck driver travelled 550 km, predict the amount of time (in minutes) that he should rest before continuing his journey.</p>
//                             {renderInput('q1-2', 'Time in minutes')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.3 Write down the correlation coefficient for the data.</p>
//                             {renderInput('q1-3', 'Correlation coefficient')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.4 Interpret your answer to QUESTION 1.3.</p>
//                             {renderInput('q1-4', 'Interpretation')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>1.5 At each stop, the truck driver spent money buying food and other refreshments.</p>
//
//                             <div className="sub-question">
//                                 <p>1.5.1 Calculate the mean amount of money he spent at each stop.</p>
//                                 {renderInput('q1-5-1', 'Mean amount')}
//                             </div>
//
//                             <div className="sub-question">
//                                 <p>1.5.2 Calculate the standard deviation for the data.</p>
//                                 {renderInput('q1-5-2', 'Standard deviation')}
//                             </div>
//
//                             <div className="sub-question">
//                                 <p>1.5.3 At how many stops did the driver spend an amount that was less than one standard deviation below the mean?</p>
//                                 {renderInput('q1-5-3', 'Number of stops')}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 2 */}
//             <div className="question-section">
//                 <h2>QUESTION 2</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>At a certain school, the staff committee wanted to determine how many glasses of water the staff members drank during a school day.</p>
//
//                         <div className="sub-question">
//                             <p>2.1 Complete the cumulative frequency column:</p>
//                             <table>
//                                 <thead>
//                                 <tr>
//                                     <th>Number of Glasses</th>
//                                     <th>Frequency</th>
//                                     <th>Cumulative Frequency</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 <tr>
//                                     <td>0 ≤ x &lt; 2</td>
//                                     <td>5</td>
//                                     <td>{renderInput('q2-1-0-2', 'Cumulative')}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>2 ≤ x &lt; 4</td>
//                                     <td>15</td>
//                                     <td>{renderInput('q2-1-2-4', 'Cumulative')}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>4 ≤ x &lt; 6</td>
//                                     <td>13</td>
//                                     <td>{renderInput('q2-1-4-6', 'Cumulative')}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>6 ≤ x &lt; 8</td>
//                                     <td>5</td>
//                                     <td>{renderInput('q2-1-6-8', 'Cumulative')}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>8 ≤ x &lt; 10</td>
//                                     <td>2</td>
//                                     <td>{renderInput('q2-1-8-10', 'Cumulative')}</td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.2 How many staff members were interviewed?</p>
//                             {renderInput('q2-2', 'Number of staff')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.3 How many staff members drank fewer than 6 glasses of water during a school day?</p>
//                             {renderInput('q2-3', 'Number of staff')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>2.4 How many teachers were absent on the day of the interviews?</p>
//                             {renderInput('q2-4', 'Number absent')}
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
//                         <p>In the figure, L(-4; 1), S(4; 5) and N(-2; -3) are the vertices of a triangle having SLN = 90°. LN intersects the x-axis at K.</p>
//
//                         <div className="sub-question">
//                             <p>3.1 Calculate the length of SL. Leave your answer in surf form.</p>
//                             {renderInput('q3-1', 'Length of SL')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.2 Calculate the gradient of SN.</p>
//                             {renderInput('q3-2', 'Gradient')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.3 Calculate the size of θ, the angle of inclination of SN.</p>
//                             {renderInput('q3-3', 'Angle in degrees')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.4 Calculate the size of LNS.</p>
//                             {renderInput('q3-4', 'Angle in degrees')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.5 Determine the equation of the line which passes through L and is parallel to SN.</p>
//                             {renderInput('q3-5', 'Equation in form y = mx + c', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.6 Calculate the area of ΔLSN.</p>
//                             {renderInput('q3-6', 'Area')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.7 Calculate the coordinates of point P, which is equidistant from L, S and N.</p>
//                             {renderInput('q3-7', 'Coordinates (x, y)')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>3.8 Calculate the size of LPS.</p>
//                             {renderInput('q3-8', 'Angle in degrees')}
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
//                         <p>In the diagram, the circle with centre O has the equation x² + y² = 20. G(t; 0) is the centre of the larger circle.</p>
//
//                         <div className="sub-question">
//                             <p>4.1 Given that D(p; -2) lies on the smaller circle, show that p = 4.</p>
//                             {renderInput('q4-1', 'p value')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.2 E(6; 2) is the midpoint of DF. Determine the coordinates of F.</p>
//                             {renderInput('q4-2', 'Coordinates of F')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.3 Determine the equation of the common tangent, DF, in the form y = mx + c.</p>
//                             {renderInput('q4-3', 'Equation of tangent', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.4 Calculate the value of t.</p>
//                             {renderInput('q4-4', 't value')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.5 Determine the equation of the larger circle.</p>
//                             {renderInput('q4-5', 'Equation of circle', true)}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>4.6 The smaller circle must be translated by k units along the x-axis to touch the larger circle internally. Calculate the possible values of k.</p>
//                             {renderInput('q4-6', 'k values')}
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
//                         <p>5.1 Given: sin β = 1/3, where β ∈ (90°; 270°). Without using a calculator, determine:</p>
//
//                         <div className="sub-question">
//                             <p>5.1.1 cos β</p>
//                             {renderInput('q5-1-1', 'cos β')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>5.1.2 sin 2β</p>
//                             {renderInput('q5-1-2', 'sin 2β')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>5.1.3 cos(450° - β)</p>
//                             {renderInput('q5-1-3', 'cos(450° - β)')}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.2 Given: (cos⁴x + sin²x·cos²x)/(1 + sin x)</p>
//
//                         <div className="sub-question">
//                             <p>5.2.2 For what value(s) of x in the interval x ∈ [0°; 360°] is the expression undefined?</p>
//                             {renderInput('q5-2-2', 'x values')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>5.2.3 Write down the minimum value of the function.</p>
//                             {renderInput('q5-2-3', 'Minimum value')}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.3 Given: cos(A - B) = cos A cos B + sin A sin B</p>
//
//                         <div className="sub-question">
//                             <p>5.3.2 Determine the general solution of the equation sin 48° cos x - cos 48° sin x = cos 2x</p>
//                             {renderInput('q5-3-2', 'General solution', true)}
//                         </div>
//                     </div>
//
//                     <div className="sub-question">
//                         <p>5.4 Simplify (sin 3x + sin x)/(cos 2x + 1) to a single trigonometric ratio.</p>
//                         {renderInput('q5-4', 'Simplified form')}
//                     </div>
//                 </div>
//             </div>
//
//             {/* QUESTION 6 */}
//             <div className="question-section">
//                 <h2>QUESTION 6</h2>
//                 <div className="question">
//                     <div className="sub-question">
//                         <p>In the diagram, the graphs of f(x) = 2 sin 2x and g(x) = -cos(x + 45°) are drawn for the interval x ∈ [0°; 180°].</p>
//
//                         <div className="sub-question">
//                             <p>6.1 Write down the period of f.</p>
//                             {renderInput('q6-1', 'Period')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.2 Determine the range of g in the interval x ∈ [0°; 180°].</p>
//                             {renderInput('q6-2', 'Range')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.3 Determine the values of x, in the interval x ∈ [0°; 180°], for which:</p>
//
//                             <div className="sub-question">
//                                 <p>6.3.1 f(x)·g(x) > 0</p>
//                                 {renderInput('q6-3-1', 'x values')}
//                             </div>
//
//                             <div className="sub-question">
//                                 <p>6.3.2 f(x) + 1 ≤ 0</p>
//                                 {renderInput('q6-3-2', 'x values')}
//                             </div>
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.4 Another graph p is defined as p(x) = -f(x). D(k; -1) lies on p. Determine the value(s) of k.</p>
//                             {renderInput('q6-4', 'k values')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>6.5 Graph h is obtained when g is translated 45° to the left. Determine the equation of h.</p>
//                             {renderInput('q6-5', 'Equation of h')}
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
//                         <p>In the diagram, S, T and K lie in the same horizontal plane. RS is a vertical tower. The angle of depression from R to K is β. TSK = α, TS = p metres and the area of ΔSTK is q m².</p>
//
//                         <div className="sub-question">
//                             <p>7.1 Determine the length of SK in terms of p, q and α.</p>
//                             {renderInput('q7-1', 'SK =')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.2 Show that RS = (2q tan β)/(p sin α)</p>
//                             {renderInput('q7-2', 'RS =')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>7.3 Calculate the size of α if α + &lt; 90° and RS = 70 m, p = 80 m, q = 2500 m² and β = 42°.</p>
//                             {renderInput('q7-3', 'α =')}
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
//                         <p>8.2 In the diagram, O is the centre of the circle and ABCD is a cyclic quadrilateral. OB and OD are drawn.</p>
//                         <p>If O₁ = 4x + 100° and C = x + 34°, calculate the size of x.</p>
//                         {renderInput('q8-2', 'x =')}
//                     </div>
//
//                     <div className="sub-question">
//                         <p>8.3 In the diagram, O is the centre of the larger circle. OB is a diameter of the smaller circle.</p>
//
//                         <div className="sub-question">
//                             <p>8.3.1 Write down the size of OMB.</p>
//                             {renderInput('q8-3-1', 'Angle OMB')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>8.3.2 If AB = √300 units and OM = 5 units, calculate the length of OB.</p>
//                             {renderInput('q8-3-2', 'OB =')}
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
//                         <p>In the diagram, ABCD is a parallelogram with AB = 14 units. AD is produced to E such that AD : DE = 4 : 3. EB intersects DC in F. EB = 21 units.</p>
//
//                         <div className="sub-question">
//                             <p>9.1 Calculate the length of FB.</p>
//                             {renderInput('q9-1', 'FB =')}
//                         </div>
//
//                         <div className="sub-question">
//                             <p>9.3 Calculate the length of FC.</p>
//                             {renderInput('q9-3', 'FC =')}
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
//                     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
//                     background-color: rgba(0,0,0,0.7);
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
// export default MathematicsP2Nov2023Eng;