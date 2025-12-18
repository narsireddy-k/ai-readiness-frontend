export default function ProgressBar({ current, total }) {
    const progress = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
                className="bg-brand-gradient h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
            <p className="text-xs text-gray-500 text-right mt-1">
                {Math.round(progress)}% Complete
            </p>
        </div>
    );
}
