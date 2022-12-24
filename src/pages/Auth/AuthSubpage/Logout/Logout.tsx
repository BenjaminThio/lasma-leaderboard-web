import "./Logout.css";
import React, {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            localStorage.removeItem("token");
        } catch (e) {
            console.log(e);
        }
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }, []);

    return (
        <div id="login">
            <div id="logout-container">
                <h2>You have been logged out.</h2>
                <p>You will be redirected to the home page in 5 seconds</p>
            </div>
        </div>
    );
}

export default Logout;