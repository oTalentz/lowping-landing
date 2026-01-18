import { I18nLocale } from "../I18nLocale"
import { DynamicContentType } from "./DynamicContentType"

export interface DynamicContent {
    id: number
    locale: I18nLocale
    type: DynamicContentType
    value: string
}

export function getDynamicContentValue(
    localedContents: DynamicContent[],
    type: DynamicContentType
): string | null {
    const content = localedContents.find((content) => content.type === type)
    return content ? content.value : null
}