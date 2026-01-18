"use client"

// Imports of packages
import { useLocale, useTranslations } from 'next-intl'
import { Cpu, MemoryStick, DatabaseZap, Zap, Network } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Import of the project
import VPSPlan from '@/types/plan/vps/VPSPlan'
import PlanTier from '@/types/plan/PlanTier'
import { getStorageTypeName } from '@/types/plan/vps/VPSStorageType'
import { cn } from '@/lib/utils'

type VPSPlanCardProps = {
    plan: VPSPlan
    tier: PlanTier
}

export default function VPSPlanCard({ plan, tier }: VPSPlanCardProps) {
    const locale = useLocale()
    const t = useTranslations("vps.pricing.card")

    const formatStorage = () => {
        if (plan.storageAmountGB >= 1024) {
            return `${(plan.storageAmountGB / 1024).toFixed(0)} TB`
        }
        return `${plan.storageAmountGB} GB`
    }

    const formatLinkSpeed = () => {
        if (plan.linkSpeedMbps >= 1024) {
            return `${(plan.linkSpeedMbps / 1024).toFixed(0)} Gbps`
        }
        return `${plan.linkSpeedMbps} Mbps`
    }

    const formatBandwidth = () => {
        if (plan.monthlyDataLimitGB === null) {
            return t("traffic_unlimited")
        }
        if (plan.monthlyDataLimitGB >= 1024) {
            return t("traffic_tb", { amount: (plan.monthlyDataLimitGB / 1024).toFixed(0) })
        }
        return t("traffic_gb", { amount: plan.monthlyDataLimitGB })
    }

    const formatCpuSpeed = () => {
        return `${plan.cpuSpeedGHz.toFixed(1)} GHz`
    }

    const isPerformance = tier.type === "ADVANCED"

    return (
        <div
            className={cn(
                "text-white flex flex-col px-4 py-6 sm:px-6 sm:py-8 border rounded-xl relative",
                isPerformance ? "border-blue-600/50" : "border-white/40",
                "gap-6 lg:flex-row lg:items-center lg:justify-between"
            )}
        >
            {plan.detach && (
                <div className="tracking-widest absolute -top-3 left-1/2 transform -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 text-xs sm:text-sm font-bold uppercase rounded-lg shadow-lg z-20 backdrop-blur-sm border border-white/20 flex items-center gap-1">
                    <Zap size={12} />
                    {t("featured")}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1">
                <div className="flex flex-col gap-2 text-center items-center justify-center col-span-2 md:col-span-1">
                    <Image
                        src={`/images/processors/${plan.cpuBrand.split(" ")[0].toLowerCase()}.svg`}
                        alt="Processor"
                        width={80}
                        height={80}
                        className="w-16 sm:w-20"
                    />
                    <h3 className="text-base sm:text-lg">
                        {plan.cpuBrand.split(" ").slice(1).join(" ")}
                    </h3>
                </div>
                
                <div className="flex flex-col space-y-1">
                    <span className="text-muted-foreground">{t("processor")}</span>
                    <div className="flex items-center space-x-2">
                        <Cpu size={22} className="text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{plan.vCores} vCores</span>
                            <span className="text-base text-muted-foreground">{formatCpuSpeed()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-muted-foreground">{t("memory")}</span>
                    <div className="flex items-center space-x-2">
                        <MemoryStick size={22} className="text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{plan.ramGB} GB</span>
                            <span className="text-base text-muted-foreground">{plan.ramType}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-muted-foreground">{t("storage")}</span>
                    <div className="flex items-center space-x-2">
                        <DatabaseZap size={22} className="text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{formatStorage()}</span>
                            <span className="text-base text-muted-foreground">
                                {getStorageTypeName(plan.storageType)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-muted-foreground">{t("network")}</span>
                    <div className="flex items-center space-x-2">
                        <Network size={22} className="text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-lg font-medium">{formatLinkSpeed()}</span>
                            <span className="text-base text-muted-foreground">{formatBandwidth()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 mt-4 lg:mt-0 w-full lg:w-auto border-t pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6 lg:ml-4">
                <div className="flex items-center gap-1 justify-center">
                    <span className="text-xl sm:text-2xl font-semibold">
                        {plan.priceBRL.toLocaleString(locale, { style: "currency", currency: "BRL" })}
                    </span>
                    <span className="text-sm sm:text-base">{t("per_month")}</span>
                </div>

                <Link
                    href="#interest-cta"
                    className={cn(
                        "rounded-full px-6 py-2 text-sm sm:text-base transition-all duration-300 ease-in-out w-full text-center",
                        isPerformance 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-white/10 hover:bg-blue-400/20 text-white"
                    )}
                >
                    {t("interest_button")}
                </Link>
            </div>
        </div>
    )
}