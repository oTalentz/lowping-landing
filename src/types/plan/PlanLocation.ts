import { DEFAULT_LOCALE, getI18nLocale, I18nLocale } from "../I18nLocale"

export default interface PlanLocation {
    id: number
    product: ProductType
    countryCode: string
    ipAddress: string | null
    countryNameByLocale: Record<I18nLocale, string>
    cityNameByLocale: Record<I18nLocale, string>
    descriptionByLocale: Record<I18nLocale, string>
    detach: boolean
}

export function getPlanLocationCountryName(location: PlanLocation, locale: I18nLocale) {
    return location.countryNameByLocale[locale] || location.countryNameByLocale[DEFAULT_LOCALE]
}

export function getPlanLocationCountryName2(location: PlanLocation, localeCode: string) {
    return location.countryNameByLocale[getI18nLocale(localeCode)] || location.countryNameByLocale[DEFAULT_LOCALE]
}

export function getPlanLocationCityName(location: PlanLocation, locale: I18nLocale) {
    return location.cityNameByLocale[locale] || location.cityNameByLocale[DEFAULT_LOCALE]
}

export function getPlanLocationCityName2(location: PlanLocation, localeCode: string) {
    return location.cityNameByLocale[getI18nLocale(localeCode)] || location.cityNameByLocale[DEFAULT_LOCALE]
}

export function getPlanLocationDescription(location: PlanLocation, locale: I18nLocale) {
    return location.descriptionByLocale[locale] || location.descriptionByLocale[DEFAULT_LOCALE]
}

export function getPlanLocationDescription2(location: PlanLocation, localeCode: string) {
    return location.descriptionByLocale[getI18nLocale(localeCode)] || location.descriptionByLocale[DEFAULT_LOCALE]
}