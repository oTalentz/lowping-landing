import { DEFAULT_LOCALE, I18nLocale } from "../I18nLocale"

export default interface GamesPlan {
    tier: unknown
    id: number
    tierId: number
    priceBRL: number
    ram: number
    color: string
    secondaryColor: string
    titleByLocale: Record<I18nLocale, string>
    featuresByLocale: Record<I18nLocale, string[]>
    detach: boolean
}

export function getGamesPlanTitle(plan: GamesPlan, locale: I18nLocale): string {
    return plan.titleByLocale[locale] || plan.titleByLocale[DEFAULT_LOCALE]
}

export function getGamesPlanFeatures(plan: GamesPlan, locale: I18nLocale): string[] {
    return plan.featuresByLocale[locale] || plan.featuresByLocale[DEFAULT_LOCALE]
}