import { Response } from "../types"

export const initResponse = <T>(): Response<T> => {
    return {
        data: undefined,
        error: undefined,
        success: false,
        message: undefined,
    }
}
