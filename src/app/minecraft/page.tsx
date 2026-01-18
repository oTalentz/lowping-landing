import MinecraftContent from "@/components/minecraft/minecraft-content"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.minecraft")

  return {
    title: t("title")
  }
}

export default async function MinecraftPage() {
  return <MinecraftContent />
}