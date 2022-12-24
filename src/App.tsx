import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Home, MainApp, NotFound} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import MainAppLayout from "./pages/MainApp/MainAppLayout";
import {CreateApp, EditApp, Showcase} from "./pages/MainApp/MainAppSubpage/App";
import {Dashboard, ViewDashboardApp} from "./pages/MainApp/MainAppSubpage/Dashboard"
import AuthLayout from "./pages/Auth/AuthLayout";
import {Login} from "./pages/Auth/AuthSubpage/Login";
import {Register} from "./pages/Auth/AuthSubpage/Register";
import {Profile} from "./pages/MainApp/MainAppSubpage/Profile";
import {Logout} from "./pages/Auth/AuthSubpage/Logout";

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="auth" element={<AuthLayout/>}>
                    <Route index element={<Navigate replace to="/auth/login"/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="logout" element={<Logout/>}/>
                </Route>
                <Route path="app" element={
                    <ProtectedRoute redirectTo="/auth">
                        <MainAppLayout/>
                    </ProtectedRoute>
                }>
                    <Route index element={<MainApp/>}/>
                    <Route path="showcase" element={<Showcase/>}/>
                    <Route path="create" element={<CreateApp/>}/> 
                    <Route path="dashboard">
                        <Route path="edit/:appUID" element={<EditApp/>}/>
                        <Route index element={<Dashboard/>}/>
                        <Route path="view/:appUID" element={<ViewDashboardApp/>}/>
                    </Route>
                    <Route path="profile">
                        <Route index element={<Profile/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
