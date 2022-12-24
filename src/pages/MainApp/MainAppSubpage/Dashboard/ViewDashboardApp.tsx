import React, {useEffect} from 'react';
import "./ViewDashboardApp.css";
import {useParams} from "react-router-dom";
import useUserData from "../../../../custom-hooks/useUserData";
import {UserDataStatus} from "../../../../app/reducers/userDataSlice";
import {axios} from "../../../../global-imports";
import {App} from "../../../../../api/src/util/interface/firebase/App";
import {DashboardAppInfoRow, DashboardAppScoreboardRow} from "../../../../components/MainApp";
import {toast, ToastContainer} from "react-toastify";
import {Button, Modal} from "react-bootstrap";


function ViewDashboardApp() {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [userData, userStatus, userError] = useUserData();
    const [appObject, setAppObject] = React.useState<App | null>(null);
    const [leaderboardRows, setLeaderboardRows] = React.useState<any>([]);
    const [showUserEditModal, setShowUserEditModal] = React.useState(false);
    const [userEditModalActiveUID, setUserEditModalActiveUID] = React.useState("");
    const [userEditModalActiveName, setUserEditModalActiveName] = React.useState("");
    const [userEditModalActiveScore, setUserEditModalActiveScore] = React.useState(0);
    const [userEditModalNewName, setUserEditModalNewName] = React.useState("");
    const [userEditModalNewScore, setUserEditModalNewScore] = React.useState(0);

    let params = useParams();

    function handleEditUserButton(userUID: string, userName: string, userScore: number) {
        setUserEditModalActiveUID(userUID);
        setUserEditModalActiveName(userName);
        setUserEditModalActiveScore(userScore);
        setUserEditModalNewScore(userScore);
        setUserEditModalNewName(userName);
        setShowUserEditModal(true);
    }

    function handleUserEditModalSaveChangesButton() {
        setShowUserEditModal(false);
        axios.put(
            "/api/app/user",
            {
                "appUID": params.appUID,
                "userUID": userEditModalActiveUID,
                "newUsername": userEditModalNewName,
                "newScore": userEditModalNewScore
            },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.token
                }
            }
        ).then(
            (response: any) => {
                let scoreboard = appObject?.scoreboard;
                (scoreboard as any)[userEditModalActiveUID].score = userEditModalNewScore;
                let scoreboardKeys = Object.keys(scoreboard as Object);
                scoreboardKeys.sort((a, b) => {
                    console.log((scoreboard as any)[a].score);
                    console.log((scoreboard as any)[b].score);
                    return (scoreboard as any)[b].score - (scoreboard as any)[a].score;
                });
                let newLeaderboardRows = [];
                for (let i = 0; i < scoreboardKeys.length; i++) {
                    if (scoreboard) {
                        if (scoreboard[scoreboardKeys[i]].uid !== userEditModalActiveUID) {
                            newLeaderboardRows.push(
                                <DashboardAppScoreboardRow
                                    rank={i + 1}
                                    key={scoreboardKeys[i]}
                                    uid={scoreboardKeys[i]}
                                    name={scoreboard[scoreboardKeys[i]].name as string}
                                    score={scoreboard[scoreboardKeys[i]].score as number}
                                    onClickEdit={handleEditUserButton}
                                />
                            );
                        } else {
                            newLeaderboardRows.push(
                                <DashboardAppScoreboardRow
                                    rank={i + 1}
                                    key={scoreboardKeys[i]}
                                    uid={scoreboardKeys[i]}
                                    name={userEditModalNewName}
                                    score={userEditModalNewScore}
                                    onClickEdit={handleEditUserButton}
                                />
                            );
                        }
                    }
                }
                setLeaderboardRows(newLeaderboardRows);
                toast.success("User updated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        ).catch(
            (error: any) => {
                toast.error("An unexpected error occurred", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        );
    }

    useEffect(() => {
        if (userStatus === UserDataStatus.SUCCESS) {
            let apps = userData.apps;
            if (!apps || apps.length === 0) {
                setLoading(false);
                setError(true);
                return;
            }
            if (apps.indexOf(params.appUID) === -1) {
                setLoading(false);
                setError(true);
                return;
            }
            axios.get(
                "/api/app",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    params: {
                        appUID: params.appUID
                    }
                }
            ).then((res: {
                data: {
                    app: any;
                };
            }) => {
                setAppObject(res.data.app);
                let scoreboard = res.data.app.scoreboard;
                let scoreboardKeys = Object.keys(scoreboard as Object);
                scoreboardKeys.sort((a, b) => {
                    return (scoreboard as any)[b].score - (scoreboard as any)[a].score;
                });
                let newLeaderboardRows = [];
                for (let i = 0; i < scoreboardKeys.length; i++) {
                    newLeaderboardRows.push(
                        <DashboardAppScoreboardRow
                            rank={i + 1}
                            key={scoreboardKeys[i]}
                            uid={scoreboardKeys[i]}
                            name={scoreboard[scoreboardKeys[i]].name as string}
                            score={scoreboard[scoreboardKeys[i]].score as number}
                            onClickEdit={handleEditUserButton}
                        />
                    );
                }
                setLeaderboardRows(newLeaderboardRows);
                setLoading(false);
            }).catch((err: any) => {
                console.log(err);
                setLoading(false);
                setError(true);
            });
        } else if (userStatus === "error") {
            setError(true);
        }
    }, [userStatus]);

    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error!</div>;
    } else {
        return (
            <div id="dashboardapp">
                <div id="dashboardapp-header">
                    <div id="dashboardapp-header-title">
                        {appObject?.info.name}
                    </div>
                    <div id="dashboardapp-header-subtitle">
                        {appObject?.info.description}
                    </div>
                </div>
                <div id="dashboardapp-info-container">
                    <DashboardAppInfoRow column1={"App ID:"} column2={(appObject?.uid as string)}/>
                    <DashboardAppInfoRow column1={"API Key:"} column2={(appObject?.apiKey as string)}/>
                </div>
                <div id="dashboardapp-leaderboard">
                    <div id="dashboardapp-leaderboard-title">
                        Scoreboard
                    </div>
                    <div id="dashboardapp-leaderboard-container">
                        {leaderboardRows}
                    </div>
                    <ToastContainer/>
                </div>
                <Modal show={showUserEditModal} onHide={() => setShowUserEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit info for user {setUserEditModalActiveName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="dashboardapp-user-edit-modal-container">
                            <div id="dashboardapp-user-edit-modal-container-name">
                                New name:
                            </div>
                            <input
                                id="dashboardapp-user-edit-modal-container-name-input"
                                type="text"
                                value={userEditModalNewName}
                                onChange={(e: any) => setUserEditModalNewName(e.target.value)}
                            />
                            <div id="dashboardapp-user-edit-modal-container-score">
                                New score:
                            </div>
                            <input
                                id="dashboardapp-user-edit-modal-container-score-input"
                                type="number"
                                value={userEditModalNewScore}
                                onChange={(e: any) => setUserEditModalNewScore(parseInt(e.target.value))}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowUserEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleUserEditModalSaveChangesButton()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ViewDashboardApp;