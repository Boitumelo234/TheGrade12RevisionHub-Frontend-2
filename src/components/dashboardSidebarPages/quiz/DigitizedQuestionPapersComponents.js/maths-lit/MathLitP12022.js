// import React, { useState, useEffect } from 'react'
// import QuestionSection from './QuestionSection'
// import ResultsSection from './ResultsSection'
// import Timer from './Timer'
// import { useTimer } from './TimerContext'
// import { paper1_2022 } from "./2022/Paper1/MathLitP1Nov2022";
//
// const  MathLitP12022 = ({ paper, onBack }) => {
//     const [currentSolution, setCurrentSolution] = useState(null)
//     const [showAnnexures, setShowAnnexures] = useState(false)
//     const [submitted, setSubmitted] = useState(false)
//     const [userAnswers, setUserAnswers] = useState({})
//     const [results, setResults] = useState(null)
//
//     const { startTimer, isTimeUp, resetTimer } = useTimer()
//
//     //const paperData = getPaperData(paper.year, paper.paper)
//
//     // Start timer when paper loads
//     useEffect(() => {
//         if (paperData && !submitted) {
//             startTimer()
//         }
//     }, [paperData, submitted])
//
//     // Auto-submit when time is up
//     useEffect(() => {
//         if (isTimeUp && !submitted) {
//             handleAutoSubmit()
//         }
//     }, [isTimeUp, submitted])
//
//     const showSolution = (questionNumber, solution) => {
//         setCurrentSolution({ questionNumber, solution })
//     }
//
//     const closeSolution = () => {
//         setCurrentSolution(null)
//     }
//
//     const handleAnswerChange = (questionNumber, answer) => {
//         setUserAnswers(prev => ({
//             ...prev,
//             [questionNumber]: answer
//         }))
//     }
//
//     const handleSubmit = () => {
//         const gradingResults = gradePaper(userAnswers, paperData)
//         setResults(gradingResults)
//         setSubmitted(true)
//         resetTimer() // Stop the timer
//     }
//
//     const handleAutoSubmit = () => {
//         if (!submitted) {
//             const gradingResults = gradePaper(userAnswers, paperData)
//             setResults(gradingResults)
//             setSubmitted(true)
//         }
//     }
//
//     const gradePaper = (answers, paperData) => {
//         let totalMarks = 0
//         let obtainedMarks = 0
//         const questionResults = {}
//
//         paperData.questions.forEach(section => {
//             section.questions.forEach(question => {
//                 if (!question.text || question.text.trim() === '') {
//                     return
//                 }
//
//                 const userAnswer = answers[question.number] || ''
//                 const isCorrect = checkAnswer(userAnswer, question.solution)
//                 const marks = extractMarks(question.solution)
//
//                 totalMarks += marks
//                 if (isCorrect) {
//                     obtainedMarks += marks
//                 }
//
//                 questionResults[question.number] = {
//                     correct: isCorrect,
//                     userAnswer,
//                     correctAnswer: extractCorrectAnswer(question.solution),
//                     marks,
//                     obtained: isCorrect ? marks : 0
//                 }
//             })
//         })
//
//         const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0
//
//         return {
//             totalMarks,
//             obtainedMarks,
//             percentage: Math.round(percentage),
//             questionResults,
//             autoSubmitted: isTimeUp
//         }
//     }
//
//     const checkAnswer = (userAnswer, solution) => {
//         if (!solution || solution === "null") return false
//
//         const correctAnswer = extractCorrectAnswer(solution)
//         return userAnswer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase()
//     }
//
//     const extractCorrectAnswer = (solution) => {
//         if (!solution || solution === "null") return ""
//
//         const match = solution.match(/^(.*?)(?:\s*\(\d+\s*marks?\))/)
//         return match ? match[1].trim() : solution.split('(')[0].trim()
//     }
//
//     const extractMarks = (solution) => {
//         if (!solution || solution === "null") return 0
//
//         const match = solution.match(/\((\d+)\s*marks?\)/)
//         return match ? parseInt(match[1]) : 1
//     }
//
//     if (!paperData) {
//         return (
//             <div>
//                 <div className="navigation">
//                     <button className="back-btn" onClick={onBack}>← Back to Papers</button>
//                     <h2>Paper not available</h2>
//                 </div>
//                 <p>This paper is not available yet.</p>
//             </div>
//         )
//     }
//
//     return (
//         <div className="question-paper">
//             {/* Timer Component */}
//             <Timer />
//
//             <div className="navigation">
//                 <button className="back-btn" onClick={onBack}>← Back to Papers</button>
//                 <h2>{paperData.title} - {paper.year}</h2>
//             </div>
//
//             <div className="exam-header">
//                 <h1>{paperData.title}</h1>
//                 <p>{paper.year} NOVEMBER - NATIONAL SENIOR CERTIFICATE</p>
//                 <p>MARKS: {paperData.marks} | TIME: {paperData.time}</p>
//                 <div className="timer-notice">
//                     ⏰ Timer: 2 hours - Auto-submits when time is up
//                 </div>
//             </div>
//
//             <div className="instructions">
//                 <h3>INSTRUCTIONS AND INFORMATION</h3>
//                 <ul>
//                     <li>This question paper consists of {paperData.questions.length} questions. Answer ALL the questions.</li>
//                     <li><strong>Time Limit:</strong> 2 hours. The paper will auto-submit when time expires.</li>
//                     {paperData.hasAnnexures && (
//                         <li>Use the ANNEXURES in the ADDENDUM where required.</li>
//                     )}
//                     <li>Number the answers correctly according to the numbering system used in this question paper.</li>
//                     <li>Show ALL calculations clearly.</li>
//                     <li>Round off ALL final answers appropriately according to the given context.</li>
//                     <li>Write neatly and legibly.</li>
//                 </ul>
//
//                 {paperData.hasAnnexures && (
//                     <div style={{textAlign: 'center', margin: '20px 0'}}>
//                         <button
//                             className="view-annexures-btn"
//                             onClick={() => setShowAnnexures(!showAnnexures)}
//                         >
//                             {showAnnexures ? 'Hide Annexures' : 'View Annexures'}
//                         </button>
//                     </div>
//                 )}
//             </div>
//
//             {showAnnexures && paperData.annexures && (
//                 <div className="annexures-section">
//                     <h2>ADDENDUM - ANNEXURES {paper.year}</h2>
//                     {paperData.annexures.map((annexure, index) => (
//                         <div key={index} className="annexure">
//                             <h3>{annexure.title}</h3>
//                             <div className="annexure-content">
//                                 <img
//                                     src={annexure.image}
//                                     alt={annexure.title}
//                                     className="annexure-image"
//                                 />
//                                 {annexure.note && <p><em>{annexure.note}</em></p>}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {submitted && results && (
//                 <ResultsSection results={results} />
//             )}
//
//             {paperData.questions.map(section => (
//                 <QuestionSection
//                     key={section.id}
//                     title={section.title}
//                     questions={section.questions}
//                     onShowSolution={showSolution}
//                     userAnswers={userAnswers}
//                     onAnswerChange={handleAnswerChange}
//                     submitted={submitted}
//                     results={results}
//                 />
//             ))}
//
//             {!submitted && !isTimeUp && (
//                 <div className="submit-section">
//                     <button
//                         className="submit-btn"
//                         onClick={handleSubmit}
//                         disabled={Object.keys(userAnswers).length === 0}
//                     >
//                         Submit Answers
//                     </button>
//                     <p className="submit-note">
//                         {Object.keys(userAnswers).length} questions answered •
//                         Auto-submits when timer reaches 00:00
//                     </p>
//                 </div>
//             )}
//
//             {currentSolution && (
//                 <div className="solution-modal">
//                     <div className="solution-content">
//                         <button className="close-btn" onClick={closeSolution}>Close</button>
//                         <h2 className="solution-header">Solution {currentSolution.questionNumber}</h2>
//                         <div className="solution-text">
//                             {currentSolution.solution.split('\n').map((line, index) => (
//                                 <p key={index}>{line}</p>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
//
// export default MathLitP12022