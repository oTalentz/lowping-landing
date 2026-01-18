import { DEFAULT_LOCALE, getI18nLocale, I18nLocale } from "../I18nLocale"
import PlanTierType from "./PlanTierType"

export default interface PlanTier {
    id: number
    type: PlanTierType
    locationId: number
    titleByLocale: Record<I18nLocale, string>
    descriptionByLocale: Record<I18nLocale, string>
    detach: boolean
}

export function getPlanTierTitle(tier: PlanTier, locale: I18nLocale) {
    return tier.titleByLocale[locale] || tier.titleByLocale[DEFAULT_LOCALE]
}

export function getPlanTierTitle2(tier: PlanTier, localeCode: string) {
    return tier.titleByLocale[getI18nLocale(localeCode)] || tier.titleByLocale[DEFAULT_LOCALE]
}

export function getPlanTierDescription(tier: PlanTier, locale: I18nLocale) {
    return tier.descriptionByLocale[locale] || tier.descriptionByLocale[DEFAULT_LOCALE]
}

export function getPlanTierDescription2(tier: PlanTier, localeCode: string) {
    return tier.descriptionByLocale[getI18nLocale(localeCode)] || tier.descriptionByLocale[DEFAULT_LOCALE]
}