import {db} from "../../firebase";

function all(req: any, res: any) {
    // Fetch all games from db
    let games: { [key: string]: object } = {};
    let doc = db.collection("games").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data();
                let newScoreboard: { [key: string]: object } = {};
                for (let key in data.scoreboard) {
                    newScoreboard[key] = {
                        name: data.users[key].name,
                        score: data.scoreboard[key].score,
                    };
                }
                games[doc.id] = {
                    uid: doc.id,
                    owner: data.owner,
                    info: data.info,
                    scoreboard: newScoreboard,
                };
            });
            res.json(games);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

export default all;