import React from "react";
import "./Home.css";
import Button from 'react-bootstrap/Button';
import {HomeNavbar} from "../../components/Home";

function Home() {
    return (
        <div id="home">
            <HomeNavbar/>
            <div id="home-content">
                <div className="black-border" id="home-content-jumbotron">
                    <h1>Welcome to Lasma Leaderboard</h1>
                    <p>
                        Our goal is to provide an easy to use and free leaderboard service for app developers to
                        quickly setup a leaderboard for their app without having to go through the hassle of setting
                        up a backend.
                    </p>
                </div>
                <div className="black-border" id="home-content-demovideo">
                    <div id="home-content-demovideo-iframecontainer">
                        <iframe src="https://www.youtube.com/embed/2RlTqFtdlH8" allowFullScreen={true}/>
                    </div>
                </div>
                <div className="black-border" id="home-content-instructions">
                    <div id="home-content-instructions-title">
                        Ready to get started?
                    </div>
                    <div id="home-content-instructions-container">
                        <div id="home-content-instructions-container-title">
                            <h2>Step 1</h2>
                        </div>
                        <div id="home-content-instructions-container-content">
                            <p>
                                Create an account on our website and login to your account.
                            </p>
                            <Button variant="primary" href="/login">
                                Login
                            </Button>
                        </div>
                        <div id="home-content-instructions-container-image">
                            <img src="https://i.ytimg.com/vi/G8WJ6f52lKg/maxresdefault.jpg"/>
                        </div>

                    </div>
                    <div id="home-content-instructions-container">
                        <div id="home-content-instructions-container-title">
                            <h2>Step 2</h2>
                        </div>
                        <div id="home-content-instructions-container-content">
                            <p>
                                Create a app and add a leaderboard to it.
                            </p>
                            <Button variant="primary" href="app/create">
                                Create App
                            </Button>
                        </div>
                        <div id="home-content-instructions-container-image">
                            <img src="https://i.ytimg.com/vi/Xk2PSDMoTg0/maxresdefault.jpg"/>
                        </div>
                    </div>
                    <div id="home-content-instructions-container">
                        <div id="home-content-instructions-container-title">
                            <h2>Step 3</h2>
                        </div>
                        <div id="home-content-instructions-container-content">
                            <p>
                                Add a new leaderboard to your app.
                            </p>
                            <Button variant="primary" href="/leaderboards/create">
                                Create Leaderboard
                            </Button>
                        </div>
                        <div id="home-content-instructions-container-image">
                            <img
                                src={"https://c.ndtvimg.com/2019-12/44hqqd8o_boris-johnson-wins-uk-elections" +
                                "-afp-650_650x400_13_December_19.jpg?im=Resize=(1230,900)"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
