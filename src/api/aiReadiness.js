import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/ai-readiness/",
});

export const fetchQuestions = () => API.get("questions/");
export const submitAssessment = (payload) => API.post("submit/", payload);
export const fetchAssessment = (id) => API.get(`assessments/${id}/`);
export const downloadPDF = (id) =>
  window.open(`${API.defaults.baseURL}report/${id}/`, "_blank");
