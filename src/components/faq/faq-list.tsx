// Imports of packages
import { getLocale } from "next-intl/server"

// Import of the project
import FAQSearch from "./faq-search"
import { FAQCategory } from "@/types/faq/FAQCategory"
import { FAQItem } from "@/types/faq/FAQItem"
import { MOCK_FAQS } from "@/services/mock-data"

type FAQProps = {
    category: FAQCategory
}

export default async function FAQList({ category }: FAQProps) {
    const locale = await getLocale()

    const data = {
        faqs: [] as FAQItem[]
    }

    try {
        // const response = await api.get(`/i18n/${locale}/faq`)
        // data = response.data as {
        //     faqs: FAQItem[]
        // }
        data.faqs = [...MOCK_FAQS]
    } catch (error) {
        console.warn("Failed to fetch FAQs, using default values.", error)
    }

    // Adiciona FAQ fixo de reembolso
    const refundQuestion = locale === "pt-BR" ? "Como funciona o reembolso?" :
        locale === "es-ES" ? "¿Cómo funciona el reembolso?" :
            "How does the refund work?";

    const refundAnswer = locale === "pt-BR" ? "Garantimos reembolso integral em até 7 dias caso não esteja satisfeito. Para solicitar, basta entrar em contato com nosso suporte." :
        locale === "es-ES" ? "Garantizamos el reembolso completo dentro de los 7 días si no está satisfecho. Para solicitarlo, contacte a nuestro soporte." :
            "We guarantee a full refund within 7 days if you are not satisfied. To request it, simply contact our support team.";

    data.faqs.push({
        locale: getI18nLocale(locale),
        category: category,
        question: refundQuestion,
        answer: refundAnswer
    });

    // Adiciona FAQ fixo de Suporte aos Jogos
    const supportQuestion = locale === "pt-BR" ? "Como funciona o suporte aos jogos?" :
        locale === "es-ES" ? "¿Cómo funciona el soporte para juegos?" :
            "How does game support work?";

    const supportAnswer = locale === "pt-BR" ? "Oferecemos suporte especializado (Premium) para servidores de Minecraft. Para outros jogos, garantimos suporte básico focado na estabilidade da infraestrutura." :
        locale === "es-ES" ? "Ofrecemos soporte especializado (Premium) para servidores de Minecraft. Para otros juegos, brindamos soporte básico enfocado en la estabilidad de la infraestructura." :
            "We offer specialized (Premium) support for Minecraft servers. For other games, we provide basic support focused on infrastructure stability.";

    data.faqs.push({
        locale: getI18nLocale(locale),
        category: category,
        question: supportQuestion,
        answer: supportAnswer
    });

    // Adiciona FAQ fixo sobre jogos aceitos
    const gamesQuestion = locale === "pt-BR" ? "Quantos e quais jogos são aceitos na LowPing?" :
        locale === "es-ES" ? "¿Cuántos y qué juegos se aceptan en LowPing?" :
            "How many and which games are accepted at LowPing?";

    const gamesList = [
        "Java Minecraft", "Space Engineers Torch", "Factorio (Standard, Automatic Mod Update, Clusterio)",
        "Terraria (tModLoader, t-shock, Vanilla)", "Ark: Survival Evolved", "Ark: Survival Ascended",
        "V Rising BepInEx", "Valheim (Plus Mod, BepInEx, Vanilla)", "Rust (Autowipe, Staging)",
        "Counter-Strike 2", "Satisfactory", "Palworld (Standard, Proton Mod Support)",
        "Minecraft Bedrock (GoMint, Liteloader, Nukkit, PocketmineMP, Vanilla, Vanilla ARM64)"
    ];

    const gamesAnswer = locale === "pt-BR" ? `Atualmente aceitamos ${gamesList.length} variações de jogos, incluindo: ${gamesList.join(", ")}.` :
        locale === "es-ES" ? `Actualmente aceptamos ${gamesList.length} variaciones de juegos, incluyendo: ${gamesList.join(", ")}.` :
            `We currently accept ${gamesList.length} game variations, including: ${gamesList.join(", ")}.`;

    data.faqs.push({
        locale: getI18nLocale(locale),
        category: category,
        question: gamesQuestion,
        answer: gamesAnswer
    });

    return (
        <FAQSearch faqs={data.faqs} category={category} />
    )
}