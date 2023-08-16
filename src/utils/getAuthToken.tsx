import { RootState } from "@/redux/store"

export function getAuthToken(rootState: RootState) {
    const { token } = rootState
    if (token && token?.accessToken) {
        return token.accessToken
    }
    return null
}