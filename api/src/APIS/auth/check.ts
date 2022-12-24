import {generateAccessToken} from "../../util/auth";

function check(req: any, res: any) {
    res.json({new_token: generateAccessToken({uid: req.user.uid})});
}

export default check;