// Imports of packages
import { getLocale } from "next-intl/server"

// Import of the project
import Navbar from "../nav-bar"
import Footer from "../footer"
import TermsOfService from "./terms-of-use"
import TermsOfServiceHeader from "./terms-of-use-header"
import { ComplianceType } from "@/types/ComplianceType"
import { I18nLocale, getI18nLocale } from "@/types/I18nLocale"
import { getDynamicContent } from "@/services/dynamic-content"
import { MOCK_COMPLIANCE_CONTENT } from "@/services/mock-data"

const COMPLIANCE_TYPE: ComplianceType = "TERMS_OF_USE"

export default async function TermsOfUseContent() {
    const locale = await getLocale()
    const i18nLocale = getI18nLocale(locale)
    const mockData = MOCK_COMPLIANCE_CONTENT[COMPLIANCE_TYPE][i18nLocale]

    const data = {
        type: COMPLIANCE_TYPE,
        locale: i18nLocale,
        contentHTML: mockData.contentHTML,
        lastEditAt: mockData.lastEditAt
    }

    const dynamicContent = await getDynamicContent()

    return (
        <>
            <Navbar />
            <TermsOfServiceHeader data={data} />
            <TermsOfService data={data} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}