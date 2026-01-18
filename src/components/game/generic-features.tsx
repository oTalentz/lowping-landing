"use client"

import { Rocket, HardDrive, Shield, Zap, Gamepad2, Clock, LayoutDashboard, Download, Cpu } from "lucide-react"
import { JSX } from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

type FeatureCategory = "ALL" | "COMPATIBILITY" | "MANAGEMENT" | "PERFORMANCE" | "SECURITY" | "EASE_OF_USE" | "REALIABILITY"

type Feature = {
    icon: JSX.Element
    translationKey: string
    category: FeatureCategory
}

const features: Feature[] = [
    {
        icon: <Download className="w-10 h-10 text-green-500" />,
        translationKey: "one_click_installer",
        category: "EASE_OF_USE"
    },
    {
        icon: <LayoutDashboard className="w-10 h-10 text-cyan-500" />,
        translationKey: "control_panel",
        category: "MANAGEMENT"
    },
    {
        icon: <Gamepad2 className="w-10 h-10 text-red-500" />,
        translationKey: "game_switching",
        category: "COMPATIBILITY"
    },
    {
        icon: <Zap className="w-10 h-10 text-orange-500" />,
        translationKey: "high_performance",
        category: "PERFORMANCE"
    },
    {
        icon: <Rocket className="w-10 h-10 text-rose-500" />,
        translationKey: "scalable_resources",
        category: "PERFORMANCE"
    },
    {
        icon: <Cpu className="w-10 h-10 text-amber-500" />,
        translationKey: "resource_monitoring",
        category: "MANAGEMENT"
    },
    {
        icon: <HardDrive className="w-10 h-10 text-blue-500" />,
        translationKey: "auto_backup",
        category: "SECURITY"
    },
    {
        icon: <Shield className="w-10 h-10 text-yellow-500" />,
        translationKey: "ddos_protection",
        category: "SECURITY"
    },
    {
        icon: <Clock className="w-10 h-10 text-indigo-500" />,
        translationKey: "uptime_guarantee",
        category: "REALIABILITY"
    }
]

export default function GameHostingFeatures() {
    const [activeCategory, setActiveCategory] = useState<FeatureCategory>("ALL")
    const t = useTranslations("games.generic.features")

    const categories: {
        id: FeatureCategory
        label: string
    }[] = [
            { id: "ALL", label: t("categories.all") },
            { id: "COMPATIBILITY", label: t("categories.compatibility") },
            { id: "MANAGEMENT", label: t("categories.management") },
            { id: "PERFORMANCE", label: t("categories.performance") },
            { id: "SECURITY", label: t("categories.security") },
            { id: "EASE_OF_USE", label: t("categories.ease_of_use") },
            { id: "REALIABILITY", label: t("categories.reliability") }
        ]

    const filteredFeatures = activeCategory === "ALL" ? features : features.filter(feature => feature.category === activeCategory)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="flex flex-col gap-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {t.rich("title", {
                        span: (children) => <span className="text-blue-500">{children}</span>
                    })}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    {t("description")}
                </p>
            </div>

            <motion.div
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.label}
                    </motion.button>
                ))}
            </motion.div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent rounded-3xl opacity-30" />

                <LayoutGroup>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="wait">
                            {filteredFeatures.map((feature, i) => (
                                <motion.div
                                    key={`${feature.translationKey}-${i}`}
                                    layout
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="feature-card bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 group"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <motion.div
                                            className="p-2 rounded-lg bg-gray-800 group-hover:bg-blue-900/30"
                                            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 1 } }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                        <h3 className="tracking-wider text-xl font-semibold text-white">
                                            {t(`cards.${feature.translationKey}.title`)}
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        {t(`cards.${feature.translationKey}.description`)}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>

                <div className="absolute inset-0 hidden lg:block pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent" />
                    <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent" />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
                </div>
            </div>
        </div>
    )
}