import TermsOfUseContent from "@/components/terms-of-use/terms-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.terms_of_use")

  return {
    title: t("title")
  }
}

export default async function TermsOfUsePage() {
  return <TermsOfUseContent />
}