"use client"

import Image from "next/image"
import MinecraftPlan, { getMinecraftPlanFeatures2, getMinecraftPlanTitle2 } from "@/types/plan/MinecraftPlan"
import { motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

type PlanCardProps = {
    plan: MinecraftPlan
}

export default function PlanCard({ plan }: PlanCardProps) {
    const t = useTranslations("minecraft.pricing.plan_card")
    const locale = useLocale()

    const [isVisible, setIsVisible] = useState(false)
    // const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                const windowHeight = window.innerHeight || document.documentElement.clientHeight
                if (rect.top < windowHeight && rect.bottom > 0) {
                    setIsVisible(true)
                    // setHasAnimated(true)
                } else {
                    setIsVisible(false)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const getWhmcsLanguage = (locale: string) => {
        switch (locale) {
            case "pt-BR":
                return "portuguese-br"
            case "en-US":
                return "english"
            case "es-ES":
                return "spanish"
            default:
                return "english"
        }
    }

    const getWhmcsCurrency = (locale: string) => {
        switch (locale) {
            case "pt-BR":
                return "1"
            case "en-US":
                return "3"
            case "es-ES":
                return "3"
            default:
                return "3"
        }
    }

    return (
        <div className="relative w-full mx-auto">
            {plan.detach && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, y: -20, rotate: -10 }}
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        boxShadow: [
                            "0px 0px 0px rgba(239, 68, 68, 0)",
                            "0px 0px 20px rgba(239, 68, 68, 0.5)",
                            "0px 0px 0px rgba(239, 68, 68, 0)"
                        ]
                    }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        scale: {
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                        },
                        boxShadow: {
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                        }
                    }}
                    className="tracking-widest absolute -mr-2 -mt-4 right-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-[length:200%_auto] animate-gradient text-white px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-bold uppercase rounded-lg shadow-lg z-20 backdrop-blur-sm border border-white/20"
                >
                    Popular
                </motion.div>
            )}

            <div className="h-full rounded-2xl overflow-hidden relative group">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: `linear-gradient(to bottom right, ${plan.secondaryColor}30, ${plan.secondaryColor}40)`
                    }}
                />

                <div className="relative z-10 h-full bg-black/40 backdrop-blur-sm border border-white/10 pt-4 sm:pt-6 pb-3 sm:pb-4 px-3 sm:px-4 flex flex-col">
                    <div className="flex flex-col items-center mb-4 sm:mb-6">
                        <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 sm:mb-4">
                            <div
                                className="absolute inset-0 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(to bottom right, ${plan.color}, ${plan.color})`
                                }}
                            />
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={plan.iconURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Grass_Block_from_Minecraft.png/120px-Grass_Block_from_Minecraft.png"}
                                    alt={getMinecraftPlanTitle2(plan, locale)}
                                    width={160}
                                    height={160}
                                    quality={100}
                                    className="object-contain z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
                                />
                            </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 text-center">
                            {getMinecraftPlanTitle2(plan, locale)}
                        </h2>
                        <div
                            className="h-1 w-12 sm:w-16 rounded-full"
                            style={{
                                background: `linear-gradient(to right, ${plan.color}20, ${plan.color}20)`
                            }}
                        />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white/80 mb-3 sm:mb-4 text-center">
                            {plan.ram}{t("gb_ram_text")}
                        </h3>
                    </div>

                    <div className="relative text-center mb-4 sm:mb-6">
                        <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                            {plan.priceBRL.toLocaleString(locale, { currency: "BRL", style: "currency" })}
                        </span>
                        <span className="absolute ml-1 mt-1 sm:mt-2 md:mt-3 text-white/70 text-sm sm:text-base md:text-lg">
                            {t("per_month_text")}
                        </span>
                    </div>

                    <div className="flex-grow">
                        <div className="bg-black/30 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10 mb-4 sm:mb-6" ref={ref}>
                            <ul className="space-y-2 sm:space-y-3">
                                {getMinecraftPlanFeatures2(plan, locale).map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-center gap-1 sm:gap-2 text-white/80 text-sm sm:text-base md:text-lg"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                                        transition={{
                                            delay: isVisible ? idx * 0.1 : 0,
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        <CheckCircle2 size={20} className="text-white flex-shrink-0 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                        <span className="flex-1 leading-tight">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <motion.a
                        href="https://financeiro.lowping.com.br/index.php?rp=/store/game-miami-usa-performance"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("create_server_button.aria_label")}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="shiny text-center w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-gray-200 font-bold text-base sm:text-lg md:text-xl tracking-wider shadow-lg cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, ${plan.color}, ${plan.secondaryColor}70)`
                        }}
                    >
                        {t("create_server_button.text")}
                    </motion.a>
                </div>
            </div>
        </div>
    )
}