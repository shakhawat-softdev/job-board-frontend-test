import React from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../../data/jobs";

const JobDetail = () => {
    const { jobId } = useParams();
    const job = getJobById(jobId);

    if (!job) {
        return (
            <section className="pt-36 pb-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Job not found</h1>
                    <Link to="/" className="text-[#4F46E5] font-semibold">
                        Back to jobs
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-36 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <Link to="/" className="text-[#4F46E5] font-semibold inline-block mb-8">
                    ← Back to jobs
                </Link>

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

                    <form className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
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
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
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
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
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
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5] resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default JobDetail;
