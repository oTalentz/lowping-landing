import { ComplianceType } from "@/types/ComplianceType"
import { I18nLocale } from "@/types/I18nLocale"

type TermsOfServiceProps = {
    data: {
        type: ComplianceType,
        locale: I18nLocale,
        contentHTML: string,
        lastEditAt: string
    }
}

export default async function TermsOfService({ data }: TermsOfServiceProps) {
    return (
        <div className="text-white text-xl px-4 md:px-32 mt-32">
            <div dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
        </div>
    )
}