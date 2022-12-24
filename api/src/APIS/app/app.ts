import {db} from "../../firebase";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_app_get: RequestSchema = {
    type: RequestType.GET,
    content: {
        appUID: RequestBodyDataType.STRING,
    },
};

function app(req: any, res: any) {

    if (!verify_request_body(req, res, __schema_app_get)) {
        return;
    }

    const appUID = req.query.appUID;
    if (!appUID || appUID.length === 0) {
        res.status(400).send({
            message: "appUID is a required parameter",
        });
        return;
    }

    db.collection("apps").doc(appUID).get().then((doc) => {
        if (!doc.exists) {
            res.status(404).send({
                message: "App not found",
            });
            return;
        }
        if (doc.data().owner !== req.user.uid) {
            res.status(403).send({
                message: "You are not the owner of this app",
            });
            return;
        }
        res.status(200).send({
            app: doc.data(),
        });
    }).catch((err) => {
        res.status(500).send({
            error: "Internal server error",
        });
    });

}

export default app;