import { generateReport, getAssessments } from "@/api/assessmentApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAssessmentResponse } from "@/types";
import { AxiosResponse } from "axios";
import {
  Activity,
  GaugeCircle,
  Heart,
  Loader2,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [assessments, setAssessments] = useState<IAssessmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSession, setLoadingSession] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<IAssessmentResponse[]> =
          await getAssessments();
        setAssessments(response.data);
      } catch (err) {
        setError("Failed to fetch assessments. Please try again later.");
        console.error("Error fetching assessments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-200 text-green-600";
    if (score >= 70) return "bg-green-200 text-green-600";
    if (score >= 50) return "bg-yellow-100 text-yellow-600";
    return "bg-red-200 text-red-600";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const handleGenerateReport = async (session_Id: string) => {
    setLoadingSession(session_Id);
    try {
      await generateReport(session_Id);
      toast.success("Report generate successful!");
    } catch (error: any) {
      toast.error("Report Generation Failed");
    } finally {
      setLoadingSession(null);
    }
  };

  if (loading)
    return <div className="text-center py-4">Loading assessments...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="pt-20 px-5 md:px-10 lg:px-16 w-full h-screen">
      <div className="flex flex-col py-6">
        <h1 className="font-bold text-2xl md:text-4xl">Health Assessments</h1>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 py-8">
          {assessments.map((assessment, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md text-black font-bold">
                    {assessment.header}
                  </CardTitle>
                  <Badge
                    className={`${getHealthScoreColor(
                      assessment.healthScore
                    )} px-4`}
                  >
                    {getHealthScoreLabel(assessment.healthScore)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-1/2 flex items-center justify-start gap-2">
                    <p
                      className={`p-2 w-fit rounded-full ${getHealthScoreColor(
                        assessment.healthScore
                      )}`}
                    >
                      <TrendingUp
                        className={`w-4 h-4 text-${getHealthScoreColor(
                          assessment.healthScore
                        )}`}
                      />
                    </p>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium">Health Score :</h1>
                      <p className="text-2xl font-bold">
                        {assessment.healthScore}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/2 flex items-center justify-end gap-2">
                    <p className={`p-2 w-fit rounded-full bg-slate-200`}>
                      <Heart className={`w-5 h-5`} />
                    </p>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium">Heart Rate :</h1>
                      <p className="text-2xl font-bold">
                        {assessment.healthScore}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-1/2 flex items-center justify-start gap-2">
                    <p className={`p-2 w-fit rounded-full bg-slate-200`}>
                      <Activity className={`w-5 h-5`} />
                    </p>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium">DBP :</h1>
                      <p className="text-2xl font-bold">
                        {assessment.bloodPressure.diastolic}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/2 flex items-center justify-end gap-2">
                    <p className={`p-2 w-fit rounded-full bg-slate-200`}>
                      <Activity className={`w-5 h-5`} />
                    </p>
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium">SBP :</h1>
                      <p className="text-2xl font-bold">
                        {assessment.bloodPressure.systolic}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  key={index}
                  disabled={loadingSession === assessment.session_id}
                  onClick={() => handleGenerateReport(assessment.session_id)}
                  className="w-full"
                >
                  {loadingSession === assessment.session_id ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />{" "}
                      <span>Generating</span>
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
