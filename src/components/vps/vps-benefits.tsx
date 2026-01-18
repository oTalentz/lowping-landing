"use client"

// Imports of packages
import { CircleFadingArrowUp, MonitorCog, Server, ChevronRight, BadgeCheck, ChevronDown } from "lucide-react"
import { JSX, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

// Import of the project
import VPSPerformanceImage from "../../../public/images/vps/vps-performance.svg"
import VPSControlImage from "../../../public/images/vps/vps-total-control.svg"
import VPSScalingImage from "../../../public/images/vps/vps-scale.svg"

type Benefit = {
    id: string
    icon: JSX.Element
    titleKey: string
    descriptionKey: string
    contentHeadingKey: string
    contentDescriptionKey: string
    image: StaticImageData
}

export default function VPSBenefits() {
    const t = useTranslations("vps.benefits")
    const [selectedBenefit, setSelectedBenefit] = useState<string>("performance")
    const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>("performance")

    const benefits: Benefit[] = [
        {
            id: "performance",
            icon: <Server size={24} className="sm:size-5 md:size-6" />,
            titleKey: "performance.title",
            descriptionKey: "performance.short_description",
            contentHeadingKey: "performance.heading",
            contentDescriptionKey: "performance.description",
            image: VPSPerformanceImage
        },
        {
            id: "control",
            icon: <MonitorCog size={24} className="sm:size-5 md:size-6" />,
            titleKey: "control.title",
            descriptionKey: "control.short_description",
            contentHeadingKey: "control.heading",
            contentDescriptionKey: "control.description",
            image: VPSControlImage
        },
        {
            id: "scalability",
            icon: <CircleFadingArrowUp size={24} className="sm:size-5 md:size-6" />,
            titleKey: "scalability.title",
            descriptionKey: "scalability.short_description",
            contentHeadingKey: "scalability.heading",
            contentDescriptionKey: "scalability.description",
            image: VPSScalingImage
        }
    ]

    const toggleMobileAccordion = (id: string) => {
        setActiveMobileAccordion(activeMobileAccordion === id ? null : id)
        setSelectedBenefit(id)
    }

    return (
        <div className="mt-16 sm:mt-24 md:mt-32 w-full px-4 sm:px-8 md:px-16 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg md:text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-4 text-center"
            >
                {t("subtitle")}
            </motion.h2>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-2"
            >
                {t("title")}
            </motion.h1>

            <div className="hidden sm:block w-full max-w-4xl mx-auto mb-8 md:mb-10 border-b border-blue-900/30 mt-8 md:mt-12">
                <div className="flex flex-wrap -mb-px">
                    {benefits.map((benefit, index) => (
                        <motion.button
                            key={benefit.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedBenefit(benefit.id)}
                            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex flex-1 items-center py-3 sm:py-4 px-3 sm:px-6 text-left border-b-2 font-medium text-white transition-all duration-300 ${selectedBenefit === benefit.id ? "border-blue-500 text-blue-500" : "border-transparent hover:text-gray-300 hover:border-gray-700"}`}
                        >
                            <div className={`p-2 sm:p-2.5 rounded-lg mr-2 sm:mr-3 ${selectedBenefit === benefit.id ? "bg-blue-900/40" : "bg-slate-800/60"}`}>
                                {benefit.icon}
                            </div>
                            <div>
                                <div className="text-sm sm:text-base font-semibold">
                                    {t(benefit.titleKey)}
                                    {selectedBenefit === benefit.id && (
                                        <motion.div
                                            className="inline-block ml-2"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <ChevronRight size={14} className="inline sm:size-4" />
                                        </motion.div>
                                    )}
                                </div>
                                <div className={`text-xs sm:text-sm ${selectedBenefit === benefit.id ? "text-blue-400" : "text-gray-400"}`}>
                                    {t(benefit.descriptionKey)}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="sm:hidden w-full max-w-full mx-auto mt-6 mb-8 space-y-3">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-blue-900/30 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleMobileAccordion(benefit.id)}
                            className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 ${activeMobileAccordion === benefit.id ? "bg-blue-900/20" : "bg-transparent"}`}
                        >
                            <div className="flex items-center">
                                <div className={`p-2 rounded-lg mr-3 ${activeMobileAccordion === benefit.id ? "bg-blue-900/40" : "bg-slate-800/60"}`}>
                                    {benefit.icon}
                                </div>
                                <div>
                                    <div className={`text-sm font-semibold ${activeMobileAccordion === benefit.id ? "text-blue-500" : "text-white"}`}>
                                        {t(benefit.titleKey)}
                                    </div>
                                    <div className={`text-xs ${activeMobileAccordion === benefit.id ? "text-blue-400" : "text-gray-400"}`}>
                                        {t(benefit.descriptionKey)}
                                    </div>
                                </div>
                            </div>
                            <ChevronDown
                                size={20}
                                className={`transform transition-transform duration-300 ${activeMobileAccordion === benefit.id ? "rotate-180 text-blue-500" : "text-white"}`}
                            />
                        </button>
                        
                        <AnimatePresence>
                            {activeMobileAccordion === benefit.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-blue-900/30 p-4"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-xl text-white font-medium mb-2">{t(benefit.contentHeadingKey)}</h3>
                                        <p className="text-sm text-white/80">{t(benefit.contentDescriptionKey)}</p>
                                    </div>
                                    <div className="h-48 relative w-full">
                                        <Image
                                            className="rounded-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] object-contain"
                                            src={benefit.image}
                                            alt={`${t(benefit.titleKey)} illustration`}
                                            quality={90}
                                            fill={true}
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="hidden sm:block w-full max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    {benefits.map((benefit) => (
                        benefit.id === selectedBenefit && (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10"
                            >
                                <div className="w-full md:w-1/2 space-y-3 sm:space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">{t(benefit.contentHeadingKey)}</h1>
                                        <p className="text-white text-base sm:text-lg mt-3 sm:mt-4">
                                            {t(benefit.contentDescriptionKey)}
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="w-full md:w-1/2 h-56 sm:h-64 md:h-72 flex items-center justify-center"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ type: "spring", damping: 20 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            className="rounded-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] object-contain"
                                            src={benefit.image}
                                            alt={`${t(benefit.titleKey)} illustration`}
                                            quality={100}
                                            fill={true}
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}