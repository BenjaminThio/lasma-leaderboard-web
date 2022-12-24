import "./Profile.css";
import {faAddressCard} from '@fortawesome/free-regular-svg-icons'
import {ProfileMenuContent, SettingsItem} from "../../../../components/MainApp";
import {faArrowRightFromBracket, faCog, faKey, faWarning} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export enum menuOptions {
    PROFILE = "profile",
    SETTINGS = "settings",
    KEYS = "keys",
    LOGOUT = "logout",
    DELETE = "delete"
}

function Profile() {
    const [activeMenuOption, setActiveMenuOption] = React.useState<menuOptions>(menuOptions.PROFILE);
    return (
        <div id="profile">
            <div id="profile-container">
                <div id="profile-container-sidebar">
                    <SettingsItem fontAwesomeIcon={faAddressCard} text={"Profile"}
                                  onClick={() => setActiveMenuOption(menuOptions.PROFILE)}/>
                    <SettingsItem fontAwesomeIcon={faCog} text={"Settings"}
                                  onClick={() => setActiveMenuOption(menuOptions.SETTINGS)}/>
                    <SettingsItem fontAwesomeIcon={faKey} text={"API Keys"}
                                  onClick={() => setActiveMenuOption(menuOptions.KEYS)}/>
                    <SettingsItem fontAwesomeIcon={faArrowRightFromBracket} text={"Logout"}
                                  onClick={() => setActiveMenuOption(menuOptions.LOGOUT)}/>
                    <SettingsItem fontAwesomeIcon={faWarning} text={"Delete Account"}
                                  onClick={() => setActiveMenuOption(menuOptions.DELETE)}/>
                </div>
                <div id="profile-container-content">
                    <ProfileMenuContent activeMenuOption={activeMenuOption}/>
                </div>
            </div>
        </div>
    );
}

export default Profile