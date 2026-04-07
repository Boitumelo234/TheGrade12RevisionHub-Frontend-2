// import { correctAnswers, questionWeights } from "./examData";
//
//
// //let totalTime = 2.5 * 60 * 60; // 2.5 hours in seconds
// //let timerInterval; // declared globally
//
// /*function updateTimer() {
//     if (totalTime <= 0) {
//         clearInterval(timerInterval);
//         document.getElementById('timer-display').textContent = "00:00:00";
//         alert("Time's up! Please submit your exam.");
//         return;
//     }
//
//     totalTime--;
//
//     const hours = Math.floor(totalTime / 3600);
//     const minutes = Math.floor((totalTime % 3600) / 60);
//     const seconds = totalTime % 60;
//
//     const display = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
//     document.getElementById('timer-display').textContent = display;
// }
//
// function startTimer() {
//     timerInterval = setInterval(updateTimer, 1000);
// }*/
//
// // Start the timer
// //window.onload = startTimer;
//
// function submitExam() {
//    // if (timerInterval) clearInterval(timerInterval);
//
//     let totalMarks = 0;
//     let achievedMarks = 0;
//     let detailedResults = [];
//
//     for (const question in correctAnswers) {
//         if (Object.prototype.hasOwnProperty.call(questionWeights, question)) {
//             totalMarks += questionWeights[question];
//
//             let userAnswer = "";
//             const inputElement = document.querySelector(`[name="${question}"]`);
//
//             if (inputElement) {
//                 if (inputElement.type === "radio") {
//                     const selectedRadio = document.querySelector(`input[name="${question}"]:checked`);
//                     userAnswer = selectedRadio ? selectedRadio.value : "";
//                 } else {
//                     userAnswer = inputElement.value.trim();
//                 }
//
//                 let isCorrect = false;
//                 if (typeof correctAnswers[question] === "number") {
//                     isCorrect = parseFloat(userAnswer) === correctAnswers[question];
//                 } else {
//                     isCorrect = userAnswer.toLowerCase().includes(correctAnswers[question].toLowerCase());
//                 }
//
//                 if (isCorrect) {
//                     achievedMarks += questionWeights[question];
//                     detailedResults.push({ question, status: "correct", marks: questionWeights[question] });
//                 } else {
//                     detailedResults.push({ question, status: "incorrect", userAnswer, correctAnswer: correctAnswers[question] });
//                 }
//             }
//         }
//     }
//
//     const percentage = ((achievedMarks / totalMarks) * 100).toFixed(2);
//
//     // Show results on page
//     document.getElementById("score").innerHTML = `Your Score: ${achievedMarks}/${totalMarks} (${percentage}%)`;
//     document.getElementById("detailed-results").innerHTML = detailedResults.map(r => {
//         if (r.status === "correct") return `<p class="correct">${r.question}: Correct (+${r.marks} marks)</p>`;
//         return `<p class="incorrect">${r.question}: Incorrect. Your answer: "${r.userAnswer}". Correct answer: "${r.correctAnswer}"</p>`;
//     }).join('');
//     document.getElementById("results").style.display = "block";
//
//     document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
//
//     // Send results to backend
//     const savedResults = JSON.parse(localStorage.getItem("examResults") || "[]");
//     savedResults.push({ achievedMarks, totalMarks, percentage, detailedResults });
//     localStorage.setItem("examResults", JSON.stringify(savedResults));
// }
//
// function Rism() {
//     return (
//         <div className="container">
//             {/* HEADER */}
//             <header>
//                 <h1>NATIONAL SENIOR CERTIFICATE</h1>
//                 <h2>GRADE 12</h2>
//                 <h2>TOURISM</h2>
//                 <h3>NOVEMBER 2024</h3>
//                 <p>MARKS: 200</p>
//                 <p>TIME: 3 hours</p>
//             </header>
//
//             <div className="instructions">
//                 <h3>INSTRUCTIONS AND INFORMATION</h3>
//                 <p>Read the instructions carefully before answering the questions.</p>
//                 <ol>
//                     <li>This question paper consists of FIVE sections.</li>
//                     <li>Answer ALL the questions.</li>
//                     <li>Start EACH question on a NEW page.</li>
//                     <li>For QUESTION 3.1, round off your answers to TWO decimal places.</li>
//                     <li>Show ALL calculations.</li>
//                     <li>You may use a non-programmable calculator.</li>
//                     <li>Use the mark allocation of each question as a guide to the length of your answer.</li>
//                     <li>Write neatly and legibly.</li>
//                 </ol>
//
//                 <table className="time-guide">
//                     <thead>
//                     <tr>
//                         <th>SECTION</th>
//                         <th>TOPICS</th>
//                         <th>MARKS</th>
//                         <th>TIME (minutes)</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>A</td>
//                         <td>Short Questions</td>
//                         <td>40</td>
//                         <td>20</td>
//                     </tr>
//                     <tr>
//                         <td>B</td>
//                         <td>Map Work and Tour Planning; Foreign Exchange</td>
//                         <td>50</td>
//                         <td>50</td>
//                     </tr>
//                     <tr>
//                         <td>C</td>
//                         <td>Tourist Attractions; Culture and Heritage Tourism; Marketing</td>
//                         <td>50</td>
//                         <td>50</td>
//                     </tr>
//                     <tr>
//                         <td>D</td>
//                         <td>Tourism Sectors; Sustainable and Responsible Tourism</td>
//                         <td>30</td>
//                         <td>30</td>
//                     </tr>
//                     <tr>
//                         <td>E</td>
//                         <td>Domestic, Regional and International Tourism; Communication and Customer Care</td>
//                         <td>30</td>
//                         <td>30</td>
//                     </tr>
//                     <tr>
//                         <td colSpan="2"><strong>TOTAL</strong></td>
//                         <td><strong>200</strong></td>
//                         <td><strong>180</strong></td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <form id="exam-form" onSubmit={(e) => e.preventDefault()}>
//                 <div className="section">
//                     <div className="section-title">
//                         <h2>SECTION A: SHORT QUESTIONS (40 marks)</h2>
//                     </div>
//
//                     <div className="question">
//                         <div className="question-number">QUESTION 1.1 (20 x 1) (20)</div>
//                         <p>
//                             Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.20) in the ANSWER BOOK.
//                         </p>
//
//                         <div className="options">
//                             <div className="option">
//                                 <p>1.1.1 Tips for waiters is a necessary expense of a tourist's budget. It is part of
//                                     a/an … expense.</p>
//                                 <input type="radio" name="q1.1.1" value="A"/> A transport<br/>
//                                 <input type="radio" name="q1.1.1" value="B"/> B optional<br/>
//                                 <input type="radio" name="q1.1.1" value="C"/> C accommodation<br/>
//                                 <input type="radio" name="q1.1.1" value="D"/> D shopping
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.2.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.2 The arrival point of a journey is called (the) …</p>
//                                 <input type="radio" name="q1.1.2" value="A"/> A destination<br/>
//                                 <input type="radio" name="q1.1.2" value="B"/> B departure<br/>
//                                 <input type="radio" name="q1.1.2" value="C"/> C embarkation<br/>
//                                 <input type="radio" name="q1.1.2" value="D"/> D transit
//                             </div>
//                             <div className="option">
//                                 <p>1.1.3 The International Date Line (IDL) is the imaginary line …</p>
//                                 <input type="radio" name="q1.1.3" value="A"/> A dividing the Earth in a Northern and Southern Hemisphere<br/>
//                                 <input type="radio" name="q1.1.3" value="B"/> B from where time zones are calculated<br/>
//                                 <input type="radio" name="q1.1.3" value="C"/> C resulting in a date change during travelling<br/>
//                                 <input type="radio" name="q1.1.3" value="D"/> D crossing Brazil, South America
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.4 Drinking bottled water is considered a precaution against contracting …</p>
//                                 <input type="radio" name="q1.1.4" value="A"/> A malaria<br/>
//                                 <input type="radio" name="q1.1.4" value="B"/> B cholera<br/>
//                                 <input type="radio" name="q1.1.4" value="C"/> C Covid-19<br/>
//                                 <input type="radio" name="q1.1.4" value="D"/> D avian flu
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.5 A yellow fever certificate can be obtained from a/an …</p>
//                                 <input type="radio" name="q1.1.5" value="A"/> A embassy<br/>
//                                 <input type="radio" name="q1.1.5" value="B"/> B travel clinic<br/>
//                                 <input type="radio" name="q1.1.5" value="C"/> C wellness clinic<br/>
//                                 <input type="radio" name="q1.1.5" value="D"/> D police station
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.6.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.6 The most expensive destination for a tourist from South Africa:</p>
//                                 <input type="radio" name="q1.1.6" value="A"/> A Australia<br/>
//                                 <input type="radio" name="q1.1.6" value="B"/> B USA<br/>
//                                 <input type="radio" name="q1.1.6" value="C"/> C Germany<br/>
//                                 <input type="radio" name="q1.1.6" value="D"/> D England
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.7.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.7 The photo of the Black Forest is associated with this country:</p>
//                                 <input type="radio" name="q1.1.7" value="A"/> A Egypt<br/>
//                                 <input type="radio" name="q1.1.7" value="B"/> B Germany<br/>
//                                 <input type="radio" name="q1.1.7" value="C"/> C Iraq<br/>
//                                 <input type="radio" name="q1.1.7" value="D"/> D Namibia
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.8 This structure was built to protect a country and is over 6 000 km long:</p>
//                                 <input type="radio" name="q1.1.8" value="A"/> A The Great Wall of China<br/>
//                                 <input type="radio" name="q1.1.8" value="B"/> B The Leaning Tower of Pisa<br/>
//                                 <input type="radio" name="q1.1.8" value="C"/> C The Vatican City<br/>
//                                 <input type="radio" name="q1.1.8" value="D"/> D Ayers Rock
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.9 This waterfall is a natural attraction located between two countries in North
//                                     America:</p>
//                                 <input type="radio" name="q1.1.9" value="A"/> A Angel Falls<br/>
//                                 <input type="radio" name="q1.1.9" value="B"/> B Mac-Mac Falls<br/>
//                                 <input type="radio" name="q1.1.9" value="C"/> C Niagara Falls<br/>
//                                 <input type="radio" name="q1.1.9" value="D"/> D Victoria Falls
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.10 ONE way in which an attraction caters for visitors with disabilities:</p>
//                                 <input type="radio" name="q1.1.10" value="A"/> A It charges higher entry fees<br/>
//                                 <input type="radio" name="q1.1.10" value="B"/> B It facilitates universal access<br/>
//                                 <input type="radio" name="q1.1.10" value="C"/> C It disregards the safety and security
//                                 of their visitors<br/>
//                                 <input type="radio" name="q1.1.10" value="D"/> D It employs people from the local
//                                 community
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.11.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.11 South Africa's brand logo usually displays the following slogan:</p>
//                                 <input type="radio" name="q1.1.11" value="A"/> A 'Inspiring new ways'<br/>
//                                 <input type="radio" name="q1.1.11" value="B"/> B 'Proudly South African'<br/>
//                                 <input type="radio" name="q1.1.11" value="C"/> C 'I do Tourism'<br/>
//                                 <input type="radio" name="q1.1.11" value="D"/> D 'Welcome to South Africa'
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.12 SATourism's marketing campaign that was launched in 2022:</p>
//                                 <input type="radio" name="q1.1.12" value="A"/> A 'Live South Africa!'<br/>
//                                 <input type="radio" name="q1.1.12" value="B"/> B 'A world in one country'<br/>
//                                 <input type="radio" name="q1.1.12" value="C"/> C 'Alive with possibility'<br/>
//                                 <input type="radio" name="q1.1.12" value="D"/> D 'We are the world'
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.13 The #Khomani Cultural Landscape is traditionally associated with …</p>
//                                 <input type="radio" name="q1.1.13" value="A"/> A an ancient golden rhino artefact<br/>
//                                 <input type="radio" name="q1.1.13" value="B"/> B hunting with a bow and arrow<br/>
//                                 <input type="radio" name="q1.1.13" value="C"/> C the remains of Mrs Ples<br/>
//                                 <input type="radio" name="q1.1.13" value="D"/> D a former president's time in jail
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.14.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.14 Tourism businesses saving electricity is considered to be a/an … practice.</p>
//                                 <input type="radio" name="q1.1.14" value="A"/> A unsustainable<br/>
//                                 <input type="radio" name="q1.1.14" value="B"/> B responsible<br/>
//                                 <input type="radio" name="q1.1.14" value="C"/> C irresponsible<br/>
//                                 <input type="radio" name="q1.1.14" value="D"/> D wasteful
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.15 An example of good work ethics:</p>
//                                 <input type="radio" name="q1.1.15" value="A"/> A Respect for company property<br/>
//                                 <input type="radio" name="q1.1.15" value="B"/> B Gossip about fellow workers<br/>
//                                 <input type="radio" name="q1.1.15" value="C"/> C Take long smoke breaks<br/>
//                                 <input type="radio" name="q1.1.15" value="D"/> D Accept gifts from clients
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.16 The current rugby world champions:</p>
//                                 <input type="radio" name="q1.1.16" value="A"/> A France<br/>
//                                 <input type="radio" name="q1.1.16" value="B"/> B Ireland<br/>
//                                 <input type="radio" name="q1.1.16" value="C"/> C New Zealand<br/>
//                                 <input type="radio" name="q1.1.16" value="D"/> D South Africa
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.17 The mass shooting of university students in the United States of America can be regarded as a/an …</p>
//                                 <input type="radio" name="q1.1.17" value="A"/> A natural disaster<br/>
//                                 <input type="radio" name="q1.1.17" value="B"/> B act of terror<br/>
//                                 <input type="radio" name="q1.1.17" value="C"/> C political situation<br/>
//                                 <input type="radio" name="q1.1.17" value="D"/> D civil war
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.18 … collects information about tourists' length of stay in South Africa.</p>
//                                 <input type="radio" name="q1.1.18" value="A"/> A SARS<br/>
//                                 <input type="radio" name="q1.1.18" value="B"/> B PRASA<br/>
//                                 <input type="radio" name="q1.1.18" value="C"/> C Stats SA<br/>
//                                 <input type="radio" name="q1.1.18" value="D"/> D SATSA
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/1.1.19.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>1.1.19 The second most popular purpose of international tourist arrivals in South Africa:</p>
//                                 <input type="radio" name="q1.1.19" value="A"/> A Holiday<br/>
//                                 <input type="radio" name="q1.1.19" value="B"/> B Shopping<br/>
//                                 <input type="radio" name="q1.1.19" value="C"/> C Business<br/>
//                                 <input type="radio" name="q1.1.19" value="D"/> D VFR
//                             </div>
//
//                             <div className="option">
//                                 <p>1.1.20 A disadvantage of web-based responses for customer feedback:</p>
//                                 <input type="radio" name="q1.1.20" value="A"/> A It is a fast and convenient feedback method<br/>
//                                 <input type="radio" name="q1.1.20" value="B"/> B It is completed after the service has been delivered<br/>
//                                 <input type="radio" name="q1.1.20" value="C"/> C An internet connection and data are required<br/>
//                                 <input type="radio" name="q1.1.20" value="D"/> D A smartphone or a laptop can be used to complete the feedback
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 1.2 (5 x 1) (5)</div>
//                     <p>
//                         Give ONE word/term for EACH of the following descriptions by choosing a word/term from the list below.
//                     </p>
//                     <p><em>natural disaster; recession; days spent; money spent; air; route planning; publicity; land; political</em></p>
//                     <div className="image-placeholder">
//                         <img src={"/New folder/1.2.jpg"} alt="image" />
//                     </div>
//                     <div className="options">
//                         <div className="option">
//                             <p>1.2.1 The Israel-Gaza War is an example of a … situation.</p>
//                             <input type="text" name="q1.2.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.2.2 The impact of fewer tourists and less money in an economy can lead to a/an …</p>
//                             <input type="text" name="q1.2.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.2.3 In tourism, the term expenditure refers to … while travelling.</p>
//                             <input type="text" name="q1.2.3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.2.4 A bus accident injuring many tourists during a peak holiday season will lead to negative …</p>
//                             <input type="text" name="q1.2.4" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.2.5 Tourists from Zimbabwe entering South Africa at the Beit Bridge border post form part of … markets.</p>
//                             <input type="text" name="q1.2.5" className="answer-input" />
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="question">
//                     <div className="question-number">QUESTION 1.3 (5 x 1) (5)</div>
//                     <p>Choose the correct word(s) from those given in brackets.</p>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>1.3.1 Buying products made from recyclable material will result in a (reduced/increased) carbon footprint.</p>
//                             <input type="text" name="q1.3.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.3.2 (FTT/SAHRA) ensures that fair wages and good working conditions are practised by tourism businesses in South Africa.</p>
//                             <input type="text" name="q1.3.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.3.3 Offering internships to school-leavers from local communities is considered a (CBR/CSI) initiative of a tourism company.</p>
//                             <input type="text" name="q1.3.3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.3.4 A sustainable practice at a conference is for delegates to refill (glass/plastic) bottles at the water station.</p>
//                             <input type="text" name="q1.3.4" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.3.5 Tourism businesses that acknowledge local customs, traditions and celebrations can be considered as practising (the triple bottom-line/foreign market share).</p>
//                             <input type="text" name="q1.3.5" className="answer-input" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 1.4 (5 x 1) (5)</div>
//                     <p>Choose a World Heritage Site from COLUMN B that matches the description in COLUMN A.</p>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>1.4.1 The site, showcasing the remains of an ancient civilisation, that is located in Limpopo</p>
//                             <input type="text" name="q1.4.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.4.2 A meteorite site located in the Free State and North West</p>
//                             <input type="text" name="q1.4.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.4.3 The site in Mpumalanga that includes the Geotrail and ancient rock formations</p>
//                             <input type="text" name="q1.4.3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.4.4 An estuary (river mouth) in KwaZulu-Natal that is popular for scuba diving</p>
//                             <input type="text" name="q1.4.4" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.4.5 The Sterkfontein Caves form part of this World Heritage Site in Gauteng</p>
//                             <input type="text" name="q1.4.5" className="answer-input" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 1.5 (5 x 1) (5)</div>
//                     <p>Match pictures A to H with the job descriptions below.</p>
//
//                     <div className="image-placeholder">
//                         <img src={"/New folder/1.5.jpg"} alt="image" />
//                     </div>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>1.5.1 This staff member is responsible for ensuring that the hotel is kept clean.</p>
//                             <input type="text" name="q1.5.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.5.2 This staff member must ensure all plumbing is fully functional at the hotel.</p>
//                             <input type="text" name="q1.5.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.5.3 This staff member is a culinary specialist.</p>
//                             <input type="text" name="q1.5.3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.5.4 This staff member is the first point of contact with arriving guests at luxury hotels.</p>
//                             <input type="text" name="q1.5.4" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>1.5.5 This person manages the team that ensures the safety of all guests.</p>
//                             <input type="text" name="q1.5.5" className="answer-input" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 2 (36 marks)</div>
//                     <div className="image-placeholder">
//                         <img src={"/New folder/2.jpg"} alt="image" />
//                     </div>
//                     <p><strong>PARIS – THIRD TIME AROUND!</strong></p>
//                     <p>The Summer Olympics took place in Paris, France, from 26 July to 11 August 2024.</p>
//                     <div className="image-placeholder">
//                         <img src={"/New folder/2.1.jpg"} alt="image" />
//                     </div>
//                     <div className="options">
//                         <div className="option">
//                             <p>2.1.1 Calculate the time difference between London and Paris at the time of the Olympic Games. (2)</p>
//                             <input type="text" name="q2.1.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>2.1.2 Team South Africa competed at the Paris 2024 Summer Olympics. Their flight departed from OR Tambo International Airport at 20:00 on 18 July 2024. The duration of the flight was 11 hours. Calculate the time and date the South African team arrived in Paris. (4)</p>
//                             <p>Time: <input type="text" name="q2.1.2_time" className="answer-input" /></p>
//                             <p>Date: <input type="text" name="q2.1.2_date" className="answer-input" /></p>
//                         </div>
//
//                         <div className="option">
//                             <p>2.1.3 Explain ONE way in which the team members had to adjust their watches upon arrival in Paris. (2)</p>
//                             <textarea name="q2.1.3" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>2.1.4 The duration of the flight was 11 hours.</p>
//                             <p>(a) Name the travel-related condition the team members suffered from after the flight. (2)</p>
//                             <input type="text" name="q2.1.4a" className="answer-input" />
//                             <p>(b) Discuss ONE reason for your answer to QUESTION 2.1.4(a). (2)</p>
//                             <textarea name="q2.1.4b" rows="3" className="answer-input"></textarea>
//                         </div>
//                         <div className="image-placeholder">
//                             <img src={"/New folder/2.2.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>2.2.1 Name the visa required for their journey. (1)</p>
//                             <input type="text" name="q2.2.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>2.2.2 Explain ONE reason why the South African team had to apply for their visas on the French visa application website and visit the French embassy. (2)</p>
//                             <textarea name="q2.2.2" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>2.2.3 Explain TWO advantages of the type of visa named in QUESTION 2.2.1. (4)</p>
//                             <textarea name="q2.2.3" rows="4" className="answer-input"></textarea>
//                         </div>
//                         <div className="image-placeholder">
//                             <img src={"/New folder/2.3.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>2.3.1 Name TWO items that the team members should have placed in the safe of the hotel room before leaving for the beach. (2)</p>
//                             <textarea name="q2.3.1" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>2.3.2 In a paragraph, discuss THREE ways in which the team could protect themselves from exposure to the sun while at the beach. (6)</p>
//                             <textarea name="q2.3.2" rows="6" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>2.3.3 Madrid in Spain is known for its vibrant nightlife. Suggest TWO ways in which the team could ensure their safety while exploring the streets of Madrid at night. (4)</p>
//                             <textarea name="q2.3.3" rows="4" className="answer-input"></textarea>
//                         </div>
//                         <div className="image-placeholder">
//                             <img src={"./New folder/2.4.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>2.4 On the team's arrival at the OR Tambo International Airport, Cheslin, one of the team members, had the following items in his luggage: 2 x 50 mf perfume, One pair of sneakers, 30 cigars, 3 litres of French wine. Cheslin went through the red channel on arrival. Give TWO reasons why Cheslin proceeded to the red channel. (4)</p>
//                             <textarea name="q2.4" rows="4" className="answer-input"></textarea>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 3 (14 marks)</div>
//                     <p>Refer to the information below and answer the questions that follow.</p>
//                     <p>Each South African team member had R50 000 spending money for the trip to the Summer Olympic Games in Paris. They exchanged their rands at the OR Tambo International Airport before their flight to Paris.</p>
//
//                     <table border="1" style={{ margin: "10px 0", borderCollapse: "collapse" }}>
//                         <thead>
//                         <tr>
//                             <th>CURRENCY</th>
//                             <th>BANK BUYING RATE (BBR)</th>
//                             <th>BANK SELLING RATE (BSR)</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <tr>
//                             <td>British pound</td>
//                             <td>23,66</td>
//                             <td>23,68</td>
//                         </tr>
//                         <tr>
//                             <td>Euro</td>
//                             <td>20,52</td>
//                             <td>20,55</td>
//                         </tr>
//                         </tbody>
//                     </table>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>3.1.1 Give the currency code for British pound: (1)</p>
//                             <input type="text" name="q3.1.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>3.1.2 Give the currency code for Euro: (1)</p>
//                             <input type="text" name="q3.1.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>3.2 Convert R50 000 into euro: (3)</p>
//                             <input type="number" step="0.01" name="q3.2" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>3.3 Cheslin had €75 left upon his arrival in South Africa. Calculate the amount in ZAR: (3)</p>
//                             <input type="number" step="0.01" name="q3.3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>3.4.1 Explain the concept gross domestic product (GDP). (2)</p>
//                             <textarea name="q3.4.1" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>3.4.2 Discuss TWO ways how the hosting of the Olympic Games contributed to an increase in the GDP of France. (4)</p>
//                             <textarea name="q3.4.2" rows="4" className="answer-input"></textarea>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 4 (30 marks)</div>
//                     <p>Study the information below and answer the questions that follow.</p>
//                     <p>Andile, a South African globetrotter (world traveller), had a puzzle made of some of his favourite destinations in the world.</p>
//
//                     <div className="image-placeholder">
//                         <img src={"/New folder/4.1.jpg"} alt="image" />
//                     </div>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>4.1.1 (a) Identify the FOUR icons Andile visited. (4)</p>
//                             <textarea name="q4.1.1a" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>4.1.1 (b) Name the countries where the icons identified in QUESTION 4.1.1(a) are located. (3)</p>
//                             <textarea name="q4.1.1b" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>4.1.2 (a) Identify the icon in the puzzle that is associated with music. (2)</p>
//                             <input type="text" name="q4.1.2a" className="answer-input" />
//                         </div>
//                         <div className="image-placeholder">
//                             <img src={"/New folder/4.2.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>4.1.2 (b) Give ONE reason for your answer to QUESTION 4.1.2(a). (2)</p>
//                             <textarea name="q4.1.2b" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>4.1.3 Write THREE facts about the icon in the puzzle which is located in Africa. (6)</p>
//                             <textarea name="q4.1.3" rows="6" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>4.1.4 Give TWO reasons why tourists interested in sacred and religious sites would visit any TWO of the icons in the puzzle. (4)</p>
//                             <textarea name="q4.1.4" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>4.2.1 Identify the icons labelled A, B and C. (3)</p>
//                             <p>A: <input type="text" name="q4.2.1a" className="answer-input" /></p>
//                             <p>B: <input type="text" name="q4.2.1b" className="answer-input" /></p>
//                             <p>C: <input type="text" name="q4.2.1c" className="answer-input" /></p>
//                         </div>
//
//                         <div className="option">
//                             <p>4.2.2 Each of the icons above was constructed (built) in a unique way. Discuss ONE fact of EACH of the icons with reference to their design and the way in which they were built. (6)</p>
//                             <textarea name="q4.2.2" rows="6" className="answer-input"></textarea>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 5 (10 marks)</div>
//                     <p>Study the map below and answer the questions that follow.</p>
//
//                     <div className="image-placeholder">
//                         <img src={"/New folder/5.jpg"} alt="image" />
//                     </div>
//
//                     <div className="options">
//                         <div className="option">
//                             <p>5.1 Name the TWO World Heritage Sites located in the Western Cape, labelled A and B on the map. (4)</p>
//                             <p>A: <input type="text" name="q5.1a" className="answer-input" /></p>
//                             <p>B: <input type="text" name="q5.1b" className="answer-input" /></p>
//                         </div>
//
//                         <div className="option">
//                             <p>5.2 Give TWO reasons why the cultural site named in QUESTION 5.1 would attract tourists interested in the South African history. (4)</p>
//                             <textarea name="q5.2" rows="4" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>5.3 Explain the role of UNESCO in relation to World Heritage Sites. (2)</p>
//                             <textarea name="q5.3" rows="3" className="answer-input" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 6 (10 marks)</div>
//
//                     <div className="options">
//                         <div className="image-placeholder">
//                             <img src={"/New folder/6.1.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>6.1.1 Give ONE reason why Siya Kolisi was selected as the brand ambassador for SATourism. (2)</p>
//                             <textarea name="q6.1.1" rows="3" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>6.1.2 Discuss TWO reasons why SATourism markets South Africa internationally. (4)</p>
//                             <textarea name="q6.1.2" rows="4" className="answer-input" />
//                         </div>
//                         <div className="image-placeholder">
//                             <img src={"/New folder/6.2.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>6.2.1 Identify the international travel trade show in the picture above. (2)</p>
//                             <input type="text" name="q6.2.1" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>6.2.2 SATourism receives funding to market South Africa internationally. Explain the role of the TBCSA in the management of the marketing funds. (2)</p>
//                             <textarea name="q6.2.2" rows="3" className="answer-input" />
//                         </div>
//
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-title">
//                         <h2>SECTION D: TOURISM SECTORS; SUSTAINABLE AND RESPONSIBLE TOURISM (30 marks)</h2>
//                     </div>
//
//                     <div className="question">
//                         <div className="question-number">QUESTION 7 (12 marks)</div>
//
//                         <div className="options">
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/7.1.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>
//                                     7.1.1 Name the agreement between the cruise line and a crew member that must be signed before reporting for duty on a cruise ship. (2)
//                                 </p>
//                                 <input type="text" name="q7.1.1" className="answer-input" />
//                             </div>
//
//                             <div className="option">
//                                 <div className="image-placeholder">
//                                     <img src={"/New folder/7.1.2.jpg"} alt="image" />
//                                 </div>
//                                 <p>7.1.2 (a) Give Lydia's working hours as specified in the BCEA. (2)</p>
//                                 <input type="text" name="q7.1.2a" className="answer-input" />
//                             </div>
//
//                             <div className="option">
//                                 <p>7.1.2 (b) Advise Lydia on ONE regulation concerning overtime work. (2)</p>
//                                 <textarea name="q7.1.2b" rows="3" className="answer-input"></textarea>
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/7.2.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>7.2.1 Give ONE reason why a cruise line must have a code of conduct for their staff. (2)</p>
//                                 <textarea name="q7.2.1" rows="3" className="answer-input"></textarea>
//                             </div>
//
//                             <div className="option">
//                                 <p>
//                                     7.2.2 Respect for cultural differences is essential when working on a cruise ship.
//                                     Discuss ONE consequence (what can happen) for a crew member who disrespects cultural differences. (2)
//                                 </p>
//                                 <textarea name="q7.2.2" rows="3" className="answer-input"></textarea>
//                             </div>
//
//                             <div className="option">
//                                 <p>7.2.3 Explain how respecting a code of conduct can promote a conducive (good) working environment for staff. (2)</p>
//                                 <textarea name="q7.2.3" rows="3" className="answer-input"></textarea>
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 8 (18 marks)</div>
//
//                     <div className="options">
//                         <div className="image-placeholder">
//                             <img src={"/New folder/8.1.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>8.1.1 Explain the concept of <em>solar power</em>. (2)</p>
//                             <textarea name="q8.1.1" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>8.1.2 (a) Complete the sentence below.
//                                 The use of solar power is associated with the … pillar of sustainability. (2)
//                             </p>
//                             <input type="text" name="q8.1.2a" className="answer-input" />
//                         </div>
//
//                         <div className="option">
//                             <p>8.1.2 (b) Name the other TWO pillars of sustainability. (2)</p>
//                             <textarea name="q8.1.2b" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>8.1.3 Explain TWO advantages for airports of using solar power. (4)</p>
//                             <textarea name="q8.1.3" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>8.2.1 Discuss TWO ways in which ACSA's 2025 strategy can contribute to business operations. (4)</p>
//                             <textarea name="q8.2.1" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>8.2.2 Discuss TWO ways in which ACSA's 2025 strategy can contribute to responsibility regarding climate change. (4)</p>
//                             <textarea name="q8.2.2" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-title">
//                         <h2>SECTION E: DOMESTIC, REGIONAL AND INTERNATIONAL TOURISM; COMMUNICATION AND CUSTOMER CARE (30 marks)</h2>
//                     </div>
//
//                     <div className="question">
//                         <div className="question-number">QUESTION 9 (20 marks)</div>
//
//                         <div className="options">
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/9.1.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>
//                                     9.1.1 Choose the correct word(s) from those given in brackets.
//                                     BRICS can be classified as a (summit/political event). (2)
//                                 </p>
//                                 <input type="text" name="q9.1.1" className="answer-input" />
//                             </div>
//
//                             <div className="option">
//                                 <p>9.1.2 Discuss TWO ways in which the cooperation between BRICS member countries can provide opportunities to manage the energy crisis South Africa is experiencing currently. (4)</p>
//                                 <textarea name="q9.1.2" rows="4" className="answer-input"></textarea>
//                             </div>
//
//                             <div className="option">
//                                 <p>9.2.1 Identify the type of unforeseen occurrence in the article above. (2)</p>
//                                 <input type="text" name="q9.2.1" className="answer-input" />
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/9.2.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>9.2.2 Explain how damage to infrastructure can affect communities' access to the following:</p>
//                                 <p>(a) Clean water (2)</p>
//                                 <textarea name="q9.2.2a" rows="3" className="answer-input"></textarea>
//
//                                 <p>(b) Emergency aid (2)</p>
//                                 <textarea name="q9.2.2b" rows="3" className="answer-input"></textarea>
//                             </div>
//                             <div className="image-placeholder">
//                                 <img src={"/New folder/9.3.jpg"} alt="image" />
//                             </div>
//                             <div className="option">
//                                 <p>9.3.1 Discuss TWO advantages of using a digital wallet to pay for tourism products and services. (4)</p>
//                                 <textarea name="q9.3.1" rows="4" className="answer-input"></textarea>
//                             </div>
//
//                             <div className="option">
//                                 <p>9.3.2 Give TWO reasons why cash is no longer a preferred method of payment. (4)</p>
//                                 <textarea name="q9.3.2" rows="4" className="answer-input"></textarea>
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question">
//                     <div className="question-number">QUESTION 10 (10 marks)</div>
//
//                     <div className="options">
//                         <div className="image-placeholder">
//                             <img src={"/New folder/10.jpg"} alt="image" />
//                         </div>
//                         <div className="option">
//                             <p>10.1 Explain the meaning of the concept customer survey. (2)</p>
//                             <textarea name="q10.1" rows="3" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>
//                                 10.2 By simply filing customer responses, the company will miss the opportunity
//                                 to improve its products and services. Suggest TWO ways in which companies should
//                                 manage customer responses to ensure better customer service. (4)
//                             </p>
//                             <textarea name="q10.2" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                         <div className="option">
//                             <p>
//                                 10.3 Discuss TWO ways in which the use of customer surveys can result in improved
//                                 customer satisfaction for the tourism business. (4)
//                             </p>
//                             <textarea name="q10.3" rows="4" className="answer-input"></textarea>
//                         </div>
//
//                     </div>
//                 </div>
//
//                 <button type="button" className="submit-btn" onClick={submitExam}>
//                     Submit Answers
//                 </button>
//             </form>
//             <div className="results" id="results">
//                 <div className="score" id="score"></div>
//                 <div id="detailed-results"></div>
//             </div>
//             <style jsx>
//                 {`
//                     * {
//                         box-sizing: border-box;
//                         font-family: Arial, sans-serif;
//                     }
//                     body {
//                         margin: 0;
//                         padding: 20px;
//                         background-color: #f5f5f5;
//                         color: #333;
//                     }
//                     .container {
//                         max-width: 100%;
//                         margin: 0 auto;
//                         background-color: white;
//                         padding: 20px;
//                         box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                         position: relative;
//                     }
//                     header {
//                         text-align: center;
//                         margin-bottom: 20px;
//                         border-bottom: 2px solid #0066cc;
//                         padding-bottom: 10px;
//                     }
//                     h1 {
//                         color: #0066cc;
//                         margin-bottom: 5px;
//                     }
//                     .exam-info {
//                         display: flex;
//                         justify-content: space-between;
//                         margin-bottom: 20px;
//                         flex-wrap: wrap;
//                     }
//                     .section {
//                         margin-bottom: 30px;
//                         padding-bottom: 20px;
//                         border-bottom: 1px solid #ddd;
//                     }
//                     .section-title {
//                         background-color: #0066cc;
//                         color: white;
//                         padding: 10px;
//                         margin-bottom: 15px;
//                     }
//                     .question {
//                         margin-bottom: 20px;
//                         padding: 15px;
//                         background-color: #f9f9f9;
//                         border-left: 4px solid #0066cc;
//                     }
//                     .question-number {
//                         font-weight: bold;
//                         margin-bottom: 10px;
//                     }
//                     .options {
//                         margin-left: 20px;
//                     }
//                     .option {
//                         margin-bottom: 5px;
//                     }
//                     input[type="text"], input[type="number"] {
//                         padding: 5px;
//                         width: 200px;
//                         margin: 5px 0;
//                     }
//                     .submit-btn {
//                         background-color: #0066cc;
//                         color: white;
//                         border: none;
//                         padding: 10px 20px;
//                         font-size: 16px;
//                         cursor: pointer;
//                         margin-top: 20px;
//                         display: block;
//                         margin-left: auto;
//                         margin-right: auto;
//                     }
//                     .submit-btn:hover {
//                         background-color: #0055aa;
//                     }
//                     .results {
//                         margin-top: 30px;
//                         padding: 20px;
//                         background-color: #e9f7fe;
//                         border-radius: 5px;
//                         display: none;
//                     }
//                     .score {
//                         font-size: 24px;
//                         font-weight: bold;
//                         text-align: center;
//                         margin-bottom: 20px;
//                     }
//                     .correct {
//                         color: green;
//                     }
//                     .incorrect {
//                         color: red;
//                     }
//                     .feedback {
//                         margin-top: 10px;
//                         font-style: italic;
//                     }
//                     .answer-input {
//                         margin: 5px 0;
//                     }
//                     textarea {
//                         width: 100%;
//                         padding: 8px;
//                         margin-top: 5px;
//                     }
//                     .instructions {
//                         background-color: #fff9e6;
//                         padding: 15px;
//                         margin-bottom: 20px;
//                         border-left: 4px solid #ffcc00;
//                     }
//                     .time-guide {
//                         margin-top: 20px;
//                         border-collapse: collapse;
//                         width: 100%;
//                     }
//                     .time-guide th, .time-guide td {
//                         border: 1px solid #ddd;
//                         padding: 8px;
//                         text-align: left;
//                     }
//                     .time-guide th {
//                         background-color: #f2f2f2;
//                     }
//                     .image-placeholder {
//                         background-color: #eee;
//                         padding: 20px;
//                         text-align: center;
//                         margin: 10px 0;
//                         border: 1px dashed #ccc;
//                         width: 100%;
//                         height: 250px;
//                         overflow: hidden;
//                     }
//
//                     .image-placeholder img {
//                         width: 90%;          /* 🔥 Image = 90% of the placeholder */
//                         height: 100%;
//                         object-fit: contain;
//                     }
//
//
//                     /* Timer styles */
//                     .timer-container {
//                         position: fixed;
//                         top: 20px;
//                         right: 20px;
//                         background-color: #0066cc;
//                         color: white;
//                         padding: 15px;
//                         border-radius: 8px;
//                         box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//                         z-index: 1000;
//                         text-align: center;
//                         min-width: 150px;
//                     }
//                     .timer-display {
//                         font-size: 24px;
//                         font-weight: bold;
//                         margin-bottom: 5px;
//                     }
//                     .timer-label {
//                         font-size: 14px;
//                         opacity: 0.9;
//                     }
//                     .timer-warning {
//                         background-color: #ff9900;
//                     }
//                     .timer-critical {
//                         background-color: #cc0000;
//                         animation: pulse 1s infinite;
//                     }
//                     @keyframes pulse {
//                         0% { transform: scale(1); }
//                         50% { transform: scale(1.05); }
//                         100% { transform: scale(1); }
//                     }
//
//                 `}
//             </style>
//         </div>
//     );
// }
//
// export default Rism