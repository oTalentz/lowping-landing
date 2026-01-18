import FAQ from "../faq/faq"
import Footer from "../footer"
import Navbar from "../nav-bar"
import GenericHeader from "./generic-header"
import GenericGameInfo from "./generic-game-info"
import GameHostingFeatures from "./generic-features"
import { getDynamicContent } from "@/services/dynamic-content"
import { GamePlanSimulation } from "@/types/games/simulation/GamePlanSimulation"
import { MOCK_GAME_PLAN_SIMULATION } from "@/services/mock-data"
import PlanTierType from "@/types/plan/PlanTierType"

type GenericGamePageProps = {
    gameName: string
}

export default async function GenericContent({ gameName }: GenericGamePageProps) {
    const dynamicContent = await getDynamicContent()

    let simulationsByTier: Record<PlanTierType, GamePlanSimulation>

    try {
        // const response = await api.get("/hosting/games/plan-simulation")
        simulationsByTier = MOCK_GAME_PLAN_SIMULATION.simulationsByTier
    } catch (error) {
        console.warn("Failed to fetch game plan simulation, using default values.", error)
        // Mock data
        simulationsByTier = {
            BASIC: {
                id: 1,
                tierType: "BASIC",
                baseRAM: 4,
                maxRAM: 32,
                basePriceBRL: 24.00,
                whmcsPid: 100 // Placeholder
            },
            ADVANCED: {
                id: 3,
                tierType: "ADVANCED",
                baseRAM: 4,
                maxRAM: 32,
                basePriceBRL: 24.00,
                whmcsPid: 102 // Placeholder
            },
            PERFORMANCE: {
                id: 2,
                tierType: "PERFORMANCE",
                baseRAM: 4,
                maxRAM: 32,
                basePriceBRL: 24.00,
                whmcsPid: 101 // Placeholder
            }
        }
    }

    return (
        <>
            <Navbar />
            <GenericHeader gameName={gameName} />
            <GenericGameInfo gameName={gameName} simulationsByTier={simulationsByTier} />
            <GameHostingFeatures />
            <FAQ category="GAMES" dynamicContent={dynamicContent} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}