import {db} from "../../firebase";

function all(req: any, res: any) {
    // Fetch all apps from db
    let apps: { [key: string]: object } = {};
    let doc = db.collection("apps").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data();
                if (data.isGlobal) {
                    let newScoreboard: { [key: string]: object } = {};
                    for (let key in data.scoreboard) {
                        newScoreboard[data.scoreboard[key].name] = {
                            name: data.scoreboard[key].name,
                            score: data.scoreboard[key].score,
                        };
                    }
                    apps[doc.id] = {
                        uid: doc.id,
                        owner: data.owner,
                        info: data.info,
                        isGlobal: data.isGlobal,
                        scoreboard: newScoreboard,
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

export default all;