import React, { useState } from "react";

export default function ReadinessSlider({ options, value, onChange }) {
    const selectedIndex = options.indexOf(value);
    const sliderValue = selectedIndex === -1 ? 0 : selectedIndex + 1; // 0 if nothing selected, else 1-5

    const [hoverValue, setHoverValue] = useState(null);

    const handleSliderChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (val >= 1 && val <= 5) {
            onChange(options[val - 1]);
        }
    };

    return (
        <div className="w-full py-8 px-2 relative">
            {/* Labels Row */}
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 select-none">
                <span>Low Readiness / Low Priority</span>
                <span>High Readiness / Top Priority</span>
            </div>

            {/* Slider Container */}
            <div className="relative h-12 flex items-center group">

                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={sliderValue || 1}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer z-10 opacity-0 absolute inset-0"
                />

                {/* Custom Track Rendering for visual feedback & Hover Targets */}
                <div className="w-full flex justify-between items-center z-20 pointer-events-none">
                    {[1, 2, 3, 4, 5].map((num) => {
                        const isActive = sliderValue === num;
                        const isHovered = hoverValue === num;

                        return (
                            <div
                                key={num}
                                className="relative flex justify-center items-center h-10 w-10 pointer-events-auto"
                                onMouseEnter={() => setHoverValue(num)}
                                onMouseLeave={() => setHoverValue(null)}
                                onClick={() => onChange(options[num - 1])}
                            >
                                {/* Circle Pip */}
                                <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 shadow-sm ${isActive
                                    ? "bg-brand-cyan border-brand-cyan scale-125"
                                    : isHovered
                                        ? "bg-cyan-50 border-brand-cyan"
                                        : "bg-white border-gray-300"
                                    }`}></div>

                                {/* The Tooltip - Shows only on Hover */}
                                {isHovered && (
                                    <div className="absolute bottom-full mb-3 w-64 p-3 bg-brand-dark text-white text-xs rounded-lg shadow-xl text-center transform -translate-x-1/2 left-1/2 z-50 animate-fade-in pointer-events-none">
                                        {options[num - 1]}
                                        {/* Triangle arrow */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-brand-dark"></div>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* Connecting Line (visual only) */}
                    <div className="absolute top-1/2 left-5 right-5 h-1 bg-gray-200 -z-10 rounded"></div>

                    {/* Filled Line */}
                    {sliderValue > 0 && (
                        <div
                            className="absolute top-1/2 left-5 h-1 bg-brand-gradient -z-10 rounded transition-all duration-300 ease-out"
                            style={{ width: `calc(${(sliderValue - 1) * 25}% - ${(sliderValue - 1) * 0}px)` }} // Simplified: Just percentage of the space between centers.
                        // The container is flexible, but the 'left-5 right-5' track represents 100% of the scalable area.
                        // However, the fill line is absolute to the parent.
                        // The parent (z-20 div) has full width.
                        // The track area is from left-5 to right-5.
                        // Total width of track = 100% - 2.5rem - 2.5rem? No.
                        // To be precise: The pips are justify-between. Centers are at 0, 25, 50, 75, 100 % of the available space?
                        // No, flex spacing is trickier.
                        // Let's stick to the simplest visual hack:
                        // Use calc( (100% - 2.5rem) * percentage ) ?
                        // Actually, just making the fill line *inside* the track div (which has the margins) is best.
                        ></div>
                    )}
                    {/* Better Filled Line Implementation: Inside a track container */}
                    {/* Let's redo the track/fill structure to be simpler and accurate */}
                </div>

                {/* Re-implementing track independently to ensure perfect alignment */}
                <div className="absolute top-1/2 left-0 right-0 h-1 z-0 pointer-events-none px-5">
                    <div className="w-full h-full bg-gray-200 rounded relative">
                        {sliderValue > 0 && (
                            <div
                                className="absolute top-0 left-0 h-full bg-brand-gradient rounded transition-all duration-300"
                                style={{ width: `${(sliderValue - 1) * 25}%` }}
                            ></div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
