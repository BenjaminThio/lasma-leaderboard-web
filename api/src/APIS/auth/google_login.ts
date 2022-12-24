import {Request, Response} from 'express';
import {LoginResponse} from "../../util/interface/auth";
import {User} from "../../util/interface/firebase/User";
import {generateAccessToken} from "../../util/auth";
import {OAuth2Client} from "google-auth-library";
import {env} from "../../env";
import {db} from "../../firebase";
import {RequestBodyDataType, RequestSchema, RequestType,} from "../../util/interface/RequestSchema";
import {verify_request_body} from "../../util/verify_request_body";

const __schema_google_login: RequestSchema = {
    type: RequestType.POST,
    content: {
        tokenId: RequestBodyDataType.STRING,
        name: RequestBodyDataType.OPTIONAL,
        email: RequestBodyDataType.OPTIONAL,
        imageUrl: RequestBodyDataType.OPTIONAL,
    },
};

const google_login = async (req: Request, res: Response) => {
    let response: LoginResponse = {
        status: false,
    };

    // Verify request body
    if (!verify_request_body(req, res, __schema_google_login)) {
        return;
    }

    // Verify Google ID Token
    let uuid: string;
    try {
        const client = new OAuth2Client(env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        uuid = payload ? payload["sub"] : "";
    } catch (error: any) {
        response.message = "Invalid ID Token";
        res.json(response);
        return;
    }

    // If the token is valid, check if the user is already in the database
    let doc = db.collection("users").doc(uuid);
    let user: User;

    // If the user is not in the database, create a new user
    let existingUser = await doc.get();
    user = existingUser.data() as User;
    if (!user) {
        user = {
            uid: uuid,
            emailVerified: false,
            info: {
                username: req.body.name === undefined ? "" : req.body.name,
                email: req.body.email === undefined ? "" : req.body.email,
                imageB64: "",
            },
            apps: [],
        };
    }
    await doc.set(user);

    response.status = true;
    response.token = generateAccessToken({uuid: uuid});
    res.json(response);
}

export default google_login;