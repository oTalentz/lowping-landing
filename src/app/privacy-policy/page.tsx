import { PrivacyPolicyContent } from "@/components/privacy-policy/privacy-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.privacy_policy")

  return {
    title: t("title")
  }
}

export default async function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}