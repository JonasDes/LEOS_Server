import { DiveraOptions } from '../application/plugins/divera'

const {
    DIVERA_SOCKET_URL,
    DIVERA_BASE_URL,
    DIVERA_ACCESSKEY
} = process.env

export const diveraConfig: DiveraOptions = {
    socket: {
        url: DIVERA_SOCKET_URL ?? 'https://ws.divera247.com/',
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5
    },
    baseurl: DIVERA_BASE_URL ?? 'https://divera247.com/api/',
    accesskey: DIVERA_ACCESSKEY,
}