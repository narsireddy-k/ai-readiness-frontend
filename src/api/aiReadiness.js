import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/ai-readiness/`,
});

export const fetchQuestions = () => API.get("questions/");
export const submitAssessment = (payload) => API.post("submit/", payload);
export const fetchAssessment = (id) => API.get(`assessments/${id}/`);
export const downloadPDF = (id) =>
  window.open(`${API_BASE_URL}/api/ai-readiness/report/${id}/`, "_blank");
