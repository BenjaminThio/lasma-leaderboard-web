import {db} from "../../firebase";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_new_user_info: RequestSchema = {
    type: RequestType.PUT,
    content: {
        username: RequestBodyDataType.OPTIONAL_STRING,
        imageB64: RequestBodyDataType.OPTIONAL_STRING,
    },
};

function me_put(req: any, res: any) {
    // Verify request body
    if (!verify_request_body(req, res, __schema_new_user_info)) {
        return;
    }

    if (req.body.username === undefined && req.body.imageB64 === undefined) {
        res.status(400).json({
            message: "No data to update",
        });
        return;
    }
    // Fetch user info of user sending request from db
    let doc = db.collection("users").doc(req.user.uid).get();
    doc.then(function (doc) {
        if (doc.exists) {
            if (req.body.username !== undefined && req.body.imageB64 !== undefined) {
                doc.ref.set({
                    info: {
                        username: req.body.username,
                        imageB64: req.body.imageB64,
                    }
                }, {merge: true});
            } else if (req.body.username !== undefined) {
                doc.ref.set({
                    info: {
                        username: req.body.username,
                    }
                }, {merge: true});
            } else if (req.body.imageB64 !== undefined) {
                doc.ref.set({
                    info: {
                        imageB64: req.body.imageB64,
                    }
                }, {merge: true});
            }
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

export default me_put;