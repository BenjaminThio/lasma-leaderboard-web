import {db} from "../../firebase";
import * as admin from 'firebase-admin';

function me_delete(req: any, res: any) {
    // Fetch user info of user sending request from db
    let doc = db.collection("users").doc(req.user.uid).get();

    // Delete user from db
    doc.then(function (doc) {
        if (doc.exists) {
            // Delete all apps belonging to user
            db.collection("apps").where("owner", "==", req.user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
            db.collection("users").doc(req.user.uid).delete();
            admin.auth().deleteUser(req.user.uid)
                .then(function () {
                    res.status(200).json({
                        message: "User deleted"
                    });
                })
                .catch(function (error) {
                    res.status(500).json({
                        message: "Error deleting user"
                    });
                });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }).catch(function (error) {
        res.status(500).json({
            message: "Error deleting user"
        });
    });
}

export default me_delete;