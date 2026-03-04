import React, { useState } from "react";
import { FiX, FiPlus, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetJobs, useCreateJob, useUpdateJob, useDeleteJob } from "../../hooks/useJobs";
import { showDeleteConfirm, showSuccessToast, showErrorToast } from "../../utils/notifications";

const AdminJobForm = ({ job, onClose, onSuccess }) => {
    const [formData, setFormData] = useState(
        job || {
            title: "",
            company: "",
            logo: "",
            location: "",
            type: "Full-time",
            tags: [],
            description: "",
            created_at: new Date().toISOString(),
        }
    );
    const [tagInput, setTagInput] = useState("");

    const { mutate: createJob, isPending: isCreating } = useCreateJob({
        onSuccess: () => {
            showSuccessToast("Job created successfully!");
            onSuccess?.();
            onClose();
        },
        onError: (error) => {
            showErrorToast(error.message || "Failed to create job");
        },
    });

    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob({
        onSuccess: () => {
            showSuccessToast("Job updated successfully!");
            onSuccess?.();
            onClose();
        },
        onError: (error) => {
            showErrorToast(error.message || "Failed to update job");
        },
    });

    const isLoading = isCreating || isUpdating;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.company || !formData.location || !formData.description || !formData.created_at) {
            alert("Please fill in all required fields");
            return;
        }

        if (job?._id) {
            updateJob({ jobId: job._id, data: formData });
        } else {
            createJob(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            {job ? "✏️ Edit Job" : "➕ Create New Job"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {job ? "Update job details below" : "Fill in the job details"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                        aria-label="Close modal"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Basic Info Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Title */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Product Designer"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Company <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Tech Startup"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. San Francisco"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Job Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Job Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>

                                {/* Logo URL */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Company Logo URL
                                    </label>
                                    <input
                                        type="url"
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleChange}
                                        placeholder="https://logo.clearbit.com/company.com"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                                Job Details
                            </h3>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Job Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the job responsibilities, requirements, and opportunities..."
                                    rows={5}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white resize-none"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {/* Metadata Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                                Metadata
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Tags */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Tags
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                            placeholder="Add tag and press Enter or click Add"
                                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="bg-[#4F46E5] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#4338CA] transition-colors disabled:opacity-50"
                                            disabled={isLoading}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.length === 0 && (
                                            <p className="text-sm text-slate-400">No tags added yet</p>
                                        )}
                                        {formData.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gradient-to-r from-[#4F46E5]/10 to-[#4338CA]/10 text-[#4F46E5] border border-[#4F46E5]/30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all hover:border-[#4F46E5]/60"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-red-500 transition-colors ml-1"
                                                    aria-label={`Remove ${tag} tag`}
                                                >
                                                    <FiX size={16} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Created At */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Created At <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="created_at"
                                        value={formData.created_at?.slice(0, 16) || ""}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value).toISOString();
                                            setFormData((prev) => ({ ...prev, created_at: date }));
                                        }}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition-all focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 bg-slate-50 focus:bg-white"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 sm:py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#4F46E5] to-[#4338CA] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#4F46E5]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    {job ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                <>{job ? "Update Job" : "Create Job"}</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminJobsPage = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const { data: jobs = [], isLoading, isError, error } = useGetJobs();
    const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob({
        onSuccess: () => {
            showSuccessToast("Job deleted successfully!");
        },
        onError: (error) => {
            showErrorToast(error.message || "Failed to delete job");
        },
    });

    const handleEdit = (job) => {
        setEditingJob(job);
        setShowForm(true);
    };

    const handleDelete = (jobId) => {
        showDeleteConfirm(() => {
            deleteJob(jobId);
        });
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingJob(null);
    };

    return (
        <section className="pt-36 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                            title="Go back"
                        >
                            <FiArrowLeft size={24} />
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Manage <span className="text-[#4F46E5]">Jobs</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 font-bold hover:bg-[#4338CA] transition-all"
                    >
                        <FiPlus size={20} />
                        Add New Job
                    </button>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
                        Error: {error?.message}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <p className="text-slate-600">Loading jobs...</p>
                    </div>
                )}

                {/* Jobs Table */}
                {!isLoading && jobs.length > 0 && (
                    <div className="border border-slate-200 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Title
                                    </th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Company
                                    </th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Location
                                    </th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Type
                                    </th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Tags
                                    </th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{job.title}</p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{job.company}</td>
                                        <td className="px-6 py-4 text-slate-600">{job.location}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block bg-[#4F46E5] text-white px-3 py-1 text-xs font-semibold">
                                                {job.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {job.tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs bg-slate-200 text-slate-700 px-2 py-1"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(job)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job._id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && jobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 mb-4">No jobs found</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 font-bold hover:bg-[#4338CA]"
                        >
                            <FiPlus size={20} />
                            Create First Job
                        </button>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <AdminJobForm
                    job={editingJob}
                    onClose={handleCloseForm}
                    onSuccess={() => {
                        // Toast notifications are handled in the hooks
                    }}
                />
            )}
        </section>
    );
};

export default AdminJobsPage;
