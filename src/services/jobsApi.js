import { getAuthToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const jobsApi = {
  // Get all jobs
  getAllJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch jobs");
    }

    return response.json();
  },

  // Create a new job (Admin only)
  createJob: async (data) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create job");
    }

    return response.json();
  },

  // Update a job (Admin only)
  updateJob: async (jobId, data) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update job");
    }

    return response.json();
  },

  // Delete a job (Admin only)
  deleteJob: async (jobId) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete job");
    }

    return response.json();
  },

  // Get a single job by ID
  getJobById: async (jobId) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch job");
    }

    return response.json();
  },

  // Submit application for a job
  submitApplication: async (jobId, applicationData) => {
    const token = getAuthToken();

    // Build payload with correct field names and optional fields
    const payload = {
      job_id: jobId,
      name: applicationData.name,
      email: applicationData.email,
    };

    // Add optional fields if they exist
    if (applicationData.resumeLink) {
      payload.resume_link = applicationData.resumeLink;
    }
    if (applicationData.coverNote) {
      payload.cover_note = applicationData.coverNote;
    }

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit application");
    }

    return response.json();
  },
};
