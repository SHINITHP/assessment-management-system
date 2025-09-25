import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
createRoot(document.getElementById("root")).render(_jsxs(StrictMode, { children: [_jsx(App, {}), _jsx(ToastContainer, {})] }));
