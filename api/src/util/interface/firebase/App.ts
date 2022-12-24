export interface App {
    uid: string
    owner: string
    apiKey: string
    info: {
        name: string
        description: string
        category: "educational" | "lifestyle" | "social media" | "productivity" | "entertainment" |
            "game" | "other"
        imageName: string,
        imageB64: string
    }
    scoreboard: {
        [uid: string]: {
            score: number
            name: string
            uid: string
        }
    }
    isGlobal: false
}