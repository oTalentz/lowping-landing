"use client"

import Image from "next/image"
import PlanCard from "./minecraft-pricing-card"
import MinecraftPlan from "@/types/plan/MinecraftPlan"
import { cn } from "@/lib/utils"
import { Info, Network, Pickaxe, Zap } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import PlanTier, { getPlanTierDescription2, getPlanTierTitle2 } from "@/types/plan/PlanTier"
import PlanLocation, { getPlanLocationCityName2, getPlanLocationCountryName2, getPlanLocationDescription2 } from "@/types/plan/PlanLocation"
import { setupPingMonitor, sendPingRequest } from "@/lib/ping"
import Tooltip from "@/components/ui/Tooltip"

// Helper function to adjust ping with error margin
const adjustPingWithMargin = (ping: number | null, margin: number = 15): number | null => {
  if (ping === null) return null
  // Subtract margin and ensure it's not less than 0
  return Math.max(0, ping - margin)
}

type PricingCarouselProps = {
  locations: PlanLocation[]
  tiers: PlanTier[]
  plans: MinecraftPlan[]
}

export default function MinecraftPricing({ locations, tiers, plans }: PricingCarouselProps) {
  const t = useTranslations("minecraft.pricing")
  const locale = useLocale()

  const [selectedCountry, setSelectedCountry] = useState(locations.length > 0 ? locations[0] : null)
  const [pingResults, setPingResults] = useState<Record<number, number | null>>({})
  const [loadingPings, setLoadingPings] = useState<Record<number, boolean>>({})

  const availableTiersForCountry = useMemo(() => {
    if (!selectedCountry) return []
    return tiers.filter((tier) => tier.locationId === selectedCountry.id)
  }, [selectedCountry, tiers])

  const [selectedTier, setSelectedTier] = useState(availableTiersForCountry.length > 0 ? availableTiersForCountry[0] : null)

  useEffect(() => {
    setSelectedTier(availableTiersForCountry.length > 0 ? availableTiersForCountry[0] : null)
  }, [availableTiersForCountry])

  useEffect(() => {
    // Initialize all locations as loading
    const initialLoadingState: Record<number, boolean> = {}
    locations.forEach(location => {
      initialLoadingState[location.id] = true
    })
    setLoadingPings(initialLoadingState)

    // Array para armazenar funções de limpeza
    const cleanupFunctions: (() => void)[] = []

    // Configurar monitores de ping persistentes para cada localização
    locations.forEach(location => {
      if (!location.ipAddress) {
        setLoadingPings(prev => ({
          ...prev,
          [location.id]: false
        }))
        return
      }

      const cleanup = setupPingMonitor(
        location.ipAddress,
        (pingValue) => {
          // Atualizar resultado do ping para esta localização
          setPingResults(prev => ({
            ...prev,
            [location.id]: pingValue
          }))

          // Marcar como carregado
          setLoadingPings(prev => ({
            ...prev,
            [location.id]: false
          }))
        }
      )

      cleanupFunctions.push(cleanup)
    })

    // Enviar solicitações de ping em intervalos regulares
    const intervalId = setInterval(() => {
      locations.forEach(location => {
        if (location.ipAddress) {
          sendPingRequest(location.ipAddress)
        }
      })
    }, 1000)

    // Limpar conexões e intervalos quando o componente desmontar
    return () => {
      clearInterval(intervalId)
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [locations])

  const plansForSelectedTier = useMemo(() => {
    if (!selectedTier) return []
    return plans.filter((plan) => plan.tierId === selectedTier.id)
  }, [plans, selectedTier])

  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  const itemVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 }
  }

  if (locations.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto text-center py-10 px-4 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="p-4 sm:p-8 rounded-lg border border-white/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-2">{t("no_locations.title")}</h2>
          <p className="text-white/70">{t("no_locations.description")}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCountry?.id || "no-country"}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-6 sm:mt-10"
        >
          {locations.map((location) => (
            <motion.button
              key={location.id}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "relative w-full sm:max-w-[320px] h-auto sm:h-14 flex items-center justify-center gap-2 sm:gap-4 p-3 sm:px-4 border-b border-white/40 transition duration-300 ease-in-out hover:border-blue-700/100",
                selectedCountry?.id === location.id && "border-blue-700/100"
              )}
              onClick={() => setSelectedCountry(location)}
            >
              {location.detach && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: -30 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="tracking-widest absolute -top-6 -left-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-2 py-1 text-xs sm:text-sm font-bold uppercase rounded-lg shadow-lg z-20 backdrop-blur-sm border border-white/20"
                >
                  {t("featured")}
                </motion.div>
              )}
              <div className="flex-shrink-0">
                <Image
                  src={`/images/flags/${location.countryCode}.svg`}
                  alt={getPlanLocationCountryName2(location, locale)}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14"
                />
              </div>
              <div className="text-white text-start flex flex-col justify-center">
                <h1 className="text-base sm:text-lg md:text-2xl leading-tight truncate">
                  {getPlanLocationCityName2(location, locale)} - {getPlanLocationCountryName2(location, locale)}
                </h1>

                {/* Fallback ping display if no dynamic ping is available */}
                {(loadingPings[location.id] || pingResults[location.id] === undefined) && (
                  <div className="flex gap-2 items-center text-xs sm:text-sm md:text-lg font-medium leading-tight -mt-1 text-white/70">
                    <Network size={18} />
                    {getPlanLocationDescription2(location, locale)}
                  </div>
                )}

                {!loadingPings[location.id] &&
                  pingResults[location.id] !== undefined &&
                  (pingResults[location.id] === null || (adjustPingWithMargin(pingResults[location.id]) || -1) <= 500) && (
                    <motion.p
                      className={cn(
                        "flex gap-2 items-center text-xs sm:text-sm md:text-lg font-medium leading-tight -mt-1",
                        pingResults[location.id]
                          ? (adjustPingWithMargin(pingResults[location.id])! <= 130 ? "text-green-400" :
                            adjustPingWithMargin(pingResults[location.id])! <= 230 ? "text-yellow-400" : "text-red-400")
                          : "text-red-400"
                      )}
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Network size={18} />
                      {pingResults[location.id] !== null
                        ? t("ping.result", { value: adjustPingWithMargin(pingResults[location.id]) })
                        : t("ping.unavailable")}
                    </motion.p>
                  )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="text-white/85 text-lg sm:text-xl text-center mt-16 sm:mt-20 md:mt-32">
        {t("choose_tier_text")}
      </p>

      {
        availableTiersForCountry.length === 0 ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="p-4 sm:p-8 rounded-lg border border-white/10 mt-6 sm:mt-10 text-center"
          >
            <h2 className="text-xl sm:text-2xl text-white mb-2">{t("no_tiers.title")}</h2>
            <p className="text-white/70">{t("no_tiers.description")}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCountry?.id + "-tiers"}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center"
            >
              {availableTiersForCountry.map((tier) => (
                <motion.button
                  key={tier.id}
                  whileHover={{ scale: 1.02 }}
                  variants={itemVariants}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "relative w-full sm:max-w-[320px] h-auto sm:h-14 flex items-center justify-center gap-2 sm:gap-4 p-3 sm:px-4 border-b border-white/40 transition duration-300 ease-in-out hover:border-blue-700/100",
                    selectedTier?.id === tier.id && "border-blue-700/100"
                  )}
                  onClick={() => setSelectedTier(tier)}
                >
                  {tier.detach && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="tracking-widest absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-2 py-1 text-xs sm:text-sm font-bold uppercase rounded-lg shadow-lg z-20 backdrop-blur-sm border border-white/20"
                    >
                      {t("featured")}
                    </motion.div>
                  )}
                  <div className="flex-shrink-0">
                    {tier.type === "ADVANCED" ? (
                      <Zap size={30} className="sm:w-10 sm:h-10 md:w-14 md:h-14" fill="white" />
                    ) : (
                      <Pickaxe size={30} className="sm:w-10 sm:h-10 md:w-14 md:h-14" fill="white" />
                    )}
                  </div>
                  <div className="text-white text-start flex flex-col justify-center">
                    <h1 className="text-base sm:text-lg md:text-2xl leading-tight">
                      {getPlanTierTitle2(tier, locale)}
                    </h1>
                    <p className="text-white/70 text-xs sm:text-sm md:text-lg leading-tight -mt-0.5">
                      {getPlanTierDescription2(tier, locale)}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        )
      }

      <div className="mt-10 sm:mt-16 md:mt-20">
        {plansForSelectedTier.length === 0 ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="p-4 sm:p-8 rounded-lg border border-white/10 text-center"
          >
            <h2 className="text-xl sm:text-2xl text-white mb-2">{t("no_plans.title")}</h2>
            <p className="text-white/70">{t("no_plans.description")}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTier?.id || "no-tier"}-${selectedCountry?.id || "no-country"}-plans`}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
                {plansForSelectedTier.slice(0, 4).map((plan) => (
                  <motion.div
                    key={plan.id}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.2 }}
                    className="px-0 sm:px-2 md:px-3 h-full"
                  >
                    <PlanCard plan={plan} />
                  </motion.div>
                ))}
              </div>

              {plansForSelectedTier.length > 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 mt-6 sm:mt-4">
                  {plansForSelectedTier.slice(4, 8).map((plan) => (
                    <motion.div
                      key={plan.id}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.2 }}
                      className="px-0 sm:px-2 md:px-3 h-full"
                    >
                      <PlanCard plan={plan} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}