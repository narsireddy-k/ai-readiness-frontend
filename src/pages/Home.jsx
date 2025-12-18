import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 flex flex-col justify-center items-center">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">

                {/* Brand/Logo Placeholder or decorative element */}
                <div className="mx-auto h-24 w-24 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg mb-8">
                    <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                    Is Your Business <span className="text-brand-gradient bg-clip-text text-transparent pr-2 ">AI Ready ?</span>
                </h1>

                <p className="text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
                    Discover your organization's AI maturity level. Take our comprehensive assessment to identify strengths, uncovering gaps, and get a personalized roadmap to success.
                </p>

                <div className="pt-8">
                    <button
                        onClick={() => navigate('/assessment')}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-gradient rounded-lg shadow-lg hover:opacity-90 transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan"
                    >
                        Start Assessment
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>

                    <p className="mt-4 text-sm text-gray-400">
                        Takes approximately 3-5 minutes
                    </p>
                </div>

            </div>

            {/* Footer / Trust badges placeholder */}
            <div className="absolute bottom-8 text-center text-gray-400 text-sm">
                Powered by Forgebyte
            </div>
        </div>
    );
}
