"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TextEffect } from "@/components/ui/text-effect";
const transitionVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
};
export const HeroSection = () => {
    return (_jsx(_Fragment, { children: _jsx("main", { className: "overflow-hidden h-screen flex justify-center items-center", children: _jsx("section", { children: _jsx("div", { className: "relative", children: _jsxs("div", { className: "mx-auto max-w-7xl text-center sm:mx-auto lg:mr-auto lg:mt-0", children: [_jsx(TextEffect, { preset: "fade-in-blur", speedSegment: 0.3, as: "h1", className: "mx-auto max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl xl:text-[5.25rem]", children: "Advanced Tools for Medical Assessment Management" }), _jsx(TextEffect, { per: "line", preset: "fade-in-blur", speedSegment: 0.3, delay: 0.5, as: "p", className: "mx-auto mt-8 max-w-2xl text-balance text-lg", children: "Customizable solutions to streamline medical assessments, enhancing patient care with intuitive interfaces and precise workflows." })] }) }) }) }) }));
};
