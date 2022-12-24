import React from "react";
import {Navigate} from "react-router-dom";
import {AuthService} from "../services/Auth";

function ProtectedRoute({children, redirectTo}: any) {
    const {authed, authLoading} = AuthService();

    if (authLoading) {
        return <div>Loading...</div>;
    } else if (!authed) {
        return <Navigate to={redirectTo}/>;
    } else {
        return children;
    }
}

export default ProtectedRoute;