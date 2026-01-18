"use server"

import { cookies } from "next/headers"

export const setCookie = async (name: string, value: string, options?: { maxAge?: number, expires?: Date }) => {
    const parsedCookies = await cookies()
    parsedCookies.set({
        name: name,
        value: value,
        path: "/",
        ...options
    })
}

export const getCookie = async (name: string): Promise<string | undefined> => {
    const isServerSide = typeof window === "undefined"

    if (!isServerSide) {
        const clientCookies = new URLSearchParams(document.cookie.replaceAll(" ", "&"))
        return clientCookies.get(name) ?? undefined
    }

    const parsedCookies = await cookies()
    return parsedCookies.get(name)?.value
}

export const hasCookie = async (name: string): Promise<boolean> => {
    const parsedCookies = await cookies()
    return parsedCookies.has(name)
}

export const deleteCookie = async (name: string) => {
    const parsedCookies = await cookies()
    parsedCookies.delete(name)
}