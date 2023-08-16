import { FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query"

export const handlingErrorResponse = (error: FetchBaseQueryError, meta: FetchBaseQueryMeta | undefined, arg: any | undefined) => {
    if (error.status === 'FETCH_ERROR') {
        return {
            ...error,
            data: {
                isError: true,
                message: "Failed to fetch."
            }
        }
    } else if (error.status === 404) {
        return {
            ...error,
            data: {
                isError: true,
                message: "The requested resource does not exist."
            }
        }
    }
    return error
}