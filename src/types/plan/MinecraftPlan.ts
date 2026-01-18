import { DEFAULT_LOCALE, getI18nLocale, I18nLocale } from "../I18nLocale"

export default interface MinecraftPlan {
    id: number
    tierId: number
    priceBRL: number
    ram: number
    color: string
    secondaryColor: string
    iconURL: string | null
    externalURL: string | null
    titleByLocale: Record<I18nLocale, string>
    featuresByLocale: Record<I18nLocale, string[]>
    detach: boolean
}

export function getMinecraftPlanTitle(plan: MinecraftPlan, locale: I18nLocale): string {
    return plan.titleByLocale[locale] || plan.titleByLocale[DEFAULT_LOCALE]
}

export function getMinecraftPlanTitle2(plan: MinecraftPlan, localeCode: string): string {
    return plan.titleByLocale[getI18nLocale(localeCode)] || plan.titleByLocale[DEFAULT_LOCALE]
}

export function getMinecraftPlanFeatures(plan: MinecraftPlan, locale: I18nLocale): string[] {
    return plan.featuresByLocale[locale] || plan.featuresByLocale[DEFAULT_LOCALE]
}

export function getMinecraftPlanFeatures2(plan: MinecraftPlan, localeCode: string): string[] {
    return plan.featuresByLocale[getI18nLocale(localeCode)] || plan.featuresByLocale[DEFAULT_LOCALE]
}