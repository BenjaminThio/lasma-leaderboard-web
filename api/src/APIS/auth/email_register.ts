import {generateAccessToken} from "../../util/auth";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";
import {db} from "../../firebase";
import {User} from "../../util/interface/firebase/User";

const __schema_email_register: RequestSchema = {
    type: RequestType.POST,
    content: {
        email: RequestBodyDataType.STRING,
        password: RequestBodyDataType.STRING,
        username: RequestBodyDataType.STRING,
    },
};

function email_register(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_email_register)) {
        return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(async (userCredential) => {
            // Signed in
            const uid = userCredential.user.uid;
            let doc = db.collection("users").doc(uid);
            let user: User;
            user = {
                uid: uid,
                emailVerified: false,
                info: {
                    username: req.body.username,
                    email: req.body.email,
                    imageB64: "",
                },
                apps: []
            };
            await doc.set(user);

            const token = generateAccessToken({uid: uid});
            res.status(200).send({
                token: token,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).send({
                message: errorMessage,
            });
        });
}

export default email_register;