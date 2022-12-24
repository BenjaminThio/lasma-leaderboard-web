import * as jwt from "jsonwebtoken";
import {env} from "../env";

function generateAccessToken(obj: object) {
    return jwt.sign(obj, env.API_SECRET as string, {expiresIn: "30d"});
}

function verifyRequestAuthorization(req: any, res: any, next: any) {
    if (!req.headers.authorization) {
        return res.status(403).json({message: "Missing token"});
    }

    const bearer = req.headers.authorization.split(" ");
    const bearerToken = bearer[1];

    let user;
    try {
        user = jwt.verify(bearerToken, env.API_SECRET as string);
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({message: "Token expired"});
        }
        return res.status(403).json({message: "Invalid token"});
    }

    req.user = user;
    next();
}

export {generateAccessToken, verifyRequestAuthorization};
