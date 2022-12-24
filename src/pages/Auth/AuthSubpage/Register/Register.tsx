import "./Register.css";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {axios} from "../../../../global-imports";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../../../services/Auth";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function Register() {
    const {authed, authLoading} = AuthService();
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    let navigate = useNavigate();

    useEffect(() => {
        if (authed) {
            navigate("/app");
        }
    }, [authed]);

    function onClickLoginButton() {
        console.log("Login button clicked");
        // Validate that the username, email and password are not empty
        if (username === "" || email === "" || password === "") {
            toast.warn("Username, email and password can't be empty 🤬", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Validate that the email is valid
        if (!email.includes("@") || !email.includes(".")) {
            toast.warn("Email is not valid 🤬", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Validate that the password is valid
        if (password.length < 8) {
            toast.warn("Password is not valid, it must be longer than 8 characters 📏", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Send the request to the server at /api/auth/email_register
        axios.post(
            "/api/auth/email_register",
            {
                username: username,
                email: email,
                password: password
            }
        ).then(
            // If the request is successful, save the token in local storage and redirect to the home page
            (response: any) => {
                localStorage.setItem("token", response.data.token);
                navigate("/app", {replace: true});
            }
        ).catch(
            (error: any) => {
                const error_message = error.response.data.message;
                if (error_message === "Firebase: Error (auth/email-already-in-use).") {
                    // Toast that the email is already in use
                    toast.error("This email is already registered with us 🤬 Please sign in instead.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("Something went wrong 😵 Try again?", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        );
    }

    return (
        <div id="login">
            <div id="login-container">
                <div id="login-header">
                    <h2>Register an account</h2>
                </div>
                <div id="login-form">
                    <form>
                        <label className="label" htmlFor="username">Username</label>
                        <InputGroup className="form-input-group">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser}/>
                            </InputGroup.Text>
                            <FormControl id="username" aria-describedby="basic-addon3" placeholder="Username"
                                         value={username}
                                         onChange={(e) => setUsername(e.target.value)}/>
                        </InputGroup>
                        <label className="label" htmlFor="email">Email address</label>
                        <InputGroup className="form-input-group">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </InputGroup.Text>
                            <FormControl id="email" aria-describedby="basic-addon3" placeholder="Email address"
                                         value={email}
                                         onChange={(e) => setEmail(e.target.value)}/>
                        </InputGroup>
                        <label className="label" htmlFor="password">Password</label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faLock}/>
                            </InputGroup.Text>
                            <FormControl id="password" aria-describedby="basic-addon3" placeholder="Password"
                                         type="password" value={password}
                                         onChange={(e) => setPassword(e.target.value)}/>
                        </InputGroup>
                    </form>
                    <div id="login-button-container">
                        <Button variant="primary" type="submit" id="login-button" onClick={() => onClickLoginButton()}>
                            Register
                        </Button>
                    </div>
                </div>
                <div id="sign-up-container">
                    <p id="sign-up-message">Already have an account?</p>
                    <Button variant="link" id="sign-up-button" onClick={() => navigate("/auth/login")}>Sign in</Button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Register;