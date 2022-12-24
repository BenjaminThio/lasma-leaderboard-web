import {db} from "../../firebase";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_new_user_info: RequestSchema = {
    type: RequestType.POST,
    content: {
        username: RequestBodyDataType.STRING,
    },
};

function put(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_new_user_info)) {
        return;
    }

    // Fetch user info of user sending request from db
    let doc = db.collection("users").doc(req.user.uid).get();
    doc.then(function (doc) {
        if (doc.exists) {
            // Update user info
            db.collection("users").doc(req.user.uid).update({
                info: {
                    ...doc.data().info,
                    username: req.body.username,
                }
            });

            // Send response
            res.status(200).send({
                status: "success",
                message: "User info updated",
            });
        } else {
            // Send response
            res.status(400).send({
                status: "error",
                message: "User not found",
            });
        }
    }).catch(function (error) {
        // Send response
        res.status(500).send({
            status: "error",
            message: "Internal server error",
        });
    });
}

export default put;