import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";
import {db} from "../../firebase";

const __schema_app_user_put: RequestSchema = {
    type: RequestType.PUT,
    content: {
        appUID: RequestBodyDataType.STRING,
        userUID: RequestBodyDataType.STRING,
        newUsername: RequestBodyDataType.OPTIONAL_STRING,
        newScore: RequestBodyDataType.OPTIONAL_NUMBER,
    },
};

async function user_put(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_user_put)) {
        return;
    }

    const appUID = req.body.appUID;
    const userUID = req.body.userUID;

    // Ensure the app and app user exists
    const app_ref = db.collection("apps").doc(appUID);
    const app_doc = await app_ref.get();
    if (!app_doc.exists) {
        res.status(404).json({
            message: "App not found",
        });
        return;
    }

    // Make sure the requesting user is the app owner
    if (req.user.uid !== app_doc.data().owner) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    
    if (!app_doc.data().scoreboard.hasOwnProperty(userUID)) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }

    if ((req.body.newUsername !== undefined && req.body.newScore !== undefined) && (req.body.newUsername !== "" || req.body.newScore !== "")) {
        const newUsername = req.body.newUsername;
        const newScore = req.body.newScore;

        await db.collection("apps").doc(appUID).set({
            scoreboard: {
                [userUID]: {
                    name: newUsername,
                    score: newScore,
                }
            }
        }, {merge: true});
    } else if (req.body.newUsername !== undefined && req.body.newUsername !== "") {
        const newUsername = req.body.newUsername;

        await db.collection("apps").doc(appUID).set({
            scoreboard: {
                [userUID]: {
                    name: newUsername,
                }
            }
        }, {merge: true});
    } else if (req.body.newScore !== undefined && req.body.newScore !== "") {
        const newScore = req.body.newScore;

        await db.collection("apps").doc(appUID).set({
            scoreboard: {
                [userUID]: {
                    score: newScore,
                }
            }
        }, {merge: true});
    } else {
        res.status(400).json({
            message: "Bad request",
        });
        return;
    }
    res.status(200).json({
        message: "Success",
    });
}

export default user_put;