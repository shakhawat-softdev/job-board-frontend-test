import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "../services/jobsApi";

export const useGetJobs = (options = {}) => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.getAllJobs(),
    ...options,
  });
};

export const useCreateJob = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => jobsApi.createJob(data),
    onSuccess: (data) => {
      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useUpdateJob = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }) => jobsApi.updateJob(jobId, data),
    onSuccess: (data) => {
      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useDeleteJob = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId) => jobsApi.deleteJob(jobId),
    onSuccess: (data) => {
      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useGetJobById = (jobId, options = {}) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.getJobById(jobId),
    enabled: !!jobId,
    ...options,
  });
};

export const useSubmitApplication = (options = {}) => {
  return useMutation({
    mutationFn: ({ jobId, applicationData }) =>
      jobsApi.submitApplication(jobId, applicationData),
    onSuccess: (data) => {
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};
