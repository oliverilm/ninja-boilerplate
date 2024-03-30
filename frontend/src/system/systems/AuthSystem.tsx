import { useLayoutEffect } from "react"
import { useUserStore } from "../../store"
import { refreshToken } from "../../api/auth"

export function AuthSystem() {
    const {parseTokens} = useUserStore()

    useLayoutEffect(() => {
        const refresh = localStorage.getItem("refresh")
        if (refresh) {
            refreshToken({ refresh }).then(response => {
                parseTokens(response.data)
            })
        }
    }, [parseTokens])

    return null
}