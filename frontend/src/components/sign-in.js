import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "./ui/form";
import { Loader2 } from "lucide-react";
import z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/api/authApi";
import { toast } from "react-toastify";
const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
export const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem("accessToken");
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            await signIn(values);
            toast.success("Signed in successfully!");
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error.response?.data?.message || "Sign-In failed");
            toast.error(error.response?.data?.message || "Sign-In failed");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("section", { className: "flex w-full bg-zinc-50  dark:bg-transparent", children: _jsxs("div", { className: "bg-muted m-auto h-fit w-full overflow-hidden rounded-[calc(var(--radius)+.125rem)]  shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]", children: [_jsxs("div", { className: "bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6", children: [_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "mt-6 space-y-6", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "Enter your email", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FormLabel, { children: "Password" }), _jsx(Button, { asChild: true, variant: "link", size: "sm", children: _jsx(Link, { to: "#", className: "text-sm", children: "Forgot your Password?" }) })] }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "Enter your password", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs(Button, { type: "submit", className: "w-full", children: [isLoading ? (_jsx(Loader2, { className: "size-4 animate-spin" })) : ("Sign In"), " "] })] }) }), _jsxs("div", { className: "my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3", children: [_jsx("hr", { className: "border-dashed" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "Or continue With" }), _jsx("hr", { className: "border-dashed" })] }), _jsx("div", { className: "grid grid-cols-1 ", children: _jsxs(Button, { type: "button", variant: "outline", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "0.98em", height: "1em", viewBox: "0 0 256 262", children: [_jsx("path", { fill: "#4285f4", d: "M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" }), _jsx("path", { fill: "#34a853", d: "M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" }), _jsx("path", { fill: "#fbbc05", d: "M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" }), _jsx("path", { fill: "#eb4335", d: "M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" })] }), _jsx("span", { children: "Google" })] }) })] }), _jsx("div", { className: "p-3", children: _jsxs("p", { className: "text-accent-foreground text-center text-sm", children: ["Don't have an account ?", _jsx(Button, { asChild: true, variant: "link", className: "px-2", children: _jsx(Link, { to: "/?authMode=sign-up", children: "Create account" }) })] }) })] }) }));
};
