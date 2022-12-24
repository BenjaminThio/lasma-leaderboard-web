import "./Game.css";
import Button from 'react-bootstrap/Button';
import Galaxy from './Galaxy.png';

function Games() {
    return (
        <div className="Height">
            <div className="Games-Background">
                <div className="Games-Container">
                    <div className="Games-Grid-Container">
                        <select className="Games-Input" /*multiple*/>
                            <option>All Category</option>
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
                        <select className="Games-Input">
                            <option>Sort by most player</option>
                            <option>Sort by fewest player</option>
                            <option>Sort by latest added</option>
                            <option>Sort by earliest added</option>
                        </select>
                        <Button variant="primary" href="game/create" style={{margin: "10px"}}>
                            Create Game
                        </Button>
                    </div>
                    <div className="Games-Grid-Container">
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                        <a className="Games-Grid-Item" href="/app/dashboard">
                            <img src={Galaxy} alt="Galaxy" className="Games-IMG"></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games