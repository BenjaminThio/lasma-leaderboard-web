import {db} from "../../firebase";
import {App} from "../../util/interface/firebase/App";
import {verify_request_body} from "../../util/verify_request_body";
import {RequestBodyDataType, RequestSchema, RequestType} from "../../util/interface/RequestSchema";
import generate_token from "../../util/generate_token";

const __schema_app_key_put: RequestSchema = {
    type: RequestType.PUT,
    content: {
        appUID: RequestBodyDataType.STRING,
    },
};

async function key_put(req: any, res: any) {
    if (!verify_request_body(req, res, __schema_app_key_put)) {
        return;
    }

    const appUID = req.query.appUID;
    if (!appUID || appUID.length === 0) {
        res.status(400).send({
            error: "appUID is required as a parameter",
        });
        return;
    }
    const app = await db.collection('apps').doc(appUID).get();
    if (!app.exists) {
        res.status(404).send({
            error: 'App not found',
        });
        return;
    }
    const appData = app.data() as App;
    if (appData.owner === req.user.uid) {
        const newApiKey = await generate_token(appUID);
        await db.collection('apps').doc(appUID).update({
            apiKey: newApiKey,
        });
        res.status(200).json(
            {
                message: 'Success',
                newApiKey: newApiKey,
            }
        );
        return;
    } else {
        res.status(401).send({
            message: "Unauthorized",
        });
        return;
    }
}

export default key_put;