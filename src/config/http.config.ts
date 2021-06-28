import { toInteger } from "lodash"
import { HttpOptions } from "../infrastructure/"

const {
    PORT
} = process.env

export const httpConfig: HttpOptions = {
    port: parseInt(PORT) || 3000
}