import React, {useEffect, useState} from "react"
import {Outlet, useNavigate} from "react-router-dom"
import "./AuthLayout.css"
import {AuthNavbar} from "../../components/Auth";
import {AuthService} from "../../services/Auth";

function AuthLayout() {
    let navigate = useNavigate();

    return (
        <div id="authlayout">
            <div id="authlayout-navbar">
                <AuthNavbar/>
            </div>
            <div id="authlayout-content">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout
