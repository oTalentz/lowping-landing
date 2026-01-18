"use client"

// Imports of packages
import { motion, Variants } from "framer-motion"
import { Server, Settings, Zap } from "lucide-react"
import { JSX } from "react"
import { useTranslations } from "next-intl"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

type Feature = {
    icon: JSX.Element
    titleKey: string
    descriptionKey: string
}

export default function VPSInfoFeatures() {
    const t = useTranslations("vps.info.features")

    const features: Feature[] = [
        {
            icon: <Zap className="text-blue-500" size={28} />,
            titleKey: "high_performance.title",
            descriptionKey: "high_performance.description"
        },
        {
            icon: <Settings className="text-blue-500" size={28} />,
            titleKey: "complete_customization.title",
            descriptionKey: "complete_customization.description"
        },
        {
            icon: <Server className="text-blue-500" size={28} />,
            titleKey: "scalability.title",
            descriptionKey: "scalability.description"
        }
    ]

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-slate-800/50 backdrop-blur border border-blue-900/30 p-6 rounded-xl"
                >
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="text-white text-xl font-medium mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-gray-300">{t(feature.descriptionKey)}</p>
                </motion.div>
            ))}
        </motion.div>
    )
}