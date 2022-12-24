import {generateAccessToken} from "../../util/auth";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";
import {env} from "../../env";

const __schema_email_login: RequestSchema = {
    type: RequestType.POST,
    content: {
        email: RequestBodyDataType.STRING,
        password: RequestBodyDataType.STRING,
    },
};

function email_login(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_email_login)) {
        return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in
            const uid = userCredential.user.uid;
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

export default email_login;