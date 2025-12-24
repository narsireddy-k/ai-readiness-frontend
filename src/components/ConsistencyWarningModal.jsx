export default function ConsistencyWarningModal({ warning, onReview, onProceed }) {
  if (!warning) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {warning.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {warning.message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onReview}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Review Answers
          </button>

          <button
            onClick={onProceed}
            className="px-4 py-2 rounded-lg bg-brand-gradient text-white hover:opacity-90"
          >
            Proceed Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
