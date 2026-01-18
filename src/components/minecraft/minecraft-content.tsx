import Navbar from "../nav-bar"
import MinecraftHeader from "./minecraft-header"
import Footer from "../footer"
import MinecraftPricing from "./pricing/minecraft-pricing"
import MinecraftFeatures from "./minecraft-features"
import PlanLocation from "@/types/plan/PlanLocation"
import PlanTier from "@/types/plan/PlanTier"
import MinecraftPlan from "@/types/plan/MinecraftPlan"
import FAQ from "../faq/faq"
import { getDynamicContent } from "@/services/dynamic-content"
import { MOCK_MINECRAFT_DATA } from "@/services/mock-data"
import PlanTierType from "@/types/plan/PlanTierType"

export default async function MinecraftContent() {
    let data = {
        locations: [] as PlanLocation[],
        tiers: [] as PlanTier[],
        plans: [] as MinecraftPlan[]
    }

    try {
        // const response = await api.get("/hosting/minecraft/plans")
        // data = response.data as {
        //     locations: PlanLocation[]
        //     tiers: PlanTier[]
        //     plans: MinecraftPlan[]
        // }
        data = MOCK_MINECRAFT_DATA
    } catch (error) {
        console.warn("Failed to fetch minecraft plans, using default values.", error)

        // Mock data for fallback
        data.locations = [
            {
                id: 2,
                product: "MINECRAFT",
                countryCode: "US",
                ipAddress: null,
                countryNameByLocale: { PT_BR: "Estados Unidos", EN_US: "United States", ES_ES: "Estados Unidos" },
                cityNameByLocale: { PT_BR: "Miami", EN_US: "Miami", ES_ES: "Miami" },
                descriptionByLocale: { PT_BR: "Ping ~120-140", EN_US: "Ping ~120-140", ES_ES: "Ping ~120-140" },
                detach: false
            }
        ]

        data.tiers = [
            {
                id: 2,
                type: "ADVANCED" as PlanTierType,
                locationId: 2,
                titleByLocale: { PT_BR: "Performance", EN_US: "Performance", ES_ES: "Performance" },
                descriptionByLocale: { PT_BR: "Ryzen 9 9900X", EN_US: "Ryzen 9 9900X", ES_ES: "Ryzen 9 9900X" },
                detach: false
            }
        ]

        data.plans = []

        // Miami Plans
        for (let ram = 4; ram <= 32; ram += 4) {
            const k = ram / 4;
            data.plans.push({
                id: ram + 100, // Offset ID to avoid conflict
                tierId: 2,
                priceBRL: ram * 6,
                ram: ram,
                color: "#60a5fa",
                secondaryColor: "#2563eb",
                iconURL: "https://i.imgur.com/i3djCY2.png",
                externalURL: null,
                titleByLocale: { PT_BR: `Plano ${ram}GB`, EN_US: `${ram}GB Plan`, ES_ES: `Plan ${ram}GB` },
                featuresByLocale: {
                    PT_BR: [
                        `${ram}GB de RAM`,
                        `${k} vCPU (Ryzen 9 9900X)`,
                        `${k * 16}GB de Armazenamento`,
                        `${k} Servidor${k > 1 ? 'es' : ''} Adicional${k > 1 ? 'is' : ''}`,
                        `${k} Backups Off Site`,
                        `${k * 2} Alocações (portas)`,
                        `${k} Proxy Reverso`,
                        `${k * 2} Banco de Dados`
                    ],
                    EN_US: [
                        `${ram}GB RAM`,
                        `${k} vCPU (Ryzen 9 9900X)`,
                        `${k * 16}GB Storage`,
                        `${k} Additional Server${k > 1 ? 's' : ''}`,
                        `${k} Off-Site Backups`,
                        `${k * 2} Allocations (ports)`,
                        `${k} Reverse Proxy`,
                        `${k * 2} Databases`
                    ],
                    ES_ES: [
                        `${ram}GB de RAM`,
                        `${k} vCPU (Ryzen 9 9900X)`,
                        `${k * 16}GB de Almacenamiento`,
                        `${k} Servidor${k > 1 ? 'es' : ''} Adicional${k > 1 ? 'es' : ''}`,
                        `${k} Backups Off Site`,
                        `${k * 2} Asignaciones (puertos)`,
                        `${k} Proxy Inverso`,
                        `${k * 2} Bases de Datos`
                    ]
                },
                detach: ram === 8
            })
        }
    }

    const dynamicContent = await getDynamicContent()

    return (
        <>
            <Navbar />
            <MinecraftHeader />
            <MinecraftPricing locations={data.locations} tiers={data.tiers} plans={data.plans} />
            <MinecraftFeatures />
            <FAQ category="MINECRAFT" dynamicContent={dynamicContent} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}