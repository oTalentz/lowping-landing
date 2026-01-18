import VPSContent from "@/components/vps/vps-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.vps")

  return {
    title: t("title")
  }
}

export default async function VPSPage() {
  return <VPSContent />
}