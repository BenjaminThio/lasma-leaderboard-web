import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";
import {db} from "../../firebase";
import * as admin from 'firebase-admin';

const __schema_app_user_delete: RequestSchema = {
    type: RequestType.PUT,
    content: {
        appUID: RequestBodyDataType.STRING,
        userUID: RequestBodyDataType.STRING,
    },
};

async function user_delete(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_user_delete)) {
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

    // Delete the user from the app
    await app_ref.update({
        [`scoreboard.${userUID}`]: admin.firestore.FieldValue.delete(),
    });

    res.status(200).json({
        message: "Success",
    });
}

export default user_delete;