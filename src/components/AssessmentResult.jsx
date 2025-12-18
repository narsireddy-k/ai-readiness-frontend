import React from 'react';

export default function AssessmentResult({ result, onDownload, onRestart }) {
    const { capped_score, category, narrative, id } = result;

    // Function to format the narrative
    // The narrative contains newlines which we should respect
    const formattedNarrative = narrative.split('\n').map((str, index) => (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {str}
        </p>
    ));

    const scoreColor =
        capped_score >= 80 ? 'text-green-600' :
            capped_score >= 50 ? 'text-blue-600' :
                'text-orange-500';

    const borderColor =
        capped_score >= 80 ? 'border-green-200 bg-green-50' :
            capped_score >= 50 ? 'border-blue-200 bg-blue-50' :
                'border-orange-200 bg-orange-50';

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-dark mb-2">Your AI Readiness Score</h2>
                <p className="text-brand-gray">Based on your responses, here is your readiness profile.</p>
            </div>

            {/* Combined Result Card with Floated Score */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8 overflow-hidden">

                {/* Floated Score Card */}
                <div className={`float-left mr-8 mb-6 w-full md:w-64 rounded-xl border p-8 flex flex-col items-center justify-center text-center shadow-sm ${borderColor}`}>
                    <div className={`text-6xl font-extrabold mb-2 ${scoreColor}`}>
                        {Math.round(capped_score)}%
                    </div>
                    <div className="text-lg font-semibold text-brand-dark uppercase tracking-widest">
                        {category}
                    </div>
                </div>

                {/* Narrative / Context */}
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-4 border-b border-gray-100 pb-3">
                        Analysis & Recommendations
                    </h3>
                    <div className="prose prose-blue max-w-none text-brand-gray text-sm md:text-base">
                        {formattedNarrative}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                <h3 className="text-lg font-semibold text-brand-dark mb-2">Next Steps</h3>
                <p className="text-brand-gray mb-6 max-w-2xl mx-auto">
                    A detailed PDF report has been generated for you with specific functional recommendations and an implementation roadmap.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => onDownload(id)}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-gradient hover:opacity-90 shadow-sm transition-all hover:shadow-md"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download Full Report
                    </button>

                    <button
                        onClick={onRestart}
                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
                    >
                        Start New Assessment
                    </button>
                </div>
            </div>

        </div>
    );
}
