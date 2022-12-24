import {db} from "../../firebase";
import {verify_request_body} from "../../util/verify_request_body";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";

const __schema_app_create: RequestSchema = {
    type: RequestType.PUT,
    content: {
        uid: RequestBodyDataType.STRING,
        name: RequestBodyDataType.STRING,
        description: RequestBodyDataType.STRING,
        category: RequestBodyDataType.STRING,
        imageName: RequestBodyDataType.STRING,
        imageB64: RequestBodyDataType.STRING,
    },
};

async function edit(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_create)) {
        return;
    }
    let appDoc = db.collection("apps").doc(req.body.uid);
    await appDoc.update({
        info: {
            "name": req.body.name,
            "description": req.body.description,
            "category": req.body.category,
            "imageName": req.body.imageName,
            "imageB64": req.body.imageB64
        }
    });
    res.status(200);
    res.json({message: "Okay!"})
}

export default edit;