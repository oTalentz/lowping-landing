import { I18nLocale } from "../I18nLocale"
import { FAQCategory } from "./FAQCategory"

export interface FAQItem {
    locale: I18nLocale
    category: FAQCategory
    question: string
    answer: string
}