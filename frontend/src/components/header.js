import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LogOut, Menu, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const menuItems = [
    { name: "Features", href: "#link" },
    { name: "Solution", href: "#link" },
    { name: "Pricing", href: "#link" },
    { name: "About", href: "#link" },
];
export const HeroHeader = () => {
    const navigate = useNavigate();
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const isAuthenticated = !!localStorage.getItem("accessToken");
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = () => {
        // call the backend here..
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        navigate("/?authMode=sign-in", { replace: true });
    };
    return (_jsx("header", { children: _jsx("nav", { className: `fixed z-20 bg-white w-full px-2 ${menuState ? "" : "border-b"}`, children: _jsxs("div", { className: "mx-auto mt-2 max-w-8xl px-6 transition-all duration-300 lg:px-12", children: [_jsxs("div", { className: "relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4", children: [_jsxs("div", { className: "flex w-full justify-between lg:w-auto", children: [_jsxs(Link, { to: "/", "aria-label": "home", className: "flex items-center space-x-2 gap-2 text-lg", children: [_jsx(Stethoscope, {}), " MEDICAL CARE"] }), _jsx("button", { onClick: () => setMenuState(!menuState), "aria-label": menuState ? "Close Menu" : "Open Menu", className: "relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden", children: menuState ? (_jsx(X, { className: "m-auto size-6 duration-200" })) : (_jsx(Menu, { className: "m-auto size-6 duration-200" })) })] }), _jsx("div", { className: "hidden lg:block", children: _jsx("ul", { className: "flex gap-8 text-sm" }) }), _jsx("div", { className: "hidden lg:flex lg:items-center lg:gap-3", children: isAuthenticated ? (_jsxs(Button, { variant: "outline", size: "sm", onClick: handleLogout, children: [_jsx(LogOut, {}), " Logout"] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { asChild: true, variant: "outline", size: "sm", children: _jsx(Link, { to: "/?authMode=sign-in", children: "Login" }) }), _jsx(Button, { asChild: true, size: "sm", children: _jsx(Link, { to: "/?authMode=sign-up", children: "Sign Up" }) })] })) })] }), menuState && (_jsx("div", { className: "lg:hidden mt-4 w-full rounded-3xl bg-background border p-6 shadow-4xl shadow-zinc-300/20 dark:bg-dark", children: _jsxs("ul", { className: "space-y-6", children: [menuItems.map((item, index) => (_jsx("li", { children: _jsx(Link, { to: item.href, className: "text-muted-foreground hover:text-accent-foreground block duration-150", children: item.name }) }, index))), _jsx("div", { className: "flex flex-col gap-3 mt-4", children: isAuthenticated ? (_jsxs(Button, { variant: "outline", size: "sm", onClick: handleLogout, children: [_jsx(LogOut, {}), " Logout"] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { asChild: true, variant: "outline", size: "sm", children: _jsx(Link, { to: "/?authMode=sign-in", children: "Login" }) }), _jsx(Button, { asChild: true, size: "sm", children: _jsx(Link, { to: "/?authMode=sign-up", children: "Sign Up" }) })] })) })] }) }))] }) }) }));
};
