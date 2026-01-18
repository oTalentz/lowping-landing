import { getCookie } from "@/lib/cookies"
import { getRequestConfig, GetRequestConfigParams } from "next-intl/server"

const supportedLocales = (process.env.NEXT_PUBLIC_AVAILABLE_LOCALES || 'en-US,es-ES,pt-BR').split(',')

export default getRequestConfig(async (req: GetRequestConfigParams) => {
    let locale =
        (await getCookie("i18n@locale"))?.toString() ||
        req.requestLocale?.toString() ||
        (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string) || 'pt-BR'

    if (!locale || !supportedLocales.includes(locale)) {
        locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string || 'pt-BR'
    }

    return {
        locale,
        messages: (await import(`../../public/translations/${locale}.json`)).default
    }
})