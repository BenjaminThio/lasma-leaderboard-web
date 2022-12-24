import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_public_get_user: RequestSchema = {
    type: RequestType.POST,
    content: {
        userUID: RequestBodyDataType.STRING,
        appUID: RequestBodyDataType.STRING,
        appSecret: RequestBodyDataType.STRING,
    },
};

function get_user(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_public_get_user)) {
        return;
    }

    // Get request body
    const {userUID, appUID, appSecret} = req.body;

    // Check if userUID is empty
    if (userUID === "" || !userUID) {
        res.status(400).send({
            error: "userUID is empty",
        });
        return;
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

        db.collection("apps").doc(appUID).get().then((doc) => {
            const app = doc.data();
            const scoreboard = app.scoreboard;
            const user = scoreboard[userUID];

            //Verify if user exists in scoreboard
            if (!user) {
                res.status(404).json({
                    message: "User does not exist",
                });
                return;
            }

            // Calculate user's rank out of all users
            let rank = 1;
            for (const uid in scoreboard) {
                if (scoreboard[uid].score > user.score) {
                    rank++;
                }
            }
            if (user) {
                res.status(200).json({
                    message: "Success",
                    user: {
                        ...user,
                        rank: rank
                    },
                });
            } else {
                res.status(404).json({
                    message: "User does not exist",
                });
            }
        });
    });
}

export default get_user;