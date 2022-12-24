import {db} from "../../firebase";

function all_me(req: any, res: any) {
    // Fetch all apps from db
    let apps: { [key: string]: object } = {};
    const userUID = req.user.uid;
    let doc = db.collection("apps").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data();
                if (data.owner === userUID) {
                    apps[doc.id] = {
                        uid: doc.id,
                        owner: data.owner,
                        info: data.info,
                        isGlobal: data.isGlobal,
                        scoreboard: data.scoreboard,
                    };
                }
            });
            res.json(apps);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

export default all_me;