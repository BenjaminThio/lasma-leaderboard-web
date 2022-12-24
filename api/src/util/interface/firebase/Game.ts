export interface Game {
    uid: string
    owner: string
    info: {
        name: string
        category: "action" | "adventure" | "arcade" | "card" | "educational" |
            "fiction" | "fighting" | "platformer" | "puzzle" | "racing" | "rhythm" |
            "rpg" | "shooter" | "simulation" | "sports" | "strategy" | "survival" | "vn" | "other"
    }
    scoreboard: {
        [uid: string]: {
            score: number
        }
    }
    users: {
        [uid: string]: {
            name: string
            email: string
            password: string
        }
    }
}