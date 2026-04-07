// import pendulumImage from './assets/1.2.jpg';
// import sketch from './assets/4.2.jpg';
// import machine from './assets/5.2.jpg';
// import containerImage from './assets/8.jpg';
// import boundedAreaImage from './assets/9.jpg';
//
// const QUIZ_DATA = [
//     // --- QUESTION 1: ALGEBRA ---
//     { id: '', type: 'instruction', text: 'QUESTION 1' },
//     { id: '1.1.1', type: 'text-input', question: 'Solve for 2x(x+3)=0', correctAnswer: '0, 3', points: 2 },
//     { id: '1.1.2', type: 'text-input', question: 'Solve for x(x+9)=12 (correct to TWO decimal places)', correctAnswer: '1.18, -10.18', points: 4 },
//     { id: '1.1.3', type: 'text-input', question: 'Solve for x(6−x)≥0 and then represent the solution on a number line', correctAnswer: 'x≥0, x≤6', points: 3 },
//     { id: '1.2', type: 'text-input', question: 'Solve for x and y if: x=1-2y and 3x²=3+x+y', correctAnswer: 'x= -1, x = 1.17, y=1, y=-0.08', points: 6 },
//     { id: '1.3', type: 'instruction', text: 'The diagram below shows a simple pendulum...', image: pendulumImage },
//     { id: '1.3.1', type: 'text-input', question: 'Make L the subject of the formula.', correctAnswer: '80', points: 2 },
//     { id: '1.3.2', type: 'text-input', question: 'Hence, calculate the numerical value of L if g = 9,8 m/s² and T = 1,74s', correctAnswer: '0,75m', points: 1 },
//
//     // --- QUESTION 2 ---
//     { id: '', type: 'instruction', text: 'QUESTION 2' },
//     { id: '2.1.1', type: 'text-input', question: 'k < 9', correctAnswer: 'Non-real', points: 1 },
//     { id: '2.1.2', type: 'text-input', question: 'k = 9', correctAnswer: 'Real, rational, equal', points: 1 },
//     { id: '2.2', type: 'text-input', question: 'Determine the value(s) of q for which the equation -x²+2qx-4=0 will have non-real roots.', correctAnswer: '-2 < q < 2, q > -2 and q < 2', points: 5 },
//
//     // --- QUESTION 3 ---
//     { id: '', type: 'instruction', text: 'QUESTION 3' },
//     { id: '3.1.1', type: 'text-input', question: '(81a⁻⁸)⁻³/⁴', correctAnswer: '3⁻³ a⁶, 1/27 a⁶', points: 3 },
//     { id: '3.1.2', type: 'text-input', question: 'log₂ 16 + log₃4⁰', correctAnswer: '4', points: 4 },
//     { id: '3.1.3', type: 'text-input', question: '√50x¹⁰ × √18x⁻⁴', correctAnswer: '30x³', points: 3 },
//     { id: '3.2', type: 'text-input', question: 'Solve for x: log₃(x+2)=2+log₃x', correctAnswer: '1/4, 0,25', points: 4 },
//     { id: '3.3.1', type: 'text-input', question: 'Determine the value of p.', correctAnswer: '-2', points: 4 },
//     { id: '3.3.2', type: 'text-input', question: 'Express z in the polar form z = r cis 0', correctAnswer: '2√5 cis 2,03 rad,2√5 cis 116,57°', points: 3 },
//     { id: '3.4', type: 'text-input', question: 'Solve for m and n if 2m-ni-6i=-3i (4i+5)', correctAnswer: 'm=6 , n=9', points: 4 },
//
//     // --- QUESTION 4 ---
//     { id: '', type: 'instruction', text: 'QUESTION 4' },
//     { id: '4.1.1a', type: 'text-input', question: 'The y-intercept of h', correctAnswer: '6, (0;6)', points: 1 },
//     { id: '4.1.1b', type: 'text-input', question: 'The equation of the asymptote of h', correctAnswer: '5', points: 1 },
//     { id: '4.1.1c', type: 'text-input', question: 'The x- and y-intercept(s) of k', correctAnswer: '-1, 3', points: 3 },
//     { id: '4.1.1d', type: 'text-input', question: 'The turning point of k', correctAnswer: '1;8', points: 3 },
//     { id: '4.1.2', type: 'long-text', question: 'Hence, sketch the graphs of h(x) and k(x) on the same set of axes on the ANSWER SHEET provided. Clearly show the intercepts with the axes, turning points, and any asymptote(s).', correctAnswer: null, points: 6 },
//     { id: '4.1.3', type: 'text-input', question: 'If p(x) = a/x, determine the numerical value of a if the graph passes through (-1, 8) and has the same horizontal asymptote as h(x).', correctAnswer: '-3', points: 3 },
//     { id: '4.2', type: 'instruction', text: `Sketched below are the graphs of ƒ and g defined by f(x) = -√r2 and g(x) = 2x - 10 respectively. A(3, -4) and C are the points of intersection of ƒ and g. B and D are the y-intercepts of ƒ and g respectively.`, image: sketch },
//     { type: 'instruction', text: 'Determine:' },
//     { id: '4.2.1', type: 'text-input', question: 'Determine the coordinates of C', correctAnswer: '(5;0)', points: 2 },
//     { id: '4.2.2', type: 'text-input', question: 'Determine the length of DB', correctAnswer: 'D(0;-10) , B(0;-5)', points: 2 },
//     { id: '4.2.3', type: 'text-input', question: 'Determine the equation of f', correctAnswer: '-√25-x , - √5²-x²', points: 1 },
//     { id: '4.2.4', type: 'text-input', question: 'Determine the value(s) of x for which g(x) - f(x) > 0', correctAnswer: '3<x<5', points: 2 },
//
//     // --- QUESTION 5 ---
//     { type: 'instruction', text: 'QUESTION 5' },
//     { id: '5.1', type: 'instruction', text: `An electrician purchased equipment worth R63 150 and was charged a simple interest rate of 4⁄23 on the purchase amount each year. He will repay the equipment over a period of 7 years.` },
//     { id: '5.1.1', type: 'text-input', question: 'Express 4⁄23 as a percentage.', correctAnswer: '17.39%', points: 1 },
//     { id: '5.1.2', type: 'text-input', question: 'Determine the total payment at the end of the 7th year.', correctAnswer: '140028,26', points: 2 },
//     { id: '5.2', type: 'instruction', text: 'A newly bought machine, costing R726 900, depreciates at a rate of 15,8% per annum according to the reducing-balance method.', image: machine },
//     { id: '5.2.1', type: 'text-input', question: 'Determine the number of years (n) it will take for the value of the machine to be less than R274 000.', correctAnswer: '5,67', points: 4 },
//     { id: '5.3', type: 'instruction', question: `Four years ago, Sizwe opened a savings account to pay for his studies...` },
//     { id: '5.3.1', type: 'text-input', question: 'Determine the college fees at the end of the 4th year, if the fees continue to increase at the same rate.', correctAnswer: '27919.81', points: 2 },
//     { id: '5.3.2', type: 'text-input', question: 'Determine whether Sizwe would have saved enough money to pay for the fees at the end of the 4-year investment period.', correctAnswer: 'No', points: 6 },
//
//     // --- QUESTION 6 ---
//     { type: 'instruction', instruction: 'QUESTION 6' },
//     { id: '6.1', type: 'question', text: "Determine f'(x) using FIRST PRINCIPLES if f(x) = -3x", correctAnswer: '-3', points: 5 },
//     { id:'6.2', instruction: 'Determine' },
//     { id: '6.2.1', type: 'text-input', question: 'Dₓ[p³x² - 7x + 10]', correctAnswer: "2p³x - 7", points: 2 },
//     { id: '6.2.3', type: 'text-input', question: "f'(x) if  f(x) = √x² + 5x²", correctAnswer: "20x³", points: 3 },
//     { id: '6.3', type: 'instruction', instruction: "Find the equation of the tangent line f(x) = mx + c to the curve g(x) = x² + 3x − 2 that is perpendicular to the line p(x) = (1/9)x − 4." },
//     { id: '6.3.1', type: 'text-input', question: "Write down the value of m.", correctAnswer: "-9", points: 1 },
//     { id: '6.3.2', type: 'text-input', question: "Hence, determine the coordinates of the point of contact of the tangent to the curve g(x) = x² + 3x − 2.", correctAnswer: "6;-16", points: 4 },
//     { id: '6.3.3', type: 'text-input', question: "Determine the average gradient of g(x) = x² + 3x − 2 between the points where x = 3 and x = 2.", correctAnswer: "-4", points: 3 },
//
//     // --- QUESTION 7 ---
//     { type: 'instruction', instruction: "Question 7" },
//     { id: '7.1', type: 'instruction', instruction: "Given: f(x) = x³ - 2x² - 7x - 4" },
//     { id: '7.1.1', type: 'text-input', question: "Write down the y-intercept of f(x) = x³ - 2x² - 7x - 4.", correctAnswer: "-4", points: 1 },
//     { id: '7.1.2', type: 'text-input', question: "Show that x - 4 is a factor of f(x) = x³ - 2x² - 7x - 4.", correctAnswer: "-4", points: 2 },
//     { id: '7.1.3', type: 'text-input', question: "Determine the x-intercepts of f(x) = x³ - 2x² - 7x - 4.", correctAnswer: "-1,4", points: 3 },
//     { id: '7.1.4', type: 'text-input', question: "Determine the coordinates of the turning points of f(x) = x³ - 2x² - 7x - 4.", correctAnswer: "-1;0 , 2.33;-18.52", points: 5 },
//     { id: '7.1.5', type: 'instruction', instruction: "Sketch the graph of f(x) = x³ - 2x² - 7x - 4 on the ANSWER SHEET provided. Clearly show ALL the intercepts with the axes and the turning points.", points: 4 },
//     { id: '7.1.6', type: 'text-input', question: "Determine the value(s) of x for which the graph of f(x) = x³ - 2x² - 7x - 4 is decreasing.", correctAnswer: "-1, 2.33", points: 2 },
//
//     // --- QUESTION 8 ---
//     { type: 'instruction', instruction: "Question 8" },
//     { id: '8.1', type: 'instruction', instruction: "A steel manufacturing company wants to manufacture an open square-based stainless steel container with a volume of 4 000 cm³. The dimensions of the square-based container will be length = x cm, width = x cm, and height = h cm." },
//     { id: '8.2', type: 'image', image: containerImage, alt: "Diagram of the open square-based container" },
//     { type: 'instruction', instruction: "The following formulae may be used:\nVolume = area of the base × height\nSurface area = length × breadth + 2 × length × height + 2 × breadth × height" },
//     { id: '8.1', type: 'text-input', question: "Show that the height of the container can be expressed as: h = 4000 / x².", correctAnswer: "4000 / x^2", points: 1 },
//     { id: '8.2', type: 'text-input', question: "Hence, show that the surface area of the container can be expressed as:\nSurface area = x² + \n   16000\n   -----\n    x²", correctAnswer: "x^2 + 16000 / x^2", points: 2 },
//     { id: '8.3', type: 'text-input', question: "Determine the numerical value of the height of the container if the surface area is minimised.", correctAnswer: "10", points: 5 },
//
//     // --- QUESTION 9 ---
//     { type: 'instruction', instruction: "Question 9" },
//     { id: '9.1', type: 'instruction', instruction: "Determine the following integrals:" },
//     { id: '9.1.1', type: 'text-input', question: "∫ (x² + 6x) dx", correctAnswer: "x^3/3 + 3x^2 + C", points: 4 },
//     { id: '9.2', type: 'instruction', instruction: "The sketch below represents the area bounded by the function g defined by g(x) = 3x² and the points where x = k and x = 4." },
//     { id: '9.2-image', type: 'image', image: boundedAreaImage, alt: "Diagram of the bounded area under g(x)" },
//     { id: '9.2', type: 'text-input', question: "Determine the value of k if the bounded area under g(x) = 3x² between x = k and x = 4 is 56 square units.", correctAnswer: "2", points: 7 }
// ];
//
// export default QUIZ_DATA;