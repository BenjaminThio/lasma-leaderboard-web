import express from "express";
import * as api from "./APIS";
import {verifyRequestAuthorization} from "./util/auth";
import path from "path";
import {initializeApp} from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvOC96ZzRFFbq02BJdr3rbW0ZYvrHNY0I",
    authDomain: "lasma-leaderboard.firebaseapp.com",
    projectId: "lasma-leaderboard",
    storageBucket: "lasma-leaderboard.appspot.com",
    messagingSenderId: "937798847250",
    appId: "1:937798847250:web:d94b9f881ef371701781cb"
};

var unless = function (path: any, middleware: (arg0: any, arg1: any, arg2: any) => any) {
    return function (req: { url: any; }, res: any, next: () => any) {
        // Get the first segment of the URL path
        try {
            var firstSegment = req.url.split('/')[1];
            if (path !== firstSegment) {
                return next();
            } else {
                return middleware(req, res, next);
            }
        } catch (e) {
            return next();
        }
    }
};


// ======================================
// Initialization
// ======================================

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
// Initialize Firebase
initializeApp(firebaseConfig);

// ======================================
// ======================================

// Use bodyParser middleware to get form data in json
app.use(bodyParser.urlencoded({extended: false, limit: "10mb"}));
app.use(bodyParser.json({limit: "10mb"}));

// ======================================
// API Routes (Open)
// ======================================

app.post("/api", (req: any, res: any) => {
    res.send("Welcome to lasma leaderboard web API");
});

// ======================================
// Authentication routes
// ======================================

app.post('/api/auth/google_login', api.auth.google_login);

app.post('/api/auth/email_login', api.auth.email_login);

app.post('/api/auth/email_register', api.auth.email_register);

// ======================================
// Public API routes
// ======================================

app.get('/api/public/', api.public_api.public_get);

app.post('/api/public/add_user', api.public_api.add_user);

app.post('/api/public/get_user', api.public_api.get_user);

app.post('/api/public/get_all_users', api.public_api.get_all_users);

app.post('/api/public/set_score', api.public_api.set_score);

// ======================================
// App info routes
// ======================================

app.get('/api/app/all', api.app.all);

// ======================================
// ======================================

// Make sure the response recieved from the endpoints after this line is properly authorized.
// See Express > Middleware
app.use(unless('api', verifyRequestAuthorization));

// ======================================
// API Routes (Protected)
// ======================================

// Allow login checks
app.post("/api/auth/check", api.auth.check);

// ======================================
// App routes
// ======================================

app.get('/api/app', api.app.app);

app.get('/api/app/all/me', api.app.all_me);

app.delete('/api/app', api.app.app_delete);

app.post('/api/app/create', api.app.create);

app.put('/api/app/edit', api.app.edit);

app.put('/api/app/global', api.app.global);

app.put('/api/app/key', api.app.key_put);

app.put('/api/app/user', api.app.user_put);

app.delete('/api/app/user', api.app.user_delete);

// ======================================
// User routes
// ======================================

app.get('/api/user/me', api.user.me);

app.put('/api/user/me', api.user.me_put);

app.delete('/api/user/me', api.user.me_delete);

// ======================================
// ======================================

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../build/')))

app.get("*", function (req, res) {
    //when we get an http get request to the root/homepage
    res.sendFile(path.join(__dirname + '/../../build/index.html'))
});

// Start Express server
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
