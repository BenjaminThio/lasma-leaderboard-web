import React, {useEffect} from 'react';
import "./Dashboard.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTableList} from '@fortawesome/free-solid-svg-icons';
import {Popup} from "../../../../components/MainApp";
import {Button, Modal} from "react-bootstrap";
import useUserData from "../../../../custom-hooks/useUserData";
import {UserDataStatus} from "../../../../app/reducers/userDataSlice";
import {axios} from "../../../../global-imports";

async function AppData() {
    let Response = await axios.get(
        "/api/app/all/me",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
    );
    return Response;
}

function Dashboard() {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalAppName, setModalAppName] = React.useState("");
    const [modalAppUID, setModalAppUID] = React.useState("");
    const [activePopupUID, setActivePopupUID] = React.useState("");
    const [dashboardRows, setDashboardRows] = React.useState<any>([]);
    const [userData, userStatus] = useUserData();

    function deleteButtonCallback(AppName: string, AppUID: string) {
        setModalShow(true);
        setModalAppName(AppName);
        setModalAppUID(AppUID);
    }

    function popupButtonCallback(appUID: string) {
        if (activePopupUID === "" || activePopupUID !== appUID) {
            setActivePopupUID(appUID);
        } else {
            setActivePopupUID("");
        }
    }

    function handleClose() {
        setModalShow(false);
    }

    function startValues() {
        AppData().then(
            data => {
                let newDashboardRows = [];
                if (userData["apps"].length === 0) {
                    newDashboardRows.push(<p className="Warning-Container">
                        <h1>
                            You Have No App
                        </h1>
                        <br/>
                        <Button variant="primary" href="create">
                            Create One
                        </Button>
                    </p>);
                } else {
                    for (var i = 1; i <= userData["apps"].length; i++) {
                        let gameID = userData["apps"][i - 1]
                        let name = data.data[gameID].info.name;
                        newDashboardRows.push(<Popup deleteButtonCallback={deleteButtonCallback}
                                                     appName={`${i.toString()}. ${name}`} appUID={gameID}
                                                     popupButtonCallback={popupButtonCallback}
                                                     activePopupUID={activePopupUID}/>);
                    }
                    ;
                }
                setDashboardRows(newDashboardRows);
            }
        );
    }

    useEffect(
        () => {
            if (userStatus === UserDataStatus.SUCCESS) {
                startValues();
            }
        }, [userStatus, activePopupUID]
    );
    function Delete() {
        axios({method: "delete", url: "/api/app", data: {appUID: modalAppUID}, headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}})
        window.location.href="dashboard"
    }
    return (
        <div className="Background">
            <div className="Black-Outer-Container">
                <h1 className="Title">
                    <FontAwesomeIcon icon={faTableList}/> Dashboard
                </h1>
                <div className="Grid-Container">
                    <div className="Black-Inner-Container">
                        {dashboardRows}
                    </div>
                </div>
            </div>
            <Modal show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this app?</Modal.Title>
                </Modal.Header>
                <Modal.Body>'{modalAppName}' will be lost forever!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => Delete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Dashboard