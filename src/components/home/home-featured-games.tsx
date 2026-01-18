import Link from "next/link"
import GameCard from "../games/game-card"
import { getTranslations } from "next-intl/server"
import { MOCK_HOSTING_INFO } from "@/services/mock-data"

export default async function ChooseGameHome() {
    const t = await getTranslations("home.choose_game")

    let data = {
        minecraftPlansStartingInBRL: 0,
        gamesPlansStartingInBRL: 0
    }

    try {
        // const response = await api.get("/hosting/info")
        // data = response.data as {
        //     minecraftPlansStartingInBRL: number
        //     gamesPlansStartingInBRL: number
        // }
        data = MOCK_HOSTING_INFO
    } catch (error) {
        console.warn("Failed to fetch hosting info, using default values.", error)
    }

    return (
        <div className="w-full px-4 md:px-16 flex flex-col items-center justify-center mb-20">
            <h2 className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent">
                {t("description")}
            </h2>
            <h1 className="text-white text-[2.5rem] leading-[36px]">
                {t("title")}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <GameCard
                    name="Minecraft"
                    image="/images/games/minecraft.jpg"
                    firstPlanPrice={data.minecraftPlansStartingInBRL}
                    href="/minecraft"
                />
                <GameCard
                    name="Terraria"
                    image="/images/games/terraria.jpg"
                    firstPlanPrice={data.gamesPlansStartingInBRL}
                    href={"/games"}
                />
                <GameCard
                    name="Counter-Strike 2"
                    image="/images/games/cs2.jpg"
                    firstPlanPrice={data.gamesPlansStartingInBRL}
                    href="/games"
                />
                <GameCard
                    name="Rust"
                    image="/images/games/rust.jpg"
                    firstPlanPrice={data.gamesPlansStartingInBRL}
                    href="/games"
                />
            </div>

            <Link
                href="/games"
                aria-label={t("see_more_games_button.aria_label")}
                className="w-fit h-fit text-white text-xl bg-blue-500 px-2 rounded-md border-2 border-blue-300 transition duration-300 ease-in-out hover:-translate-y-0.5 mt-8"
            >
                {t("see_more_games_button.text")}
            </Link>
        </div>
    )
}