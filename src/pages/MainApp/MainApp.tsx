import React from "react";
import "./MainApp.css";
import {MainAppQuickActionTile} from "../../components/MainApp";
import {faDoorOpen, faFile, faPlusSquare, faStar} from "@fortawesome/free-solid-svg-icons";

function MainApp() {
    return (
        <div id="mainapp">
            <div id="mainapp-header">
                <h1>Welcome to Lasma Leaderboard</h1>
            </div>
            <div id="mainapp-quickactions-container">
                <div id="mainapp-quickactions-header">
                    What would you like to do?
                </div>
                <div id="mainapp-quickactions-actions-container">
                    <MainAppQuickActionTile title="Read the docs" description="Learn how to use Lasma Leaderboard"
                                            icon={faFile} navigateTo={"/docs"}/>
                    <MainAppQuickActionTile title="Create a new app"
                                            description="Create a new app and using our leaderboard API"
                                            icon={faPlusSquare} navigateTo={"create"}/>
                    <MainAppQuickActionTile title="See the showcase"
                                            description="View a showcase of all apps created using Lasma Leaderboard"
                                            icon={faStar} navigateTo={"showcase"}/>
                    <MainAppQuickActionTile title="See your profile"
                                            description="Adjust settings related to your profile"
                                            icon={faStar} navigateTo={"profile"}/>
                    <MainAppQuickActionTile title="Logout"
                                            description="Logout of your account"
                                            icon={faDoorOpen} navigateTo={"/auth/logout"}/>
                </div>
            </div>
        </div>
    );
}

export default MainApp;
