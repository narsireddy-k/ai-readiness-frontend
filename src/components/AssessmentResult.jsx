import React from "react";
import companyLogo from "../assets/logo.png";
import ScoreDonut from "./ScoreDonut";

export default function AssessmentResult({ result, onDownload, onRestart }) {

    if (!result) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <p className="text-brand-gray text-lg">
                    Loading your assessment results…
                </p>
            </div>
        );
    }

    const {
        capped_score,
        overall_score,
        category = "Preview",
        narrative,
        id
    } = result;

    // Normalize score
    const rawScore = capped_score ?? overall_score ?? null;
    const parsedScore =
        rawScore !== null && !isNaN(Number(rawScore))
            ? Math.round(Number(rawScore))
            : null;

    const borderColor =
        parsedScore >= 80 ? "border-green-200 bg-green-50" :
            parsedScore >= 50 ? "border-blue-200 bg-blue-50" :
                "border-orange-200 bg-orange-50";

    // Narrative parser
    const renderNarrative = (text) => {
        if (!text) return null;

        const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

        return lines.map((line, index) => {
            if (line.endsWith(":")) {
                return (
                    <h4
                        key={index}
                        className="mt-6 mb-2 text-base font-semibold text-brand-dark"
                    >
                        {line.replace(":", "")}
                    </h4>
                );
            }

            if (line.startsWith("-") || line.startsWith("•")) {
                return (
                    <li key={index} className="ml-6 list-disc text-brand-gray mb-1">
                        {line.replace(/^[-•]\s*/, "")}
                    </li>
                );
            }

            if (/^\d+\./.test(line)) {
                return (
                    <li key={index} className="ml-6 list-decimal text-brand-gray mb-1">
                        {line.replace(/^\d+\.\s*/, "")}
                    </li>
                );
            }

            return (
                <p key={index} className="text-brand-gray mb-3 leading-relaxed">
                    {line}
                </p>
            );
        });
    };

    return (
        <div className="mx-auto px-4 py-8 animate-fade-in">

            {/* Header */}
            <div className="flex justify-center mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="h-12 w-auto"
                    />
                    <div className="text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-brand-dark mb-1">
                            Your AI Readiness Score
                        </h2>
                        <p className="text-brand-gray">
                            Based on your responses, here is your readiness profile.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN RESULT */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">

                {/* Score Card */}
                <div
                    className={`rounded-xl border p-8 flex flex-col items-center justify-center text-center shadow-sm ${borderColor}`}
                >
                    <ScoreDonut score={parsedScore} />

                    <div className="mt-4 text-lg font-semibold text-brand-dark uppercase tracking-widest">
                        {category}
                    </div>
                </div>

                {/* Narrative */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-brand-dark mb-4 border-b border-gray-100 pb-3">
                        Analysis & Recommendations
                    </h3>

                    <div className="text-sm md:text-base">
                        {renderNarrative(narrative)}
                    </div>
                </div>
            </div>

            {/* NEXT STEPS */}
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 mt-8">
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    Next Steps
                </h3>

                <p className="text-brand-gray mb-6 max-w-2xl mx-auto">
                    A detailed PDF report has been generated with functional
                    recommendations and an implementation roadmap.
                </p>
                <div className="mb-6"> 
                    <button
                        className="px-8 py-3 font-medium rounded-md text-white bg-brand-gradient hover:opacity-90 shadow-sm"
                    >
                        Get in Touch
                    </button>

                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => onDownload(id)}
                        className="px-8 py-3 font-medium rounded-md text-white bg-brand-gradient hover:opacity-90 shadow-sm"
                    >
                        Download Full Report
                    </button>

                    <button
                        onClick={onRestart}
                        className="px-8 py-3 font-medium rounded-md text-gray-700 bg-white border hover:bg-gray-50"
                    >
                        Start New Assessment
                    </button>
                </div>
            </div>

        </div>
    );
}
