import React from "react";
import ReadinessSlider from "./ReadinessSlider";

export default function QuestionCard({ question, value, onChange }) {
    const { id, label, type, options, section } = question;

    // Sections that require the interactive slider
    const sliderSections = [
        "Prioritization, Budget & Timeline",
        "Technical, Data & Cloud Readiness",
        "Service Mapping & Pain Points",
        "Automation & Process Maturity",
        "Client Business Overview"
    ];

    const shouldUseSlider =
        type === "single_choice" &&
        options.length === 5 &&
        sliderSections.includes(section);

    const handleChange = (val) => {
        onChange(id, val);
    };

    const handleMultiChange = (option) => {
        const currentVal = Array.isArray(value) ? value : [];
        if (currentVal.includes(option)) {
            handleChange(currentVal.filter((item) => item !== option));
        } else {
            handleChange([...currentVal, option]);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 animate-fade-in">
            <h3 className="text-lg font-medium text-brand-dark mb-4">{label}</h3>

            {shouldUseSlider ? (
                <ReadinessSlider
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <>
                    {type === "single_choice" && (
                        <div className="space-y-3">
                            {options.map((option) => (
                                <label
                                    key={option}
                                    className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${value === option
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={id}
                                        value={option}
                                        checked={value === option}
                                        onChange={() => handleChange(option)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </>
            )}

            {type === "multi_choice" && (
                <div className="space-y-3">
                    {options.map((option) => (
                        <label
                            key={option}
                            className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${Array.isArray(value) && value.includes(option)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={Array.isArray(value) && value.includes(option)}
                                onChange={() => handleMultiChange(option)}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}

            {type === "text" && (
                <textarea
                    rows={4}
                    value={value || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            )}
        </div>
    );
}
