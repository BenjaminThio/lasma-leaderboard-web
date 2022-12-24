import React, {useEffect, useState} from "react"
import {Outlet, useNavigate} from "react-router-dom"
import {MainAppNavbar} from "../../components/MainApp";
import useUserData from "../../custom-hooks/useUserData"
import {UserDataStatus} from "../../app/reducers/userDataSlice"
import {AuthService} from "../../services/Auth"
import "./MainAppLayout.css"

function MainAppLayout() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const {authed, authLoading} = AuthService()
    const [userData, userStatus] = useUserData()

    // useEffect(() => {
    //     if (!authLoading && !authed) {
    //         alert("Please login!")
    //         navigate("/")
    //     }
    //     if (userStatus === UserDataStatus.SUCCESS) {
    //         if (!userData.type) {
    //             navigate("/app/setup")
    //         }
    //     }
    //     setLoading(false)
    // }, [userStatus, navigate, userData, loading, authed])

    if (false) {
        return <div>Loading...</div>
    } else {
        return (
            <div id="mainapplayout">
                <div id="mainapplayout-navbar">
                    <MainAppNavbar/>
                </div>
                <div id="mainapplayout-content">
                    <Outlet/>
                </div>
            </div>
        )
    }
}

export default MainAppLayout
