
//import { useState } from "react";

export default function Results({ questions, memo, answers }) {

    const NUMERIC_TOLERANCE = 0.05;

    let totalMarks = 0;
    let obtainedTotal = 0;

    const matchCorrect = (correct, studentRaw, itemType) => {
        if (!studentRaw) return false;
        const student = studentRaw.trim().toLowerCase();

        if (itemType === "calculation") {
            if (correct?.answer !== undefined) {
                const userVal = parseFloat(student.replace(",", "."));
                if (isNaN(userVal)) return false;
                return Math.abs(userVal - correct.answer) <= (correct.tolerance ?? NUMERIC_TOLERANCE);
            }
            return false;
        }

        if (typeof correct === "string") {
            return student === correct.trim().toLowerCase();
        }

        if (correct?.type === "keyphrases") {
            return correct.phrases.some(phrase =>
                student.includes(phrase.toLowerCase())
            );
        }

        if (correct?.answer !== undefined) {
            const userVal = parseFloat(student.replace(",", "."));
            if (isNaN(userVal)) return false;
            return Math.abs(userVal - correct.answer) <= NUMERIC_TOLERANCE;
        }

        return false;
    };

    const perQuestionTotals = [];

    questions.forEach(qBlock => {
        let qTotal = 0;
        let qObtained = 0;

        qBlock.items.forEach(item => {
            if (!item.marks) return;

            const correctMemo = memo[qBlock.id][item.number];
            const studentAnswer = answers[item.number];

            qTotal += item.marks;
            totalMarks += item.marks;

            const isCorrect = matchCorrect(correctMemo, studentAnswer, item.type);
            const earned = isCorrect ? item.marks : 0;

            qObtained += earned;
            obtainedTotal += earned;
        });

        perQuestionTotals.push({
            id: qBlock.id,
            total: qTotal,
            obtained: qObtained
        });
    });

    const percentage = ((obtainedTotal / totalMarks) * 100).toFixed(2);

    // -----------------------
    // PASS / FAIL MESSAGE
    // -----------------------
    const message =
        obtainedTotal >= 75
            ? "Great work! Keep it up!"
            : "Keep practicing! You'll improve!";

    return (
        <div
            style={{
                marginTop: 30,
                maxWidth: 650,
                margin: "40px auto",
                padding: "35px 45px",
                background: "white",
                borderRadius: 10,
                boxShadow: "0 8px 18px rgba(0,0,0,0.20)",
                textAlign: "center",
                fontFamily: "Arial, sans-serif"
            }}
        >
            {/* SCORE DISPLAY */}
            <h1 style={{ fontSize: 30, marginBottom: 10 }}>
                Your Score: {percentage}%
            </h1>

            <p style={{ fontSize: 18, marginBottom: 5, color: "#333" }}>
                ({obtainedTotal} out of {totalMarks} correct)
            </p>

            {/* MESSAGE */}
            <p style={{ fontSize: 16, color: "#666", marginBottom: 25 }}>
                {message}
            </p>

            <hr style={{ margin: "20px 0" }} />

            {/* FINAL RESULTS HEADER */}
            <h2 style={{ fontSize: 22, marginBottom: 15 }}>Final Results</h2>

            {/* BREAKDOWN */}
            <div
                style={{
                    textAlign: "left",
                    margin: "0 auto",
                    maxWidth: 350,
                    fontSize: 16
                }}
            >
                {perQuestionTotals.map(q => (
                    <p
                        key={q.id}
                        style={{
                            marginBottom: 10,
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <strong>Question {q.id}</strong>
                        <span>{q.obtained} / {q.total}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}