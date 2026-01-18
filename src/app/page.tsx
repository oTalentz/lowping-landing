import HomeContent from "@/components/home/home-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.home")

  return {
    title: t("title")
  }
}

export default async function HomePage() {
  return <HomeContent />
}