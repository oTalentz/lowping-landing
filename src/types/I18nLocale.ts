export type I18nLocale = "PT_BR" | "EN_US" | "ES_ES"

export const DEFAULT_LOCALE: I18nLocale = "EN_US"

export function getI18nLocale(localeCode: string): I18nLocale {
    switch (localeCode) {
        case "pt-BR":
            return "PT_BR"
        case "en-US":
            return "EN_US"
        case "es-ES":
            return "ES_ES"
        default:
            return DEFAULT_LOCALE
    }
}