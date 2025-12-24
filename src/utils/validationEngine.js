import { optionToScore } from "./answerUtils";

/**
 * Runs AI readiness consistency validations.
 *
 * @param {Object} answers - raw answers { Q1: "text", ... }
 * @param {Array} questions - full questions config
 * @param {String} changedId - question ID just changed (undefined in preview)
 */
export function runValidations(answers, questions, changedId) {
    const warnings = [];
    const numeric = {};

    // -----------------------------
    // Build numeric score map
    // -----------------------------
    questions.forEach(q => {
        if (answers[q.id] !== undefined) {
            const score = optionToScore(q, answers[q.id]);
            if (typeof score === "number") {
                numeric[q.id] = score;
            }
        }
    });

    const isPreview = !changedId;

    // Utility helper
    const has = (...qs) => qs.every(q => numeric[q] !== undefined);
    const diff = (a, b) => Math.abs(numeric[a] - numeric[b]);

    // -----------------------------
    // Intra-section consistency
    // -----------------------------

    // Q4 ↔ Q5
    if (
        (isPreview || changedId === "Q4" || changedId === "Q5") &&
        has("Q4", "Q5") &&
        diff("Q4", "Q5") >= 3
    ) {
        warnings.push({
            id: "Q4_Q5",
            title: "Response Consistency Check",
            message:
                "Advanced data quality usually depends on foundational data infrastructure. "
                + "You may want to review these responses for alignment.",
            questions: ["Q4", "Q5"],
        });
    }

    // Q5 ↔ Q6
    if (
        (isPreview || changedId === "Q5" || changedId === "Q6") &&
        has("Q5", "Q6") &&
        diff("Q5", "Q6") >= 3
    ) {
        warnings.push({
            id: "Q5_Q6",
            title: "Response Consistency Check",
            message:
                "AI-ready data is rarely achieved without sufficient cloud readiness. "
                + "There appears to be a maturity gap between these areas.",
            questions: ["Q5", "Q6"],
        });
    }

    // Q10 ↔ Q11
    if (
        (isPreview || changedId === "Q10" || changedId === "Q11") &&
        has("Q10", "Q11") &&
        diff("Q10", "Q11") >= 3
    ) {
        warnings.push({
            id: "Q10_Q11",
            title: "Operational Consistency Check",
            message:
                "Automation maturity usually depends on standardized processes. "
                + "These responses suggest differing maturity levels.",
            questions: ["Q10", "Q11"],
        });
    }

    // Q11 ↔ Q12
    if (
        (isPreview || changedId === "Q11" || changedId === "Q12") &&
        has("Q11", "Q12") &&
        diff("Q11", "Q12") >= 3
    ) {
        warnings.push({
            id: "Q11_Q12",
            title: "Workforce Readiness Check",
            message:
                "Workforce comfort with automation usually follows standardized processes. "
                + "You may want to review these answers together.",
            questions: ["Q11", "Q12"],
        });
    }

    // -----------------------------
    // Cross-section dependency logic
    // -----------------------------

    // AI Strategy vs Foundation
    if (
        (isPreview || ["Q1", "Q3", "Q4", "Q5", "Q6"].includes(changedId)) &&
        (numeric.Q1 >= 4 || numeric.Q3 >= 4) &&
        (
            numeric.Q4 !== undefined && numeric.Q4 <= 2 ||
            numeric.Q5 !== undefined && numeric.Q5 <= 2 ||
            numeric.Q6 !== undefined && numeric.Q6 <= 2
        )
    ) {
        warnings.push({
            id: "STRATEGY_FOUNDATION_MISMATCH",
            title: "Strategic Readiness Observation",
            message:
                "Your responses show strong intent to adopt AI soon. "
                + "However, foundational areas like data and cloud readiness appear less mature. "
                + "Organizations often strengthen these foundations before launching AI initiatives.",
            questions: ["Q1", "Q3", "Q4", "Q5", "Q6"],
        });
    }

    // Budget vs Urgency
    if (
        (isPreview || changedId === "Q2" || changedId === "Q8") &&
        numeric.Q2 !== undefined &&
        numeric.Q8 !== undefined &&
        numeric.Q2 <= 2 &&
        numeric.Q8 >= 4
    ) {
        warnings.push({
            id: "BUDGET_URGENCY_CONFLICT",
            title: "Investment Alignment Check",
            message:
                "You’ve indicated high-impact or critical challenges that AI could solve, "
                + "but current budget readiness appears limited. "
                + "This combination is uncommon in execution-focused organizations.",
            questions: ["Q2", "Q8"],
        });
    }

    // Automation Reality Check
    if (
        (isPreview || changedId === "Q10" || changedId === "Q12") &&
        numeric.Q10 !== undefined &&
        numeric.Q12 !== undefined &&
        numeric.Q10 <= 2 &&
        numeric.Q12 >= 4
    ) {
        warnings.push({
            id: "AUTOMATION_REALITY_CHECK",
            title: "Operational Maturity Check",
            message:
                "Advanced automation skills are usually accompanied by automated or standardized processes. "
                + "There may be an opportunity to re-evaluate either process maturity or workforce readiness.",
            questions: ["Q10", "Q12"],
        });
    }

    // -----------------------------
    // Uniform Answer Pattern Detection
    // -----------------------------
    const coreQuestions = [
        "Q1", "Q2", "Q3", "Q4", "Q5",
        "Q6", "Q7", "Q8", "Q9", "Q10",
        "Q11", "Q12", "Q13", "Q14", "Q15"
    ];

    const scores = coreQuestions
        .map(q => numeric[q])
        .filter(v => typeof v === "number");

    if (scores.length >= 12) {
        const freq = {};
        scores.forEach(s => (freq[s] = (freq[s] || 0) + 1));

        const [dominantScore, count] =
            Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

        if (count >= 12) {
            let interpretation = "";

            if (dominantScore === "1") {
                interpretation = "This pattern can indicate a defensive or early-stage posture.";
            } else if (dominantScore === "3") {
                interpretation = "This pattern often reflects a ‘safe middle’ response style.";
            } else if (dominantScore === "5") {
                interpretation = "This pattern may indicate aspirational or optimistic positioning.";
            }

            warnings.push({
                id: "UNIFORM_RESPONSE_PATTERN",
                title: "Quick Check Before You Proceed",
                message:
                    "We noticed very similar responses across multiple areas. "
                    + "AI readiness typically varies across strategy, data, automation, and culture.\n\n"
                    + interpretation + "\n\n"
                    + "Revisiting a few responses may help us deliver more accurate recommendations.",
                questions: coreQuestions,
            });
        }
    }

    return warnings;
}
