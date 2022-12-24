import React from "react";
import "./MainAppQuickActionTile.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPager} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

interface MainAppQuickActionTileProps {
    icon?: IconDefinition;
    title?: string;
    description?: string;
    navigateTo: string;
}

function MainAppQuickActionTile(props: MainAppQuickActionTileProps) {
    const navigate = useNavigate();

    return (
        <>
            <div id="mainapp-quickactions-action-container" onClick={() => navigate(props.navigateTo)}>
                <div id="mainapp-quickactions-action-title">
                    {(props.title === "" || !props.title) ? "Test" : props.title}
                </div>
                <div id="mainapp-quickactions-action-description">
                    <div id="mainapp-quickactions-action-icon">
                        <FontAwesomeIcon icon={props.icon ? props.icon : faPager}/>
                    </div>
                    <div id="mainapp-quickactions-action-description-text">
                        {(props.description === "" || !props.description) ? "Lorem ipsum dolor sit amet" : props.description}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainAppQuickActionTile;
