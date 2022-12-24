import "./App.css";
import React, {ChangeEvent} from 'react';
import Button from 'react-bootstrap/Button';
import {axios} from "../../../../../global-imports";
import {toast, ToastContainer} from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function CreateApp() {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
    const [imageName, setImageName] = React.useState("No file chosen");
    const [category, setCategory] = React.useState("Educational");
    const [nameColor, setNameColor] = React.useState(["1px solid #ced4da", "none"]);
    const [descriptionColor, setDescriptionColor] = React.useState(["1px solid #ced4da", "none"]);
    const [imageColor, setImageColor] = React.useState(["1px solid #ced4da", "none"]);
    
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
    function imageInputHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImageName(e.target.files[0].name);
            getBase64(e.target.files[0], (base64: string | ArrayBuffer | null) => {
                setImage(base64 as string);
            })
        }
    }

    function addApp() {
        setNameColor(["1px solid #ced4da", "none"]);
        setDescriptionColor(["1px solid #ced4da", "none"]);
        setImageColor(["1px solid #ced4da", "none"]);
        if (name !== "" && description !== "" && image !== "") {
            axios.post(
                "/api/app/create",
                {
                    name: name,
                    description: description,
                    category: category,
                    imageName: imageName,
                    imageB64: image
                }, 
                {
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            window.location.href="/app/dashboard"
        } else {
            if (name === "") {
                setNameColor(["2px solid Red", "0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 0, 0, 0.19)"])
            }
            if (description === "") {
                setDescriptionColor(["2px solid Red", "0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 0, 0, 0.19)"])
            }
            if (image === "") {
                setImageColor(["2px solid Red", "0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 0, 0, 0.19)"])
            }
            toast.error("Please fill up all the required form!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    }
    return (
        <div className="Height">
            <div className="Background">
                <div className="Container">
                    <h2 className="Center">
                        <FontAwesomeIcon icon={faPlusCircle}/> Create New App
                    </h2>
                    <div className="InnerContainer">
                        <p>
                            <label>App Name</label>
                            <br/>
                            <input type="text" className="Input" id="AppName" placeholder="Type a name here!" onChange={e => setName(e.target.value)} style={{border: `${nameColor[0]}`, boxShadow: `${nameColor[1]}`}}></input>
                        </p>
                        <p>
                            <label>App Description</label>
                            <br/>
                            <textarea className="Input" id="AppDescription" style={{resize: "none", border: `${descriptionColor[0]}`, boxShadow: `${descriptionColor[1]}`}} placeholder="Describe your app here!" onChange={e => setDescription(e.target.value)}></textarea>
                        </p>
                        <p>
                            <label>App Category</label>
                            <br/>
                            <select className="Input" id="AppCategory" onChange={e => setCategory(e.target.value)} /*multiple*/>
                                <option>Educational</option>
                                <option>Lifestyle</option>
                                <option>Social media</option>
                                <option>Productivity</option>
                                <option>Entertainment</option>
                                <option>Game</option>
                                <option>Other</option>
                            </select>
                        </p>
                        <p>
                            <label>App Thumbnail</label>
                            <br/>
                            {(image !== "") && <img src={image} alt="EditPicture" style={{borderRadius: "10px", width: "500px", height: "300px"}}/>}
                            <input type="file" id="AppThumbnail" accept="image/jpeg" onChange={(e: ChangeEvent<HTMLInputElement>) => imageInputHandler(e)} style={{display: "none"}}></input>
                            <label htmlFor="AppThumbnail" className="Input" style={{border: `${imageColor[0]}`, boxShadow: `${imageColor[1]}`, display: "flex", cursor: "pointer"}}>
                                <div style={{backgroundColor: "lightgrey", borderRadius: "3px", padding: "5px", border: "1px solid grey"}}>
                                    Choose File
                                </div>
                                <div style={{padding: "5px"}}>
                                    {imageName}
                                </div>
                            </label>
                        </p>
                        <Button variant="primary" className="MarginTop" onClick={() => addApp()}>
                            Create App
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default CreateApp