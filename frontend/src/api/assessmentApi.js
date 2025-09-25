import api from "./axios";
export const getAssessments = async () => {
    const response = await api.get(`/assessment`);
    return response;
};
export const generateReport = async (session_Id) => {
    const response = await api.post(`/assessment/generate-report/${session_Id}`, null, {
        responseType: "blob", // Ensures response.data is a Blob for PDFs
    });
    return response;
};
