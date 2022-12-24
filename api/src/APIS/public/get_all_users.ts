import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_public_get_all_users: RequestSchema = {
    type: RequestType.POST,
    content: {
        appUID: RequestBodyDataType.STRING,
        appSecret: RequestBodyDataType.STRING,
    },
};

function get_all_users(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_public_get_all_users)) {
        return;
    }

    // Get request body
    const {appUID, appSecret} = req.body;

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

            // Calculate all user ranks
            const users = Object.keys(app.scoreboard).map((uid) => {
                const user = app.scoreboard[uid];
                user.rank = Object.keys(app.scoreboard).filter((u) => app.scoreboard[u].score > user.score).length + 1;
                return user;
            });
            res.status(200).json({
                all_users: users,
            });
        });
    });
}

export default get_all_users;