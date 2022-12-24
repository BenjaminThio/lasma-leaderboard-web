import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";
import {v4} from "uuid";

const __schema_public_add_user: RequestSchema = {
    type: RequestType.POST,
    content: {
        name: RequestBodyDataType.STRING,
        appUID: RequestBodyDataType.STRING,
        appSecret: RequestBodyDataType.STRING,
        initialScore: RequestBodyDataType.OPTIONAL_STRING
    },
};

function add_user(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_public_add_user)) {
        return;
    }

    // Get request body
    const {name, appUID, appSecret} = req.body;

    // Check if name is empty
    if (name === "" || !name) {
        res.status(400).json({
            message: "Name is empty",
        });
        return;
    }

    // Check if initialScore is a valid number
    if (req.body.initialScore) {
        if (isNaN(Number(req.body.initialScore))) {
            res.status(400).json({
                message: "Initial score is not a valid number",
            });
            return;
        } else {
            req.body.initialScore = Number(req.body.initialScore);
        }
    }

    // Verify if app exists in database
    db.collection("apps").doc(appUID).get().then((doc) => {
        if (!doc.exists) {
            res.status(404).json({
                message: "App does not exist",
            });
            return;
        }

        // Verify if app secret is correct
        if (doc.data().apiKey !== appSecret) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }

        const userUID = v4();
        db.collection("apps").doc(appUID).set({
            scoreboard: {
                [userUID]: {
                    score: req.body.initialScore || 0,
                    name: name,
                    uid: userUID,
                }
            }
        }, {merge: true}).then(() => {
            res.status(200).json({
                message: "User added",
                userUID: userUID
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        });
    });
}

export default add_user;