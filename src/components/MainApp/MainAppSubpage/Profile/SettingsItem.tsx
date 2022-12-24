import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, IconDefinition} from "@fortawesome/free-regular-svg-icons";

interface SettingsItemProps {
    fontAwesomeIcon: IconDefinition;
    text: string;
    isFirst?: boolean;
    onClick?: () => void;
}

function SettingsItem(props: SettingsItemProps) {

    return (
        <>
            <div className={!props.isFirst ? "profile-container-sidebar-item-first" : "profile-container-sidebar-item"}
                 onClick={props.onClick}>
                <div
                    className={!props.isFirst ? "profile-container-sidebar-item-first-icon" : "profile-container-sidebar-item-icon"}>
                    <FontAwesomeIcon icon={props.fontAwesomeIcon}/>
                </div>
                <div
                    className={!props.isFirst ? "profile-container-sidebar-item-first-text" : "profile-container-sidebar-item-text"}>
                    <h3>{props.text}</h3>
                </div>
            </div>
        </>
    );
}

export default SettingsItem;
