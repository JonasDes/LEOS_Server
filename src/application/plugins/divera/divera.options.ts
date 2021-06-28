export interface DiveraOptions {
    socket: {
        url: string
        autoConnect: boolean
        reconnection: boolean
        reconnectionAttempts: number
        reconnectionDelay: number
        reconnectionDelayMax: number
        randomizationFactor: number
    },
    baseurl: string,
    accesskey: string
}
