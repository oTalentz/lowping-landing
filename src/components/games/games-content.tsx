import Navbar from "../nav-bar"
import Footer from "../footer"
import GamesHeader from "./games-header"
import GamesList from "./games-list"
import FAQ from "../faq/faq"
import { getDynamicContent } from "@/services/dynamic-content"
import { MOCK_HOSTING_INFO } from "@/services/mock-data"

export default async function GamesContent() {
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

    const dynamicContent = await getDynamicContent()

    return (
        <>
            <Navbar />
            <GamesHeader />
            <GamesList minecraftPlansStartingInBRL={data.minecraftPlansStartingInBRL} gamesPlansStartingInBRL={data.gamesPlansStartingInBRL} />
            <FAQ category="GAMES" dynamicContent={dynamicContent} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}