import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { generateReport, getAssessments } from "@/api/assessmentApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Loader2, TrendingUp, } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Dashboard = () => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSession, setLoadingSession] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const response = await getAssessments();
                setAssessments(response.data);
            }
            catch (err) {
                setError("Failed to fetch assessments. Please try again later.");
                console.error("Error fetching assessments:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAssessments();
    }, []);
    const getHealthScoreColor = (score) => {
        if (score >= 85)
            return "bg-green-200 text-green-600";
        if (score >= 70)
            return "bg-green-200 text-green-600";
        if (score >= 50)
            return "bg-yellow-100 text-yellow-600";
        return "bg-red-200 text-red-600";
    };
    const getHealthScoreLabel = (score) => {
        if (score >= 85)
            return "Excellent";
        if (score >= 70)
            return "Good";
        if (score >= 50)
            return "Fair";
        return "Poor";
    };
    const handleGenerateReport = async (session_Id) => {
        setLoadingSession(session_Id);
        try {
            const response = await generateReport(session_Id);
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            // Create temporary link to download
            const link = document.createElement("a");
            link.href = url;
            link.download = `${session_Id}_report.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            // Revoke the object URL to free memory
            window.URL.revokeObjectURL(url);
            toast.success("Report generated successfully!");
        }
        catch (error) {
            toast.error(`Report Generation Failed: ${error.message}`);
        }
        finally {
            setLoadingSession(null);
        }
    };
    if (loading)
        return _jsx("div", { className: "text-center py-4", children: "Loading assessments..." });
    if (error)
        return _jsx("div", { className: "text-center py-4 text-red-500", children: error });
    return (_jsx("section", { className: "pt-20 px-5 md:px-10 lg:px-16 w-full h-screen", children: _jsxs("div", { className: "flex flex-col py-6", children: [_jsx("h1", { className: "font-bold text-2xl md:text-4xl", children: "Health Assessments" }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3 py-8", children: assessments.map((assessment, index) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-md text-black font-bold", children: assessment.header }), _jsx(Badge, { className: `${getHealthScoreColor(assessment.healthScore)} px-4`, children: getHealthScoreLabel(assessment.healthScore) })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "w-1/2 flex items-center justify-start gap-2", children: [_jsx("p", { className: `p-2 w-fit rounded-full ${getHealthScoreColor(assessment.healthScore)}`, children: _jsx(TrendingUp, { className: `w-4 h-4 text-${getHealthScoreColor(assessment.healthScore)}` }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-sm font-medium", children: "Health Score :" }), _jsx("p", { className: "text-2xl font-bold", children: assessment.healthScore })] })] }), _jsxs("div", { className: "w-1/2 flex items-center justify-end gap-2", children: [_jsx("p", { className: `p-2 w-fit rounded-full bg-slate-200`, children: _jsx(Heart, { className: `w-5 h-5` }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-sm font-medium", children: "Heart Rate :" }), _jsx("p", { className: "text-2xl font-bold", children: assessment.healthScore })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "w-1/2 flex items-center justify-start gap-2", children: [_jsx("p", { className: `p-2 w-fit rounded-full bg-slate-200`, children: _jsx(Activity, { className: `w-5 h-5` }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-sm font-medium", children: "DBP :" }), _jsx("p", { className: "text-2xl font-bold", children: assessment.bloodPressure.diastolic })] })] }), _jsxs("div", { className: "w-1/2 flex items-center justify-end gap-2", children: [_jsx("p", { className: `p-2 w-fit rounded-full bg-slate-200`, children: _jsx(Activity, { className: `w-5 h-5` }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-sm font-medium", children: "SBP :" }), _jsx("p", { className: "text-2xl font-bold", children: assessment.bloodPressure.systolic })] })] })] }), _jsx(Button, { disabled: loadingSession === assessment.session_id, onClick: () => handleGenerateReport(assessment.session_id), className: "w-full", children: loadingSession === assessment.session_id ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "size-4 animate-spin" }), " ", _jsx("span", { children: "Generating" })] })) : ("Generate Report") }, index)] })] }, index))) })] }) }));
};
export default Dashboard;
