import React, { useState } from "react";

export default function UserDetailsForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        person_name: "",
        company_name: "",
        email: "",
        phone: "",
        designation: "",
        industry: "", // We might want to pre-fill this if we already asked it in questions, but let's keep it simple or allow override
    });

    const industries = [
        "Banking & Financial Services", "Insurance", "Healthcare & HealthTech",
        "Pharma / Med Devices", "Technology / IT Services", "Media / Entertainment / Telecom",
        "Retail & E-commerce", "Manufacturing", "Transport & Logistics",
        "Energy & Utilities", "Construction", "Real Estate", "Hospitality",
        "Food & Beverages", "Education / EdTech", "On-Demand Platforms",
        "Professional Services", "Government / Public Sector", "Other"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
<div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Unlock Your AI Readiness Report
            </h2>
            <p className="text-gray-600 text-center mb-4">
                Please provide your details to receive your personalized assessment report.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="person_name"
                            required
                            value={formData.person_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Designation <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="company_name"
                            required
                            value={formData.company_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Industry <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        >
                            <option value="">Select Industry</option>
                            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-gradient hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan disabled:opacity-50 transition-colors"
                >
                    {loading ? "Generating Report..." : "Submit & Get Report"}
                </button>
            </form>
        </div>
</div>
    );
}
