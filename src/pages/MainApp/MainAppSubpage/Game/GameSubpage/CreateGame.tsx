import "./Game.css";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function CreateGame() {
    return (
        <div className="Height">
            <div className="Background">
                <div className="Container">
                    <h2 className="Center">
                        <FontAwesomeIcon icon={faPlusCircle}/> Create New Game
                    </h2>
                    <div className="InnerContainer">
                        <p>
                            <label htmlFor="GameName">Game Name</label>
                            <br/>
                            <input type="text" className="Input" id="GameName" placeholder="Type a name here!"></input>
                        </p>
                        <p>
                            <label htmlFor="GameDescription">Game Description</label>
                            <br/>
                            <textarea className="Input" id="GameDescription" style={{resize: "none"}} placeholder="Describe your game here!"></textarea>
                        </p>
                        <p>
                            <label htmlFor="GameCategory">Game Category</label>
                            <br/>
                            <select className="Input" id="GameCategory"/*multiple*/>
                                <option>Action</option>
                                <option>Adventure</option>
                                <option>Arcade</option>
                                <option>Card Game</option>
                                <option>Educational</option>
                                <option>Fiction</option>
                                <option>Fighting</option>
                                <option>Platformer</option>
                                <option>Puzzle</option>
                                <option>Racing</option>
                                <option>Rhythm</option>
                                <option>Role Playing</option>
                                <option>Shooter</option>
                                <option>Simulation</option>
                                <option>Sports</option>
                                <option>Strategy</option>
                                <option>Survival</option>
                                <option>Visual Novel</option>
                                <option>Other</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="GameThumbnail">Game Thumbnail</label>
                            <br/>
                            <input type="file" className="Input" id="GameThumbnail"></input>
                        </p>
                        <Button variant="primary" href="" className="MarginTop">
                            Add Game
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateGame