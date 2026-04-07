// import React, { useState, useEffect } from "react";
//
// function HistoryP1Nov2024Eng() {
//
//     const correctAnswers = {
//         // QUESTION 1 – BERLIN WALL (pages 7–11 of real memo)
//         q111: ["morning of sunday", "13 august 1961", "13th august 1961", "sunday", "13 august", "august 13"],
//         q112: ["stop east berliners escaping", "stop the brain drain", "prevent east germans fleeing", "stop repatriation", "stop people leaving"],
//         q113: ["classless society", "means of production owned by government", "no private property", "state owns means of production", "no individual ownership"],
//
//         q114a: [
//             "lifestyle in the german democratic republic (gdr) was viewed as worthless",
//             "oppressive economic and political conditions of communism",
//             "life in the western sector/capitalism was better",
//             "gdr lifestyle worthless",
//             "east worthless",
//             "communism oppressive",
//             "west better"
//         ],
//
//         q114b: [
//             "brain drain",
//             "many workers fled",
//             "democratic republic was left with lesser skilled",
//             "job losses",
//             "no bonuses",
//             "no incentives",
//             "workers fled to west berlin"
//         ],
//
//         q115: ["streets torn up", "barricades of paving stones", "tanks gathered", "subways interrupted", "railway services interrupted", "no longer allowed to enter west"],
//
//         q121: ["six trucks", "eighty yards", "armed soldiers", "machine guns", "barbed wire", "cordoned off", "no one stirred"],
//
//         q122: ["border closed", "no free movement", "people trapped", "iron curtain intensified", "division of berlin", "no longer any movement"], // 4 marks
//
//         q123: [
//             "written by historian p fisher",
//             "great power conflict",
//             "eyewitness accounts",
//             "actual date 13 august 1961",
//             "hans peters",
//             "ursula heinemann",
//             "corroborated by sources 1a 1c 1d",
//             "taken from a book",
//             "p fisher a historian"
//         ], // 4 marks
//
//         q13: [
//             "both show construction to stop east berliners escaping",
//             "both mention tanks",
//             "both mention armoured vehicles",
//             "both refer to planned operation",
//             "tanks gathered",
//             "armoured cars and water cannons",
//             "masterfully planned",
//             "division of berlin"
//         ], // 4 marks
//
//         q141: ["visiting relatives", "had been visiting relatives", "family visit"],
//
//         q142: [
//             "capitalist countries supported west",
//             "united states britain france",
//             "individuals could freely make profit",
//             "free enterprise",
//             "private ownership",
//             "economic system where individuals could freely make profit"
//         ],
//
//         q143: [
//             "escape the brutal dictatorship",
//             "economic hardships",
//             "better life in west",
//             "family separation",
//             "wall destroyed families",
//             "desperate measures to reunite",
//             "supply of essential goods",
//             "western powers improved economy"
//         ], // 4 marks
//
//         q144a: ["machine-gunned", "shot dead", "instantly killed"],
//         q144b: ["arrested", "anti-state provocation", "put on trial"],
//         q144c: ["jailed", "imprisoned"],
//
//         q151: [
//             "soldiers defecting",
//             "trying to escape",
//             "jump over the wall",
//             "better life",
//             "protection of good communists",
//             "irony",
//             "communist soldiers escaping",
//             "eastern berliners including soldiers"
//         ],
//
//         q152: ["west welcomed defectors", "west better", "defectors welcome"],
//
//         q153: [
//             "helpless",
//             "could do nothing",
//             "no longer concerned",
//             "crisis deepened",
//             "defections no longer unavoidable",
//             "jumpy generals"
//         ],
//         q16: ["berlin was divided into four zones, with the united states, britain and france jointly administering their zones as west berlin, whereas the soviet union administered theirs as east berlin", "the soviet government of the german democratic republic (gdr) built the berlin wall on 13 august 1961 to stop east berliners from escaping to west berlin", "people could no longer flee from communist east berlin even though it was 'oppressive' to them", "even those who travelled to west berlin for work could no longer cross the border to return to east berlin", "people shouted and cried at the realisation that the border between east and west berlin was closed", "those who desperately wanted to cross had to either secretly crawl under the barbed wire or risk death", "people on either side of the border were separated from their families on 13 august 1961", "the only form of contact separated people could make with their families was to wave at each other across the barbed wire", "some people chose to smuggle their families across the border", "some attempted re-union by digging a tunnel", "people who were caught crossing the border were killed or jailed", "east berliners, including soldiers (security guards), risked their lives by jumping over the wall – to the western sector", "defectors from east berlin used different methods to jump over the berlin wall", "other methods of escaping were used, e.g. athletes used sport to defect", "some committed suicide by driving against the wall in an attempt to escape"],
//
//         // QUESTION 2 – Angola
//         q211: ["cuban", "angolan military forces", "south african forces", "national union for the total independence of angola", "unita"],
//         q212: ["a state of having total control of oneself/organisation/country", "a condition of being free from control by another person/organisation/government/foreign power"],
//         q213: ["it led to the defeat of the sadf", "it assured victory for the mpla", "it helped to defend the communist/socialist government in angola", "it prevented capitalist takeover of angola through sa/usa/unita"],
//         q214: ["the notion of white superiority was erased/destroyed", "the defeat of the sadf in angola was a boost for liberation movements outside south africa/psychological boost for africans", "the defeat of south africa by angola opened way for other regional countries, e.g. namibia, to get its independence from south africa"],
//         q215: ["it was written by d goldberg, an anti-apartheid activist, thus biased/one-sided", "it only highlights the mpla's victory", "the language used is biased against south africa and the united states (cuban-soviet union contribution was enormous in supporting mpla)", "the writer portrays south africa and the united states as the aggressors (oppressors) who denied angolans their independence"],
//         q221: ["to crush the legitimate interests of the angolan people", "impose a puppet government"],
//         q222: ["to use them as proxies so that the us is not actively involved", "south africa and the congo were closer to angola", "both countries supported capitalism/opposed to communism"],
//         q223: ["the soviet union offered technical supervisory military strategies", "the soviet union offered strong support because it was one of the superpowers"],
//         q224: ["the overwhelming victory at cuito cuanavale", "the withering (humiliating) advance by the powerful front of cubans in south-western angola"],
//         q231: ["to show the role played by the united nations in mediating for peace in angola after the battle of cuito cuanavale", "to show each of the countries and representatives present at the signing of the tripartite accord"],
//         q232: ["to facilitate/mediate the smooth signing of the tripartite accord", "to show that the signing of the tripartite accord would be internationally recognised", "to accelerate agreements about the independence of angola", "to add validity and relevance to the tripartite accord process", "to uphold the united nation’s mandate to preserve world peace"],
//         q24: ["source 2a mentions the countries that signed the tripartite accord (three-party treaty – angola, cuba and south africa) and source 2c shows the leaders representing their countries that signed the tripartite accord", "source 2a states that the mpla remained the governing party in angola after the tripartite accord (three-party treaty) in 1988 and in source 2c the mpla's leader, dos santos was present at the signing of the tripartite accord", "both sources refer to the signing of the tripartite accord in 1988"],
//         q251: ["south africa", "central intelligence agency", "cia", "national front for the liberation of angola", "fnla", "the mercenaries (guerrillas)", "national union for the total independence of angola", "unita", "zairian troops"],
//         q252: ["the end of the battle of cuito cuanavale made it possible for angolans to gain independence", "the defeat of the racist government/south african defence force (sadf) was a major victory for cuba and angola", "it was the final act that ended the sabotage/disruption by the sadf in angola", "the defeat of the sadf in the battle of cuito cuanavale led to negotiations which paved the way for political stability in southern africa"],
//         q253a: ["we were never able to see any but most junior ministers"],
//         q253b: ["we were received by the highest officials", "were immediately offered whatever we wanted and needed"],
//         q254: ["a cuban humanitarian foreign policy that advocated for cuban support to other communist countries", "it was cuba's humanitarian foreign policy that the unity/solidarity amongst communists should be defended world-wide"],
//         q26: ["the defeat of south african defence force (sadf) by the cuban troops at cuito cuanavale was a turning point/it led to a negotiation process in southern africa", "the tripartite accord (three-party treaty) that was signed at the end of the battle of cuito cuanavale in 1988 led to namibian and angolan independence", "the peaceful negotiations facilitated by the united nations led to the withdrawal of foreign countries from angola", "the victory of cuba backed by the soviet union at the battle of cuito cuanavale forced south africa to sit around the negotiating table", "the united nations facilitated the signing of the tripartite accord (three-party treaty) at the end of the battle of cuito cuanavale", "the peaceful negotiations at the tripartite accord (three-party treaty) led to the establishment of democracy in the southern africa region", "the south african government was forced to negotiate with the south african liberation movements", "the apartheid government lost control and support in the 1980s - therefore could no longer destabilise its neighbours", "it enhanced the status of cuba as one of the main political players in southern africa", "it ended the destabilisation of the southern african region by the apartheid state", "the end of the war at battle of cuito cuanavale was setback for the capitalist bloc"],
//
//         // QUESTION 3 – March on Washington
//         q311: ["it is a living petition in the flesh of the scores of thousands of citizens of both races who will be present from all parts of our country"],
//         q312: ["orderly", "not subservient (passive)", "proud", "not arrogant (big-headed)", "non-violent", "not timid (frightened)", "unified in purposes and behaviour", "not splintered (broken)", "outspoken, but not raucous (violent)", "to resist provocations (incitements) to disorder and to violence", "to remember that evil persons are determined to smear this march and to discredit the cause of equality", "to place the cause above all else"],
//         q313: ["the ku klux klan (kkk)", "white supremacists", "segregationists", "conservatives", "right-wing"],
//         q314: ["to fully support the objectives of the civil rights movement (crm)", "to avoid putting individual needs above those of the civil society/unity", "to stop advancing the cause of segregation/discrimination in the usa"],
//
//         q321: ["it refers to basic rights that everyone is entitled to enjoy"],
//         q322: ["full civil rights for blacks", "jobs and freedom"],
//         q323: ["to show the support the march had from various spheres of lives", "to show that the civil rights movement was inclusive of all races", "to appeal for more support for the civil rights movement"],
//         q324: ["it remains an important speech for the civil rights movement in the usa because it gave hope to african americans", "the speech made martin luther king jr famous and contributed to his nobel peace prize", "the speech reminded all americans that they were all equal under the usa constitution", "the speech was televised across the world to an international audience and brought more support to the civil rights movement", "it appealed to the conscience of the us congress and it led to the signing of the civil rights act of 1964"],
//         q331: ["we demand an end to police brutality now", "we march for jobs for all now", "we march for integrated schools now", "we demand voting rights now", "we march for higher minimum wages coverage for all workers now", "no us dough to help jim crow grow"],
//         q332: ["to show the demands that african americans were making for their civil rights", "to show that males and females were marching", "to show that the march was peaceful (non-violent)", "to show that both black and white americans attended the march on washington", "to show the large number of people who marched to washington and listened to martin luther king jr's speech", "to show the determination of african americans towards achieving equal rights"],
//         q34: ["source 3b mentions that 250 000 civil rights activists converged at the lincoln memorial during the march on washington and source 3c shows a large number of people in the march on washington/both sources highlight attendance by a large crowd", "source 3b states that the marchers demanded their civil rights, jobs and freedom and source 3c depicts marchers carrying placards reflecting their demands/both sources refer to demands made", "both sources highlight the peaceful nature of the march on washington"],
//         q351: ["exercising their rights to assemble peaceably", "direct the widest possible attention to a great national issue", "intensified and widespread public awareness of the need to move forward in achieving these objectives", "one cannot help but be impressed with the deep fervour (passion) and the quiet dignity that characterises the thousands who have gathered in the nation's capital from across the country to demonstrate their faith and confidence in our democratic form of government", "deserve our appreciation for the detailed preparations that made it possible and for the orderly manner in which it has been conducted"],
//         q352: ["for the detailed preparations that made it possible", "for the orderly manner in which it has been conducted"],
//         q353: ["all forms of racial inequality in the usa in the 1960s which the civil rights movement protested against in a non-violent manner", "separation of races based on skin colour rejected by the civil rights movement in the usa in the 1960s"],
//         q354: ["the civil rights bill", "proposals to broaden and strengthen the manpower development and training program", "the youth employment bill", "amendments to the vocational education program", "the establishment of a work-study program for high school age youth", "strengthening of the adult basic education provisions"],
//         q355: ["the media statement was released on the actual day of the march and published the following day on 29 august 1963", "it was taken from a media statement from the office of the white house press secretary", "it was extracted from a statement by the president of the usa – jf kennedy that ultimately led to the passing of the civil rights act", "it highlights how president kennedy appreciated the manner in which the march unfolded"],
//         q36: ["the march on washington was organised by civil rights activists for jobs and freedom", "to address living conditions (bread and butter issues) affecting all citizens", "to express the dreams, aspirations and prayers of the civil rights activists in the usa", "on 28 august 1963, about 250 000 people marched to the lincoln memorial for their civil rights", "there were a variety of speakers and artists who addressed the large crowd to appeal to more supporters", "to listen to martin luther king jr who delivered his famous 'i have a dream' speech at the march", "to put pressure on the usa government to end racial discrimination", "both black and white americans attended the march on washington, making it the first integrated march in the usa", "the marchers carried placards which listed their demands", "the march on washington was to increase employment and eliminate discrimination"]
//     };
//
//     // Simple keyword lists for essay auto-marking (50 marks each) - Refined based on guidelines
//     const essayKeywords = {
//         "4": { intro: ["cold war", "vietnam", "proxy war", "us technological superiority", "guerrillas", "viet cong", "1962-1973", "failure to defeat"], body: ["division of north and south vietnam", "us intervention", "ho chi minh trail", "safe village policy", "gulf of tonkin", "operation rolling thunder", "napalm", "agent orange", "tet offensive", "guerrilla warfare", "booby traps", "search and destroy", "my lai massacre", "vietnamisation", "paris peace accords", "us withdrawal", "saigon 1975", "communist unity"], conclusion: ["us defeat", "lessons", "spread of communism", "technological failure"] },
//         "5": { intro: ["congo independence", "mobutu sese seko", "1960s", "political/economic/social/cultural policies", "anti-colonial", "zaireanisation", "authenticity"], body: ["paternalism", "political parties", "elections", "kasavubu", "lumumba", "tshombe", "katanga secession", "coup d'état", "one-party state", "mpr", "personality cult", "mobutuism", "authoritarian", "us support", "centralised government", "capitalist economy", "nationalisation", "zaireanisation", "nepotism", "kleptocracy", "retrocession", "inflation", "foreign aid", "elitism", "education system", "french language", "abacos", "african music/art/dance", "nation building"], conclusion: ["anti-colonial legacy", "failure", "corruption", "instability"] },
//         "6": { intro: ["black power movement", "1960s", "militant approach", "discrimination", "african americans", "philosophy", "self-reliance", "pride", "malcolm x", "stokely carmichael", "black panthers"], body: ["jim crow laws", "ghettos", "police brutality", "nationalist feelings", "assertiveness", "self-defence", "black pride", "afro hairstyle", "black is beautiful", "armed self-defence", "bloodshed for revolution", "black nationalism", "self-respect", "self-discipline", "violence as self-defence", "non-violent failure", "ten point plan", "feeding schemes", "childcare", "literacy projects", "patrolled streets", "policing the police", "black history in schools", "exclusion of white liberals", "separate countries", "anti-vietnam war"], conclusion: ["impact on civil rights", "militant vs. empowerment", "legacy"] }
//     };
//     const essayKeywordsMap = {
//         4: [...essayKeywords["4"].intro, ...essayKeywords["4"].body, ...essayKeywords["4"].conclusion],
//         5: [...essayKeywords["5"].intro, ...essayKeywords["5"].body, ...essayKeywords["5"].conclusion],
//         6: [...essayKeywords["6"].intro, ...essayKeywords["6"].body, ...essayKeywords["6"].conclusion]
//     };
//     // States
//     const [answers, setAnswers] = useState({});
//     const markingGuidelines = correctAnswers;  // because you already stored all correct answers here
//     const [newScore, setScore] = useState(null);
//     const [feedback, setFeedback] = useState([]);
//     const [showSolutions, setShowSolutions] = useState(false);
//     const [popupId, setPopupId] = useState(null);
//     const [percent, setPercent] = useState(null);
//     const [message, setMessage] = useState("");
//     const [messageColor, setMessageColor] = useState("");
//     const [showResults, setShowResults] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // Updated to 3 hours in seconds as per paper
//     const [incorrectAnswers, setIncorrectAnswers] = useState([]);
//     const [showSolutionPopup, setShowSolutionPopup] = useState(false);
//
//
//     // Selected questions states
//     const [selectedSectionA, setSelectedSectionA] = useState([]); // Array for Q1, Q2, Q3
//     const [selectedSectionB, setSelectedSectionB] = useState([]); // Array for Q4, Q5, Q6
//     const [questionScores, setQuestionScores] = useState({});
//
//     // Essay states
//     const [q4IntroText, setQ4IntroText] = useState("");
//     const [q4BodyText, setQ4BodyText] = useState("");
//     const [q4ConclusionText, setQ4ConclusionText] = useState("");
//     const [q5IntroText, setQ5IntroText] = useState("");
//     const [q5BodyText, setQ5BodyText] = useState("");
//     const [q5ConclusionText, setQ5ConclusionText] = useState("");
//     const [q6IntroText, setQ6IntroText] = useState("");
//     const [q6BodyText, setQ6BodyText] = useState("");
//     const [q6ConclusionText, setQ6ConclusionText] = useState("");
//     const [resultFeedback, setResultFeedback] = useState("");
//     const [totalScore, setTotalScore] = useState(0);
//
//
//
//     // Retry Exam
//     const retryExam = () => {
//         setAnswers({});
//         setScore(null);
//         setPercent(0);
//         setMessage("");
//         setResultFeedback("");
//         setShowResults(false);
//         setShowSolutions(false);
//         setTimeLeft(3 * 60 * 60);
//         setSelectedSectionA([]);
//         setSelectedSectionB([]);
//         setQ4IntroText("");
//         setQ4BodyText("");
//         setQ4ConclusionText("");
//         setQ5IntroText("");
//         setQ5BodyText("");
//         setQ5ConclusionText("");
//         setQ6IntroText("");
//         setQ6BodyText("");
//         setQ6ConclusionText("");
//         window.scrollTo(0, 0);
//     };
//
//     // Exit exam
//     const exitExam = () => {
//         window.location.href = "/";
//     };
//
//     // CORRECT ANSWERS (based on actual Nov 2024 paper + marking guidelines)
//
//     // MARK ALLOCATION per sub-question (from official marking guidelines)
//     const marksAllocation = {
//         // 1-mark
//         q111: 1, q112: 1, q144a: 1, q144b: 1, q144c: 1, q253a: 1, q253b: 1, q311: 1, q354: 1,
//         // 2-mark (any 1 × 2 or any 2 × 1)
//         q113: 2, q114a: 2, q114b: 2, q115: 2, q141: 2, q142: 2, q151: 2, q152: 2, q153: 2,
//         q212: 2, q213: 2, q214: 2, q221: 2, q222: 2, q223: 2, q224: 2, q231: 2, q251: 2, q254: 2,
//         q312: 2, q313: 2, q321: 2, q322: 2, q331: 2, q351: 2, q352: 2, q353: 2,
//         // 3-mark (any 3 × 1)
//         q121: 3,
//         // 4-mark (any 2 × 2) – MOST IMPORTANT FIX
//         q122: 4, q123: 4, q13: 4, q143: 4, q215: 4, q232: 4, q24: 4, q252: 4, q314: 4, q323: 4, q324: 4, q332: 4, q34: 4, q355: 4,
//         // 8-mark paragraphs
//         q16: 8, q26: 8, q36: 8
//     };
//
//     // Timer
//     useEffect(() => {
//         if (showResults || timeLeft <= 0) return;
//         const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//         return () => clearInterval(timer);
//     }, [timeLeft, showResults]);
//
//
//     const formatTime = (seconds) => {
//         const hrs = Math.floor(seconds / 3600);
//         const mins = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//     };
//
//     // Handle question selection for Section A (source-based: max 2, min 1)
//     const handleSectionAChange = (q) => {
//         setSelectedSectionA(prev => {
//             if (prev.includes(q)) return prev.filter(item => item !== q);
//             if (prev.length < 2) return [...prev, q];
//             return prev;
//         });
//     };
//
//     // Handle Section B (essays: max 2, min 1)
//     const handleSectionBChange = (q) => {
//         setSelectedSectionB(prev => {
//             if (prev.includes(q)) return prev.filter(item => item !== q);
//             if (prev.length < 2) return [...prev, q];
//             return prev;
//         });
//     };
//
//     // Validate selection: at least 1 source-based, at least 1 essay, total 3 questions
//     const validateSelection = () => {
//         const total = selectedSectionA.length + selectedSectionB.length;
//         if (total !== 3 || selectedSectionA.length < 1 || selectedSectionB.length < 1) {
//             alert("Please select exactly 3 questions: at least 1 from Section A and 1 from Section B.");
//             return false;
//         }
//         return true;
//     };
//
//     // Essay marking function (adapted for History essays, no additional, max 50)
//     const checkEssay = (choice, introText, bodyText, conclusionText) => {
//         const fullText = (introText + " " + bodyText + " " + conclusionText).toLowerCase();
//         const keywords = essayKeywordsMap[choice] || [];
//         const found = keywords.filter(kw => fullText.includes(kw.toLowerCase())).length;
//         const totalKeywords = keywords.length;
//
//         const contentMarks = totalKeywords > 0 ? Math.round((found / totalKeywords) * 40) : 0;
//
//         let structure = 0;
//         if (introText.trim().length > 30) structure += 4;
//         if (bodyText.trim().split(/\s+/).length > 300) structure += 4;
//         if (conclusionText.trim().length > 30) structure += 2;
//
//         const total = Math.min(contentMarks + structure, 50);
//
//         return {
//             score: total,
//             feedback: `Found ${found}/${totalKeywords} keywords → ${contentMarks}/40 content + ${structure}/10 structure = ${total}/50`
//         };
//     };
//
//     // Handle change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAnswers(prev => ({ ...prev, [name]: value.toLowerCase() }));
//     };
//
//     // Show popup
//     const showPopup = (id) => setPopupId(id);
//     const closePopup = () => setPopupId(null);
//     const markParagraph = (text, qNum) => {
//         if (!text || text.trim().length < 40) return 0;
//
//         const lowerText = text.toLowerCase();
//         const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
//
//         const requiredKeywords = {
//             1: ["13 august", "1961", "border closed", "families separated", "barbed wire", "tanks", "escape", "tunnel", "shot", "defect", "jump", "wave", "trapped", "iron curtain"],
//             2: ["cuito cuanavale", "defeat", "sadf", "turning point", "tripartite", "accord", "namibia", "independence", "negotiation", "peace", "1988", "cuban", "withdrawal"],
//             3: ["28 august", "1963", "250 000", "jobs", "freedom", "i have a dream", "peaceful", "lincoln memorial", "mlk", "king", "civil rights act", "police brutality", "voting rights"]
//         };
//
//         const keywords = requiredKeywords[qNum] || [];
//         const found = keywords.filter(kw => lowerText.includes(kw)).length;
//
//         if (wordCount < 50) return Math.min(found >= 1 ? 2 : 0, 4);
//         if (found >= 7 && wordCount >= 70) return 8;
//         if (found >= 6) return 7;
//         if (found >= 5) return 6;
//         if (found >= 4) return 5;
//         if (found >= 3) return 4;
//         if (found >= 2) return 3;
//         if (found >= 1) return 2;
//         return 1;
//     };
//     // Compute scores
//     const computeScore = () => {
//         if (!validateSelection()) return;
//
//         let total = 0;
//         const sectionScores = {};
//
//         selectedSectionA.forEach(qNum => {
//             let qScore = 0;
//
//             Object.keys(correctAnswers).filter(k => k.startsWith(`q${qNum}`) && !k.endsWith('6')).forEach(key => {
//                 const userAnswer = (answers[key] || "").toLowerCase().trim();
//                 const correctList = correctAnswers[key];
//                 const maxMark = marksAllocation[key];
//
//                 if (!correctList || !maxMark) return;
//
//                 // === NEW ACCURATE DBE MARKING LOGIC (2024) ===
//                 let correctCount = 0;
//                 correctList.forEach(phrase => {
//                     if (userAnswer.includes(phrase.toLowerCase())) {
//                         correctCount++;
//                     }
//                 });
//
//                 let awarded = 0;
//                 if (maxMark === 1)  awarded = correctCount >= 1 ? 1 : 0;
//                 if (maxMark === 2)  awarded = correctCount >= 1 ? 2 : 0;   // Any ONE fact = full 2 marks
//                 if (maxMark === 3)  awarded = Math.min(correctCount, 3);  // Max 3 facts
//                 if (maxMark === 4)  awarded = correctCount >= 2 ? 4 : 0;   // Any TWO facts = full 4 marks
//
//                 qScore += awarded;
//             });
//
//             // Paragraph questions 1.6 / 2.6 / 3.6
//             // Add this inside the selectedSectionA.forEach loop, after subquestions
//             const paraKey = `q${qNum}6`;
//             if (answers[paraKey]) {
//                 qScore += markParagraph(answers[paraKey], qNum);
//             }
//             const final = Math.min(qScore, 50);
//             sectionScores[qNum] = final;
//             total += final;
//         });
//
//         // Essays (keep your existing essay code or this simple one)
//         // Essays – NOW 100% DBE-accurate (0 if blank)
//         // Essays – fully corrected 0–50 (cannot exceed max)
//         selectedSectionB.forEach(choice => {
//             let intro = (choice === "4" ? q4IntroText :
//                 choice === "5" ? q5IntroText :
//                     choice === "6" ? q6IntroText : "").trim();
//
//             let body = (choice === "4" ? q4BodyText :
//                 choice === "5" ? q5BodyText :
//                     choice === "6" ? q6BodyText : "").trim();
//
//             let conclusion = (choice === "4" ? q4ConclusionText :
//                 choice === "5" ? q5ConclusionText :
//                     choice === "6" ? q6ConclusionText : "").trim();
//
//             // If blank → 0
//             if ((intro + body + conclusion).trim().length === 0) {
//                 sectionScores[choice] = 0;
//                 total += 0;
//                 return;
//             }
//
//             const text = (intro + " " + body + " " + conclusion).toLowerCase();
//             const keywords = essayKeywordsMap[choice] || [];
//
//             // Count keywords found
//             const found = keywords.filter(k => text.includes(k.toLowerCase())).length;
//
//             // Content mark (max 40)
//             const contentMarks = Math.min(
//                 Math.round((found / Math.max(keywords.length, 1)) * 40),
//                 40
//             );
//
//             // Structure (max 10)
//             let structureMarks = 0;
//             if (intro.length > 20) structureMarks += 3;
//             if (body.length > 200) structureMarks += 5;
//             if (conclusion.length > 20) structureMarks += 2;
//
//             structureMarks = Math.min(structureMarks, 10);
//
//             // FINAL SCORE MAX 50
//             const finalEssayScore = Math.min(contentMarks + structureMarks, 50);
//
//             sectionScores[choice] = finalEssayScore;
//             total += finalEssayScore;
//         });
//
//         setQuestionScores(sectionScores);
//         setTotalScore(total);
//         setPercent((total / 150 * 100).toFixed(1));
//         setShowResults(true);
//     };
//     const checkAnswers = () => {
//         let incorrectList = [];
//
//         Object.keys(correctAnswers).forEach((q) => {
//             const userAnswer = (answers[q] || "").trim().toLowerCase();
//             const correctList = correctAnswers[q].map(a => a.toLowerCase());
//
//             // mark as incorrect if:
//             // - user left it blank
//             // - user’s answer does not match ANY accepted correct answer
//             const isCorrect = correctList.some(correct =>
//                 userAnswer.includes(correct) || correct.includes(userAnswer)
//             );
//
//             if (!isCorrect) {
//                 incorrectList.push({
//                     question: q,
//                     userAnswer: answers[q] || "(No answer given)",
//                     correctAnswer: correctAnswers[q].join(", ")
//                 });
//             }
//         });
//
//         setIncorrectAnswers(incorrectList);
//         setShowResults(true);
//     };
//
//     return (
//         <div className="exam-container">
//             {/* === BEAUTIFUL COVER PAGE === */}
//             <div className="cover-page">
//                 <div className="header-crest">
//                     <div className="crest-circle">
//                         <div className="bird-wings">✦</div>
//                         <div className="shield">DBE</div>
//                     </div>
//                 </div>
//
//                 <h1 className="dept-title">basic education</h1>
//                 <p className="dept-subtitle">
//                     Department: Basic Education
//                 </p>
//
//                 <h1>NATIONAL SENIOR CERTIFICATE</h1>
//                 <h1>GRADE 12</h1>
//
//                 <div className="subject-box">
//                     <h2>HISTORY P1</h2>
//                     <h3>NOVEMBER 2024</h3>
//                 </div>
//
//                 <div className="exam-info">
//                     <p><strong>MARKS:</strong> 150</p>
//                     <p><strong>TIME:</strong> 3 hours</p>
//                 </div>
//
//                 <p className="page-info">
//                     This question paper consists of 9 pages and an addendum of 14 pages.
//                 </p>
//
//             </div>
//
//             {/* === TIMER & INSTRUCTIONS === */}
//
//
//             {/* Instructions and Information */}
//             <div className="instructions" style={{marginBottom: '20px', border: '1px solid black', padding: '20px'}}>
//                 <h1>INSTRUCTIONS AND INFORMATION</h1>
//                 <ol>
//                     <li>This question paper consists of SECTION A and SECTION B based on the prescribed content
//                         framework in the CAPS document.
//                         <ul>
//                             <li><strong>SECTION A: SOURCE-BASED QUESTIONS</strong></li>
//                             <ul>
//                                 <li>QUESTION 1: THE COLD WAR: THE ORIGINS OF THE COLD WAR</li>
//                                 <li>QUESTION 2: INDEPENDENT AFRICA: CASE STUDY – ANGOLA</li>
//                                 <li>QUESTION 3: CIVIL SOCIETY PROTESTS FROM THE 1950s TO THE 1970s: THE US CIVIL RIGHTS
//                                     MOVEMENT
//                                 </li>
//                             </ul>
//                             <li><strong>SECTION B: ESSAY QUESTIONS</strong></li>
//                             <ul>
//                                 <li>QUESTION 4: THE EXTENSION OF THE COLD WAR: CASE STUDY – VIETNAM</li>
//                                 <li>QUESTION 5: INDEPENDENT AFRICA: CASE STUDY – THE CONGO</li>
//                                 <li>QUESTION 6: CIVIL SOCIETY PROTESTS FROM THE 1950s TO THE 1970s: THE BLACK POWER
//                                     MOVEMENT
//                                 </li>
//                             </ul>
//                         </ul>
//                     </li>
//                     <li>SECTION A consists of THREE source-based questions. Source material that is required to answer
//                         these questions can be found in the ADDENDUM.
//                     </li>
//                     <li>SECTION B consists of THREE essay questions.</li>
//                     <li>Answer THREE questions as follows:
//                         <ul>
//                             <li>4.1 At least ONE must be a source-based question and at least ONE must be an essay
//                                 question.
//                             </li>
//                             <li>4.2 The THIRD question can be either a source-based question or an essay question.</li>
//                         </ul>
//                     </li>
//                     <li>You are advised to spend at least ONE hour per question.</li>
//                     <li>When answering questions, candidates should apply their knowledge, skills and insight.</li>
//                     <li>You will be disadvantaged by merely rewriting the sources as answers.</li>
//                 </ol>
//             </div>
//
//             <h2>History P1 Nov 2024 Eng</h2>
//             <div className="timer-bar">
//                 <div className="timer-content">
//                     <span>⏱ Time Remaining: <strong>{formatTime(timeLeft)}</strong></span>
//                 </div>
//             </div>
//             <form onSubmit={e => e.preventDefault()}>
//                 {/* Section A Selection */}
//                 <h1><strong>Select Section A Questions (1 or 2)</strong></h1>
//                 <label><input type="checkbox" checked={selectedSectionA.includes("1")}
//                               onChange={() => handleSectionAChange("1")}/> Q1: Berlin Wall</label>
//                 <label><input type="checkbox" checked={selectedSectionA.includes("2")}
//                               onChange={() => handleSectionAChange("2")}/> Q2: Angola</label>
//                 <label><input type="checkbox" checked={selectedSectionA.includes("3")}
//                               onChange={() => handleSectionAChange("3")}/> Q3: Civil Rights March</label>
//
//                 {/* Conditionally render selected questions */}
//                 {selectedSectionA.includes("1") && (
//                     <div>
//                         <h2>QUESTION 1: HOW WERE THE LIVES OF BERLINERS AFFECTED BY THE CONSTRUCTION OF THE BERLIN WALL
//                             IN 1961?</h2>
//                         <p>1.1.1 When, according to the source, did the construction of the Berlin Wall begin?</p>
//                         <input name="q111" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.1.2 Give ONE reason in the source, why the German Democratic Republic (GDR) constructed the
//                             Berlin Wall.</p>
//                         <input name="q112" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.1.3 Define the concept communism in your own words.</p>
//                         <input name="q113" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.1.4 (a) 'the credibility of the GDR'</p>
//                         <input name="q114a" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.1.4 (b) 'the workforce of the GDR'</p>
//                         <input name="q114b" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.1.5 Quote TWO pieces of evidence from the source which indicates that 'within a day the
//                             West of Berlin was completely sealed off from the East'.</p>
//                         <input name="q115" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.2.1 Identify THREE incidents in the source that Hans Peters witnessed at 2.20 a.m. (13
//                             August 1961) while he was on border duty in the French Sector of West Berlin.</p>
//                         <input name="q121" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.2.2 Comment on what is implied by the words, 'It's all over now with trips to Berlin', in
//                             the context of what happened on 13 August 1961.</p>
//                         <input name="q122" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.2.3 Explain why a historian would regard this source as reliable when researching an
//                             account of what transpired on the morning of 13 August 1961.</p>
//                         <input name="q123" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.3 Explain how information in Source 1A supports the evidence in Source 1B regarding events
//                             that took place in Berlin on 13 August 1961.</p>
//                         <input name="q13" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.1 Why, according to the source, was Noffke in West Berlin on the evening before the
//                             construction of the Berlin Wall?</p>
//                         <input name="q141" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.2 Explain the concept capitalist in the context of West Berlin.</p>
//                         <input name="q142" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.3 What conclusions can be drawn from the fact that Noffke and a group were prepared to
//                             dig a tunnel of 200 yards to smuggle their families to the West?</p>
//                         <input name="q143" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.4 (a) Noffke</p>
//                         <input name="q144a" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.4 (b) Noffke's colleagues</p>
//                         <input name="q144b" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.4.4 (c) Noffke's wife</p>
//                         <input name="q144c" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.5.1 Explain whether you would consider the words, 'The men are becoming more jumpy as the
//                             Berlin Crisis deepens, Comrade …', to be an appropriate caption for the cartoon.</p>
//                         <input name="q151" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.5.2 Comment on the implication of the message on the signpost on the Western Sector side,
//                             '… DEFECTORS WELCOME'.</p>
//                         <input name="q152" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.5.3 What conclusion can you draw from the body language of the two generals in the
//                             foreground, in the context of defections that were taking place?</p>
//                         <input name="q153" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>1.6 Using the information in the relevant sources and your own knowledge, write a paragraph
//                             of about EIGHT lines (about 80 words) explaining how the lives of Berliners were affected by
//                             the construction of the Berlin Wall in 1961.</p>
//                         <textarea name="q16" onChange={handleChange}/>
//                     </div>
//                 )}
//                 {selectedSectionA.includes("2") && (
//                     <div>
//                         <h2>QUESTION 2: HOW DID THE DEFEAT OF THE SADF AT THE BATTLE OF CUITO CUANAVALE IN ANGOLA LEAD
//                             TO PEACEFUL NEGOTIATIONS IN SOUTHERN AFRICA IN THE LATE 1980s?</h2>
//                         <p>2.1.1 List FOUR military forces in the source that were involved in the final confrontation
//                             at the Battle of Cuito Cuanavale.</p>
//                         <input name="q211" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.1.2 Define the term sovereignty in your own words.</p>
//                         <input name="q212" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.1.3 Using the information in the source and your own knowledge, explain the significance of
//                             Angola's air superiority during the Battle of Cuito Cuanavale.</p>
//                         <input name="q213" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.1.4 Comment on what is implied by the statement, 'it was important in southern Africa that
//                             white South Africans could be killed by bullets fired by black Africans and black Cubans',
//                             in the context of the Angolan war.</p>
//                         <input name="q214" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.1.5 Explain the limitations of the source to a historian researching the outcome of the
//                             Battle of Cuito Cuanavale.</p>
//                         <input name="q215" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.2.1 Give TWO reasons in the source why the United States government implemented a covert
//                             plan in Angola.</p>
//                         <input name="q221" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.2.2 Explain why the United States used Mobutu and South Africa to intervene during the
//                             Battle of Cuito Cuanavale.</p>
//                         <input name="q222" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.2.3 Comment on why Castro believed, 'there would have been no possibility of a successful
//                             outcome in Angola without the political and logistical support from the Soviet Union …'.</p>
//                         <input name="q223" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.2.4 Quote TWO pieces of evidence from the source that suggests why South Africa had 'to sit
//                             down around the negotiating table'.</p>
//                         <input name="q224" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.3.1 Explain why you think this photograph was taken.</p>
//                         <input name="q231" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.3.2 What do you think was the significance of the presence of the United Nations' Secretary
//                             General during the signing of the Tripartite Accord?</p>
//                         <input name="q232" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.4 Comment on how the information in Source 2A supports the evidence in Source 2C regarding
//                             the signing of the Tripartite Accord.</p>
//                         <input name="q24" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.5.1 Identify, in the source, any TWO forces/parties that waged a combined attack on the
//                             Angolans (MPLA) during the Angolan Civil War.</p>
//                         <input name="q251" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.5.2 Using the information in the source and your own knowledge, comment on what was implied
//                             by Mandela's statement, '… your forces in the Battle of Cuito Cuanavale was of truly
//                             historic significance.'</p>
//                         <input name="q252" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.5.3 (a) Western governments</p>
//                         <input name="q253a" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.5.3 (b) Cuba</p>
//                         <input name="q253b" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.5.4 Explain the term internationalism in the context of Cuba's foreign policy.</p>
//                         <input name="q254" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>2.6 Using the information in the relevant sources and your own knowledge, write a paragraph
//                             of about EIGHT lines (about 80 words) explaining how the defeat of the South African Defence
//                             Force (SADF) at the Battle of Cuito Cuanavale in Angola led to peaceful negotiations in
//                             southern Africa in the late 1980s.</p>
//                         <textarea name="q26" onChange={handleChange}/>
//                     </div>
//                 )}
//                 {selectedSectionA.includes("3") && (
//                     <div>
//                         <h2>QUESTION 3: WHY DID CIVIL RIGHTS MARCHERS IN THE USA ORGANISE THE MARCH ON WASHINGTON ON 28
//                             AUGUST 1963?</h2>
//                         <p>3.1.1 Quote evidence from the source suggesting why organisers of the March on Washington
//                             regarded it as more than just a demonstration.</p>
//                         <input name="q311" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.1.2 State any TWO ways in the source in which the organisers wanted the March to be a
//                             disciplined and purposeful demonstration.</p>
//                         <input name="q312" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.1.3 Who do you think are referred to as 'evil persons are determined to smear this March
//                             and to discredit (doubt) the cause of equality by deliberate efforts', with regard to the
//                             preparations for the March on Washington in 1963?</p>
//                         <input name="q313" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.1.4 Comment on the implication of the statement, 'We ask each and every one in attendance …
//                             to place the cause (March on Washington) above all else.'</p>
//                         <input name="q314" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.2.1 Define the term civil rights in your own words.</p>
//                         <input name="q321" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.2.2 What, according to the source, did the civil rights marchers demand when they converged
//                             on the Lincoln Memorial?</p>
//                         <input name="q322" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.2.3 Explain the significance of the presence of many leaders from various fields, who were
//                             given the opportunity to address the marchers.</p>
//                         <input name="q323" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.2.4 Comment on why the 'I Have a Dream' speech may be regarded as historically
//                             significant.</p>
//                         <input name="q324" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.3.1 State any TWO demands in the source that were made by the marchers who participated in
//                             the March on Washington on 28 August 1963.</p>
//                         <input name="q331" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.3.2 Why do you think the photographer decided to take this photograph?</p>
//                         <input name="q332" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.4 Explain how the information in Source 3B supports the evidence in Source 3C regarding the
//                             activities on the day of the March on Washington on 28 August 1963.</p>
//                         <input name="q34" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.5.1 Give TWO reasons in the source which suggests that President Kennedy supported the
//                             March on Washington.</p>
//                         <input name="q351" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.5.2 According to the source, give TWO reasons why the President believed the organisers of
//                             the March deserved the appreciation from the USA's government.</p>
//                         <input name="q352" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.5.3 Explain the term discrimination in the context of the Civil Rights Movement in the
//                             USA.</p>
//                         <input name="q353" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.5.4 Quote any law/programmes from the source that had to be passed by Congress to eliminate
//                             discrimination in employment.</p>
//                         <input name="q354" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.5.5 Comment on why a historian would find this source useful when studying the reaction of
//                             the USA government to the March on Washington.</p>
//                         <input name="q355" onChange={handleChange} style={{
//                             width: "98%",
//                             height: "40px",
//                             padding: "15px",
//                             fontSize: "1rem",
//                             borderRadius: "8px",
//                             marginBottom: "20px"
//                         }}/>
//                         <p>3.6 Using the information in the relevant sources and your own knowledge, write a paragraph
//                             of about EIGHT lines (about 80 words) explaining why civil rights marchers in the USA
//                             organised the March on Washington on 28 August 1963.</p>
//                         <textarea name="q36" onChange={handleChange}/>
//                     </div>
//                 )}
//
//                 {/* Section B */}
//                 <h1><strong>Select Section B Questions (1 or 2)</strong></h1>
//                 <label><input type="checkbox" checked={selectedSectionB.includes("4")}
//                               onChange={() => handleSectionBChange("4")}/> Q4: Vietnam</label>
//                 <label><input type="checkbox" checked={selectedSectionB.includes("5")}
//                               onChange={() => handleSectionBChange("5")}/> Q5: Congo</label>
//                 <label><input type="checkbox" checked={selectedSectionB.includes("6")}
//                               onChange={() => handleSectionBChange("6")}/> Q6: Black Power Movement</label>
//
//                 {selectedSectionB.includes("4") && (
//                     <div>
//                         <h2>QUESTION 4: THE EXTENSION OF THE COLD WAR: CASE STUDY – VIETNAM</h2>
//                         <textarea placeholder="Introduction" onChange={e => setQ4IntroText(e.target.value)}/>
//                         <textarea placeholder="Body" onChange={e => setQ4BodyText(e.target.value)}/>
//                         <textarea placeholder="Conclusion" onChange={e => setQ4ConclusionText(e.target.value)}/>
//                     </div>
//                 )}
//                 {selectedSectionB.includes("5") && (
//                     <div>
//                         <h2>QUESTION 5: INDEPENDENT AFRICA: CASE STUDY – THE CONGO</h2>
//                         <textarea placeholder="Introduction" onChange={e => setQ5IntroText(e.target.value)}/>
//                         <textarea placeholder="Body" onChange={e => setQ5BodyText(e.target.value)}/>
//                         <textarea placeholder="Conclusion" onChange={e => setQ5ConclusionText(e.target.value)}/>
//                     </div>
//                 )}
//                 {selectedSectionB.includes("6") && (
//                     <div>
//                         <h2>QUESTION 6: CIVIL SOCIETY PROTESTS FROM THE 1950s TO THE 1970s: THE BLACK POWER
//                             MOVEMENT</h2>
//                         <textarea placeholder="Introduction" onChange={e => setQ6IntroText(e.target.value)}/>
//                         <textarea placeholder="Body" onChange={e => setQ6BodyText(e.target.value)}/>
//                         <textarea placeholder="Conclusion" onChange={e => setQ6ConclusionText(e.target.value)}/>
//                     </div>
//                 )}
//
//                 <div className="button-container">
//                     <button className="submit-btn" onClick={computeScore}>
//                         Submit & Mark Exam
//                     </button>
//
//                     {showResults && (
//                         <button className="retry-btn" onClick={retryExam}>
//                             Retry Exam
//                         </button>
//                     )}
//                 </div>
//
//             </form>
//
//             {showResults && (
//                 <div className="results-box">
//                     <h2>Your Scores</h2>
//                     {/* SECTION A SCORES */}
//                     {selectedSectionA.map(q => (
//                         <p key={q}>
//                             <strong>Question {q} Score:</strong> {questionScores[q]}/50
//                         </p>
//                     ))}
//                     {/* SECTION B SCORES */}
//                     {selectedSectionB.map(q => (
//                         <p key={q}>
//                             <strong>Essay Question {q} Score:</strong> {questionScores[q]}/50
//                         </p>
//                     ))}
//                     <hr/>
//                     <h2>Total Score: {totalScore}/150</h2>
//                     <h3>Percentage: {percent}%</h3>
//
//                 </div>
//
//
//             )}
//             {showResults && (
//                 <div className="incorrect-section">
//                     <h2>Incorrect Answers</h2>
//
//                     {/* Section A Incorrect */}
//                     <div className="sectionA-incorrect">
//                         <h3>Section A</h3>
//                         {Object.keys(correctAnswers).map((question, index) => {
//                             const userAnswer = (answers[question] || "").trim();
//                             const isEssay = essayKeywordsMap?.[question]; // skip essays in Section A
//                             if (isEssay) return null;
//
//                             const isBlank = userAnswer === "";
//                             const isCorrect = correctAnswers[question].some(correct =>
//                                 userAnswer.toLowerCase().includes(correct.toLowerCase())
//                             );
//
//                             if (isBlank || !isCorrect) {
//                                 return (
//                                     <div key={index} className="incorrect-item">
//                                         <p><strong>Question:</strong> {question}</p>
//                                         <p><strong>Your Answer:</strong> {isBlank ? "(No answer given)" : userAnswer}
//                                         </p>
//                                         <p><strong>Correct Answer:</strong> {correctAnswers[question].join(", ")}</p>
//                                     </div>
//                                 );
//                             }
//                             return null;
//                         })}
//                     </div>
//
//                     {/* Section B Incorrect */}
//                     <div className="sectionB-incorrect">
//                         <h3>Section B (Essay)</h3>
//                         {["4", "5", "6"].map((q) => {
//                             const getEssayText = (q) => {
//                                 if (q === "4") return q4IntroText + " " + q4BodyText + " " + q4ConclusionText;
//                                 if (q === "5") return q5IntroText + " " + q5BodyText + " " + q5ConclusionText;
//                                 if (q === "6") return q6IntroText + " " + q6BodyText + " " + q6ConclusionText;
//                                 return "";
//                             };
//                             const text = getEssayText(q).trim();
//                             const keywords = essayKeywordsMap[q];
//                             const isBlank = text === "";
//                             const isCorrect = keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
//
//                             if (isBlank || !isCorrect) {
//                                 return (
//                                     <div key={q} className="incorrect-item">
//                                         <p><strong>Question:</strong> {q}</p>
//                                         <p><strong>Your Answer:</strong> {isBlank ? "(No answer given)" : text}</p>
//                                         <p><strong>Required Keywords:</strong> {keywords.join(", ")}</p>
//                                     </div>
//                                 );
//                             }
//                             return null;
//                         })}
//                     </div>
//
//                 </div>
//             )}
//
//
//             {popupId && (
//                 <div className="popup-overlay" onClick={closePopup}>
//                     <div className="popup" onClick={e => e.stopPropagation()}>
//                         <button onClick={closePopup}>Close</button>
//
//                     </div>
//                 </div>
//             )}
//
//             {showSolutionPopup && (
//                 <div className="solution-popup">
//                     <h2>Incorrect Answers – Correct Solutions</h2>
//
//                     {incorrectAnswers.length === 0 && (
//                         <p>🎉 Excellent! You got all source-based questions correct.</p>
//                     )}
//
//                     {incorrectAnswers.map((item, index) => (
//                         <div key={index} className="solution-item">
//                             <strong>Question: {item.question.toUpperCase()}</strong>
//                             <p><strong>Your Answer:</strong> {answers[item.question]}</p>
//                             <p><strong>Correct Answer(s):</strong> {item.correctAnswer}</p>
//                         </div>
//                     ))}
//
//                     <button className="close-btn" onClick={() => setShowSolutionPopup(false)}>
//                         Close
//                     </button>
//                 </div>
//             )}
//
//             <style jsx>{`
//                 * { box-sizing: border-box; }
//
//                 body {
//                 font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//                 background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
//                 margin: 0;
//                 padding: 20px 0;
//                 color: #2d3748;
//                 min-height: 100vh;
//                 line-height: 1.6;
//             }
//
//                 .exam-container {
//                 max-width: 1150px;
//                 margin: 20px auto;
//                 padding: 40px;
//                 background: #ffffff;
//                 border-radius: 20px;
//                 box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
//                 border: 1px solid #e2e8f0;
//             }
//
//                 /* ==================== HEADINGS – CLEAN & ELEGANT ==================== */
//                 h1, h2, h3 {
//                 font-weight: 700;
//                 color: #2d3748;
//                 text-align: center;
//                 margin: 30px 0 15px;
//             }
//
//                 h1 { font-size: 2.5rem; color: #1a365d; }
//                 h2 {
//                 font-size: 1.9rem;
//                 color: #2c5282;
//                 border-bottom: 3px solid #a0aec0;
//                 padding-bottom: 8px;
//                 display: inline-block;
//             }
//                 h3 { font-size: 1.4rem; color: #4a5568; }
//
//                 /* ==================== COVER PAGE – SOFT & OFFICIAL ==================== */
//                 .cover-page {
//                 background: linear-gradient(135deg, #ffffff, #f7fafc);
//                 border: 2px solid #e2e8f0;
//                 padding: 60px 30px;
//                 border-radius: 20px;
//                 text-align: center;
//                 margin-bottom: 40px;
//                 box-shadow: 0 8px 30px rgba(0,0,0,0.06);
//             }
//
//                 .dept-title {
//                 font-size: 3rem;
//                 font-weight: 800;
//                 color: #2c5282;
//                 margin: 10px 0;
//             }
//
//                 .subject-box {
//                 background: #edf2f7;
//                 border: 3px dashed #a0aec0;
//                 padding: 25px 50px;
//                 border-radius: 16px;
//                 display: inline-block;
//                 margin: 25px 0;
//                 font-size: 1.9rem;
//                 font-weight: bold;
//                 color: #2d3748;
//             }
//
//                 .exam-info p {
//                 background: #e6fffa;
//                 color: #234e52;
//                 font-weight: 600;
//                 padding: 10px 25px;
//                 border-radius: 30px;
//                 display: inline-block;
//                 margin: 10px;
//                 font-size: 2.2rem;
//             }
//
//                 /* ==================== TIMER – SOFT GREY ==================== */
//                 .timer-bar {
//                 background: #4a5568;
//                 color: white;
//                 padding: 16px;
//                 border-radius: 14px;
//                 text-align: center;
//                 font-size: 1.5rem;
//                 font-weight: 600;
//                 margin: 25px 0;
//                 box-shadow: 0 6px 20px rgba(0,0,0,0.1);
//             }
//                 p{
//                 font-size: 20px;
//             }
//
//                 /* ==================== INPUTS & TEXTAREAS – VERY SOFT ==================== */
//                 input[type="text"], textarea {
//                 width: 100%;
//                 padding: 18px 20px;
//                 margin: 12px 0 28px;
//                 border: 2px solid #e2e8f0;
//                 border-radius: 14px;
//                 font-size: 1.1rem;
//                 background: #fafafa;
//                 transition: all 0.3s ease;
//                 box-shadow: 0 2px 8px rgba(0,0,0,0.04);
//             }
//
//                 input[type="text"]:focus, textarea:focus {
//                 outline: none;
//                 border-color: #90cdf4;
//                 background: white;
//                 box-shadow: 0 0 0 4px rgba(144, 205, 244, 0.2);
//             }
//
//                 textarea {
//                 min-height: 200px;
//                 resize: vertical;
//                 font-family: inherit;
//             }
//
//                 /* ==================== CHECKBOXES – CALM BLUE-GREY ==================== */
//                 label {
//                 display: block;
//                 padding: 18px 22px;
//                 background: #edf2f7;
//                 color: #2d3748;
//                 border-radius: 14px;
//                 margin: 14px 0;
//                 font-size: 1.35rem;
//                 font-weight: 600;
//                 cursor: pointer;
//                 transition: 0.3s;
//                 border: 2px solid transparent;
//             }
//
//                 label:hover {
//                 background: #e6fffa;
//                 border-color: #81e6d9;
//             }
//
//                 input[type="checkbox"] {
//                 transform: scale(1.6);
//                 margin-right: 12px;
//                 accent-color: #4299e1;
//             }
//
//                 /* ==================== BUTTONS – SOFT BLUE & WARM GREY ==================== */
//                 .button-container {
//                 text-align: center;
//                 margin: 70px 0 50px;
//             }
//
//                 button {
//                 padding: 20px 50px;
//                 font-size: 1.5rem;
//                 font-weight: 700;
//                 border: none;
//                 border-radius: 50px;
//                 cursor: pointer;
//                 min-width: 300px;
//                 margin: 0 18px;
//                 box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//                 transition: all 0.3s ease;
//             }
//
//                 .submit-btn {
//                 background: #4299e1;
//                 color: white;
//             }
//
//                 .retry-btn {
//                 background: #f7fafc;
//                 color: #2d3748;
//                 border: 2px solid #e2e8f0;
//             }
//
//                 button:hover {
//                 transform: translateY(-4px);
//                 box-shadow: 0 15px 35px rgba(0,0,0,0.15);
//             }
//
//                 /* ==================== RESULTS – SOFT & HAPPY ==================== */
//                 .results-box {
//                 background: linear-gradient(135deg, #bee3f8, #90cdf4);
//                 color: #1a365d;
//                 padding: 45px;
//                 border-radius: 20px;
//                 text-align: center;
//                 margin: 40px 0;
//                 box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//                 border: 1px solid #bee3f8;
//             }
//
//                 .results-box h3 {
//                 font-size: 4.5rem;
//                 color: #2b6cb0;
//                 font-weight: 900;
//                 margin: 15px 0;
//             }
//
//                 /* ==================== INCORRECT ANSWERS – GENTLE ==================== */
//                 .incorrect-section {
//                 background: #fff5f5;
//                 border: 1px solid #feb2b2;
//                 border-radius: 14px;
//                 padding: 25px;
//                 margin-top: 30px;
//             }
//
//                 .incorrect-item {
//                 background: white;
//                 padding: 16px;
//                 border-radius: 10px;
//                 margin: 12px 0;
//                 border-left: 5px solid #fc8181;
//                 box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//             }
//
//                 /* ==================== RESPONSIVE ==================== */
//                 @media (max-width: 768px) {
//                 .button-container button {
//                 display: block;
//                 margin: 18px auto;
//                 width: 90%;
//             }
//                 h1 { font-size: 2.1rem; }
//                 .dept-title { font-size: 2.6rem; }
//             }
//            `} </style>
//
//         </div>
//
//     );
// }
//
// export default HistoryP1Nov2024Eng;