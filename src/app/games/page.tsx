import GamesContent from "@/components/games/games-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.games")

  return {
    title: t("title")
  }
}

export default async function GamesPage() {
  return <GamesContent />
}