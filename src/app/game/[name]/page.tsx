import GenericContent from "@/components/game/generic-content"
import { games } from "@/types/games/Game"
import { Metadata } from "next"

type GenerateMatadataProps = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: GenerateMatadataProps): Promise<Metadata> {
  const { name } = await params

  // Find the game from the games list based on the slug
  const game = games.find(game => game.slug === name.toLowerCase().trim())

  return {
    title: game?.name
  }
}

type GameProps = {
  params: Promise<{ name: string }>
}

export default async function GamePage({ params }: GameProps) {
  const { name } = await params

  return <GenericContent gameName={name} />
}