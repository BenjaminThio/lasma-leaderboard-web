export interface User {
    uid: string
    emailVerified: boolean
    info: {
        username: string
        email: string
        imageB64: string
    }
    apps: string[]
}