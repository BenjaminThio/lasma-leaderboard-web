import {v4} from 'uuid';
import {db} from "../../firebase";
import {App} from "../../util/interface/firebase/App";
import {verify_request_body} from "../../util/verify_request_body";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import generate_token from "../../util/generate_token";

const __schema_app_create: RequestSchema = {
    type: RequestType.POST,
    content: {
        name: RequestBodyDataType.STRING,
        description: RequestBodyDataType.STRING,
        category: RequestBodyDataType.STRING,
        imageName: RequestBodyDataType.STRING,
        imageB64: RequestBodyDataType.STRING
    },
};

async function create(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_create)) {
        return;
    }
    let uid = v4();
    let apiKey = await generate_token();
    let appDoc = db.collection("apps").doc(uid);
    let userDoc = db.collection("users").doc(req.user.uid);
    let app: App;
    app = {
        uid: uid,
        owner: req.user.uid,
        apiKey: (apiKey as string),
        info: {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            imageName: req.body.imageName,
            imageB64: req.body.imageB64
        },
        scoreboard: {},
        isGlobal: false
    }
    await appDoc.set(app);
    var admin = require('firebase-admin');
    await userDoc.update({
        apps: admin.firestore.FieldValue.arrayUnion(uid)
    });
    res.status(200);
    res.json({message: "App created successfully"});
}

export default create;