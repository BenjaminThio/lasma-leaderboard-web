import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";

const __schema_app_create: RequestSchema = {
    type: RequestType.PUT,
    content: {
        uid: RequestBodyDataType.STRING,
        isGlobal: RequestBodyDataType.BOOLEAN,
    },
};

async function global(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_create)) {
        return;
    }
    let appDoc = db.collection("apps").doc(req.body.uid);
    await appDoc.update({
        isGlobal: req.body.isGlobal
    });
    res.status(200).json({
        message: "App global status updated"
    });
}

export default global;