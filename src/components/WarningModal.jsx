export default function WarningModal({ open, title, message, onReview, onProceed }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-3 text-sm text-gray-700">{message}</p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onReview}
                        className="px-4 py-2 border rounded"
                    >
                        Review Answers
                    </button>
                    <button
                        onClick={onProceed}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Proceed Anyway
                    </button>
                </div>
            </div>
        </div>
    );
}
