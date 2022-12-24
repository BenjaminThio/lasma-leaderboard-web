import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_public_get_user: RequestSchema = {
    type: RequestType.POST,
    content: {
        userUID: RequestBodyDataType.STRING,
        newScore: RequestBodyDataType.ANY,
        appUID: RequestBodyDataType.STRING,
        appSecret: RequestBodyDataType.STRING,
    },
};

function set_score(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_public_get_user)) {
        return;
    }

    // Get request body
    let {userUID, newScore, appUID, appSecret} = req.body;

    // Check if userUID and newScore is empty
    if (!userUID || !newScore || userUID === "") {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    }

    // Check if newScore is a number
    if (isNaN(parseInt(newScore))) {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    } else {
        newScore = parseInt(newScore);
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

        if (!doc.data().scoreboard.hasOwnProperty(userUID)) {
            res.status(404).json({
                message: "User does not exist",
            });
            return;
        }

        // Update score
        db.collection("apps").doc(appUID).set({
            scoreboard: {
                [userUID]: {
                    score: newScore,
                }
            }
        }, {merge: true}).then(
            () => {
                res.status(200).json({
                    message: "Success",
                });
            }
        ).catch(
            () => {
                res.status(404).json({
                    message: "User does not exist",
                });
            }
        );
    }).catch(
        (error) => {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    );
}

export default set_score;