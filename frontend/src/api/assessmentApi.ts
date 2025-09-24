import { IAssessmentResponse } from "@/types";
import api from "./axios";
import { AxiosResponse } from "axios";

export const getAssessments = async (): Promise<AxiosResponse<IAssessmentResponse[]>> => {
      const response = await api.get(`/assessment`);
      return response;
}

export const generateReport = async (session_Id: string): Promise<AxiosResponse> => {
  const response = await api.post(`/assessment/generate-report/${session_Id}`, null, {
    responseType: "blob", // Ensures response.data is a Blob for PDFs
  });
  return response;
};