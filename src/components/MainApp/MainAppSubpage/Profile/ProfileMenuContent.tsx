import React, {ChangeEvent, useEffect} from "react";
import "./ProfileMenuContent.css";
import {menuOptions} from "../../../../pages/MainApp/MainAppSubpage/Profile/Profile";
import useUserData from "../../../../custom-hooks/useUserData";
import {UserDataStatus} from "../../../../app/reducers/userDataSlice";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {axios} from "../../../../global-imports";
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera, faPencil} from "@fortawesome/free-solid-svg-icons";

interface ProfileMenuContentProps {
    activeMenuOption: menuOptions;
}

function ProfileMenuContent(props: ProfileMenuContentProps) {
    const [userData, userStatus, userError] = useUserData();
    const [username, setUsername] = React.useState("");
    const [newUsername, setNewUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [userProfilePicture, setUserProfilePicture] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus === UserDataStatus.SUCCESS) {
            setUsername(userData.info.username);
            setEmail(userData.info.email);
            if (userData.info.imageB64 !== "") {
                setUserProfilePicture(userData.info.imageB64);
            } else {
                setUserProfilePicture("https://i1.sndcdn.com/artworks-836qq6hDQpf2NtW6-yizCUw-t500x500.jpg");
            }
        }
    }, [userData, userStatus]);

    useEffect(() => {
        if (userError) {
            toast.error(userError);
        }
    }, [userError]);

    function handleChangeNameButton() {
        axios.put(
            "/api/user/me",
            {
                username: newUsername
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        ).then(() => {
            setShow(false);
            setUsername(newUsername);
            toast.success(
                "Username changed successfully!",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }
            );
        }).catch(() => {
            setShow(false);
            toast.error(
                "Username change failed!",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }
            );
        });
    }

    function handleUserPictureClick() {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    function getBase64(file: Blob, cb: (arg0: string | ArrayBuffer | null) => void) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            getBase64(e.target.files[0], (base64: string | ArrayBuffer | null) => {
                axios.put(
                    "/api/user/me",
                    {
                        imageB64: base64
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(() => {
                    setUserProfilePicture(base64 as string);
                    toast.success(
                        "Profile picture changed successfully!",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        }
                    );
                }).catch(() => {
                    toast.error(
                        "Profile picture change failed!",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        }
                    );
                });
            });
        }
    }

    if (props.activeMenuOption === menuOptions.PROFILE) {
        return (
            <>
                <div id="profile-menu-content-container">
                    <div id="profile-menu-content-container-user">
                        <div id="profile-menu-content-container-user-picture" onClick={() => handleUserPictureClick()}>
                            <img
                                src={userProfilePicture}
                                alt="profile-picture"/>
                            <div id="profile-picture-change-button">
                                <FontAwesomeIcon icon={faCamera}/>
                            </div>
                        </div>
                        <div id="profile-menu-content-container-user-username">
                            <h1>{username}</h1>
                            <div id="profile-menu-content-container-user-infochange-button">
                                <Button variant="outline-dark" onClick={() => {
                                    setShow(true);
                                    setNewUsername(username);
                                }}>
                                    <FontAwesomeIcon icon={faPencil}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="profile-menu-content-container-email">
                        <div>Your current email: {email}</div>
                        <p>Ability to change email coming soon™️...</p>
                    </div>
                </div>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change your username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="change-username-input">
                            <label>Username:</label>
                            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => {
                            setShow(false);
                            handleChangeNameButton();
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer/>
                <input type="file" id="profile-menu-content-container-user-picture-input" accept="image/jpeg"
                       ref={inputRef} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileInputChange(e)}/>
            </>
        )
    } else if (props.activeMenuOption === menuOptions.SETTINGS) {
        return (
            <>
                <div id="settings-menu-content-container">
                    Settings coming soon™️...
                </div>
            </>
        )
    } else if (props.activeMenuOption === menuOptions.KEYS) {
        return (
            <>
                <div id="keys-menu-content-container">
                    Keys coming soon™️...
                </div>
            </>
        )
    } else if (props.activeMenuOption === menuOptions.LOGOUT) {
        return (
            <>
                <div id="logout-menu-content-container">
                    <div id="logout-menu-content-container-text">
                        Click the button below to log out of your account.
                    </div>
                    <div id="logout-menu-content-container-logout-button">
                        <Button variant="danger" onClick={() => {
                            navigate("/auth/logout")
                        }}>Logout</Button>
                    </div>
                </div>
            </>
        )
    } else if (props.activeMenuOption === menuOptions.DELETE) {
        return (
            <>
                <div id="logout-menu-content-container">
                    <div id="logout-menu-content-container-text">
                        Click the button below to DELETE YOUR ACCOUNT PERMANENTLY. This includes all your apps and api
                        keys. This action cannot be undone. PLEASE PROCEED WITH CAUTION.
                    </div>
                    <div id="logout-menu-content-container-logout-button">
                        <Button variant="danger" onClick={() => {
                            axios({
                                method: "DELETE",
                                url: "/api/user/me",
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                }
                            }).then(() => {
                                navigate("/auth/logout");
                            }).catch(() => {
                                toast.error("An error occurred while deleting your account. Please try again later.", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            })
                        }}>Delete</Button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div>
                An unexpected error occurred.
            </div>
        )
    }
}


export default ProfileMenuContent