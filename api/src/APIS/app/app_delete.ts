import {db} from "../../firebase";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_app_delete: RequestSchema = {
    type: RequestType.DELETE,
    content: {
        appUID: RequestBodyDataType.STRING,
    },
};

function app_delete(req: any, res: any) {

    if (!verify_request_body(req, res, __schema_app_delete)) {
        return;
    }

    const appUID = req.body.appUID;
    
    db.collection("apps").doc(appUID).get().then((doc) => {
        if (!doc.exists) {
            res.status(404).send({
                message: "App not found",
            });
            return;
        }
        if (doc.data().owner !== req.user.uid) {
            res.status(401).send({
                message: "Unauthorized",
            });
            return;
        }
        doc.ref.delete().then(() => {
            var admin = require('firebase-admin');
            db.collection("users").doc(req.user.uid).update(
                {
                    apps: admin.firestore.FieldValue.arrayRemove(appUID)
                }
            );
            res.status(200).send({
                message: "App deleted",
            });
        }).catch((error) => {
            res.status(500).send({
                message: "Error deleting app"
            });
        });
    });

}

export default app_delete;