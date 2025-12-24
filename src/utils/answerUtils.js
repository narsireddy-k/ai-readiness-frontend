export function optionToScore(question, answer) {
    // If slider already returns a number
    if (typeof answer === "number") return answer;

    // Defensive: no options
    if (!question?.options) return undefined;

    const idx = question.options.indexOf(answer);

    // Option not found
    if (idx === -1) return undefined;

    // Likert score: 1–5
    return idx + 1;
}
