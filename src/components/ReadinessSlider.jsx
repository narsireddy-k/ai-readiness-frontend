import React, { useState } from "react";

export default function ReadinessSlider({ options, value, onChange }) {
    const DOT_COUNT = 5;
    const DOT_SIZE_PX = 20; // w-5 = 20px

    const selectedIndex = options.indexOf(value);
    const sliderValue = selectedIndex === -1 ? 1 : selectedIndex + 1;

    const [hoverValue, setHoverValue] = useState(null);

    const handleSliderChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (val >= 1 && val <= DOT_COUNT) {
            onChange(options[val - 1]);
        }
    };

    return (
        <div className="w-full py-8 px-2 relative">

            {/* Labels */}
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 select-none">
                <span>Low Readiness / Low Priority</span>
                <span>High Readiness / Top Priority</span>
            </div>

            {/* Slider Container */}
            <div className="relative h-12 flex items-center">

                {/* Native slider (invisible, accessible) */}
                <input
                    type="range"
                    min="1"
                    max={DOT_COUNT}
                    step="1"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 pointer-events-none"
                />

                {/* Track */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 z-0 pointer-events-none">
                    <div className="relative w-full h-1 bg-gray-200 rounded overflow-hidden">

                        {/* Filled Track */}
                        <div
                            className="absolute top-0 left-0 h-full bg-brand-gradient rounded transition-all duration-300 ease-out"
                            style={{
                                width: `calc(${(sliderValue - 1) * 25}% ${sliderValue === DOT_COUNT
                                    ? `- ${DOT_SIZE_PX / 2}px`
                                    : ""
                                    })`
                            }}
                        />
                    </div>
                </div>

                <div className="relative z-10 w-full flex justify-between px-5">
                    {[1, 2, 3, 4, 5].map((num) => {
                        const isActive = sliderValue === num;
                        const isHovered = hoverValue === num;

                        return (
                            <div
                                key={num}
                                className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
                                onMouseEnter={() => setHoverValue(num)}
                                onMouseLeave={() => setHoverValue(null)}
                                onClick={() => onChange(options[num - 1])}
                            >
                                {/* Dot */}
                                <div
                                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 shadow-sm
                                        ${isActive
                                            ? "bg-brand-cyan border-brand-cyan scale-125"
                                            : isHovered
                                                ? "bg-cyan-50 border-brand-cyan"
                                                : "bg-white border-gray-300"
                                        }`}
                                />

                                {/* Tooltip – SAFE (not clipped) */}
                                {isHovered && (
                                    <div
                                        className={`absolute bottom-full mb-3 w-64 p-3 bg-gray-100 text-gray-800 text-xs rounded-lg shadow-xl text-center z-50 animate-fade-in pointer-events-none
                                                ${num === 1
                                                ? "left-0"
                                                : num === DOT_COUNT
                                                    ? "right-0"
                                                    : "left-1/2 -translate-x-1/2"
                                            }
                                        `}
                                    >
                                        {options[num - 1]}

                                        {/* Arrow */}
                                        <div
                                            className={`absolute top-full border-8 border-transparent border-t-gray-100
                                                ${num === 1
                                                    ? "left-4"
                                                    : num === DOT_COUNT
                                                        ? "right-4"
                                                        : "left-1/2 -translate-x-1/2"
                                                }
                                        `}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
