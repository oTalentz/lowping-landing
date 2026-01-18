import { DynamicContent } from "@/types/dynamic-content/DynamicContent"
import { Feedback } from "@/types/Feedback"
import { GamePlanSimulation } from "@/types/games/simulation/GamePlanSimulation"
import { FAQItem } from "@/types/faq/FAQItem"
import PlanLocation from "@/types/plan/PlanLocation"
import PlanTier from "@/types/plan/PlanTier"
import MinecraftPlan from "@/types/plan/MinecraftPlan"
import VPSPlan from "@/types/plan/vps/VPSPlan"
import { ComplianceType } from "@/types/ComplianceType"
import { I18nLocale } from "@/types/I18nLocale"

export const MOCK_DYNAMIC_CONTENT: DynamicContent[] = [
    { id: 1, locale: "PT_BR", type: "DISCORD_INVITE_URL", value: "https://discord.gg/apFUEw4zyv" },
    { id: 2, locale: "EN_US", type: "DISCORD_INVITE_URL", value: "https://discord.gg/apFUEw4zyv" },
    { id: 3, locale: "ES_ES", type: "DISCORD_INVITE_URL", value: "https://discord.gg/apFUEw4zyv" },
    { id: 4, locale: "PT_BR", type: "WHATSAPP_CHAT_URL", value: "https://wa.me/5511999999999" },
    { id: 5, locale: "EN_US", type: "WHATSAPP_CHAT_URL", value: "https://wa.me/5511999999999" },
    { id: 6, locale: "ES_ES", type: "WHATSAPP_CHAT_URL", value: "https://wa.me/5511999999999" },
    { id: 7, locale: "PT_BR", type: "EMAIL_ADDRESS", value: "suporte@lowping.com.br" },
    { id: 8, locale: "EN_US", type: "EMAIL_ADDRESS", value: "support@lowping.com.br" },
    { id: 9, locale: "ES_ES", type: "EMAIL_ADDRESS", value: "soporte@lowping.com.br" },
    { id: 10, locale: "PT_BR", type: "SITE_SUPPORT_URL", value: "https://suporte.lowping.com.br" },
    { id: 11, locale: "EN_US", type: "SITE_SUPPORT_URL", value: "https://support.lowping.com.br" },
    { id: 12, locale: "ES_ES", type: "SITE_SUPPORT_URL", value: "https://soporte.lowping.com.br" },
    { id: 13, locale: "PT_BR", type: "CUSTOMER_AREA_URL", value: "https://financeiro.lowping.com.br" },
    { id: 14, locale: "EN_US", type: "CUSTOMER_AREA_URL", value: "https://financeiro.lowping.com.br" },
    { id: 15, locale: "ES_ES", type: "CUSTOMER_AREA_URL", value: "https://financeiro.lowping.com.br" },
]

export const MOCK_HOSTING_INFO = {
    minecraftPlansStartingInBRL: 24.00,
    gamesPlansStartingInBRL: 24.00
}

export const MOCK_FEEDBACKS: Feedback[] = [
    {
        id: 1,
        customerName: "João Silva",
        customerAvatarURL: "/images/customers/leo.png",
        stars: 5,
        comment: "Excelente ping e suporte rápido!"
    },
    {
        id: 2,
        customerName: "Maria Souza",
        customerAvatarURL: "/images/customers/white.gif",
        stars: 5,
        comment: "Melhor host que já usei para meu servidor de Minecraft."
    },
    {
        id: 3,
        customerName: "Pedro Santos",
        customerAvatarURL: "/images/customers/leo.png",
        stars: 4,
        comment: "Bom preço e estabilidade."
    },
    {
        id: 4,
        customerName: "Ana Costa",
        customerAvatarURL: "/images/customers/white.gif",
        stars: 5,
        comment: "Suporte muito atencioso, resolveram meu problema em minutos."
    }
]

export const MOCK_FEEDBACK_LIST = {
    totalCount: 150,
    averageRating: 4.8,
    feedbacks: MOCK_FEEDBACKS
}

export const MOCK_GAME_PLAN_SIMULATION: { simulationsByTier: Record<string, GamePlanSimulation> } = {
    simulationsByTier: {
        BASIC: {
            id: 1,
            tierType: "BASIC",
            baseRAM: 4,
            maxRAM: 32,
            basePriceBRL: 24.00,
            whmcsPid: 100
        },
        ADVANCED: {
            id: 3,
            tierType: "ADVANCED",
            baseRAM: 4,
            maxRAM: 32,
            basePriceBRL: 24.00,
            whmcsPid: 102
        },
        PERFORMANCE: {
            id: 2,
            tierType: "PERFORMANCE",
            baseRAM: 4,
            maxRAM: 32,
            basePriceBRL: 24.00,
            whmcsPid: 101
        }
    }
}

export const MOCK_FAQS: FAQItem[] = []

export const MOCK_LOCATIONS: PlanLocation[] = [
    {
        id: 2,
        product: "MINECRAFT",
        countryCode: "us",
        ipAddress: null,
        countryNameByLocale: { "PT_BR": "Estados Unidos", "EN_US": "United States", "ES_ES": "Estados Unidos" },
        cityNameByLocale: { "PT_BR": "Miami", "EN_US": "Miami", "ES_ES": "Miami" },
        descriptionByLocale: { "PT_BR": "Ping ~120-140", "EN_US": "Ping ~120-140", "ES_ES": "Ping ~120-140" },
        detach: false
    },
    {
        id: 3,
        product: "VPS",
        countryCode: "br",
        ipAddress: null,
        countryNameByLocale: { "PT_BR": "Brasil", "EN_US": "Brazil", "ES_ES": "Brasil" },
        cityNameByLocale: { "PT_BR": "São Paulo", "EN_US": "São Paulo", "ES_ES": "São Paulo" },
        descriptionByLocale: { "PT_BR": "Ping ~10-20", "EN_US": "Ping ~10-20", "ES_ES": "Ping ~10-20" },
        detach: false
    }
]

export const MOCK_TIERS: PlanTier[] = [
    {
        id: 2,
        type: "ADVANCED",
        locationId: 2,
        titleByLocale: { "PT_BR": "Performance", "EN_US": "Performance", "ES_ES": "Performance" },
        descriptionByLocale: { "PT_BR": "Ryzen 9 9900X", "EN_US": "Ryzen 9 9900X", "ES_ES": "Ryzen 9 9900X" },
        detach: false
    },
    {
        id: 3,
        type: "PERFORMANCE",
        locationId: 3,
        titleByLocale: { "PT_BR": "VPS Premium", "EN_US": "Premium VPS", "ES_ES": "VPS Premium" },
        descriptionByLocale: { "PT_BR": "Intel Xeon", "EN_US": "Intel Xeon", "ES_ES": "Intel Xeon" },
        detach: false
    }
]

// Generate Minecraft plans
const minecraftPlans: MinecraftPlan[] = []
for (let ram = 4; ram <= 32; ram += 4) {
    const k = ram / 4
    minecraftPlans.push({
        id: ram + 100,
        tierId: 2,
        priceBRL: ram * 6,
        ram: ram,
        color: "#60a5fa",
        secondaryColor: "#2563eb",
        iconURL: "https://i.imgur.com/i3djCY2.png",
        externalURL: null,
        titleByLocale: { "PT_BR": `Plano ${ram}GB`, "EN_US": `${ram}GB Plan`, "ES_ES": `Plan ${ram}GB` },
        featuresByLocale: {
            "PT_BR": [
                `${ram}GB de RAM`,
                `${k} vCPU (Ryzen 9 9900X)`,
                `${k * 16}GB de Armazenamento`,
                `${k} Servidor${k > 1 ? 'es' : ''} Adicional${k > 1 ? 'is' : ''}`,
                `${k} Backups Off Site`,
                `${k * 2} Alocações (portas)`,
                `${k} Proxy Reverso`,
                `${k * 2} Banco de Dados`
            ],
            "EN_US": [
                `${ram}GB RAM`,
                `${k} vCPU (Ryzen 9 9900X)`,
                `${k * 16}GB Storage`,
                `${k} Additional Server${k > 1 ? 's' : ''}`,
                `${k} Off-Site Backups`,
                `${k * 2} Allocations (ports)`,
                `${k} Reverse Proxy`,
                `${k * 2} Databases`
            ],
            "ES_ES": [
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

export const MOCK_MINECRAFT_DATA = {
    locations: MOCK_LOCATIONS.filter(l => l.product === "MINECRAFT"),
    tiers: MOCK_TIERS.filter(t => t.locationId === 2),
    plans: minecraftPlans
}

export const MOCK_VPS_PLANS: VPSPlan[] = []

export const MOCK_VPS_DATA = {
    locations: MOCK_LOCATIONS.filter(l => l.product === "VPS"),
    tiers: MOCK_TIERS.filter(t => t.locationId === 3),
    plans: MOCK_VPS_PLANS
}

export const MOCK_COMPLIANCE_CONTENT: Record<ComplianceType, Record<I18nLocale, { contentHTML: string, lastEditAt: string }>> = {
    "PRIVACY_POLICY": {
        "PT_BR": { contentHTML: "<p>Política de Privacidade (Mock)</p>", lastEditAt: "2024-01-01" },
        "EN_US": { contentHTML: "<p>Privacy Policy (Mock)</p>", lastEditAt: "2024-01-01" },
        "ES_ES": { contentHTML: "<p>Política de Privacidad (Mock)</p>", lastEditAt: "2024-01-01" }
    },
    "TERMS_OF_USE": {
        "PT_BR": { contentHTML: "<p>Termos de Uso (Mock)</p>", lastEditAt: "2024-01-01" },
        "EN_US": { contentHTML: "<p>Terms of Use (Mock)</p>", lastEditAt: "2024-01-01" },
        "ES_ES": { contentHTML: "<p>Términos de Uso (Mock)</p>", lastEditAt: "2024-01-01" }
    }
}
