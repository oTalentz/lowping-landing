// Imports of packages
import { getLocale, getTranslations } from "next-intl/server"

// Import of the project
import { ComplianceType } from "@/types/ComplianceType"
import { I18nLocale } from "@/types/I18nLocale"

type TermsOfServiceHeaderProps = {
    data: {
        type: ComplianceType,
        locale: I18nLocale,
        contentHTML: string,
        lastEditAt: string
    }
}

export default async function TermsOfServiceHeader({ data }: TermsOfServiceHeaderProps) {
    const t = await getTranslations("terms_of_use.header")
    const locale = await getLocale()

    return (
        <div className="relative w-full h-72 flex justify-center items-center bg-gradient-to-b" style={{ backgroundImage: 'linear-gradient(180deg, rgba(7,57,99,1) 0%, rgba(0,0,0,1) 100%)' }}>
            <h1 className="text-white absolute bottom-8 text-6xl">
                {t("title")}
            </h1>
            <p className="text-white/80 absolute bottom-0 opacity text-lg">
                {t.rich("last_edit_text", {
                    date_hour: new Date(data.lastEditAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                })}
            </p>
        </div>

    )
}