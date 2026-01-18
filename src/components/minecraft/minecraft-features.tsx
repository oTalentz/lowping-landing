import { Timer, HardDrive, Shield, Files, LayoutDashboard, FilePlus } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { JSX } from "react"

type Feature = {
    icon: JSX.Element
    translationKey: string
}

const features: Feature[] = [
    {
        icon: <Timer className="w-10 h-10 text-purple-500" />,
        translationKey: "one_click_installer"
    },
    {
        icon: <LayoutDashboard className="w-10 h-10 text-cyan-500" />,
        translationKey: "pterodactyl_panel"
    },
    {
        icon: <Files className="w-10 h-10 text-rose-500" />,
        translationKey: "files_manager"
    },
    {
        icon: <FilePlus className="w-10 h-10 text-pink-500" />,
        translationKey: "plugins_manager"
    },
    {
        icon: <HardDrive className="w-10 h-10 text-blue-500" />,
        translationKey: "auto_backup"
    },
    {
        icon: <Shield className="w-10 h-10 text-yellow-500" />,
        translationKey: "ddos_protection"
    }
]

export default async function MinecraftFeatures() {
    const t = await getTranslations("minecraft.features")

    return (
        <div className="flex flex-col gap-16 mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {t.rich("title", {
                        span: (text) => (<span className="text-blue-500">{text}</span>)
                    })}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {t("description")}
                </p>
            </div>

            <div className="relative min-h-[800px] lg:min-h-[600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="animate-feature opacity-0 transform translate-y-8 bg-[#0f0f0f] p-6 rounded-xl border border-gray-800 hover:border-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                            style={{
                                height: "calc(100% - 2rem)",
                                margin: "1rem",
                            }}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                {feature.icon}
                                <h3 className="text-xl font-semibold text-white">
                                    {t(`cards.${feature.translationKey}.title`)}
                                </h3>
                            </div>
                            <p className="text-gray-400">
                                {t(`cards.${feature.translationKey}.description`)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 hidden lg:block">
                    <div className="absolute left-[33.33%] top-0 bottom-1/3 w-px bg-gradient-to-b from-gray-300 to-transparent animate-pulse" />
                    <div className="absolute left-[66.66%] top-0 bottom-1/3 w-px bg-gradient-to-b from-gray-300 to-transparent animate-pulse" />

                    <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-gray-300 to-transparent animate-pulse" />
                </div>
            </div>
        </div>
    )
}