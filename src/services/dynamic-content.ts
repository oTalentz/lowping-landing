import { DynamicContent } from "@/types/dynamic-content/DynamicContent"
import { getLocale } from "next-intl/server"
import { MOCK_DYNAMIC_CONTENT } from "./mock-data"
import { getI18nLocale } from "@/types/I18nLocale"

export async function getDynamicContent(): Promise<DynamicContent[]> {
    try {
        const locale = await getLocale()
        const i18nLocale = getI18nLocale(locale)

        return MOCK_DYNAMIC_CONTENT.filter(c => c.locale === i18nLocale)
    } catch (error) {
        console.warn("Failed to fetch dynamic content, returning empty array.", error)
        return []
    }
}