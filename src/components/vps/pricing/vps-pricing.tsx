"use client"

// Imports of packages
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

// Import of the project
import PlanLocation, { getPlanLocationCityName2, getPlanLocationCountryName2 } from "@/types/plan/PlanLocation"
import PlanTier from "@/types/plan/PlanTier"
import { cn } from "@/lib/utils"
import VPSPlanCard from "./vps-pricing-card"
import VPSPlan from "@/types/plan/vps/VPSPlan"

type VPSPlansProps = {
  locations: PlanLocation[]
  tiers: PlanTier[]
  plans: VPSPlan[]
}

export default function VPSPlans({ locations, tiers, plans }: VPSPlansProps) {
  const t = useTranslations("vps.pricing")
  const locale = useLocale()

  const [selectedLocation, setSelectedLocation] = useState(locations[0] || null)

  const plansForSelectedLocation = useMemo(() => {
    if (!selectedLocation) return []

    const tiersForLocation = tiers.filter(tier => tier.locationId === selectedLocation.id)

    const filteredPlans = tiersForLocation.flatMap(tier =>
      plans.filter(plan => plan.tierId === tier.id)
    )

    return filteredPlans.sort((a, b) => {
      const tierA = tiersForLocation.find(t => t.id === a.tierId)
      const tierB = tiersForLocation.find(t => t.id === b.tierId)

      if (tierA?.type === "BASIC" && tierB?.type === "ADVANCED") return -1
      if (tierA?.type === "ADVANCED" && tierB?.type === "BASIC") return 1

      return a.priceBRL - b.priceBRL
    })
  }, [selectedLocation, tiers, plans])

  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  const itemVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 }
  }

  if (!selectedLocation) return null

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-10">
      <div className="text-center mb-12">
        <motion.div className="flex items-center justify-center mb-6">
          <div className="h-0.5 w-8 bg-blue-500/50 mr-4"></div>
          <h2 className="text-lg font-semibold text-blue-500">{t("coming_soon")}</h2>
          <div className="h-0.5 w-8 bg-blue-500/50 ml-4"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          {t("title")}
        </motion.h1>
      </div>

      <div className="mb-12">
        <p className="mt-8 text-white/85 text-lg sm:text-xl text-center mb-6">
          {t("select_region")}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key="location-selection"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-4"
          >
            {locations.map((location) => (
              <motion.button
                key={location.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "w-full max-w-[280px] h-14 flex items-center justify-center gap-4 px-4 border rounded-lg transition duration-300 ease-in-out",
                  selectedLocation.id === location.id
                    ? "border-blue-700 bg-blue-900/20"
                    : "border-white/20 hover:border-blue-700/70 hover:bg-blue-900/10"
                )}
                onClick={() => setSelectedLocation(location)}
              >
                <Image
                  src={`/images/flags/${location.countryCode}.svg`}
                  alt={getPlanLocationCountryName2(location, locale)}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="text-white text-start">
                  <h1 className="text-base sm:text-lg">{getPlanLocationCityName2(location, locale)}</h1>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedLocation.id}-plans`}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="mt-10 flex flex-col gap-6"
        >
          {plansForSelectedLocation.map((plan) => {
            const tier = tiers.find(t => t.id === plan.tierId)
            if (!tier) return null

            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                <VPSPlanCard plan={plan} tier={tier} />
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 mb-8 px-4 py-6 border border-white/10 rounded-lg bg-white/5"
      >
        <p className="text-gray-300">
          {t("custom_config")} <a href="#interest-cta" className="text-blue-400 hover:underline font-medium">{t("contact_us")}</a> {t("discuss_needs")}
        </p>
      </motion.div>
    </div>
  )
}