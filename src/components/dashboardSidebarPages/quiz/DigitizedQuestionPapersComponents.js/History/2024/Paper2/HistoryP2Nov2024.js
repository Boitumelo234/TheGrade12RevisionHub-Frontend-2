// import React, { useState, useEffect } from "react";
//
// import coverImage from './assets/cover.png'; // <-- add this
// import image1 from './assets/p1.png';
// import image2 from './assets/p2.png';
// import image3 from './assets/p3.png';
// import image4 from './assets/p4.png';
// import image5 from './assets/p5.png';
// import image6 from './assets/p6.png';
// import image7 from './assets/p7.png';
// import image8 from './assets/p8.png';
// import image9 from './assets/p9.png';
// import image10 from './assets/p10.png';
// import image11 from './assets/p11.png';
// import image12 from './assets/p12.png';
// import image13 from './assets/p13.png';
// import image14 from './assets/p14.png';
//
//
// export default function HistoryExamPage() {
//     const [answers, setAnswers] = useState({});
//     const [result, setResult] = useState(null);
//
//     function normalize(text) {
//         return text.toUpperCase().replace(/\s+/g, " ").trim();
//     }
//
//     function checkAnswer(userAnswer, accepted, mark = 1) {
//         const ans = normalize(userAnswer || "");
//
//         if (!ans || ans.length < 3) {
//             return {
//                 correct: false,
//                 mark: 0,
//                 correctAnswer: accepted.join("\n• "),
//             };
//         }
//
//         const normalizedAccepted = accepted.map(a => normalize(a));
//
//         const isCorrect = normalizedAccepted.some(a => {
//             return ans === a || ans.includes(a) || a.includes(ans);
//         });
//
//         return {
//             correct: isCorrect,
//             mark: isCorrect ? mark : 0,
//             correctAnswer: normalizedAccepted.join("\n• "),
//         };
//     }
//
//     function markHistoryAnswers(answers) {
//         let score = 0;
//         const detailed = {};
//
//         // ---------------- QUESTION 1.1.1 ----------------
//         detailed.q111 = checkAnswer(
//             answers.q111,
//             ["Black Local Government Bill"],
//             1
//         );
//         score += detailed.q111.mark;
//
//         // ---------------- QUESTION 1.1.2 ----------------
//         detailed.q112 = checkAnswer(
//             answers.q112,
//             [
//                 "for the establishment of a series of local government structures similar 	 to those operating in the white areas",
//                 "they now had local power, elected by local residents",
//                 "Councillors were responsible for township administration"
//             ],
//             1
//         );
//         score += detailed.q112.mark;
//
//         // ---------------- QUESTION 1.1.3 ----------------
//         detailed.q113 = checkAnswer(
//             answers.q113,
//             [
//                 "high rentals",
//                 "poor electrification",
//                 "bad housing",
//                 "the bucket-toilet system",
//                 "crime"
//             ],
//             2
//         );
//         score += detailed.q113.mark;
//
//         // ---------------- QUESTION 1.1.4 ----------------
//         detailed.q114 = checkAnswer(
//             answers.q114,
//             [
//                 "Civic organisations no longer focused only on local concerns of residents",
//                 "They were politicised to start challenging local government structures",
//                 "They started asking critical questions, e.g. why streets were dirty and  why they had to pay rent",
//                 "They started demanding provisions from local government  structures/challenged apartheid laws",
//                 "The challenges they confronted stemmed from the apartheid system which compelled them to actively join the liberation struggle"
//             ],
//             2
//         );
//         score += detailed.q114.mark;
//
//         // ---------------- QUESTION 1.2.1 ----------------
//         detailed.q121 = checkAnswer(
//             answers.q121,
//             [
//                 "To invite/mobilise the residents of Kagiso and Munsieville to a community 	 meeting to protest against apartheid government structures/  to 	 conscientise/inform the residents of Kagiso and Munsieville about a community meeting to protest against apartheid government structures",
//                 "To communicate the purpose of the meeting ,the lack of basic services in Kagiso and Munsieville",
//                 "To highlight the important speakers/leaders and the topics they would be addressing",
//                 "To provide the details about the meeting (topics, date, time and venue)"
//             ],
//             2
//         );
//         score += detailed.q121.mark;
//
//         // ---------------- QUESTION 1.2.2 ----------------
//         detailed.q122 = checkAnswer(
//             answers.q122,
//             [
//                 "To create awareness to the role of civic organisations to township  residents because they (civic organisations) were new as they were  formed from the 1970s and multiplying in the 1980s",
//                 "To mobilise residents to support civic organisations",
//                 "To explain how the civic organisations would address the basic needs of the township dwellers",
//                 "Dr Motlana was a well respected professional/political activist/community leader"
//             ],
//             2
//         );
//         score += detailed.q122.mark;
//
//         // ---------------- QUESTION 1.3.1 ----------------
//         detailed.q131 = checkAnswer(
//             answers.q131,
//             [
//                 "Azanian People's Organisation (AZAPO)"
//             ],
//             1
//         );
//         score += detailed.q131.mark;
//
//         // ---------------- QUESTION 1.3.2 ----------------
//         detailed.q132 = checkAnswer(
//             answers.q132,
//             [
//                 "They suspected that he supported the march by the Thembisa residents",
//                 "To suppress future protests from recurring",
//                 "To instil fear among community leaders and supporters (protestors)"
//             ],
//             4
//         );
//         score += detailed.q132.mark;
//
//         // ---------------- QUESTION 1.3.3 ----------------
//         detailed.q133 = checkAnswer(
//             answers.q133,
//             [
//                 "allowed for fourteen days' detention while the police worked out a charge",
//                 "The detainee could be held in solitary confinement (isolation)",
//                 "was not allowed access to lawyers",
//                 "was not allowed to access a doctor during that time",
//                 "The fourteen days could be extended indefinitely (without end)"
//             ],
//             4
//         );
//         score += detailed.q133.mark;
//
//         // ---------------- QUESTION 1.3.4 ----------------
//         detailed.q134 = checkAnswer(
//             answers.q134,
//             [
//                 "Action taken by residents to stop paying rent",
//                 "Measures taken to encourage people to purposely disregard rental fee",
//                 "Disobedience to the payment of rent"
//             ],
//             2
//         );
//         score += detailed.q134.mark;
//
//         // ---------------- QUESTION 1.3.5 ----------------
//         detailed.q135 = checkAnswer(
//             answers.q135,
//             [
//                 "They supported/under control of apartheid local structures/township's superintendent",
//                 "They accepted the apartheid laws that forced residents to pay unaffordable rent",
//                 "They turned a blind eye to the bread and butter issues affecting township residents"
//             ],
//             2
//         );
//         score += detailed.q135.mark;
//
//         // ---------------- QUESTION 1.4.1 ----------------
//         detailed.q141 = checkAnswer(
//             answers.q141,
//             [
//                 "rapidly escalating (rising) rents",
//                 "56 per cent rent increase",
//                 "already paying some of the highest rents",
//                 "half of which were in arrears"
//             ],
//             4
//         );
//         score += detailed.q141.mark;
//
//         // ---------------- QUESTION 1.4.2 ----------------
//         detailed.q142 = checkAnswer(
//             answers.q142,
//             [
//                 "They were scared that residents would attack them for their role in implementing rent increase in townships",
//                 "They were used as pawns by black local authorities, which made them unpopular to residents",
//                 "They wanted to escape the stigma of being seen as an extension of the apartheid government",
//                 "Lack of protection from government"
//             ],
//             1
//         );
//         score += detailed.q142.mark;
//
//         // ---------------- QUESTION 1.4.3 ----------------
//         detailed.q143 = checkAnswer(
//             answers.q143,
//             ["Ruthless and violent mass killings of 13 people on 21 November 1985 by the South African Police during the protests"],
//             1
//         );
//         score += detailed.q143.mark;
//
//         // ---------------- QUESTION 1.4.4 ----------------
//         detailed.q144 = checkAnswer(
//             answers.q144,
//             [
//                 "It is taken from the TRC report which is an official government document  that revealed the injustices of the past",
//                 "The date of the report was published (29 October 1998) corresponds with  the actual release of the TRC report",
//                 "The period under review (between January 1985 and July 1986) refers to  the peak of rent boycotts in many townships in the PWV area",
//                 "It provides detailed information about violent government reactions  against civic organisations protest actions in townships in the mid-1980s",
//                 "The source can be corroborated with the information in Source 1C regarding the rent boycott"
//             ],
//             1
//         );
//         score += detailed.q144.mark;
//
//         // ---------------- QUESTION 1.5 ----------------
//         detailed.q15 = checkAnswer(
//             answers.q15,
//             [
//                 "Source 1B shows township residents protesting and Source 1D refers to rent boycotts by township residents across the Vaal/Both sources indicate that civic organisations played an important role in tackling the issues communities faced",
//                 "Source 1B shows protesters marching unarmed/peaceful march and Source 1D refers to unarmed victims that were shot in the back by the police",
//                 "Source 1B refers to the Krugersdorp Residents' Organisation calling for a community meeting to conscientise residents of the role of civic organisations and Source 1D states that opposition to apartheid was organised through civic and student organisations to protest against apartheid local structures/Both sources mention civic organisations in Krugersdorp acting against the local authorities",
//                 "Both sources illustrate the strength and unity fostered by the civic organisations"
//             ],
//             1
//         );
//         score += detailed.q15.mark;
//
//         // ---------------- QUESTION 1.6 ----------------
//         detailed.q16 = checkAnswer(
//             answers.q16,
//             [
//                 "Professionals and church leaders supported the civic organisations to  mobilise support and continue to fight the apartheid policies.(Source 1B)",
//                 "Civic associations used posters to mobilise supporters and explain their role (Source 1B)",
//                 "Protested against unaffordable/high house rentals (Source 1D), The student's organisations and other civic organisations effectively  worked in unison to intensify the rent boycotts in various townships (Source 1D)",
//                 "In reaction to police brutality or massacres the protestors adopted various forms of demonstrations (Source 1D)",
//                 "The civic organisations ultimately united under the banner of South African National Civic Organisation (SANCO) in 1992 (own knowledge)"
//             ],
//             1
//         );
//         score += detailed.q16.mark;
//
//         // ---------------- QUESTION 2.1.1 ----------------
//         detailed.q211 = checkAnswer(
//             answers.q211,
//             ["about July 1980"],
//             1
//         );
//         score += detailed.q211.mark;
//
//         // ---------------- QUESTION 2.1.2 ----------------
//         detailed.q212 = checkAnswer(
//             answers.q212,
//             [
//                 "Mr Vusumzi Pikoli",
//                 "Mr Thozi Majola",
//                 "Mr Phaki Ximiya"
//             ],
//             1
//         );
//         score += detailed.q212.mark;
//
//         // ---------------- QUESTION 2.1.3 ----------------
//         detailed.q213 = checkAnswer(
//             answers.q213,
//             [
//                 "To carry out the mandate of the ANC from exile",
//                 "To carry out underground activities in the Eastern Cape (South Africa)",
//                 "To destabilise the apartheid government",
//                 "To strengthen internal resistance to apartheid"
//             ],
//             1
//         );
//         score += detailed.q213.mark;
//
//         // ---------------- QUESTION 2.1.4 ----------------
//         detailed.q214 = checkAnswer(
//             answers.q214,
//             [
//                 "Someone who turns their back on",
//                 "to betray an organisation",
//                 "principle and joins the enemy or opposition"
//             ],
//             1
//         );
//         score += detailed.q214.mark;
//
//         // ---------------- QUESTION 2.2.1 ----------------
//         detailed.q221 = checkAnswer(
//             answers.q221,
//             [
//                 "Van Rensburg",
//                 "Du Plessis",
//                 "Colonel Gerrit Erasmus"
//             ],
//             1
//         );
//         score += detailed.q221.mark;
//
//         // ---------------- QUESTION 1.4.3 ----------------
//         detailed.q143 = checkAnswer(
//             answers.q143,
//             ["NOFFKE'S WIFE WAS RELEASED / LET GO"],
//             1
//         );
//         score += detailed.q143.mark;
//
//         // ---------------- QUESTION 2.2.2 ----------------
//         detailed.q222 = checkAnswer(
//             answers.q222,
//             ["Its spoken or written evidence by perpetrators who have applied for amnesty from the TRC"],
//             1
//         );
//         score += detailed.q222.mark;
//
//         // ---------------- QUESTION 2.2.3 ----------------
//         detailed.q223 = checkAnswer(
//             answers.q223,
//             [
//                 "Dirk Coetzee was only interested in being granted amnesty to avoid jail sentence",
//                 "He did not want to take responsibility for the atrocities he committed",
//                 "He cared less for the loss and pain of the victims' families"
//             ],
//             1
//         );
//         score += detailed.q223.mark;
//
//         // ---------------- QUESTION 2.2.4 ----------------
//         detailed.q224 = checkAnswer(
//             answers.q224,
//             [
//                 "She believed Dirk Coetzee did not make full disclosure",
//                 "She felt he did not deserve to be granted amnesty/not really remorseful",
//                 "She was still angry that she did not know what happened to her son/she was not able to attain closure",
//                 "She wanted retributive justice"
//             ],
//             1
//         );
//         score += detailed.q224.mark;
//
//         // ---------------- QUESTION 2.3.1 ----------------
//         detailed.q231 = checkAnswer(
//             answers.q231,
//             [
//                 "It captured the moment the Kondile family had an opportunity to create a symbolic memorial service for Sizwe Kondile near where his remains were disposed of",
//                 "It shows how the family finally came to terms with Sizwe's death/find closure",
//                 "It is a reminder to the family on the process of the spiritual repatriation of Sizwe Kondile for the burial of his spiritual remains"
//             ],
//             1
//         );
//         score += detailed.q231.mark;
//
//         // ---------------- QUESTION 2.3.2 ----------------
//         detailed.q232 = checkAnswer(
//             answers.q232,
//             [
//                 "He was one of Sizwe's friends/cell member/comrade",
//                 "He left with Sizwe Kondile to Maseru, Lesotho in 1980",
//                 "He authored a book about Sizwe called The life and times of Sizwe Kondile, a story of service, suffering, sacrifice and selflessness",
//                 "To support the family",
//                 "Pikoli wanted to find closure",
//                 "He was a spokesperson for the family"
//             ],
//             1
//         );
//         score += detailed.q232.mark;
//
//         // ---------------- QUESTION 2.3.3 ----------------
//         detailed.q233 = checkAnswer(
//             answers.q233,
//             [
//                 "YES ,The spiritual repatriation created an opportunity for family and friends for the burial of his spiritual remains ,They came to terms with their loss and were able to find closure 31 years later ,The spiritual repatriation created an opportunity to heal and find peace ,Any other relevant response",
//                 "NO ,There were no remains to bury,•	It was only ceremonial and occurred 31 years later ,It was only symbolic and not a proper burial ,It opened old wounds"
//             ],
//             1
//         );
//         score += detailed.q233.mark;
//
//         // ---------------- QUESTION 2.4.1 ----------------
//         detailed.q241 = checkAnswer(
//             answers.q241,
//             [
//                 "poisoned",
//                 "tortured",
//                 "shot",
//                 "burnt",
//                 "bombed"
//             ],
//             1
//         );
//         score += detailed.q241.mark;
//
//         // ---------------- QUESTION 2.4.2 ----------------
//         detailed.q242 = checkAnswer(
//             answers.q242,
//             [
//                 "To reassure the family that they are bringing the remains of Sizwe Kondile home for closure/healing/decent burial",
//                 "To acknowledge the role he played as a political activist"
//             ],
//             1
//         );
//         score += detailed.q242.mark;
//
//         // ---------------- QUESTION 2.4.3 ----------------
//         detailed.q243 = checkAnswer(
//             answers.q243,
//             [
//                 "To evaluate whether the atrocities of the past have been revealed and dealt with accordingly/healing and reconciliation",
//                 "To assess whether the mandate of the TRC has been achieved",
//                 "To reflect whether justice has been done to the Kondile family and other related cases",
//                 "To reflect that such brutal acts of human rights violation should not be repeated",
//                 "To honour those who made sacrifices like Kondile"
//             ],
//             1
//         );
//         score += detailed.q243.mark;
//
//         // ---------------- QUESTION 2.4.4 ----------------
//         detailed.q244 = checkAnswer(
//             answers.q244,
//             [
//                 "It contains extracts from a speech/first hand information by Michael Masutha  who was the  Minister of Justice and Correctional Services",
//                 "The speech was delivered at the Freedom Park which is a spiritual resting   place for heroes of the struggle against apartheid",
//                 "The speech was delivered on the day of the burial of spiritual remains of Sizwe Kondile on 1 July 2016",
//                 "His death can be corroborated with the information in Source 2B"
//             ],
//             1
//         );
//         score += detailed.q244.mark;
//
//         // ---------------- QUESTION 2.5 ----------------
//         detailed.q25 = checkAnswer(
//             answers.q25,
//             [
//                 "In Source 2B Kondile's family refused to accept Dirk Coetzee's request for forgiveness while in Source 2D Kondile's family attended the spiritual repatriation and symbolic burial of Sizwe Kondile with the hope of healing",
//                 "Source 2B raises more questions and no closure to the Kondile family while Source 2D offers the Kondile family an opportunity through rituals for closure",
//                 "In Source 2B the Kondile family rejects the contribution of Mandela and Tutu (efforts of the TRC) to the healing process while in Source 2D the Kondile family accept the support of the Minister of Justice and Correctional Service to bring closure to the Kondile case",
//                 "In Source 2B Mrs Kondile mentions that Sizwe was buried by a barbarian (no closure) while in Source 2D the spiritual burial was conducted by Sizwes loved ones (with closure)"
//             ],
//             1
//         );
//         score += detailed.q25.mark;
//
//         // ---------------- QUESTION 26 ----------------
//         detailed.q26 = checkAnswer(
//             answers.q26,
//             [
//                 "YES ,Perpetrators applied for amnesty and testified before the TRC Amnesty Committee (Source 2B) ,Three SAP members came forth to reveal the truth that they killed Sizwe Kondile (Source 2B)",
//                 "NO ,Sizwe Kondile was abducted and murdered by the security police (Source 2A) ,The South African Police lied about his release to label him as a traitor to the ANC (Source 2A)"
//             ],
//             1
//         );
//         score += detailed.q26.mark;
//
//         // ---------------- QUESTION 3.1.1 ----------------
//         detailed.q311 = checkAnswer(
//             answers.q311,
//             [
//                 "Process whereby the world has become more integrated and connected  beyond borders due to technology",
//                 "Interconnectedness of transport, technology and communication",
//                 "The way in which people, goods, money and ideas are moved around the  world faster and cheaper than ever before due to transport,communication and technology"
//             ],
//             1
//         );
//         score += detailed.q311.mark;
//
//         // ---------------- QUESTION 3.1.2 ----------------
//         detailed.q312 = checkAnswer(
//             answers.q312,
//             [
//                 "access to larger markets",
//                 "economies of scale",
//                 "cheaper resources"
//             ],
//             1
//         );
//         score += detailed.q312.mark;
//
//         // ---------------- QUESTION 3.1.3 ----------------
//         detailed.q313 = checkAnswer(
//             answers.q313,
//             [
//                 "Walmart's growth in the USA was limited and it was forced to expand  globally including into South Africa",
//                 "Walmart entered foreign markets to compete and grow internationally",
//                 "Walmart took over local businesses as subsidiaries through its global  expansion (created smaller companies)"
//             ],
//             1
//         );
//         score += detailed.q313.mark;
//
//         // ---------------- QUESTION 3.1.4 ----------------
//         detailed.q314 = checkAnswer(
//             answers.q314,
//             [
//                 "free trade agreements",
//                 "advances in technology",
//                 "transportation"
//             ],
//             1
//         );
//         score += detailed.q314.mark;
//
//         // ---------------- QUESTION 3.1.5 ----------------
//         detailed.q315 = checkAnswer(
//             answers.q315,
//             [
//                 "South Africa's membership of SADC and BRICS make it easier for other  countries to trade with it",
//                 "South Africa is open to foreign investments from multinational companies",
//                 "Other countries can freely trade with South Africa due to its open trade  policies with lesser restrictions/for profit and to benefit the economy"
//             ],
//             1
//         );
//         score += detailed.q315.mark;
//
//         // ---------------- QUESTION 3.2.1 ----------------
//         detailed.q321 = checkAnswer(
//             answers.q321,
//             [
//                 "To make people aware of SACCAWU's protest actions against the merger of Walmart and Massmart/newsworthy",
//                 "To galvanise support and solidarity for SACCAWU's opposition to the merger",
//                 "To expose the negative impact globalisation would have in South Africa"
//             ],
//             1
//         );
//         score += detailed.q321.mark;
//
//         // ---------------- QUESTION 3.2.2 ----------------
//         detailed.q322 = checkAnswer(
//             answers.q322,
//             [
//                 "The merger between Walmart (USA) with Massmart (local) is regarded as 	 a form of neo-colonialism by Walmart ,a USA company",
//                 "Walmart is regarded as an outside company which enters South Africa to exploit workers",
//                 "Walmart's expansion to South Africa will lead to deindustrialisation/job losses",
//                 "Walmart's entry into South Africa as an outside company will negatively  affect the local retail as well as manufacturing industries/bullying local industries"
//             ],
//             1
//         );
//         score += detailed.q322.mark;
//
//         // ---------------- QUESTION 3.2.3 ----------------
//         detailed.q323 = checkAnswer(
//             answers.q323,
//             [
//                 "It only highlights SACCAWU's viewpoint in rejecting Walmart's takeover of Massmart",
//                 "It portrays a one-sided view on the impact of the merger on South African workers",
//                 "Emotive language , ECONOMIC COLONISER is used to paint Walmart  as an aggressor"
//             ],
//             1
//         );
//         score += detailed.q323.mark;
//
//         // ---------------- QUESTION 3.3.1 ----------------
//         detailed.q331 = checkAnswer(
//             answers.q331,
//             ["due to the decreased demand within the retail sector for locally- produced products"],
//             1
//         );
//         score += detailed.q331.mark;
//
//         // ---------------- QUESTION 3.3.2 ----------------
//         detailed.q332 = checkAnswer(
//             answers.q332,
//             [
//                 "It will lead to the restructuring of factories",
//                 "It will lead to job losses",
//                 "Local industries in South Africa will eventually close"
//             ],
//             1
//         );
//         score += detailed.q332.mark;
//
//         // ---------------- QUESTION 3.3.3 ----------------
//         detailed.q333 = checkAnswer(
//             answers.q333,
//             ["its lowering of prices comes at a significant cost to employees who  are compelled to accept lower wages and working conditions"],
//             1
//         );
//         score += detailed.q333.mark;
//
//         // ---------------- QUESTION 3.4 ----------------
//         detailed.q34 = checkAnswer(
//             answers.q34,
//             [
//                 "Source 3B shows SACCAWU (trade union) members protesting against Walmart's merger with Massmart and Source 3C highlights SACTWU (union)'s submission to parliament against the merger of Walmart and Massmart",
//                 "In Source 3B SACCAWU members labelled Walmart as an economic  coloniser, killing local manufacturing industries and in Source 3C  SACTWU's concern is that Walmart's entry into South Africa will lead to de-industrialisation",
//                 "In Source 3B workers are demonstrating against Walmart as a sign of  fearing job losses and Source 3C mentions that Walmart's expansion into  the country would lead to job losses/Both sources mention that there would be job losses"
//             ],
//             1
//         );
//         score += detailed.q34.mark;
//
//         // ---------------- QUESTION 3.51 ----------------
//         detailed.q351 = checkAnswer(
//             answers.q351,
//             ["local suppliers would not have a chance to sell their"],
//             1
//         );
//         score += detailed.q351.mark;
//
//         // ---------------- QUESTION 352 ----------------
//         detailed.q352 = checkAnswer(
//             answers.q352,
//             ["to keep Walmart out of the country"],
//             1
//         );
//         score += detailed.q352.mark;
//
//         // ---------------- QUESTION 3.5.3 ----------------
//         detailed.q353 = checkAnswer(
//             answers.q353,
//             [
//                 "To improve on the freshness of food products",
//                 "To ensure that the food is safe for consumption",
//                 "To maximise profit and reduce unnecessary costs",
//                 "To put more locally produced foods in stores",
//                 "To avoid importing perishable products from outside countries"
//             ],
//             1
//         );
//         score += detailed.q353.mark;
//
//         // ---------------- QUESTION 3.5.4 ----------------
//         detailed.q354 = checkAnswer(
//             answers.q354,
//             [
//                 "Refers to government policies that restrict international trade to help  protect domestic industries",
//                 "Policies implemented to promote domestic production of goods",
//                 "Imposing tariffs limiting foreign goods in the market"
//             ],
//             1
//         );
//         score += detailed.q354.mark;
//
//         // ---------------- QUESTION 36 ----------------
//         detailed.q36 = checkAnswer(
//             answers.q36,
//             ["Globalisation triggered Multinational companies like Walmart to expand their activities to all corners of the world /Companies expand their activities across borders to access larger markets and cheaper resources/free trade encouraged Walmart to settle in South Africa as its first host country in Africa (Source 3A)"],
//             1
//         );
//         score += detailed.q36.mark;
//
//         // ---------------- QUESTION 4 ----------------
//         detailed.q4 = checkAnswer(
//             answers.q4,
//             ["CIVIL RESISTANCE, 1970s TO 1980s,➢	Created after ANC and PAC leaders and parties were banned or imprisoned in 1960s,➢	Instilling black South Africans with self-belief to challenge the apartheid state,➢	Infused black South Africans with sense of pride,➢	Influenced black South Africans to accept themselves/have self-confidence/selfreliance/ sense of identity,➢	Empowered black South Africans to reject the spirit of self-pity; inferiority complex; self-alienation and domination by external forces,➢	Black students started to organise themselves to resist white domination by breaking away from NUSAS and forming SASO (1968) ,➢	Black students adopted the philosophy of Black Consciousness (Role of Biko/SASO),➢	The South African Students Movement (SASM) was formed in 1972 and exposed black South Africans to the ideals of BC ,➢	BCM and SASO organised the VIVA FRELIMO Rallies (1974) ➢ The arrests of BC leaders heightened political activism ,➢	Bantu Education introduced Afrikaans as a medium of instruction in schools (1975), ➢	South African Students Movement formed in 1972 which exposed black South Africans to the ideals of BC,➢	The departmental circular on Afrikaans (50/50) was the trigger for the Soweto uprising ,➢	16th June 1976 students protested peacefully against the implementation of  the circular ,➢	Police response to student protests (Hector Petersen, a 13-year-old boy was  one of the first casualties of this uprising), ",
//                 "THE COMING OF DEMOCRACY TO SOUTH AFRICA AND COMING TO TERMS WITH THE PAST,•	FW de Klerk took over from PW Botha in 1989 and introduced reforms  • Unbanning of the African National Congress (ANC), the Pan Africanist Congress  (PAC) and the South African Communist Party (SACP) and other banned  organisations,•	Release of Nelson Mandela on 11 February 1990 and other banned political leaders  in 1990 (this opened the way to negotiations for democratic SA) (compromises by the NP), •	Talks (31 March 1990) between the ANC and the NP postponed due to killing of  defenceless demonstrators in Sebokeng (violence),•	Groote Schuur Minute, 2 May 1990 - both parties (ANC and NP) committed  themselves to end violence and to negotiate (compromises),•	Pretoria Minute (August 1990) – ANC stopped armed struggle and NP stopped State  of Emergency (compromises) ,•	The Declaration of Intent (21 December 1991) – political parties agreed to draw up a  new constitution and interim government (compromises),•	Whites-only referendum – De Klerk tested white opinion to continue with negotiations  after losing three by-elections to CP. Referendum results – landslide Yes –  negotiations continued,•	Bisho Massacre (7 September 1992) – ANC supporters who wanted to be part of  negotiation process (a turning point after which negotiation process favoured the ANC) (violence),•	ANC called for rolling mass action (May 1992) against the National Party ,•	Resistance from Concerned South Africans Group (COSAG) – October 1992   • Record of Understanding – 26 September 1992 – Meyer and Ramaphosa committed  themselves to peace and to negotiations, Meyer and Ramaphosa agreed on Joe Slovo's Sunset clause (2 April 1993) (compromises) ,•	Parties winning more that 5% of vote will form a Government of National Unity (GNU)  to govern the new SA and whites could retain their positions for 5 years (compromises) "
//                 ,"THE END OF THE COLD WAR AND A NEW WORLD ORDER ,•	Impact of space and arms race against the USA (Cold War) war and the war in Afghanistan in weakening the economy of the Soviet Union (Background) ,•	Gorbachev became Secretary-General of the CPSU and leader of the government in 1985 at 54 years of age  ,•	He hoped to revive Soviet Union's economy by improving both industrial output and technology, as well as expanding its markets ,•	In 1985 he introduced Perestroika (economic reconstruction) ,•	Perestroika allowed small scale private ownership and removed government control over production  ,•	He took a big risk of effecting political change, especially for the Soviet Union, known for its hard-line Communist stance  ,•	Glasnost (openness) policy was introduced ,•	Glasnost led to criticism of government – including criticism of Perestroika and of Gorbachev himself` ,•	Many hard-line communist were discontent with policies that became unpopular  ,•	At home he had two types of opponents: hardliners who were opposed to the reforms and liberals who criticised him for not moving fast enough  ,•	The two policies did not support each other as thought but ended the entire system of the Soviet Union ,•	He lost support at home – Unity of the Soviet Union was at risk and socialism became threatened ,•	Collapse of the Berlin Wall (1989) signifying the fall of communism ,•	Many underlying differences always existed among the 15 Republics  ,•	Civil unrests broke out between various groups ,•	Old form of nationalism emerged and led to new demand for independence ,•	He tried to stop the disintegration by proposing the establishment of a Federation of States – which failed ,•	In 1990, several Soviet states including Russia under Gorbachev's bitter rival, Boris Yeltsin, declared their independence "
//             ],
//             4
//         );
//         score += detailed.q4.mark;
//
//         return { score, detailed };
//     }
//
//
//
//
//
//     // TIMER (3 hours = 10800 seconds)
//     const [timeLeft, setTimeLeft] = useState(10800);
//
//
//     useEffect(() => {
//         if (timeLeft <= 0) {
//             alert("The test is over");
//             return;
//         }
//         const timer = setInterval(() => {
//             setTimeLeft((prev) => prev - 1);
//         }, 1000);
//
//
//         return () => clearInterval(timer);
//     }, [timeLeft]);
//
//
//     const formatTime = (seconds) => {
//         const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
//         const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
//         const s = String(seconds % 60).padStart(2, '0');
//         return `${h}:${m}:${s}`;
//     };
//
//     // ---------------- SUBMIT HANDLER ----------------
//     function handleSubmit(e) {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const formAnswers = Object.fromEntries(formData.entries());
//
//         setAnswers(formAnswers);
//         const results = markHistoryAnswers(formAnswers);
//         setResult(results);
//     }
//
//     return (
//         <main className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
//
//                 {/* TIMER */}
//                 <div className="text-right text-2xl font-bold mb-4 border p-2 bg-yellow-100 border-black">
//                     Time Left: {formatTime(timeLeft)}
//                 </div>
//
//
//                 {/* PAGE 1 LABEL */}
//                 <div className="text-left text-lg font-bold mb-2">Page 1</div>
//
//                 <header className="text-center mb-6 border-2 border-black p-4">
//                     <img
//                         src={coverImage}
//                         alt="Exam Paper Cover"
//                         className="mx-auto rounded-xl shadow-lg max-w-full h-auto"
//                     />
//                 </header>
//
//
//                 <hr className="border-black my-6" />
//                 {/* PAGE 2 LABEL */}
//                 <div className="text-right font-bold text-gray-600 mb-2">
//                     Page 2
//                 </div>
//
//                 <form onSubmit={handleSubmit}>
//                     <section className="exam-border">
//                         <h2>INSTRUCTIONS AND INFORMATION</h2>
//                         <ol>
//                             <li>This question paper consists of SECTION A and SECTION B based on the prescribed content framework in the CAPS document. </li>
//
//                             <li>SECTION A: SOURCE-BASED QUESTIONS</li>
//
//                             <li>QUESTION 1: CIVIL RESISTANCE, 1970s TO 1980s: SOUTH AFRICA </li>
//
//                             <li>QUESTION 2: THE COMING OF DEMOCRACY TO SOUTH AFRICA AND  COMING TO TERMS WITH THE PAST </li>
//
//                             <li>QUESTION 3: THE END OF THE COLD WAR AND A NEW WORLD
//                                 ORDER, 1989 TO THE PRESENT
//                             </li>
//
//                             <li>SECTION B: ESSAY QUESTIONS</li>
//
//                             <li>QUESTION 4: CIVIL RESISTANCE, 1970s TO 1980s: SOUTH AFRICA:
//                                 THE CRISIS OF APARTHEID IN THE 1980s
//                             </li>
//
//                             <li>QUESTION 5: THE COMING OF DEMOCRACY TO SOUTH AFRICA AND COMING TO TERMS WITH THE PAST </li>
//
//                             <li>QUESTION 6: THE END OF THE COLD WAR AND A NEW WORLD
//                                 ORDER: THE EVENTS OF 1989
//                             </li>
//
//                         </ol>
//
//                         <p>2. 2.	SECTION A consists of THREE source-based questions. Source material that    is required to answer these questions can be found in the ADDENDUM</p>
//                         <p>3. SECTION B consists of THREE essay questions.</p>
//                         <p>4. Answer THREE questions as follows:</p>
//                         <ol>
//                             <li>At least ONE must be a source-based question and at least ONE must be an essay question.</li>
//
//                             <li>The THIRD question can be either a source-based question or an essay question.</li>
//
//                         </ol>
//                         <p>5. You are advised to spend at least ONE hour per question.</p>
//                         <p>6. When answering questions, candidates should apply their knowledge, skills and insight.</p>
//                         <p>7. You will be disadvantaged by merely rewriting the sources as answers.</p>
//                         <p>8. Number the answers correctly according to the numbering system used in this question paper.</p>
//                         <p>9. Write neatly and legibly.</p>
//                     </section>
//
//                     <section className="prose prose-sm lg:prose-base max-w-none ">
//                         <h3>SECTION A: SOURCE-BASED QUESTIONS</h3>
//                         <p>Answer at least ONE question, but not more than TWO questions, in this section. Source material that is to be used to answer these questions is contained in the ADDENDUM.</p>
//
//                         <h4>QUESTION 1: 	HOW 	DID 	CIVIC 	ORGANISATIONS 	MOBILISE 	LOCAL
//                             COMMUNITIES TO RESIST THE APARTHEID GOVERNMENT'S
//                             STRUCTURES IN SOUTH AFRICA IN THE 1980s?
//                         </h4>
//
//
//                         <p>Study Sources 1A, 1B, 1C and 1D and answer the questions that follow.</p>
//
//                         <h5>1.1 Use Source 1A. </h5>
//                         <ol>
//                             <li> 1.1.1	Name the Bill, in the source, that was introduced by the apartheid    government in 1980 to create local government structures.    (1 x 1) (1)</li>
//
//                             {result?.detailed.q111 && (
//                                 <p className={result.detailed.q111.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q111.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q111"value={answers.q111 || ''}
//                                 onChange={(e) => setAnswers({...answers, q111: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q111 && !result.detailed.q111.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q111.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.1.2	Quote, from the source, TWO provisions of the Black Local
//                                 Authorities Act, for black residents in townships.                     (2 x 1) 	(2)
//                             </li>
//
//                             {result?.detailed.q112 && (
//                                 <p className={result.detailed.q112.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q112.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q112"value={answers.q112 || ''}
//                                 onChange={(e) => setAnswers({...answers, q112: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q112 && !result.detailed.q112.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q112.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.1.3	List any THREE problems, according to the source, that newly 	  	formed civic organisations were meant to tackle (solve) in their
//                                 local communities.                                                                   (3 x 1) 	(3)
//                             </li>
//                             {result?.detailed.q113 && (
//                                 <p className={result.detailed.q113.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q113.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q113"value={answers.q113 || ''}
//                                 onChange={(e) => setAnswers({...answers, q113: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q113 && !result.detailed.q113.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q113.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.1.4	Comment on what is implied by the statement, '… addressing these
//                                 (bread-and-butter) issues automatically drove them (civic  organisations) to political issues', in their townships.           (1 x 2) (2)
//
//                                 {result?.detailed.q114 && (
//                                     <p className={result.detailed.q114.correct ? "text-green-600" : "text-red-600"}>
//                                         {result.detailed.q114.correct ? "✔ Correct" : "✖ Incorrect"}
//                                     </p>
//                                 )}
//
//                                 <textarea
//                                     className="w-full border p-2 mt-2" rows="3" name="q114"value={answers.q114 || ''}
//                                     onChange={(e) => setAnswers({...answers, q114: e.target.value})}
//                                 ></textarea>
//
//                                 {result?.detailed.q114 && !result.detailed.q114.correct && (
//                                     <p className="text-red-600 mt-1 whitespace-pre-line">
//                                         Correct Answer: {result.detailed.q114.correctAnswer}
//                                     </p>
//                                 )}
//
//                             </li>
//                         </ol>
//
//                         <h5>1.2 Consult Source 1B. </h5>
//                         <ol>
//                             <li> 1.2.1	Why do you think this poster was created? 	 	 	(1 x 2)  	(2)</li>
//
//                             {result?.detailed.q121 && (
//                                 <p className={result.detailed.q121.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q121.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q121" value={answers.q121 || ''}
//                                 onChange={(e) => setAnswers({...answers, q121: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q121 && !result.detailed.q121.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q121.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.2.2	Explain why it was important for Dr Motlana to speak about 'The
//                                 Role of Civic Associations' during the residents' meeting.       (2 x 2) 	(4) </li>
//
//                             {result?.detailed.q122 && (
//                                 <p className={result.detailed.q122.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q122.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q122" value={answers.q122 || ''}
//                                 onChange={(e) => setAnswers({...answers, q122: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q122 && !result.detailed.q122.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q122.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//
//                         <h5>1.3 </h5>
//                         <ol>
//                             <li>	1.3.1	Identify the organisation in the source that supported the rent and    service complaints of the Thembisa residents in the 1980s.  (1 x 1) (1) </li>
//
//                             {result?.detailed.q131 && (
//                                 <p className={result.detailed.q131.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q131.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q131" value={answers.q131 || ''}
//                                 onChange={(e) => setAnswers({...answers, q131: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q131 && !result.detailed.q131.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q131.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>1.3.2	Why do you think Jaki Seroke was detained by the South African   Police officer (Van Niekerk) a day after Thembisa residents
//                                 marched against rent and services?                                       (1 x 2) </li>
//
//                             {result?.detailed.q132 && (
//                                 <p className={result.detailed.q132.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q132.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q132" value={answers.q132 || ''}
//                                 onChange={(e) => setAnswers({...answers, q132: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q132 && !result.detailed.q132.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q132.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>1.3.3	According to the source, give any THREE stipulations of the   General Law Amendment Act with regard to the treatment of the
//                                 detainees.                                                                                (3 x 1) 	(3) </li>
//
//                             {result?.detailed.q133 && (
//                                 <p className={result.detailed.q133.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q133.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q133" value={answers.q133 || ''}
//                                 onChange={(e) => setAnswers({...answers, q133: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q133 && !result.detailed.q133.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q133.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>1.3.4	Define the term rent boycott in your own words.                     (1 x 2) 	(2)</li>
//
//                             {result?.detailed.q134 && (
//                                 <p className={result.detailed.q134.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q134.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q134" value={answers.q134 || ''}
//                                 onChange={(e) => setAnswers({...answers, q134: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q134 && !result.detailed.q134.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q134.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>1.3.5	Explain why those opposed to the rent boycott were regarded as
//                                 puppets of the township superintendent.                                (2 x 2) 	(4)</li>
//
//                             {result?.detailed.q135 && (
//                                 <p className={result.detailed.q135.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q135.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q135" value={answers.q135 || ''}
//                                 onChange={(e) => setAnswers({...answers, q135: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q135 && !result.detailed.q135.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q135.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//
//
//                         <h5>1.4 Read Source 1D.</h5>
//                         <ol>
//                             <li>1.4.1	Quote TWO reasons from the source why township residents in the
//                                 Vaal could not afford to pay rent.                                             (2 x 1)  	(2) </li>
//
//                             {result?.detailed.q141 && (
//                                 <p className={result.detailed.q141.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q141.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q141" value={answers.q141 || ''}
//                                 onChange={(e) => setAnswers({...answers, q141: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q141 && !result.detailed.q141.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q141.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.4.2	Using the information in the source and your own knowledge,   comment on why there were many township councillors who
//                                 resigned in 1984.                                                                     (2 x 2) 	(4) </li>
//
//                             {result?.detailed.q142 && (
//                                 <p className={result.detailed.q142.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q142.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q142" value={answers.q142 || ''}
//                                 onChange={(e) => setAnswers({...answers, q142: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q142 && !result.detailed.q142.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q142.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li> 1.4.3	Explain the concept massacre in the context of the government's   reaction to rent protestors in Mamelodi.                                 (1 x 2) (2) </li>
//
//                             {result?.detailed.q143 && (
//                                 <p className={result.detailed.q143.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q143.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q143" value={answers.q143 || ''}
//                                 onChange={(e) => setAnswers({...answers, q143: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q143 && !result.detailed.q143.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q143.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>1.4.4	Why would a historian regard this source as useful when researching the apartheid government's reaction to rent boycotts in
//                                 townships?                                                                               (2 x 2) 	(4) </li>
//
//                             {result?.detailed.q144 && (
//                                 <p className={result.detailed.q144.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q144.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q144" value={answers.q144 || ''}
//                                 onChange={(e) => setAnswers({...answers, q144: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q144 && !result.detailed.q144.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q144.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <p> 1.5	Refer to Sources 1B and 1D. Explain how the information in Source 1B
//                             supports the evidence in Source 1D regarding the protests against black local
//                             authorities in the 1980s.                           (2 x 2)   	(4)</p>
//
//                         {result?.detailed.q15 && (
//                             <p className={result.detailed.q15.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q15.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q15" value={answers.q15 || ''}
//                             onChange={(e) => setAnswers({...answers, q15: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q15 && !result.detailed.q15.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q15.correctAnswer}
//                             </p>
//                         )}
//
//
//
//                         <p>1.6	Using the information in the relevant sources and your own knowledge, write  	 a paragraph of about EIGHT lines (about 80 words) explaining how civic 	 organisations 	mobilised 	local 	communities 	to 	resist 	the 	apartheid
//                             government's structures in South Africa in the 1980s. 	(8) </p>
//
//                         {result?.detailed.q16 && (
//                             <p className={result.detailed.q16.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q16.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q16" value={answers.q16 || ''}
//                             onChange={(e) => setAnswers({...answers, q16: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q16 && !result.detailed.q16.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q16.correctAnswer}
//                             </p>
//                         )}
//
//                         <hr />
//
//                         <h4>[50] QUESTION 2: WAS THE TRUTH AND RECONCILIATION COMMISSION (TRC) ABLE TO BRING CLOSURE TO SIZWE KONDILE'S FAMILY FOR HIS MURDER AS AN ANTI-APARTHEID ACTIVIST IN 1981? </h4>
//                         <p>Study Sources 2A, 2B, 2C and 2D and answer the questions that follow. </p>
//
//                         <h5>2.1 Refer to Source 2A.</h5>
//                         <ol>
//                             <li> 2.1.1	According to the source, when did Sizwe Kondile and five others    form an underground ANC cell inside the country?                 (1 x 2)  (2) </li>
//
//                             {result?.detailed.q211 && (
//                                 <p className={result.detailed.q211.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q211.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q211" value={answers.q211 || ''}
//                                 onChange={(e) => setAnswers({...answers, q211: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q211 && !result.detailed.q211.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q211.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.1.2	Name THREE of Sizwe Kondile's cell members in the source who
//                                 decided to leave the country in September 1980.                   (3 x 1)  	(3)</li>
//
//                             {result?.detailed.q212 && (
//                                 <p className={result.detailed.q212.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q212.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q212" value={answers.q212 || ''}
//                                 onChange={(e) => setAnswers({...answers, q212: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q212 && !result.detailed.q212.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q212.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.1.3	Using the information in the source and your own knowledge,explain why Kondile and his friend undertook a mission to move  back and forth between Lesotho and South Africa. (1 x 2) (2) </li>
//
//                             {result?.detailed.q213 && (
//                                 <p className={result.detailed.q213.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q213.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q213" value={answers.q213 || ''}
//                                 onChange={(e) => setAnswers({...answers, q213: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q213 && !result.detailed.q213.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q213.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.1.4	Define the term traitor in your own words.                               (1 x 2)   (2) </li>
//
//                             {result?.detailed.q214 && (
//                                 <p className={result.detailed.q214.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q214.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q214" value={answers.q214 || ''}
//                                 onChange={(e) => setAnswers({...answers, q214: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q214 && !result.detailed.q214.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q214.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <h5>2.2 Read Source 2B. </h5>
//                         <ol>
//                             <li>2.2.1	Name THREE senior officers of the South African Police in the    source who admitted to the murder of Sizwe Kondile.            (3 x 1) (3) </li>
//
//                             {result?.detailed.q221 && (
//                                 <p className={result.detailed.q221.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q221.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q221" value={answers.q221 || ''}
//                                 onChange={(e) => setAnswers({...answers, q221: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q221 && !result.detailed.q221.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q221.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.2.2	Explain the term testimony in the context of application for amnesty.             (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q222 && (
//                                 <p className={result.detailed.q222.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q222.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q222" value={answers.q222 || ''}
//                                 onChange={(e) => setAnswers({...answers, q222: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q222 && !result.detailed.q222.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q222.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.2.3	Comment on the meaning of the statement, '… if you were really   remorseful (sorry), you wouldn't apply for amnesty, but, in fact,  stand trial for what you did', regarding Coetzee's request for
//                                 forgiveness.                                                                             (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q223 && (
//                                 <p className={result.detailed.q223.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q223.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q223" value={answers.q223 || ''}
//                                 onChange={(e) => setAnswers({...answers, q223: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q223 && !result.detailed.q223.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q223.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.2.4	Using the information in the source and your own knowledge, state why you think Charity Kondile came to the conclusion that she  could not forgive Dirk Coetzee for what he did to her son.     (1 x 2) (2) </li>
//
//                             {result?.detailed.q224 && (
//                                 <p className={result.detailed.q224.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q224.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q224" value={answers.q224 || ''}
//                                 onChange={(e) => setAnswers({...answers, q224: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q224 && !result.detailed.q224.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q224.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <h5>2.3 Use Source 2C.</h5>
//                         <ol>
//                             <li>2.3.1	Explain why this photograph could be very important to the Kondile family.                                                                                      (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q231 && (
//                                 <p className={result.detailed.q231.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q231.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q231" value={answers.q231 || ''}
//                                 onChange={(e) => setAnswers({...answers, q231: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q231 && !result.detailed.q231.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q231.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.3.2	Using the information in the source and your own knowledge,    comment on why Vusi Pikoli had joined the Kondile family.    (2 x 2) (4) </li>
//
//                             {result?.detailed.q232 && (
//                                 <p className={result.detailed.q232.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q232.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q232" value={answers.q232 || ''}
//                                 onChange={(e) => setAnswers({...answers, q232: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q232 && !result.detailed.q232.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q232.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.3.3	Comment on whether you think the spiritual repatriation of
//                                 Sizwe Kondile could have brought closure to his family for the lack  of his burial.       (1 x 2) (2)</li>
//
//                             {result?.detailed.q233 && (
//                                 <p className={result.detailed.q233.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q233.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q233" value={answers.q233 || ''}
//                                 onChange={(e) => setAnswers({...answers, q233: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q233 && !result.detailed.q233.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q233.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <h5>2.4 Consult Source 2D. </h5>
//                         <ol>
//                             <li>2.4.1	Quote, from the source, any FOUR ways indicating how
//                                 Sizwe Kondile died at the hands of the police.                        (4 x 1)(4) </li>
//
//                             {result?.detailed.q241 && (
//                                 <p className={result.detailed.q241.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q241.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q241" value={answers.q241 || ''}
//                                 onChange={(e) => setAnswers({...answers, q241: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q241 && !result.detailed.q241.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q241.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.4.2	Comment on why a spiritual repatriation was necessary for the
//                                 Kondile family. 	 	(1 x 2) 	(2) </li>
//
//                             {result?.detailed.q242 && (
//                                 <p className={result.detailed.q242.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q242.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q242" value={answers.q242 || ''}
//                                 onChange={(e) => setAnswers({...answers, q242: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q242 && !result.detailed.q242.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q242.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.4.3	Why did Masutha believe the ceremony in 2016 was'a moment of reflection for all of us'?      (1 x 2)  (2) </li>
//
//                             {result?.detailed.q243 && (
//                                 <p className={result.detailed.q243.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q243.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q243" value={answers.q243 || ''}
//                                 onChange={(e) => setAnswers({...answers, q243: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q243 && !result.detailed.q243.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q243.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>2.4.4	Explain why a historian might consider this a reliable source for researching the symbolic burial of Sizwe Kondile.                   (2 x 2) (4) </li>
//
//                             {result?.detailed.q244 && (
//                                 <p className={result.detailed.q244.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q244.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q244" value={answers.q244 || ''}
//                                 onChange={(e) => setAnswers({...answers, q244: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q244 && !result.detailed.q244.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q244.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//
//                         <p>2.5	Refer to Sources 2B and 2D. Explain how the information in Source 2D differs
//                             from the evidence in Source 2B regarding bringing closure to the Kondile family.                   (2 x 2) 	(4) </p>
//
//                         {result?.detailed.q25 && (
//                             <p className={result.detailed.q25.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q25.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q25" value={answers.q25 || ''}
//                             onChange={(e) => setAnswers({...answers, q25: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q25 && !result.detailed.q25.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q25.correctAnswer}
//                             </p>
//                         )}
//
//                         <p>2.6	Using the information in the relevant sources and your own knowledge, write   a paragraph of about EIGHT lines (about 80 words) explaining whether the  Truth and Reconciliation Commission (TRC) was able to bring closure to
//                             Sizwe Kondile's family for his murder as an anti-apartheid activist in 1981. 	(8)          (2 x 2) 	(4) </p>
//
//                         {result?.detailed.q26 && (
//                             <p className={result.detailed.q26.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q26.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q26" value={answers.q26 || ''}
//                             onChange={(e) => setAnswers({...answers, q26: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q26 && !result.detailed.q26.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q26.correctAnswer}
//                             </p>
//                         )}
//
//                         <h5>QUESTION 3: WHY WAS THERE RESISTANCE TO WALMART'S EXPANSION   INTO SOUTH AFRICA IN 2011? </h5>
//                         <p>Study Sources 3A, 3B, 3C and 3D and answer the questions that follow. </p>
//
//
//                         <h5>3.1 Refer to Source 3A.</h5>
//                         <ol>
//                             <li>3.1.1	Define the term globalisation in your own words.                    (1 x 2)  (2) </li>
//
//                             {result?.detailed.q311 && (
//                                 <p className={result.detailed.q311.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q311.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q311" value={answers.q311 || ''}
//                                 onChange={(e) => setAnswers({...answers, q311: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q311 && !result.detailed.q311.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q311.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.1.2	Give THREE reasons in the source why companies expand their
//                                 activities across borders.                                                         (3 x 1) 	(3) </li>
//
//                             {result?.detailed.q312 && (
//                                 <p className={result.detailed.q312.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q312.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q312" value={answers.q312 || ''}
//                                 onChange={(e) => setAnswers({...answers, q312: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q312 && !result.detailed.q312.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q312.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.1.3 Using the information in the source and your own knowledge, explain why Walmart aggressively pursued a globalisation strategy. (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q313 && (
//                                 <p className={result.detailed.q313.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q313.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q313" value={answers.q313 || ''}
//                                 onChange={(e) => setAnswers({...answers, q313: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q313 && !result.detailed.q313.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q313.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.1.4	Give any TWO factors, according to the source, which made it   easier for firms to conduct business across borders.              (2 x 1) (2) </li>
//
//                             {result?.detailed.q314 && (
//                                 <p className={result.detailed.q314.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q314.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q314" value={answers.q314 || ''}
//                                 onChange={(e) => setAnswers({...answers, q314: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q314 && !result.detailed.q314.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q314.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.1.5	Explain the meaning of the statement, '… South Africa is relatively open to trade', in the context of globalisation.                         (1 x 2) (2) </li>
//
//                             {result?.detailed.q315 && (
//                                 <p className={result.detailed.q315.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q315.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q315" value={answers.q315 || ''}
//                                 onChange={(e) => setAnswers({...answers, q315: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q315 && !result.detailed.q315.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q315.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <h5>3.2 Consult Source 3B. </h5>
//                         <ol>
//                             <li>3.2.1	Why do you think this photograph was taken?                        (1 x 2)  	(2) </li>
//
//                             {result?.detailed.q321 && (
//                                 <p className={result.detailed.q321.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q321.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q321" value={answers.q321 || ''}
//                                 onChange={(e) => setAnswers({...answers, q321: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q321 && !result.detailed.q321.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q321.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.2.2	Comment on the meaning of the words, 'WALMART – THE
//                                 ECONOMIC COLONISER!'                                                     (2 x 2) 	(4) </li>
//
//                             {result?.detailed.q322 && (
//                                 <p className={result.detailed.q322.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q322.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q322" value={answers.q322 || ''}
//                                 onChange={(e) => setAnswers({...answers, q322: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q322 && !result.detailed.q322.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q322.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.2.3	Explain the limitations of this source for a researcher studying the    impact of globalisation on South Africa.             (2 x 2) (4) </li>
//
//                             {result?.detailed.q323 && (
//                                 <p className={result.detailed.q323.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q323.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q323" value={answers.q323 || ''}
//                                 onChange={(e) => setAnswers({...answers, q323: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q323 && !result.detailed.q323.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q323.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <h5>3.3 Read Source 3C.</h5>
//                         <ol>
//                             <li>3.3.1	According to the source, why would the presence of Walmart in South Africa negatively affect the local employment and local    manufacturing sector? Give TWO responses.                        (2 x 1) (2) </li>
//
//                             {result?.detailed.q331 && (
//                                 <p className={result.detailed.q331.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q331.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q331" value={answers.q331 || ''}
//                                 onChange={(e) => setAnswers({...answers, q331: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q331 && !result.detailed.q331.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q331.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.3.2	Using the information in the source and your own knowledge, explain how Walmart's entry into South Africa would lead to a      de-industrialisation within the manufacturing sector.              (2 x 2) (4) </li>
//
//                             {result?.detailed.q332 && (
//                                 <p className={result.detailed.q332.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q332.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q332" value={answers.q332 || ''}
//                                 onChange={(e) => setAnswers({...answers, q332: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q332 && !result.detailed.q332.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q332.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.3.3	Identify evidence in the source that indicates that Walmart's presence in the local market would worsen conditions for 	  	employees.                                                                              (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q333 && (
//                                 <p className={result.detailed.q333.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q333.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q333" value={answers.q333 || ''}
//                                 onChange={(e) => setAnswers({...answers, q333: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q333 && !result.detailed.q333.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q333.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//                         <p>3.4	Refer to Sources 3B and 3C. Explain how the information in Source 3C
//                             supports the evidence in Source 3B regarding the reaction of trade unions
//                             towards the merger of Walmart and Massmart.                                       (2 x 2) 	(4) </p>
//
//                         {result?.detailed.q34 && (
//                             <p className={result.detailed.q34.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q34.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q34" value={answers.q34 || ''}
//                             onChange={(e) => setAnswers({...answers, q34: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q34 && !result.detailed.q34.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q34.correctAnswer}
//                             </p>
//                         )}
//
//                         <h5>3.5 Study Source 3D.</h5>
//                         <ol>
//                             <li>3.5.1	What, according to the source, was South Africa's fear if Walmart    came into the country with its 'sophisticated modern network to
//                                 procure'?                                                        (1 x 1) 	(1) </li>
//
//                             {result?.detailed.q351 && (
//                                 <p className={result.detailed.q351.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q351.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q351" value={answers.q351 || ''}
//                                 onChange={(e) => setAnswers({...answers, q351: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q351 && !result.detailed.q351.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q351.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.5.2	Quote TWO options from the source that South Africa had on how   to deal with Walmart's intentions to expand into the country. (2 x 1) (2) </li>
//
//                             {result?.detailed.q352 && (
//                                 <p className={result.detailed.q352.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q352.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q352" value={answers.q352 || ''}
//                                 onChange={(e) => setAnswers({...answers, q352: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q352 && !result.detailed.q352.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q352.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.5.3	Comment on why you think it was necessary for Walmart to have   reliable local suppliers especially for perishable products.     (2 x 2) (4) </li>
//
//                             {result?.detailed.q353 && (
//                                 <p className={result.detailed.q353.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q353.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q353" value={answers.q353 || ''}
//                                 onChange={(e) => setAnswers({...answers, q353: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q353 && !result.detailed.q353.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q353.correctAnswer}
//                                 </p>
//                             )}
//
//                             <li>3.5.4	Explain the concept protectionist in the context of internationaltrade relations.                (1 x 2) 	(2) </li>
//
//                             {result?.detailed.q354 && (
//                                 <p className={result.detailed.q354.correct ? "text-green-600" : "text-red-600"}>
//                                     {result.detailed.q354.correct ? "✔ Correct" : "✖ Incorrect"}
//                                 </p>
//                             )}
//
//                             <textarea
//                                 className="w-full border p-2 mt-2" rows="3" name="q354" value={answers.q354 || ''}
//                                 onChange={(e) => setAnswers({...answers, q354: e.target.value})}
//                             ></textarea>
//
//                             {result?.detailed.q354 && !result.detailed.q354.correct && (
//                                 <p className="text-red-600 mt-1 whitespace-pre-line">
//                                     Correct Answer: {result.detailed.q354.correctAnswer}
//                                 </p>
//                             )}
//
//                         </ol>
//
//
//                         <p>3.6 Using the information in the relevant sources and your own knowledge, write
//                             a paragraph of about EIGHT lines (about 80 words) explaining why there was
//                             resistance to Walmart's expansion into South Africa in 2011. 	(8) [50] </p>
//
//                         {result?.detailed.q36 && (
//                             <p className={result.detailed.q36.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q36.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q36" value={answers.q36 || ''}
//                             onChange={(e) => setAnswers({...answers, q36: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q36 && !result.detailed.q36.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q36.correctAnswer}
//                             </p>
//                         )}
//
//                         <hr />
//
//                         <h3>SECTION B: ESSAY QUESTIONS</h3>
//                         <p>Answer at least ONE question, but not more than TWO questions, in this section.</p>
//                         <p>Your essay should be about THREE pages long.</p>
//
//                         <h4>QUESTION 4: 	CIVIL RESISTANCE, 1970s TO 1980s: SOUTH AFRICA: THE CRISIS OF APARTHEID IN THE 1980s </h4>
//                         <p>Explain to what extent Steve Biko and the Black Consciousness philosophy inspired  black people to empower themselves against apartheid in the 1960s and 1970s.
//                             Use relevant historical evidence to support your line of argument. [50] </p>
//
//                         <h4>QUESTION 5: 	THE COMING OF DEMOCRACY TO SOUTH AFRICA AND  COMING TO TERMS WITH THE PAST </h4>
//                         <p>Although the negotiation process was plagued with violence, various political parties  were willing to compromise to lay a firm foundation for a democratic South Africa  in 1994.
//                             Do you agree with this statement? Use relevant historical evidence to support your line of argument. [50] </p>
//
//                         <h4>QUESTION 6: 	THE END OF THE COLD WAR AND A NEW WORLD ORDER: THE EVENTS OF 1989: THE EVENTS OF 1989 </h4>
//                         <p>Gorbachev's political and economic reforms of the mid-1980s led to the disintegration and downfall of the Soviet Union, and ultimately the end of the Cold War in 1991.
//                             Critically discuss this statement. Support your line of argument with relevant historical evidence.[50] </p>
//
//                         <p className="font-semibold">TOTAL: 150</p>
//                         {result?.detailed.q4 && (
//                             <p className={result.detailed.q4.correct ? "text-green-600" : "text-red-600"}>
//                                 {result.detailed.q4.correct ? "✔ Correct" : "✖ Incorrect"}
//                             </p>
//                         )}
//
//                         <textarea
//                             className="w-full border p-2 mt-2" rows="3" name="q4" value={answers.q4 || ''}
//                             onChange={(e) => setAnswers({...answers, q4: e.target.value})}
//                         ></textarea>
//
//                         {result?.detailed.q4 && !result.detailed.q4.correct && (
//                             <p className="text-red-600 mt-1 whitespace-pre-line">
//                                 Correct Answer: {result.detailed.q4.correctAnswer}
//                             </p>
//                         )}
//                     </section>
//
//                     <button type="submit" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow" >
//                         Submit Answers
//                     </button>
//                 </form>
//
//                 {result && (
//                     <div className="mt-8 p-4 bg-gray-100 border border-gray-400 rounded">
//                         <h2 className="text-xl font-bold">Results</h2>
//                         <p className="text-lg mt-2">Total Mark: {result.score}</p>
//
//                         <div className="mt-4">
//
//                         </div>
//                     </div>
//                 )}
//
//                 <footer className="mt-8 text-sm text-gray-500 text-center">Please turn over</footer>
//             </div>
//
//             <div className="max-w-5xl mx-auto mt-6 text-right text-xs text-gray-400">Page 1 of 9</div>
//
//             <div className="mt-14">
//                 <h2 className="text-xl font-semibold mb-4">ADDENDUM</h2>
//
//                 <div className="space-y-6">
//                     <img src={image1} className="w-full rounded-lg shadow" alt="Addendum 1" />
//                     <img src={image2} className="w-full rounded-lg shadow" alt="Addendum 2" />
//                     <img src={image3} className="w-full rounded-lg shadow" alt="Addendum 3" />
//                     <img src={image4} className="w-full rounded-lg shadow" alt="Addendum 4" />
//                     <img src={image5} className="w-full rounded-lg shadow" alt="Addendum 5" />
//                     <img src={image6} className="w-full rounded-lg shadow" alt="Addendum 6" />
//                     <img src={image7} className="w-full rounded-lg shadow" alt="Addendum 7" />
//                     <img src={image8} className="w-full rounded-lg shadow" alt="Addendum 8" />
//                     <img src={image9} className="w-full rounded-lg shadow" alt="Addendum 9" />
//                     <img src={image10} className="w-full rounded-lg shadow" alt="Addendum 10" />
//                     <img src={image11} className="w-full rounded-lg shadow" alt="Addendum 11" />
//                     <img src={image12} className="w-full rounded-lg shadow" alt="Addendum 12" />
//                     <img src={image13} className="w-full rounded-lg shadow" alt="Addendum 13" />
//                     <img src={image14} className="w-full rounded-lg shadow" alt="Addendum 14" />
//                 </div>
//             </div>
//              <style jsx>
//                  {`
//
//                      :root {
//                          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
//                          line-height: 1.5;
//                          font-weight: 400;
//
//                          color-scheme: light dark;
//                          color: rgba(255, 255, 255, 0.87);
//                          background-color: #242424;
//
//                          font-synthesis: none;
//                          text-rendering: optimizeLegibility;
//                          -webkit-font-smoothing: antialiased;
//                          -moz-osx-font-smoothing: grayscale;
//                      }
//
//                      a {
//                          font-weight: 500;
//                          color: #646cff;
//                          text-decoration: inherit;
//                      }
//                      a:hover {
//                          color: #535bf2;
//                      }
//
//                      body {
//                          margin: 0;
//                          display: flex;
//                          place-items: center;
//                          min-width: 320px;
//                          min-height: 100vh;
//                      }
//
//                      h1 {
//                          font-size: 3.2em;
//                          line-height: 1.1;
//                      }
//
//                      button {
//                          border-radius: 8px;
//                          border: 1px solid transparent;
//                          padding: 0.6em 1.2em;
//                          font-size: 1em;
//                          font-weight: 500;
//                          font-family: inherit;
//                          background-color: #1a1a1a;
//                          cursor: pointer;
//                          transition: border-color 0.25s;
//                      }
//                      button:hover {
//                          border-color: #646cff;
//                      }
//                      button:focus,
//                      button:focus-visible {
//                          outline: 4px auto -webkit-focus-ring-color;
//                      }
//
//                      @media (prefers-color-scheme: light) {
//                          :root {
//                              color: #213547;
//                              background-color: #ffffff;
//                          }
//                          a:hover {
//                              color: #747bff;
//                          }
//                          button {
//                              background-color: #f9f9f9;
//                          }
//                      }
//
//
//                  `}
//              </style>
//
//         </main>
//
//     );
// }