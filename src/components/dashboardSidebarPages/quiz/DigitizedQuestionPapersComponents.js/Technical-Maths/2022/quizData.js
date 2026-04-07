// // quizData.js
// import piston from './assets/1.3.jpg';
// import points from './assets/3.jpg';
// import rhino from './assets/5.jpg';
// import graph from './assets/7.jpg';
// import functions from './assets/9.2.jpg';
//
// const QUIZ_DATA = [
//     // --- QUESTION 1 ---
//     { id: '1', type: 'header', text: 'QUESTION 1' },
//     { id: '1.1.1', type: 'text-input', question: 'Solve for x (7 + x) = 0', correctAnswer: '-7', points: 2 },
//     { id: '1.1.2', type: 'text-input', question: 'Solve for 4x²-5x-4=0 (correct to TWO decimal places)', correctAnswer: '1.80,-0.55', points: 3 },
//     { id: '1.1.3', type: 'text-input', question: 'Solve for 2x²-8>0 and represent the solution on a number line', correctAnswer: 'x<-2,x>2', points: 3 },
//     { id: '1.2', type: 'text-input', question: 'Solve for x and y if y=5x-2 and y=x²-4x-8', correctAnswer: 'x=3,x=-2,y=13,y=-12', points: 5 },
//     {
//         id: '1.3',
//         type: 'instruction',
//         text: 'The diagram below shows the movement of a piston inside the engine cylinder of a car. Alongside is the formula for calculating the swept volume (SV), which is equal to the base area of the cylinder multiplied by the length of the stroke (L).',
//         image: piston
//     },
//     { id: '1.3.1', type: 'text-input', question: 'Make L the subject of the formula.', correctAnswer: '4SV/πd²', points: 2 },
//     { id: '1.3.2', type: 'text-input', question: 'Hence, calculate (rounded to the nearest cm), the numerical value of L if SV = 1020.5 cm³ and diameter d = 10 cm.', correctAnswer: '13cm', points: 2 },
//     {
//         id: '1.4',
//         type: 'instruction',
//         text: 'Given the binary numbers: P = 1010₂ and Q = 10000₂'
//     },
//     { id: '1.4.1', type: 'text-input', question: 'Write P in decimal form.', correctAnswer: '10', points: 1 },
//     { id: '1.4.2', type: 'text-input', question: 'Determine P × Q in binary form.', correctAnswer: '10100000₂', points: 2 },
//
//     // --- QUESTION 2 ---
//     { id: '2', type: 'header', text: 'QUESTION 2' },
//     { id: '2.1', type: 'text-input', question: 'Given the equation x² - 2x + 6 = 0', correctAnswer: '', points: 0 },
//     { id: '2.1.1', type: 'text-input', question: 'Determine the numerical value of the discriminant.', correctAnswer: '-20', points: 2 },
//     { id: '2.1.2', type: 'text-input', question: 'Hence, describe the nature of the roots.', correctAnswer: 'Two non-real, complex conjugate roots', points: 1 },
//     { id: '2.2', type: 'text-input', question: 'Determine the numerical value of k for which x² + 2x + k = 0 will have real roots.', correctAnswer: 'k≤1', points: 1 },
//
//     // --- QUESTION 3 ---
//     { id: '3', type: 'header', text: 'QUESTION 3' },
//     { id: '3.1', type: 'instruction', text: 'Simplify the following without the use of a calculator:' },
//     { id: '3.1.1', type: 'text-input', question: 'Simplify 8x³y² / 16xy⁴ (leave answer with positive exponents)', correctAnswer: 'x²/2y²', points: 2 },
//     { id: '3.1.2', type: 'text-input', question: 'Simplify (√48 + √12)/√27', correctAnswer: '2', points: 3 },
//     { id: '3.2', type: 'instruction', text: 'If log5 = m, determine the following in terms of m:' },
//     { id: '3.2.1', type: 'text-input', question: 'Determine log25 in terms of m', correctAnswer: '2m', points: 2 },
//     { id: '3.2.2', type: 'text-input', question: 'Determine log2 in terms of m', correctAnswer: '1-m', points: 3 },
//     { id: '3.3', type: 'text-input', question: 'Solve for x: log₂(x + 3) - 3 = - log₂(x - 4)', correctAnswer: '5', points: 5 },
//     { id: '3.4', type: 'instruction', text: 'Given complex numbers z₁ = -1 + 3i; z₂ = √2 cis 135°' },
//     { id: '3.4.1', type: 'text-input', question: 'Write down the conjugate of z₁', correctAnswer: '-1-3i', points: 1 },
//     { id: '3.4.2', type: 'text-input', question: 'Express z₂ in rectangular form', correctAnswer: '-1+i', points: 2 },
//     { id: '3.4.3', type: 'text-input', question: 'Evaluate z₁ - z₂', correctAnswer: '2i', points: 2 },
//     { id: '3.5', type: 'text-input', question: 'Solve for x and y if x + yi − (1 − i) = 4 + 5i', correctAnswer: 'x=5,y=6', points: 5 },
//
//     // --- QUESTION 4 ---
//     { id: '4', type: 'header', text: 'QUESTION 4' },
//     { id: '4.1', type: 'instruction', text: 'Sketched below are the graphs of functions ƒ and g...', image: points },
//     { id: '4.1.1a', type: 'text-input', question: 'The range of f', correctAnswer: 'y≥-9', points: 1 },
//     { id: '4.1.1b', type: 'text-input', question: 'The coordinates of Q', correctAnswer: 'Q(4,-5)', points: 2 },
//     { id: '4.1.2a', type: 'text-input', question: 'Determine the x-intercept(s) of f', correctAnswer: 'x=-1,x=5', points: 3 },
//     { id: '4.1.2b', type: 'text-input', question: 'Write down the length of AB', correctAnswer: '6', points: 1 },
//     { id: '4.1.3', type: 'text-input', question: 'Determine the numerical values of m and c', correctAnswer: 'm=-1,c=-1', points: 3 },
//     { id: '4.1.4', type: 'text-input', question: 'Write down the value(s) of x for which f(x) × g(x) > 0', correctAnswer: 'x=-1,x>5', points: 2 },
//     { id: '4.2.1', type: 'text-input', question: 'Write down the domain of h(x)=√(13-x²)', correctAnswer: 'x∈[-√13,√13]', points: 2 },
//     { id: '4.2.2a', type: 'text-input', question: 'Write down the equations of the asymptotes of k(x)=3/x+1', correctAnswer: 'x=0,y=1', points: 2 },
//     { id: '4.2.2b', type: 'text-input', question: 'Determine the x-intercept of k(x)=3/x+1', correctAnswer: 'x=-3', points: 2 },
//     { id: '4.2.3', type: 'instruction', text: 'Sketch the graphs of h(x) and k(x) on the ANSWER SHEET provided.' },
//
//     // --- QUESTION 5 ---
//     { id: '5', type: 'header', text: 'QUESTION 5' },
//     { id: '5.1', type: 'text-input', question: 'A cellphone bought in 2022 cost R8000. Determine the value after 3 years at 13% inflation.', correctAnswer: 'R11543.18', points: 3 },
//     { id: '5.2', type: 'instruction', text: 'The white rhino population in Kruger National Park depreciates at 12.8% per year.', image: rhino },
//     { id: '5.2.1', type: 'text-input', question: 'How many white rhinos at the start of the survey (2011)?', correctAnswer: '10621', points: 1 },
//     { id: '5.2.2', type: 'text-input', question: 'Which graph represents the reducing-balance method?', correctAnswer: 'g', points: 1 },
//     { id: '5.2.3', type: 'text-input', question: 'Determine how long it took for the population to decrease to 3459 (nearest year).', correctAnswer: '8', points: 5 },
//     { id: '5.3', type: 'text-input', question: 'Samuel opens a savings account... Determine if he has enough for R35000 cruise.', correctAnswer: 'No', points: 5 },
//
//     // --- QUESTION 6 ---
//     { id: '6', type: 'header', text: 'QUESTION 6' },
//     { id: '6.1', type: 'text-input', question: 'Determine f\'(x) using FIRST PRINCIPLES if f(x) = 5 − 8x', correctAnswer: 'f\'(x)=-8', points: 5 },
//     { id: '6.2.1', type: 'text-input', question: 'Determine f\'(x) if f(x) = 3x³ + πx', correctAnswer: 'f\'(x)=9x²+π', points: 2 },
//     { id: '6.3.1', type: 'text-input', question: 'Determine p if gradient of g(x)=6x²+3x at x=p is -21', correctAnswer: '-2', points: 3 },
//     { id: '6.3.2', type: 'text-input', question: 'Equation of tangent at x=p', correctAnswer: 'y=-21x-24', points: 3 },
//
//     // --- QUESTION 7 ---
//     { id: '7', type: 'header', text: 'QUESTION 7' },
//     { id: '7.1', type: 'instruction', text: 'Graph of f(x)=x³+3x²−9x+k', image: graph },
//     { id: '7.1.1', type: 'text-input', question: 'Write down length of OA', correctAnswer: '1', points: 1 },
//     { id: '7.2', type: 'text-input', question: 'Show that k=5', correctAnswer: '5', points: 1 },
//     { id: '7.3', type: 'text-input', question: 'Determine coordinates of point B', correctAnswer: 'B(-5,0)', points: 4 },
//     { id: '7.4', type: 'text-input', question: 'Determine coordinates of turning point D', correctAnswer: 'D(-3,32)', points: 5 },
//     { id: '7.5', type: 'text-input', question: 'Value(s) of x for which f\'(x)≤0', correctAnswer: 'x∈[-3,1]', points: 2 },
//     { id: '7.6', type: 'text-input', question: 'If g(x)=f(x)-2, write new coordinates of A', correctAnswer: '(1,-2)', points: 2 },
//
//     // --- QUESTION 8 ---
//     { id: '8', type: 'header', text: 'QUESTION 8' },
//     { id: '8.1', type: 'text-input', question: 'Write down the initial temperature', correctAnswer: '37.5', points: 1 },
//     { id: '8.2', type: 'text-input', question: 'Rate of change of temperature at t=4', correctAnswer: '3', points: 3 },
//     { id: '8.3', type: 'text-input', question: 'Maximum temperature reached', correctAnswer: '62', points: 3 },
//     { id: '8.4', type: 'text-input', question: 'Time interval when temperature decreasing', correctAnswer: 't>7,t≤10', points: 2 },
//
//     // --- QUESTION 9 ---
//     { id: '9', type: 'header', text: 'QUESTION 9' },
//     { id: '9.1.1', type: 'text-input', question: 'Evaluate ∫3x⁻¹ dx', correctAnswer: '3ln|x|+C', points: 2 },
//     { id: '9.1.2', type: 'text-input', question: 'Evaluate ∫(4+2^-x) dx', correctAnswer: '4x-(1/ln2)2^-x+C', points: 2 },
//     { id: '9.2', type: 'instruction', text: 'Shaded area bounded by h(x)=-x²+2x+8 and x-axis between x=2 and x=4. Total area = 36 sq.units', image: functions },
//     { id: '9.2.1', type: 'text-input', question: 'Learner claims shaded area is 20% of total area. Is this correct?', correctAnswer: 'No', points: 5 }
// ];
//
// export default QUIZ_DATA;
