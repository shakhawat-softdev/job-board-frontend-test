import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetJobById, useSubmitApplication } from "../../hooks/useJobs";
import { showSuccessToast, showErrorToast } from "../../utils/notifications";

const JobDetail = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { data: job, isLoading, isError } = useGetJobById(jobId);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        resumeLink: "",
        coverNote: "",
    });

    const { mutate: submitApplication, isPending: isSubmitting } = useSubmitApplication({
        onSuccess: () => {
            showSuccessToast("Application submitted successfully!");

            // Reset form
            setFormData({
                name: "",
                email: "",
                resumeLink: "",
                coverNote: "",
            });

            // Navigate back after success
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        },
        onError: (error) => {
            showErrorToast(error.message || "Failed to submit application");
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.email || !formData.resumeLink || !formData.coverNote) {
            showErrorToast("Please fill in all required fields");
            return;
        }

        submitApplication({
            jobId,
            applicationData: formData,
        });
    };

    if (isLoading) {
        return (
            <section className="pt-36 pb-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <p className="text-slate-500">Loading job details...</p>
                </div>
            </section>
        );
    }

    if (isError || !job) {
        return (
            <section className="pt-36 pb-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#4F46E5] font-semibold mb-8 hover:text-[#4338CA] transition-colors"
                    >
                        <FiArrowLeft size={20} />
                        Back
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Job not found</h1>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-36 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#4F46E5] font-semibold mb-8 hover:text-[#4338CA] transition-colors"
                >
                    <FiArrowLeft size={20} />
                    Back
                </button>

                <div className="border border-slate-200 p-8 mb-10">
                    <div className="flex items-start gap-4 mb-6">
                        <img src={job.logo} alt={job.company} className="w-14 h-14 object-contain" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{job.title}</h1>
                            <p className="text-slate-500 mt-1">
                                {job.company} • {job.location} • {job.type}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Job Description</h2>
                    <p className="text-slate-600 leading-8">{job.description}</p>
                </div>

                <div className="border border-slate-200 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Apply Now</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="resumeLink" className="block text-sm font-semibold text-slate-700 mb-2">
                                Resume link (URL)
                            </label>
                            <input
                                id="resumeLink"
                                name="resumeLink"
                                type="url"
                                value={formData.resumeLink}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="coverNote" className="block text-sm font-semibold text-slate-700 mb-2">
                                Cover note
                            </label>
                            <textarea
                                id="coverNote"
                                name="coverNote"
                                rows={6}
                                value={formData.coverNote}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5] resize-none"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default JobDetail;
