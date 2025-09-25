import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx("main", { children: _jsx(Outlet, {}) })] }));
};
export default AppLayout;
