export default function AssessmentPreview({
    questions,
    answers,
    warnings,
    onEdit,
    onProceed,
    onNavigateToQuestion
}) {
    // 🔴 Collect all conflicted question IDs
    const conflictedQuestionIds = new Set(
        warnings.flatMap(w => w.questions || [])
    );

    // 🧭 Scroll helper
    const scrollToQuestion = (questionId) => {
        const el = document.getElementById(`preview-${questionId}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("ring-2", "ring-red-400");
            setTimeout(() => {
                el.classList.remove("ring-2", "ring-red-400");
            }, 1500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
            <h2 className="text-2xl font-bold">Review Your Responses</h2>

            {/* 🧾 Answers */}
            {questions.map(q => {
                const isConflicted = conflictedQuestionIds.has(q.id);

                return (
                    <div
                        key={q.id}
                        className={`border-b pb-3 transition-all ${isConflicted
                            ? "bg-red-50 border-red-300 px-3 py-2 rounded"
                            : ""
                            }`}
                    >
                        <p className="text-sm text-gray-500">{q.section}</p>

                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-medium">{q.label}</p>
                                <p className="text-sm text-gray-700 mt-1">
                                    {Array.isArray(answers[q.id])
                                        ? answers[q.id].join(", ")
                                        : answers[q.id] || "—"}
                                </p>
                            </div>

                            {/* ✏️ Edit button ONLY for conflicted questions */}
                            {isConflicted && (
                                <button
                                    onClick={() => onNavigateToQuestion(q.id)}
                                    className="text-sm text-blue-600 hover:underline font-semibold whitespace-nowrap pointer"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* ⚠️ Warnings */}
            {warnings.length > 0 && (
                <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold text-yellow-800">
                        Readiness Observations
                    </h3>

                    {/* ⚠️ Warnings */}
                    {warnings.length > 0 && (
                        <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 mb-2">
                                Readiness Observations
                            </h3>
                            <ul className="space-y-2 text-sm text-yellow-800">
                                {warnings.map(w => (
                                    <li key={w.id}>
                                        <strong>{w.title}:</strong> {w.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className="text-xs text-yellow-700">
                        These observations won’t block submission. They help improve accuracy.
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-6">
                <button
                    onClick={onEdit}
                    className="px-6 py-2 border rounded-lg"
                >
                    Edit Answers
                </button>

                <button
                    onClick={onProceed}
                    className="px-8 py-3 bg-brand-gradient text-white rounded-lg font-semibold"
                >
                    Proceed & Continue
                </button>
            </div>
        </div>
    );
}
