import "./Login.css";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {axios} from "../../../../global-imports";
import {Navigate, useNavigate} from "react-router-dom";
import {AuthService} from "../../../../services/Auth";

function Login() {
    const {authed, authLoading} = AuthService();
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
        // Validate that the email and password are not empty
        if (email === "" || password === "") {
            toast.warn("Email and password can't be empty 🤬", {
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

        // Send the request to the server at /api/auth/email_login
        axios.post(
            "/api/auth/email_login",
            {
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
                if (error_message === "Firebase: Error (auth/user-not-found).") {
                    // Toast that either the email or password is incorrect
                    toast.error("Either the email or password is incorrect ❌", {
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
                    <h2>Log in to your account</h2>
                </div>
                <div id="login-form">
                    <form>
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
                        <div id="forgot-password">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </form>
                    <div id="login-button-container">
                        <Button variant="primary" type="submit" id="login-button" onClick={() => onClickLoginButton()}>
                            Log in
                        </Button>
                    </div>
                </div>
                <div id="sign-up-container">
                    <p id="sign-up-message">Don't have an account?</p>
                    <Button variant="link" id="sign-up-button" onClick={() => navigate("/auth/register")}>Sign
                        up</Button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Login;