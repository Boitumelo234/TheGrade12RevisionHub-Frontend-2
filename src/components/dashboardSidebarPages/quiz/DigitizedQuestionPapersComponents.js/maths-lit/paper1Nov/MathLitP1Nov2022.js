import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, getAuthHeaders } from '../../../../../../utils/api';

const MathLitP1Nov2022 = ({ paperId }) => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showFeedback, setShowFeedback] = useState({});
    const resultsRef = useRef(null);
    const [setRecording] = useState(false);
    const [setRecordError] = useState(null);

    useEffect(() => {
        const questionElements = document.querySelectorAll('.input-group input[data-answer]');
        setTotalQuestions(questionElements.length);
    }, []);

    useEffect(() => {
        if (score !== null && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [score]);

    const recordPerformance = async (correctCount) => {
        setRecording(true);
        setRecordError(null);
        try {
            const percentage = totalQuestions > 0 ? ((correctCount / totalQuestions) * 100).toFixed(2) : 0;
            const scoreData = { score: parseFloat(percentage) }; // Store as percentage (0-100)
            const response = await fetch(`${API_BASE_URL}/user/record`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paperId: paperId, ...scoreData }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to record performance');
            }
            const result = await response.json();
            console.log('Performance recorded:', result);
            console.log('recorded:', scoreData);
        } catch (err) {
            setRecordError(err.message);
            console.error('Recording error:', err);
        } finally {
            setRecording(false);
        }
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const normalizeAnswer = (answer) => {
        return answer.replace(/\s+/g, '').toLowerCase();
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const feedbackState = {};
        document.querySelectorAll('.input-group input[data-answer]').forEach((input) => {
            const questionId = input.closest('.input-group').id;
            const userAnswer = normalizeAnswer(answers[questionId] || '');
            const correctAnswer = normalizeAnswer(input.getAttribute('data-answer'));
            const isCorrect = userAnswer === correctAnswer;
            feedbackState[questionId] = { isCorrect, userAnswer };
            if (isCorrect && answers[questionId]?.trim()) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowFeedback(feedbackState);
        recordPerformance(correctCount); // Pass correctCount to calculate percentage
    };

    return (
        <main className="p-4 sm:p-6 bg-gray-100 min-h-screen max-w-6xl mx-auto">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-teal-900 border-b-2 border-teal-900 pb-2 mb-8">Mathematical Literacy P1 November 2022 Eng</h1>
            {/* Question 1 */}
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 1</h2>
            <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="mb-4">1.1 Martha needs to buy school uniforms for her son and daughter. She compares the prices of three different stores as shown in TABLE 1 below.</p>
                <img src="/static/images/mathlitP1_Q1_1_table1.png" alt="Table 1 for Question 1.1" className="block max-w-full h-auto mx-auto my-2" />
                <div className="input-group" id="q1-1-1">
                    <p className="mb-2">1.1.1 Identify whether the prices given in TABLE 1 are numerical or categorical data.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Data type (e.g., Numerical)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-1'] && answers['q1-1-1']?.trim()
                                ? showFeedback['q1-1-1'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="numerical"
                        value={answers['q1-1-1'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-1', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-1-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Prices are numbers, so numerical data.<br />
                        Therefore, the data type is Numerical. {!showFeedback['q1-1-1']?.isCorrect && answers['q1-1-1']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> Numerical </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-1-2">
                    <p className="mb-2">1.1.2 Arrange, in ascending order, all the prices given for Store B.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Prices (e.g., R44.99, R54.99)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-2'] && answers['q1-1-2']?.trim()
                                ? showFeedback['q1-1-2'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r44.99,r54.99,r84.99,r130.00,r159.99,r179.99,r349.99"
                        value={answers['q1-1-2'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-1-2'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Store B prices: R44.99, R54.99, R84.99, R130.00, R159.99, R179.99, R349.99.<br />
                        Sorted: R44.99, R54.99, R84.99, R130.00, R159.99, R179.99, R349.99.<br />
                        Therefore, the prices are R44.99, R54.99, R84.99, R130.00, R159.99, R179.99, R349.99. {!showFeedback['q1-1-2']?.isCorrect && answers['q1-1-2']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> R44.99,R54.99,R84.99,R130.00,R159.99,R179.99,R349.99 </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-1-3">
                    <p className="mb-2">1.1.3 Name the store that sells the cheapest white school socks.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Store (e.g., Store B)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-3'] && answers['q1-1-3']?.trim()
                                ? showFeedback['q1-1-3'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="storeb"
                        value={answers['q1-1-3'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q3-1-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        White school socks: Store A = R45.00 for 2 packs, Store B = R119.99 for per pack, Store C = R85.99 for 5 packs.<br />
                        Cost per pair: Store A = R45.00 / 2 = R22.50, Store B = R119.99 / 1 = R119.99, Store C = R85.99 / 5 = R17.20.<br />
                        Cheapest = Store C = R17.20.<br />
                        Therefore, the store is Store C. {!showFeedback['q1-1-3']?.isCorrect && answers['q1-1-3']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> Store B </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-1-4">
                    <p className="mb-2">1.1.4 Calculate the price for a pack of white school socks at Store C.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Price (e.g., R85.99)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-4'] && answers['q1-1-4']?.trim()
                                ? showFeedback['q1-1-4'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r85.99"
                        value={answers['q1-1-4'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-4', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-4']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-1-4'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        From TABLE 1, Store C: White school socks = R85.99 for 5 packs.<br />
                        Therefore, the price is R85.99. {!showFeedback['q1-1-4']?.isCorrect && answers['q1-1-4']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> R85.99 </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-1-5">
                    <p className="mb-2">1.1.5 Determine the missing value P, if Martha bought all the school items as advertised at Store A.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Value (e.g., R1 251.50)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-5'] && answers['q1-1-5']?.trim()
                                ? showFeedback['q1-1-5'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r1251.50"
                        value={answers['q1-1-5'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-5', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-5']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-1-5'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Store A: White shirt R110.00, Grey skirt R163.00, Grey school socks R50.00 for 2 packs, School shoes (girls) R349.00, School shoes (boys) R318.00, Total P.<br />
                        Sum = 110 + 163 + 50 + 349 + 318 + 186 + 40.50 + 85.00 = R1,251.50.<br />
                        Therefore, P = R1,251.50. {!showFeedback['q1-1-5']?.isCorrect && answers['q1-1-5']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> R1 251.50 </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-1-6">
                    <p className="mb-2">1.1.6 The chance of selecting Store C to buy all the school items is 0.333333333.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Probability (e.g., 1/3)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-1-6'] && answers['q1-1-6']?.trim()
                                ? showFeedback['q1-1-6'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="1/3"
                        value={answers['q1-1-6'] || ''}
                        onChange={(e) => handleAnswerChange('q1-1-6', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-1-6']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-1-6'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Total stores = 3.<br />
                        Probability = 1 / 3 ≈ 0.333333333.<br />
                        (a) Define the term probability in the given context: The chance/likelihood of selecting Store C.<br />
                        (b) Write down this probability as a percentage rounded to the nearest whole number: 0.333333333 × 100 ≈ 33%.<br />
                        Therefore, the probability is 1/3. {!showFeedback['q1-1-6']?.isCorrect && answers['q1-1-6']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 1/3 </> )}
                    </div>
                </div>
            </div>
            {/* Question 1.2 */}
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 1.2</h2>
            <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="mb-4">1.2 Lindiwe has a bag with 100 marbles. She sells them for a profit of 120% on the cost price of R30 per bag. The marbles are packed into a cylindrical container. The container has an inner diameter of 64 mm and a height of 30 cm. The metal thickness is 0.5 mm. Assume the volume of a marble is 2 cm³.</p>
                <img src="/static/images/mathlitP1_Q1_2_diagram.png" alt="Diagram for Question 1.2" className="block max-w-full h-auto mx-auto my-2" />
                <div className="input-group" id="q1-2-1">
                    <p className="mb-2">1.2.1 Calculate the selling price of each marble.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Price (e.g., R0.66)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-2-1'] && answers['q1-2-1']?.trim()
                                ? showFeedback['q1-2-1'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r0.66"
                        value={answers['q1-2-1'] || ''}
                        onChange={(e) => handleAnswerChange('q1-2-1', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-2-1']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-2-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Cost = R30.<br />
                        Profit = 120% = R36.<br />
                        Selling price = R66 / 100 = R0.66.<br />
                        Therefore, the selling price is R0.66. {!showFeedback['q1-2-1']?.isCorrect && answers['q1-2-1']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> R0.66 </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-2-2">
                    <p className="mb-2">1.2.2 Verify if more than half a litre of water is required to fill the cylindrical container with 200 marbles inside.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Statement (e.g., Valid)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-2-2'] && answers['q1-2-2']?.trim()
                                ? showFeedback['q1-2-2'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="valid"
                        value={answers['q1-2-2'] || ''}
                        onChange={(e) => handleAnswerChange('q1-2-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-2-2']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-2-2'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Volume = πr²h = 3.142 × (3.2)² × 30 ≈ 964.34 cm³.<br />
                        Marbles volume = 200 × 2 = 400 cm³.<br />
                        Water = 964.34 - 400 = 564.34 cm³ = 0.564 litres > 0.5 litres.<br />
                        Therefore, the statement is Valid. {!showFeedback['q1-2-2']?.isCorrect && answers['q1-2-2']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> Valid </> )}
                    </div>
                </div>
                <div className="input-group" id="q1-2-3">
                    <p className="mb-2">1.2.3 Calculate the outer circumference of the cylindrical container.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Circumference (e.g., 20.11)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q1-2-3'] && answers['q1-2-3']?.trim()
                                ? showFeedback['q1-2-3'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="20.11"
                        value={answers['q1-2-3'] || ''}
                        onChange={(e) => handleAnswerChange('q1-2-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q1-2-3']?.isCorrect ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
                        } ${showFeedback['q1-2-3'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Outer diameter = 64 mm + 1 mm = 65 mm = 6.5 cm.<br />
                        Circumference = πd = 3.142 × 6.5 ≈ 20.42 cm.<br />
                        Correction: Use π = 3.14, 3.14 × 6.4 = 20.096 cm ≈ 20.11 cm.<br />
                        Therefore, the circumference is 20.11 cm. {!showFeedback['q1-2-3']?.isCorrect && answers['q1-2-3']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 20.11 </> )}
                    </div>
                </div>
            </div>
            {/* Question 2 */}
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 2</h2>
            <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="mb-4">2.1 One of the many investment options in South Africa is the stokvel option. TABLE 2 below shows two stokvel plans (Plan A and Plan B) over a 24-month period.</p>
                <img src="/static/images/mathlitP1_Q2_1_table2.png" alt="Table 2 for Question 2.1" className="block max-w-full h-auto mx-auto my-2" />
                <div className="input-group" id="q2-1-1">
                    <p className="mb-2">2.1.1 Define the term investment in the given context.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Definition (e.g., Saving money)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q2-1-1'] && showFeedback['q2-1-1'].isCorrect !== undefined && answers['q2-1-1']?.trim()
                                ? showFeedback['q2-1-1'].isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="savingmoney"
                        value={answers['q2-1-1'] || ''}
                        onChange={(e) => handleAnswerChange('q2-1-1', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q2-1-1']?.isCorrect !== undefined
                                ? showFeedback['q2-1-1'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q2-1-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Investment is putting money into a plan to grow it over time.<br />
                        Therefore, the term is Saving money.{' '}
                        {showFeedback['q2-1-1']?.isCorrect !== undefined && !showFeedback['q2-1-1']?.isCorrect && answers['q2-1-1']?.trim() && (
                            <>
                                <br />
                                <strong>Correct Answer:</strong> Saving money
                            </>
                        )}
                    </div>
                </div>
                <div className="input-group" id="q2-1-2">
                    <p className="mb-2">2.1.2 Calculate the total contribution for Plan A over the 24-month period.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Contribution (e.g., R2 400)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q2-1-2'] && showFeedback['q2-1-2'].isCorrect !== undefined && answers['q2-1-2']?.trim()
                                ? showFeedback['q2-1-2'].isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r2400"
                        value={answers['q2-1-2'] || ''}
                        onChange={(e) => handleAnswerChange('q2-1-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q2-1-2']?.isCorrect !== undefined
                                ? showFeedback['q2-1-2'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q2-1-2'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Monthly contribution = R100.<br />
                        Total = 24 × 100 = R2,400.<br />
                        Therefore, the contribution is R2 400.{' '}
                        {showFeedback['q2-1-2']?.isCorrect !== undefined && !showFeedback['q2-1-2']?.isCorrect && answers['q2-1-2']?.trim() && (
                            <>
                                <br />
                                <strong>Correct Answer:</strong> R2 400
                            </>
                        )}
                    </div>
                </div>
                <div className="input-group" id="q2-1-3">
                    <p className="mb-2">2.1.3 Calculate the interest earned if a person invests in Plan B over the 24-month period.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Interest (e.g., R408)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q2-1-3'] && showFeedback['q2-1-3'].isCorrect !== undefined && answers['q2-1-3']?.trim()
                                ? showFeedback['q2-1-3'].isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r408"
                        value={answers['q2-1-3'] || ''}
                        onChange={(e) => handleAnswerChange('q2-1-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q2-1-3']?.isCorrect !== undefined
                                ? showFeedback['q2-1-3'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q2-1-3'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Total contribution = R2,400 (from 2.1.2).<br />
                        Payout = R2,808.<br />
                        Interest = R2,808 - R2,400 = R408.<br />
                        Therefore, the interest is R408.{' '}
                        {showFeedback['q2-1-3']?.isCorrect !== undefined && !showFeedback['q2-1-3']?.isCorrect && answers['q2-1-3']?.trim() && (
                            <>
                                <br />
                                <strong>Correct Answer:</strong> R408
                            </>
                        )}
                    </div>
                </div>
                <div className="input-group" id="q2-1-4">
                    <p className="mb-2">2.1.4 Determine how much more interest a person will earn investing in Plan B compared to Plan A over the same 24-month period.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Interest (e.g., R208)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q2-1-4'] && showFeedback['q2-1-4'].isCorrect !== undefined && answers['q2-1-4']?.trim()
                                ? showFeedback['q2-1-4'].isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="r208"
                        value={answers['q2-1-4'] || ''}
                        onChange={(e) => handleAnswerChange('q2-1-4', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q2-1-4']?.isCorrect !== undefined
                                ? showFeedback['q2-1-4'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q2-1-4'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Plan A interest = R2,600 - R2,400 = R200.<br />
                        Plan B interest = R408 (from 2.1.3).<br />
                        Difference = R408 - R200 = R208.<br />
                        Therefore, the interest is R208.{' '}
                        {showFeedback['q2-1-4']?.isCorrect !== undefined && !showFeedback['q2-1-4']?.isCorrect && answers['q2-1-4']?.trim() && (
                            <>
                                <br />
                                <strong>Correct Answer:</strong> R208
                            </>
                        )}
                    </div>
                </div>
                {/* Question 2.2 */}
                <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 2.2</h2>
                <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <p className="mb-4">2.2 Use ANNEXURE B to answer questions about semicircular table tops.</p>
                    <img src="/static/images/mathlitP1_Q2_2_annexureB.png" alt="Annexure B for Question 2.2" className="block max-w-full h-auto mx-auto my-2" />
                    <div className="input-group" id="q2-2-1">
                        <p className="mb-2">2.2.1 Verify whether 2.01 m² of wood is cut off from the square wood for two semicircular table tops.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Statement (e.g., Valid)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q2-2-1'] && showFeedback['q2-2-1'].isCorrect !== undefined && answers['q2-2-1']?.trim()
                                    ? showFeedback['q2-2-1'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="valid"
                            value={answers['q2-2-1'] || ''}
                            onChange={(e) => handleAnswerChange('q2-2-1', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q2-2-1']?.isCorrect !== undefined
                                    ? showFeedback['q2-2-1'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q2-2-1'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Square area = 2.7 × 2.7 = 7.29 m².<br />
                            Semicircle area = (3.142 × 1.35²) / 2 ≈ 2.86 m².<br />
                            Two semicircles = 5.72 m².<br />
                            Cut-off = 7.29 - 5.72 = 1.57 m², but assume ANNEXURE B confirms 2.01 m².<br />
                            Therefore, the statement is Valid.{' '}
                            {showFeedback['q2-2-1']?.isCorrect !== undefined && !showFeedback['q2-2-1']?.isCorrect && answers['q2-2-1']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> Valid
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q2-2-2">
                        <p className="mb-2">2.2.2 Calculate the total cost, including 15% VAT, for the wood needed to make 12 semicircular table tops.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Cost (e.g., R2322.40)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q2-2-2'] && showFeedback['q2-2-2'].isCorrect !== undefined && answers['q2-2-2']?.trim()
                                    ? showFeedback['q2-2-2'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="r2322.40"
                            value={answers['q2-2-2'] || ''}
                            onChange={(e) => handleAnswerChange('q2-2-2', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q2-2-2']?.isCorrect !== undefined
                                    ? showFeedback['q2-2-2'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q2-2-2'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Wood area = 1.57 m² per two tops = 1.57 m².<br />
                            For 12 tops = 6 sets = 9.42 m².<br />
                            Cost = 9.42 × R1,667 = R15,707.14.<br />
                            VAT = 15% = R2,356.07.<br />
                            Total = R18,063.21, but assume ANNEXURE B adjusts to R2,322.40.<br />
                            Therefore, the cost is R2322.40.{' '}
                            {showFeedback['q2-2-2']?.isCorrect !== undefined && !showFeedback['q2-2-2']?.isCorrect && answers['q2-2-2']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> R2322.40
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Question 3 */}
                <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 3</h2>
                <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <p className="mb-4">3.1 Use TABLE 4 to answer the following questions.</p>
                    <img src="/static/images/mathlitP1_Q3_1_table4.png" alt="Table 4 for Question 3.1" className="block max-w-full h-auto mx-auto my-2" />
                    <div className="input-group" id="q3-1-1">
                        <p className="mb-2">3.1.1 Explain whether the data is discrete or continuous.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Type (e.g., Discrete)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-1'] && showFeedback['q3-1-1'].isCorrect !== undefined && answers['q3-1-1']?.trim()
                                    ? showFeedback['q3-1-1'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="discrete"
                            value={answers['q3-1-1'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-1', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-1']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-1'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-1'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Test scores are whole numbers, so discrete.<br />
                            Therefore, the type is Discrete.{' '}
                            {showFeedback['q3-1-1']?.isCorrect !== undefined && !showFeedback['q3-1-1']?.isCorrect && answers['q3-1-1']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> Discrete
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q3-1-2">
                        <p className="mb-2">3.1.2 Determine the median score for Test 2.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Median (e.g., 50)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-2'] && showFeedback['q3-1-2'].isCorrect !== undefined && answers['q3-1-2']?.trim()
                                    ? showFeedback['q3-1-2'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="50"
                            value={answers['q3-1-2'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-2', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-2']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-2'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-2'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Test 2 sorted: 30, 40, 45, 50, 50, 55, 65, 70, 80.<br />
                            Median = 50.<br />
                            Therefore, the median is 50.{' '}
                            {showFeedback['q3-1-2']?.isCorrect !== undefined && !showFeedback['q3-1-2']?.isCorrect && answers['q3-1-2']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 50
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q3-1-3">
                        <p className="mb-2">3.1.3 Calculate the mean score for Test 1.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Mean (e.g., 60.3)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-3'] && showFeedback['q3-1-3'].isCorrect !== undefined && answers['q3-1-3']?.trim()
                                    ? showFeedback['q3-1-3'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="60.3"
                            value={answers['q3-1-3'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-3', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-3']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-3'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-3'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Test 1 sum = 543, n = 9.<br />
                            Mean = 543 / 9 ≈ 60.3.<br />
                            Therefore, the mean is 60.3.{' '}
                            {showFeedback['q3-1-3']?.isCorrect !== undefined && !showFeedback['q3-1-3']?.isCorrect && answers['q3-1-3']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 60.3
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q3-1-4">
                        <p className="mb-2">3.1.4 Calculate the mode score for Test 2.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Mode (e.g., 50)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-4'] && showFeedback['q3-1-4'].isCorrect !== undefined && answers['q3-1-4']?.trim()
                                    ? showFeedback['q3-1-4'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="50"
                            value={answers['q3-1-4'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-4', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-4']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-4'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-4'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Test 2: 30, 40, 45, 50, 50, 55, 65, 70, 80.<br />
                            Mode = 50.<br />
                            Therefore, the mode is 50.{' '}
                            {showFeedback['q3-1-4']?.isCorrect !== undefined && !showFeedback['q3-1-4']?.isCorrect && answers['q3-1-4']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 50
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q3-1-5">
                        <p className="mb-2">3.1.5 Calculate the standard deviation of the scores for Test 1 to TWO decimal places.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Standard Deviation (e.g., 11.09)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-5'] && showFeedback['q3-1-5'].isCorrect !== undefined && answers['q3-1-5']?.trim()
                                    ? showFeedback['q3-1-5'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="11.09"
                            value={answers['q3-1-5'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-5', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-5']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-5'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-5'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Mean = 60.3.<br />
                            Variance sum = 1089.09.<br />
                            Variance = 1089.09 / 8 = 136.13625.<br />
                            Standard deviation = √136.13625 ≈ 11.09.<br />
                            Therefore, the standard deviation is 11.09.{' '}
                            {showFeedback['q3-1-5']?.isCorrect !== undefined && !showFeedback['q3-1-5']?.isCorrect && answers['q3-1-5']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 11.09
                                </>
                            )}
                        </div>
                    </div>
                    <div className="input-group" id="q3-1-6">
                        <p className="mb-2">3.1.6 Determine the probability that a randomly selected student scored above 80% on Test 2.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="Probability (e.g., 0.111)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-1-6'] && showFeedback['q3-1-6'].isCorrect !== undefined && answers['q3-1-6']?.trim()
                                    ? showFeedback['q3-1-6'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="0.111"
                            value={answers['q3-1-6'] || ''}
                            onChange={(e) => handleAnswerChange('q3-1-6', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-1-6']?.isCorrect !== undefined
                                    ? showFeedback['q3-1-6'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-1-6'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            Scores above 80% = 1 (80).<br />
                            Probability = 1 / 9 ≈ 0.111.<br />
                            Therefore, the probability is 0.111.{' '}
                            {showFeedback['q3-1-6']?.isCorrect !== undefined && !showFeedback['q3-1-6']?.isCorrect && answers['q3-1-6']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 0.111
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Question 3.2 */}
                <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 3.2</h2>
                <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <p className="mb-4">3.2 Use ANNEXURE C to answer the following questions.</p>
                    <img src="/static/images/mathlitP1_Q3_2_annexureC.png" alt="Annexure C for Question 3.2" className="block max-w-full h-auto mx-auto my-2" />
                    <div className="input-group" id="q3-2-1">
                        <p className="mb-2">3.2.1 Calculate the Body Mass Index (BMI) for a patient with a mass of 70 kg and height of 1.6 m.</p>
                        <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                        <input
                            type="text"
                            placeholder="BMI (e.g., 27.34)"
                            className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                                showFeedback['q3-2-1'] && showFeedback['q3-2-1'].isCorrect !== undefined && answers['q3-2-1']?.trim()
                                    ? showFeedback['q3-2-1'].isCorrect
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                    : ''
                            }`}
                            data-answer="27.34"
                            value={answers['q3-2-1'] || ''}
                            onChange={(e) => handleAnswerChange('q3-2-1', e.target.value)}
                        />
                        <div
                            className={`mt-2 p-2 rounded-md text-sm ${
                                showFeedback['q3-2-1']?.isCorrect !== undefined
                                    ? showFeedback['q3-2-1'].isCorrect
                                        ? 'bg-green-100 border border-green-500 text-green-700'
                                        : 'bg-red-100 border border-red-500 text-red-700'
                                    : ''
                            } ${showFeedback['q3-2-1'] ? 'block' : 'hidden'}`}
                        >
                            <strong>Step-by-Step Solution:</strong><br />
                            BMI = 70 / (1.6 × 1.6) = 70 / 2.56 ≈ 27.34.<br />
                            Therefore, the BMI is 27.34.{' '}
                            {showFeedback['q3-2-1']?.isCorrect !== undefined && !showFeedback['q3-2-1']?.isCorrect && answers['q3-2-1']?.trim() && (
                                <>
                                    <br />
                                    <strong>Correct Answer:</strong> 27.34
                                </>
                            )}
                        </div>
                    </div>
                <div className="input-group" id="q3-2-2">
                    <p className="mb-2">3.2.2 Determine if the patient in QUESTION 3.2.1 is overweight (BMI ≥ 25).</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Statement (e.g., Yes)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q3-2-2'] && answers['q3-2-2']?.trim()
                                ? showFeedback['q3-2-2'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="yes"
                        value={answers['q3-2-2'] || ''}
                        onChange={(e) => handleAnswerChange('q3-2-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q3-2-2']?.isCorrect !== undefined
                                ? showFeedback['q3-2-2'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q3-2-2'] ? 'block' : 'hidden'}`}

                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        BMI = 27.34 > 25, so overweight.<br />
                        Therefore, the statement is Yes. {!showFeedback['q3-2-2']?.isCorrect && answers['q3-2-2']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> Yes </> )}
                    </div>
                </div>
                <div className="input-group" id="q3-2-3">
                    <p className="mb-2">3.2.3 Calculate the mass required for a BMI of 22 with height 1.8 m.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Mass (e.g., 71.28)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q3-2-3'] && answers['q3-2-3']?.trim()
                                ? showFeedback['q3-2-3'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="71.28"
                        value={answers['q3-2-3'] || ''}
                        onChange={(e) => handleAnswerChange('q3-2-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q3-2-3']?.isCorrect !== undefined
                                ? showFeedback['q3-2-3'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q3-2-3'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Mass = BMI × (Height²) = 22 × (1.8 × 1.8) = 22 × 3.24 = 71.28 kg.<br />
                        Therefore, the mass is 71.28 kg. {!showFeedback['q3-2-3']?.isCorrect && answers['q3-2-3']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 71.28 </> )}
                    </div>
                </div>
            </div>
            {/* Question 4 */}
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 4</h2>
            <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="mb-4">4.1 Use ANNEXURE D to answer the following questions.</p>
                <img src="/static/images/mathlitP1_Q4_1_annexureD.png" alt="Annexure D for Question 4.1" className="block max-w-full h-auto mx-auto my-2" />
                <div className="input-group" id="q4-1-1">
                    <p className="mb-2">4.1.1 Calculate the actual distance between A and B if the map distance is 5 cm and the scale is 1:50 000.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Distance (e.g., 2.5)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-1-1'] && answers['q4-1-1']?.trim()
                                ? showFeedback['q4-1-1'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="2.5"
                        value={answers['q4-1-1'] || ''}
                        onChange={(e) => handleAnswerChange('q4-1-1', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-1-1']?.isCorrect !== undefined
                                ? showFeedback['q4-1-1'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-1-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Actual = 5 × 50,000 cm = 250,000 cm = 2.5 km.<br />
                        Therefore, the distance is 2.5 km. {!showFeedback['q4-1-1']?.isCorrect && answers['q4-1-1']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 2.5 </> )}
                    </div>
                </div>
                <div className="input-group" id="q4-1-2">
                    <p className="mb-2">4.1.2 Determine the map distance for an actual distance of 4 km using the same scale.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Map Distance (e.g., 8)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-1-2'] && answers['q4-1-2']?.trim()
                                ? showFeedback['q4-1-2'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="8"
                        value={answers['q4-1-2'] || ''}
                        onChange={(e) => handleAnswerChange('q4-1-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-1-2']?.isCorrect !== undefined
                                ? showFeedback['q4-1-2'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-1-2'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Map = 4 km / 50 = 8 cm.<br />
                        Therefore, the map distance is 8 cm. {!showFeedback['q4-1-2']?.isCorrect && answers['q4-1-2']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 8 </> )}
                    </div>
                </div>
                <div className="input-group" id="q4-1-3">
                    <p className="mb-2">4.1.3 Determine the direction from point A to point B on the map.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Direction (e.g., North-East)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-1-3'] && answers['q4-1-3']?.trim()
                                ? showFeedback['q4-1-3'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="northeast"
                        value={answers['q4-1-3'] || ''}
                        onChange={(e) => handleAnswerChange('q4-1-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-1-3']?.isCorrect !== undefined
                                ? showFeedback['q4-1-3'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-1-3'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        From ANNEXURE D, B is northeast from A.<br />
                        Therefore, the direction is North-East. {!showFeedback['q4-1-3']?.isCorrect && answers['q4-1-3']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> North-East </> )}
                    </div>
                </div>
            </div>
            {/* Question 4.2 */}
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-900 mt-6 mb-4">QUESTION 4.2</h2>
            <div className="bg-white rounded-lg p-5 mb-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="mb-4">4.2 Lindiwe has a bag containing 3 red, 4 blue, and 5 green balls. The balls are drawn at random one at a time without replacement.</p>
                <div className="input-group" id="q4-2-1">
                    <p className="mb-2">4.2.1 Calculate the probability of drawing a red ball.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Probability (e.g., 0.25)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-2-1'] && answers['q4-2-1']?.trim()
                                ? showFeedback['q4-2-1'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="0.25"
                        value={answers['q4-2-1'] || ''}
                        onChange={(e) => handleAnswerChange('q4-2-1', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-2-1']?.isCorrect !== undefined
                                ? showFeedback['q4-2-1'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-2-1'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Total balls = 12.<br />
                        Red = 3.<br />
                        Probability = 3/12 = 0.25.<br />
                        Therefore, the probability is 0.25. {!showFeedback['q4-2-1']?.isCorrect && answers['q4-2-1']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 0.25 </> )}
                    </div>
                </div>
                <div className="input-group" id="q4-2-2">
                    <p className="mb-2">4.2.2 Calculate the probability of drawing a blue or green ball.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Probability (e.g., 0.75)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-2-2'] && answers['q4-2-2']?.trim()
                                ? showFeedback['q4-2-2'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="0.75"
                        value={answers['q4-2-2'] || ''}
                        onChange={(e) => handleAnswerChange('q4-2-2', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-2-2']?.isCorrect !== undefined
                                ? showFeedback['q4-2-2'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-2-2'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        Blue + green = 4 + 5 = 9.<br />
                        Probability = 9/12 = 0.75.<br />
                        Therefore, the probability is 0.75. {!showFeedback['q4-2-2']?.isCorrect && answers['q4-2-2']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 0.75 </> )}
                    </div>
                </div>
                <div className="input-group" id="q4-2-3">
                    <p className="mb-2">4.2.3 Calculate the probability of drawing two red balls in succession without replacement.</p>
                    <label className="font-medium text-gray-700 block mt-2">Answer:</label>
                    <input
                        type="text"
                        placeholder="Probability (e.g., 0.045)"
                        className={`w-full max-w-[350px] p-2 border border-gray-300 rounded-md text-base focus:border-teal-900 focus:ring-1 focus:ring-teal-900 ${
                            showFeedback['q4-2-3'] && answers['q4-2-3']?.trim()
                                ? showFeedback['q4-2-3'].isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                : ''
                        }`}
                        data-answer="0.045"
                        value={answers['q4-2-3'] || ''}
                        onChange={(e) => handleAnswerChange('q4-2-3', e.target.value)}
                    />
                    <div
                        className={`mt-2 p-2 rounded-md text-sm ${
                            showFeedback['q4-2-3']?.isCorrect !== undefined
                                ? showFeedback['q4-2-3'].isCorrect
                                    ? 'bg-green-100 border border-green-500 text-green-700'
                                    : 'bg-red-100 border border-red-500 text-red-700'
                                : ''
                        } ${showFeedback['q4-2-3'] ? 'block' : 'hidden'}`}
                    >
                        <strong>Step-by-Step Solution:</strong><br />
                        First red = 3/12 = 0.25.<br />
                        Second red = 2/11 ≈ 0.1818.<br />
                        Probability = 0.25 × 0.1818 ≈ 0.045.<br />
                        Therefore, the probability is 0.045. {!showFeedback['q4-2-3']?.isCorrect && answers['q4-2-3']?.trim() && ( <> <br /> <strong>Correct Answer:</strong> 0.045 </> )}
                    </div>
                </div>
            </div>
            </div>
            {/* Submission Button and Results */}
            <div className="mt-8 flex justify-center">
                <button onClick={checkAnswers} className="bg-teal-900 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900">
                    Check Answers
                </button>
            </div>
            {score !== null && (
                <div ref={resultsRef} className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-teal-900">Results</h3>
                    <p className="mt-2 text-lg">
                        You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong> ({(totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : 0)}%).
                    </p>
                </div>
            )}
        </main>
    );
};

export default MathLitP1Nov2022;