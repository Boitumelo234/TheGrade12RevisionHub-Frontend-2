// import React, { useState, useMemo, useEffect } from "react";
// import Question from "./Question";
// import questionsData, { totalPossibleMarks } from "./2023/Paper2/PhysicalScienceP2Nov2023";
//
// export default function Physic2023 ({paperTitle, onBack }) {
//     // ----------------------------
//     // Attach section letters (if any)
//     // ----------------------------
//     const questions = questionsData;
//     const total = totalPossibleMarks(questions);
//
//     const questionsWithSection = useMemo(() => {
//         let current = null;
//         return questions.map((q) => {
//             if (q.type === "section") {
//                 // detect letter A / B / C in the section header text
//                 const match = q.text.match(/SECTION\s+([A-C])/i);
//                 if (match) current = match[1];
//                 // keep section row in the list so it renders headers/instructions
//                 return { ...q, section: null };
//             }
//             return { ...q, section: current };
//         });
//     }, [questions]);
//
//     // ----------------------------
//     // Detect if paper actually has sections
//     // If not, create a single "ALL" section containing all items
//     // ----------------------------
//     const hasSections = useMemo(
//         () => questionsWithSection.some((q) => q.type === "section"),
//         [questionsWithSection]
//     );
//
//     const sections = useMemo(() => {
//         if (!hasSections) {
//             return { ALL: questionsWithSection };
//         }
//         return {
//             A: questionsWithSection.filter(
//                 (q) => q.section === "A" || (q.type === "section" && q.text.includes("SECTION A"))
//             ),
//             B: questionsWithSection.filter(
//                 (q) => q.section === "B" || (q.type === "section" && q.text.includes("SECTION B"))
//             ),
//             C: questionsWithSection.filter(
//                 (q) => q.section === "C" || (q.type === "section" && q.text.includes("SECTION C"))
//             ),
//         };
//     }, [questionsWithSection, hasSections]);
//
//     // default section: if no sections -> ALL else A
//     const defaultSection = hasSections ? "A" : "ALL";
//     const [currentSection, setCurrentSection] = useState(defaultSection);
//
//     // when switching sections, scroll to top of the paper
//     useEffect(() => {
//         // smooth scroll so the section header is visible
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, [currentSection]);
//
//     // ----------------------------
//     // Answers state
//     // ----------------------------
//     const initialAnswers = {};
//     questionsWithSection.forEach((q) => {
//         initialAnswers[q.id] = "";
//     });
//
//     const [answers, setAnswers] = useState(initialAnswers);
//     const [submitted, setSubmitted] = useState(false);
//     const [awarded, setAwarded] = useState({});
//     const [autoGradedTotal, setAutoGradedTotal] = useState(0);
//
//     const handleChange = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));
//
//     // ----------------------------
//     // Grading (keeps your keyword logic)
//     // ----------------------------
//     const gradePaper = () => {
//         const awardedMap = {};
//         let total = 0;
//
//         questionsWithSection.forEach((q) => {
//             if (!q.marks || q.type === "section" || q.type === "instruction") return;
//
//             const user = (answers[q.id] || "").trim().toLowerCase();
//             const correct = q.correct ? q.correct.toString().trim().toLowerCase() : "";
//             let matched = false;
//
//             if (q.type === "mcq") {
//                 if (user === correct) matched = true;
//             } else if (q.type === "short") {
//                 if (Array.isArray(q.correctKeywords)) {
//                     for (let kw of q.correctKeywords) {
//                         if (!kw) continue;
//                         if (user.includes(kw.toString().toLowerCase())) {
//                             matched = true;
//                             break;
//                         }
//                     }
//                 }
//                 if (!matched && correct) {
//                     if (user === correct || user.includes(correct)) matched = true;
//                 }
//             } else {
//                 // essay => manual (no auto mark)
//                 matched = false;
//             }
//
//             awardedMap[q.id] = matched ? q.marks || 0 : 0;
//             if (matched) total += q.marks || 0;
//         });
//
//         setAwarded(awardedMap);
//         setAutoGradedTotal(total);
//         setSubmitted(true);
//     };
//
//     // ----------------------------
//     // Timer: 1 hour 30 minutes = 5400 seconds
//     // ----------------------------
//     const [timeLeft, setTimeLeft] = useState(5400);
//
//     useEffect(() => {
//         if (submitted) return;
//         const t = setInterval(() => {
//             setTimeLeft((prev) => {
//                 if (prev <= 1) {
//                     clearInterval(t);
//                     gradePaper(); // auto-submit at 0
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//         return () => clearInterval(t);
//     }, [submitted]);
//
//     const formatTime = (secs) => {
//         const h = String(Math.floor(secs / 3600)).padStart(2, "0");
//         const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//         const s = String(secs % 60).padStart(2, "0");
//         return `${h}:${m}:${s}`;
//     };
//
//     const timerColor =
//         timeLeft <= 60 ? "timer danger" : timeLeft <= 300 ? "timer warning" : "timer";
//
//     // ----------------------------
//     // Marks / section math (handles both sectioned and no-section)
//     // For papers without sections we just treat ALL as full paper
//     // ----------------------------
//     const questionsFor = (letter) =>
//         letter === "ALL" ? questionsWithSection : questionsWithSection.filter((q) => q.section === letter);
//
//     const sectionScore = (letter) =>
//         questionsFor(letter).reduce((s, q) => s + (awarded[q.id] || 0), 0);
//
//     const sectionMax = (letter) => questionsFor(letter).reduce((s, q) => s + (q.marks || 0), 0);
//
//     // For Section B/C special selection rules (best 2 / best 1)
//     const bestN = (letter, n) => {
//         const scores = questionsFor(letter)
//             .map((q) => awarded[q.id] || 0)
//             .sort((a, b) => b - a);
//         return scores.slice(0, n).reduce((s, x) => s + x, 0);
//     };
//
//     const sectionAScore = sectionScore("A");
//     const sectionBScore = bestN("B", 2);
//     const sectionCScore = bestN("C", 1);
//
//     const quizTotal = sectionAScore + sectionBScore; // expected 110
//     const essayTotal = sectionCScore; // expected 40
//
//     // overall possible is fixed 150 (you use that baseline in summaries)
//     const TOTAL_PAPER_MARKS = 150;
//
//     // ----------------------------
//     // Helper: section list for UI (depending on hasSections)
//     // ----------------------------
//     const visibleSectionKeys = hasSections ? ["A", "B", "C"] : ["ALL"];
//
//     return (
//         <div className="exam-wrapper">
//             <div className="exam-page centered-paper">
//                 <header className="exam-header">
//                     <h1>{paperTitle}</h1>
//                     <div className={timerColor}>{formatTime(timeLeft)}</div>
//                 </header>
//
//                 {/* show only current section */}
//                 <main className="paper-body">
//                     {sections[currentSection].map((q) => (
//                         <Question
//                             key={q.id}
//                             item={q}
//                             value={answers[q.id]}
//                             onChange={handleChange}
//                             submitted={submitted}
//                         />
//                     ))}
//                 </main>
//
//                 <footer className="exam-footer">
//                     <div className="nav-row">
//                         {/* Prev */}
//                         {visibleSectionKeys.indexOf(currentSection) > 0 && (
//                             <button
//                                 className="prev-btn"
//                                 onClick={() =>
//                                     setCurrentSection(visibleSectionKeys[visibleSectionKeys.indexOf(currentSection) - 1])
//                                 }
//                             >
//                                 ← Previous Section
//                             </button>
//                         )}
//
//                         {/* Next */}
//                         {visibleSectionKeys.indexOf(currentSection) < visibleSectionKeys.length - 1 && (
//                             <button
//                                 className="next-btn"
//                                 onClick={() =>
//                                     setCurrentSection(visibleSectionKeys[visibleSectionKeys.indexOf(currentSection) + 1])
//                                 }
//                             >
//                                 Next Section →
//                             </button>
//                         )}
//                     </div>
//
//                     {/* submit button only shown before submission and only on last section */}
//                     {!submitted && currentSection === visibleSectionKeys[visibleSectionKeys.length - 1] && (
//                         <button className="submit-btn" onClick={gradePaper}>
//                             Submit Paper
//                         </button>
//                     )}
//
//                     {/* Results — only shown after submission and only on last section */}
//                     {submitted && currentSection === visibleSectionKeys[visibleSectionKeys.length - 1] && (
//                         <div className="results">
//                             <h2>Final Results</h2>
//
//                             <p>
//                                 <strong>Your Score:</strong>{" "}
//                                 {((autoGradedTotal / TOTAL_PAPER_MARKS) * 100).toFixed(2)}%
//                             </p>
//                             <p>({autoGradedTotal} out of {TOTAL_PAPER_MARKS} correct)</p>
//
//                             <h3>Section Breakdown</h3>
//                             {hasSections ? (
//                                 <>
//                                     <p>Section A: {sectionAScore} / {sectionMax("A")}</p>
//                                     <p>Section B (best 2): {sectionBScore} / 80</p>
//                                     <p>Section C (best 1): {sectionCScore} / 40</p>
//                                 </>
//                             ) : (
//                                 <p>Whole paper auto-graded total: {autoGradedTotal} / {sectionMax("ALL")}</p>
//                             )}
//
//                             <h3>Final Totals</h3>
//                             <p>Quiz score: {quizTotal} / 110</p>
//                             <p>Essay score: {essayTotal} / 40</p>
//
//                             <h3>Feedback</h3>
//                             <p style={{fontWeight: "bold"}}>
//                                 {((autoGradedTotal / TOTAL_PAPER_MARKS) * 100) < 50
//                                     ? "Keep practicing!! You’ll improve!!"
//                                     : ((autoGradedTotal / TOTAL_PAPER_MARKS) * 100) < 75
//                                         ? "You are doing well!"
//                                         : "Excellent work! Keep it up!"}
//                             </p>
//
//                             <button className="back-btn" onClick={onBack}>
//                                 ← Back to Paper Selector
//                             </button>
//                         </div>
//                     )}
//                 </footer>
//             </div>
//             <style jsx>
//                 {`
//
//                     html, body, #root {
//                         height: 100%;
//                         margin: 0;
//                         padding: 0;
//                     }
//                     body {
//                         background: #f5f6fa;
//                         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
//                         -webkit-font-smoothing: antialiased;
//                         -moz-osx-font-smoothing: grayscale;
//                     }
//
//
//                     .exam-wrapper {
//                         min-height: 100vh;
//                         display: flex;
//                         justify-content: center;           /* center horizontally */
//                         align-items: flex-start;           /* start from top (so header isn't vertically centered) */
//                         padding: 40px 20px;                /* page padding */
//                         box-sizing: border-box;
//                     }
//                     .exam-page {
//                         width: 100%;
//                         max-width: 980px;                  /* adjust if you want wider / narrower */
//                         margin: 0 auto;                    /* center in case exam-wrapper changes */
//                         padding: 28px 34px;
//                         background: #ffffff;
//                         border-radius: 12px;
//                         box-shadow: 0 8px 30px rgba(0,0,0,0.08);
//                         box-sizing: border-box;
//                     }
//
//                     /* Make sure any old conflicting classes don't show */
//                     .exam-container, .exam-paper, .centered-paper {
//                         display: block;
//                     }
//
//                     /* HEADER */
//                     .exam-header {
//                         display: flex;
//                         justify-content: space-between;   /* title left, timer right */
//                         align-items: center;
//                         gap: 16px;
//                         margin-bottom: 20px;
//                     }
//
//                     /* Title style — keep inside container (left aligned within the centered container) */
//                     .exam-header h1 {
//                         font-size: 42px;
//                         line-height: 1.05;
//                         margin: 0;
//                         font-weight: 700;
//                         color: #111;
//                     }
//
//                     /* Timer box */
//                     .timer {
//                         font-size: 22px;
//                         font-weight: 700;
//                         padding: 8px 16px;
//                         border-radius: 10px;
//                         border: 1px solid #dcdcdc;
//                         background: #eaf9ea;
//                         color: #037a03;
//                         white-space: nowrap;
//                     }
//
//                     /* Timer states */
//                     .timer.warning {
//                         background: #fff4e6;
//                         color: #b86a00;
//                     }
//                     .timer.danger {
//                         background: #ffeaea;
//                         color: #b20000;
//                     }
//
//                     /* MAIN paper body (questions area) */
//                     .paper-body {
//                         width: 100%;
//                     }
//
//                     /* QUESTION CARD (keeps consistent spacing) */
//                     .question-card {
//                         border: 1px solid #ececec;
//                         border-radius: 10px;
//                         padding: 18px;
//                         margin-bottom: 18px;
//                         background: #fff;
//                         box-shadow: 0 2px 6px rgba(0,0,0,0.03);
//                         box-sizing: border-box;
//                     }
//
//                     /* Top row of a question showing id + marks */
//                     .question-top {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;
//                         margin-bottom: 10px;
//                     }
//
//                     /* Question id (left) */
//                     .q-id {
//                         font-weight: 700;
//                         font-size: 18px;
//                         color: #222;
//                     }
//
//                     /* Marks (right) */
//                     .q-marks {
//                         font-size: 14px;
//                         color: #666;
//                         white-space: nowrap;
//                     }
//
//                     /* Question text */
//                     .q-text {
//                         margin-bottom: 10px;
//                         font-size: 15px;
//                         line-height: 1.55;
//                         color: #222;
//                         white-space: pre-wrap;
//                     }
//
//                     /* QUESTION IMAGE */
//                     .q-image img {
//                         max-width: 100%;
//                         height: auto;
//                         display: block;
//                         margin: 10px 0;
//                         border-radius: 6px;
//                     }
//
//                     /* MCQ options */
//                     .mcq-options {
//                         display: flex;
//                         flex-direction: column;
//                         gap: 8px;
//                         margin-top: 6px;
//                     }
//                     .mcq-label {
//                         display: flex;
//                         align-items: center;
//                         gap: 10px;
//                         font-size: 15px;
//                     }
//
//                     /* Textareas */
//                     .short-answer,
//                     .essay-answer {
//                         width: 100%;
//                         min-height: 110px;
//                         max-height: 500px;
//                         padding: 12px;
//                         border-radius: 8px;
//                         border: 1px solid #d6d6d6;
//                         font-size: 15px;
//                         line-height: 1.5;
//                         resize: none;      /* auto-grow handled by JS */
//                         overflow: hidden;
//                         box-sizing: border-box;
//                     }
//
//                     /* Navigation row (Prev/Next) */
//                     .nav-row {
//                         display: flex;
//                         gap: 10px;
//                         justify-content: space-between;
//                         align-items: center;
//                         margin-top: 20px;
//                     }
//
//                     /* Buttons */
//                     .prev-btn, .next-btn, .back-btn {
//                         padding: 10px 18px;
//                         border-radius: 6px;
//                         border: 1px solid #cfcfcf;
//                         background: #f2f2f2;
//                         cursor: pointer;
//                         font-size: 15px;
//                     }
//                     .prev-btn:hover, .next-btn:hover, .back-btn:hover {
//                         background: #e9e9e9;
//                     }
//
//                     .submit-btn {
//                         background: #007bff;
//                         color: white;
//                         padding: 12px 22px;
//                         border-radius: 8px;
//                         border: none;
//                         cursor: pointer;
//                         font-size: 16px;
//                         display: block;
//                         margin: 28px auto;
//                     }
//                     .submit-btn:hover { background: #0056d1; }
//
//                     /* RESULTS */
//                     .results {
//                         margin-top: 22px;
//                         padding: 18px;
//                         border-radius: 8px;
//                         border: 1px solid #eee;
//                         background: #fafafa;
//                         text-align: left;
//                     }
//
//                     /* Small screens responsiveness */
//                     @media (max-width: 720px) {
//                         .exam-page { padding: 18px; max-width: 100%; }
//                         .exam-header h1 { font-size: 28px; }
//                         .timer { font-size: 18px; padding: 6px 12px; }
//                     }
//
//                 `}
//             </style>
//         </div>
//     );
// }
