import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faEye, faPencil, faTrash, faEarth, faLock } from '@fortawesome/free-solid-svg-icons';
import {axios} from "../../global-imports";

interface PopupProps {
  deleteButtonCallback: (appName:string, appUID:string) => void;
  appName: string;
  appUID: string;
  popupButtonCallback: (appUID:string) => void;
  activePopupUID: string;
}

async function getGlobal(UID:string) {
  let Response = await axios.get("/api/app/all/me", {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
  })
  return Response["data"][UID]["isGlobal"];
}

function Popup(props: PopupProps) {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [opacity, setOpacity] = React.useState<any>(["0", "100"]);
  function globalCheck(global:boolean) {
    if (global) {
      setOpacity(["100", "0"]);
    } else {
      setOpacity(["0", "100"]);
    }
  }
  useEffect(
    () => {
        getGlobal(props.appUID).then (
          data => {
            setChecked(data);
            globalCheck(data);
          }
        )
    }, []
  )
  function Switch() {
    let Checked = !checked
    getGlobal(props.appUID).then (
      data => {
        axios.put(
          "/api/app/global",
          {
            uid: props.appUID,
            isGlobal: !data
          }, 
          {
              headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          }
        );
        setChecked(Checked);
        globalCheck(Checked);
      }
    )
  }
  return (
    <div className="Container-Item">
      <div className="Option-Container">
        <label className="switch">
          <input type="checkbox" onClick={() => Switch()} checked={checked}/>
          <span className="slider round">
            <FontAwesomeIcon icon={faEarth} style={{opacity: opacity[0], transition: "0.2s"}}/>
            <FontAwesomeIcon icon={faLock} style={{opacity: opacity[1], transition: "0.2s"}}/>
          </span>
        </label>
        <div>
          {props.appName}
        </div>
        <div className="Popup" onClick={() => props.popupButtonCallback(props.appUID)}>
          <FontAwesomeIcon icon={faListUl}/>
          {(props.activePopupUID === props.appUID) && 
          <div className="Popup-Option">
            <div onClick={() => {window.location.href=`dashboard/view/${props.appUID}`}} className="Popup-Text">
              <FontAwesomeIcon icon={faEye}/> View
            </div>
            <div onClick={() => {window.location.href=`dashboard/edit/${props.appUID}`}} className="Popup-Text">
              <FontAwesomeIcon icon={faPencil}/> Edit
            </div>
            <div className="Popup-Text" onClick={() => props.deleteButtonCallback(props.appName, props.appUID)}>
              <FontAwesomeIcon icon={faTrash}/> Delete
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Popup;