import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    return token ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/?authMode='sign-in", replace: true });
};
export default ProtectedRoute;
