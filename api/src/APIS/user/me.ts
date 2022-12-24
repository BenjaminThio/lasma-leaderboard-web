import {db} from "../../firebase";

function me(req: any, res: any) {
    // Fetch user info of user sending request from db
    let doc = db.collection("users").doc(req.user.uid).get();
    // Return user info
    doc.then(function (doc) {
        if (doc.exists) {
            res.json(doc.data());
        } else {
            res.status(404).json({error: "User not found"});
        }
    }).catch(function (error) {
        res.status(500).json({error: error});
    });
}

export default me;