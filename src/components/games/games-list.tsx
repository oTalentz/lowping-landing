"use client"

import GameCard from "./game-card"
import AnimatedContent from "../ui/animated-content"
import { useTranslations } from "next-intl"
import { Search, X, AlertCircle } from "lucide-react"
import { useMemo, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Game, games } from "@/types/games/Game"

type GamesListProps = {
    minecraftPlansStartingInBRL: number
    gamesPlansStartingInBRL: number
}

export default function GamesList({ minecraftPlansStartingInBRL, gamesPlansStartingInBRL }: GamesListProps) {
    const t = useTranslations("games.search")
    const [searchTerm, setSearchTerm] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)

    const filterBySearch = (game: Game) => {
        return searchTerm === "" || game.name.toLowerCase().includes(searchTerm.toLowerCase())
    }

    const standaloneGames = useMemo(() => {
        return games.filter((game) => game.type === "STANDALONE" && filterBySearch(game))
    }, [searchTerm])
    const steamCmdGames = useMemo(() => {
        return games.filter((game) => game.type === "STEAM_CDM" && filterBySearch(game))
    }, [searchTerm])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm("")
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70
            }
        }
    }

    // Get game description
    const getGameDescription = (slug: string): string => {
        const descTranslations = useTranslations("games.descriptions")
        try {
            return descTranslations(slug)
        } catch (error) {
            return ""
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center text-center">
            <AnimatedContent
                distance={90}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.05}
                animateOpacity
                scale={1.1}
                threshold={0.2}
            >
                <div className="w-96 relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                        ref={searchRef}
                        type="text"
                        className="w-full pl-12 pr-10 py-3 rounded-xl bg-gray-800/60 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 outline-none transition-all duration-300"
                        placeholder={t("input_placeholder")}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </AnimatedContent>

            <AnimatePresence mode="wait">
                {standaloneGames.length > 0 && (
                    <motion.div
                        key="standalone-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-500 to-white bg-clip-text text-transparent mt-10"
                        >
                            {t("standalone_games_title")}
                        </motion.h2>
                        <motion.div
                            className="flex flex-wrap justify-center gap-4 px-20"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {standaloneGames.map((game, index) => (
                                <motion.div key={game.name} variants={cardVariants} custom={index}>
                                    <GameCard
                                        name={game.name}
                                        image={game.image}
                                        firstPlanPrice={game.name === "Minecraft" ? minecraftPlansStartingInBRL : gamesPlansStartingInBRL}
                                        href={game.name === "Minecraft" ? '/minecraft' : ('/game/' + game.slug)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {steamCmdGames.length > 0 && (
                    <motion.div
                        key="steamcmd-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-500 to-white bg-clip-text text-transparent mt-10"
                        >
                            {t("steam_cmd_games_title")}
                        </motion.h2>
                        <motion.div
                            className="flex flex-wrap justify-center gap-4 px-20"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {steamCmdGames.map((game, index) => (
                                <motion.div key={game.name} variants={cardVariants} custom={index}>
                                    <GameCard
                                        name={game.name}
                                        image={game.image}
                                        firstPlanPrice={gamesPlansStartingInBRL}
                                        href={game.name === "Minecraft" ? '/minecraft' : ('/game/' + game.slug)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {standaloneGames.length === 0 && steamCmdGames.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            scale: { type: "spring", stiffness: 100 }
                        }}
                        className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/40 rounded-xl border border-gray-700 mt-8 w-3/4 max-w-2xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-500 to-white bg-clip-text text-transparent"
                        >
                            {t("no_results.title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="text-gray-400 mt-2"
                        >
                            {t("no_results.description")}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}