import React, { useEffect, useState } from "react";
import { fetchQuestions, submitAssessment, downloadPDF } from "../api/aiReadiness";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import UserDetailsForm from "./UserDetailsForm";
import AssessmentResult from "./AssessmentResult";

export default function AssessmentForm() {
    const [questions, setQuestions] = useState([]);
    const [sections, setSections] = useState([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [submissionId, setSubmissionId] = useState(null);
    const [assessmentResult, setAssessmentResult] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const response = await fetchQuestions();
            const qs = response.data.questions;
            setQuestions(qs);

            // Extract unique sections maintaining order
            const uniqueSections = [...new Set(qs.map((q) => q.section))];
            setSections(uniqueSections);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load questions", error);
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const nextSection = () => {
        if (currentSectionIndex < sections.length - 1) {
            window.scrollTo(0, 0);
            setCurrentSectionIndex((prev) => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const prevSection = () => {
        if (currentSectionIndex > 0) {
            window.scrollTo(0, 0);
            setCurrentSectionIndex((prev) => prev - 1);
        }
    };

    const handleUserSubmit = async (userDetails) => {
        setSubmitting(true);

        // Construct payload
        const { INDUSTRY, AUTOMATION_AREAS, USE_CASE, ...otherAnswers } = answers;

        const payload = {
            ...userDetails,
            industry: userDetails.industry || INDUSTRY,
            prioritized_use_case: USE_CASE,
            automation_areas: AUTOMATION_AREAS || [],
            automation_areas_other: "",
            answers: {
                ...otherAnswers,
                INDUSTRY: INDUSTRY || userDetails.industry,
                AUTOMATION_AREAS: AUTOMATION_AREAS,
                USE_CASE: USE_CASE
            }
        };

        try {
            const response = await submitAssessment(payload);
            const data = response.data;
            // Support both direct ID or full object with ID
            const id = data.id || data.report_id;

            if (id) {
                setSubmissionId(id);
                setAssessmentResult(data);
            } else if (data.capped_score) {
                // Fallback if ID is missing but we have results
                setAssessmentResult(data);
            } else {
                console.warn("No ID or Score returned");
            }
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit assessment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    if (submissionId && assessmentResult) {
        return (
            <AssessmentResult
                result={assessmentResult}
                onDownload={downloadPDF}
                onRestart={() => window.location.reload()}
            />
        );
    }

    if (completed) {
        return <UserDetailsForm onSubmit={handleUserSubmit} loading={submitting} />;
    }

    const currentSection = sections[currentSectionIndex];
    const sectionQuestions = questions.filter((q) => q.section === currentSection);

    // Simple validation to ensure current section is filled
    const isSectionComplete = sectionQuestions.every(q => {
        const val = answers[q.id];
        if (Array.isArray(val)) return val.length > 0;
        return !!val;
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brand-dark mb-2">AI Readiness Assessment</h1>
                
            </div>

            <div className="sticky top-0 z-40 bg-white pt-4 pb-4 mb-8 -mx-4 px-4 border-b border-gray-200 shadow-sm">
                <ProgressBar current={currentSectionIndex + 1} total={sections.length + 1} />
                <p className="text-brand-gray">Step {currentSectionIndex + 1} of {sections.length}: <span className="font-semibold text-brand-cyan">{currentSection}</span></p>
            </div>

            <div className="space-y-6">
                {sectionQuestions.map((q) => (
                    <QuestionCard
                        key={q.id}
                        question={q}
                        value={answers[q.id]}
                        onChange={handleAnswerChange}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                    onClick={prevSection}
                    disabled={currentSectionIndex === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentSectionIndex === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={nextSection}
                    disabled={!isSectionComplete}
                    className={`px-8 py-3 rounded-lg font-semibold text-white transition-all shadow-md ${isSectionComplete
                        ? "bg-brand-gradient hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {currentSectionIndex === sections.length - 1 ? "Complete Assessment" : "Next Step"}
                </button>
            </div>
        </div>
    );
}
