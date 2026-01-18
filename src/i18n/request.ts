import { getCookie } from "@/lib/cookies"
import { getRequestConfig, GetRequestConfigParams } from "next-intl/server"

const supportedLocales = process.env.NEXT_PUBLIC_AVAILABLE_LOCALES!!.split(',')

export default getRequestConfig(async (req: GetRequestConfigParams) => {
    let locale =
        (await getCookie("i18n@locale"))?.toString() ||
        req.requestLocale.toString() ||
        (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string)

    if (!supportedLocales.includes(locale)) {
        locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string
    }

    return {
        locale,
        messages: (await import(`../../public/translations/${locale}.json`)).default
    }
})