"use client"

import Squares from "../ui/squares2"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { games } from "@/types/games/Game"

type GenericGamePageProps = {
    gameName: string
}

export default function GenericHeader({ gameName }: GenericGamePageProps) {
    const t = useTranslations("games.generic.header")
    const contentRef = useRef(null)
    const contentInView = useInView(contentRef, { once: true, amount: 0.3 })

    const filteredGame = games.find(game => game.slug === gameName.toLowerCase().trim())

    return (
        <div className="w-full h-screen relative overflow-hidden bg-black">
            <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: `url(${filteredGame?.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} />

            <div className="absolute inset-0 opacity-40">
                <Squares
                    speed={0.5}
                    squareSize={50}
                    direction='diagonal'
                    borderColor='#fff'
                    hoverFillColor='#222'
                />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.8)_60%,black_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

            <div className="absolute top-[12%] left-[8%] md:top-[15%] md:left-[15%] transform -rotate-6 hidden sm:block">
                <div className="animate-goUpDown-slow rounded-lg border-2 border-green-500 overflow-hidden shadow-lg shadow-green-500/30 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://preview.redd.it/bvxuvm4odofc1.jpeg?auto=webp&s=93fd3d3fe29d2f95fe2ede0b0aa5f77a81dfeacc')" }}></div>
                </div>
            </div>

            <div className="absolute top-[18%] right-[5%] md:top-[12%] md:right-[12%] transform rotate-3 hidden sm:block">
                <div className="animate-goUpDown-fast rounded-lg border-2 border-blue-500 overflow-hidden shadow-lg shadow-blue-500/30 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://upload.wikimedia.org/wikipedia/pt/e/ee/Terraria_capa.png')" }}></div>
                </div>
            </div>

            <div className="absolute bottom-[20%] left-[12%] md:bottom-[15%] md:left-[18%] transform rotate-6 hidden sm:block">
                <div className="animate-goUpDown-medium rounded-lg border-2 border-yellow-500 overflow-hidden shadow-lg shadow-yellow-500/30 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://pt.egamersworld.com/uploads/blog/1696414021417.webp')" }}></div>
                </div>
            </div>

            <div className="absolute bottom-[10%] right-[10%] md:bottom-[25%] md:right-[15%] transform -rotate-12 hidden sm:block">
                <div className="animate-goUpDown-delay rounded-lg border-2 border-red-500 overflow-hidden shadow-lg shadow-red-500/30 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/892970/capsule_616x353.jpg?t=1738051073')" }}></div>
                </div>
            </div>

            <div className="absolute top-[40%] left-[20%] transform rotate-12 hidden lg:block">
                <div className="animate-goUpDown rounded-lg border border-blue-500/50 overflow-hidden shadow-md shadow-blue-500/20 w-12 h-12">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://i.ytimg.com/vi/0gLODoXanog/maxresdefault.jpg')" }}></div>
                </div>
            </div>

            <div className="absolute top-[30%] right-[30%] transform -rotate-6 hidden lg:block">
                <div className="animate-goUpDown-reverse rounded-lg border border-green-500/50 overflow-hidden shadow-md shadow-green-500/20 w-10 h-10">
                    <div className="bg-picture w-full h-full" style={{ background: "url('https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2023/11/08/rust-game-capa-1k1rpyuutj22e.jpg')" }}></div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-20 container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
                        {t.rich("your_game_with", {
                            game: filteredGame?.name || "",
                            span: (children) => <span className="text-blue-500">{children}</span>
                        })}
                    </h1>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
                        {t.rich("best_hosting", {
                            span: (children) => <span className="text-blue-500">{children}</span>
                        })}
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto mb-8">
                        {t("description")}
                    </p>
                    <div ref={contentRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-2 md:mt-4"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ boxShadow: "0 0 0px rgba(59, 130, 246, 0)" }}
                                className="inline-block"
                            >
                                <Link
                                    href="https://financeiro.lowping.com.br/index.php?rp=/store/game-miami-usa-performance"
                                    target="_blank"
                                    className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-md font-medium transition-colors"
                                >
                                    <motion.span
                                        className="flex items-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.8 }}
                                    />
                                    {t("see_plans")}
                                    <motion.span
                                        className="ml-2"
                                        initial={{ x: -5, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="mt-2 md:mt-4"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                    borderColor: "rgba(156, 163, 175, 0.7)",
                                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ boxShadow: "0 0 0px rgba(255, 255, 255, 0)" }}
                                className="inline-block"
                            >
                                <Link
                                    href="https://dc.lowping.host"
                                    target="_blank"
                                    className="inline-flex items-center bg-transparent border border-gray-700 text-white px-6 py-3 rounded-md font-medium transition-all"
                                >
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 1 }}
                                    >
                                        {t("talk_to_us")}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}