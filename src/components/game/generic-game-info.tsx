"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { games } from "@/types/games/Game"
import { useRef, useState } from "react"
import { ExternalLinkIcon, MapPin } from "lucide-react"
import { GamePlanSimulation } from "@/types/games/simulation/GamePlanSimulation"
import PlanTierType from "@/types/plan/PlanTierType"

type GenericGamePageProps = {
  gameName: string
  simulationsByTier: Record<PlanTierType, GamePlanSimulation>
}

export default function GenericGameInfo({ gameName, simulationsByTier }: GenericGamePageProps) {
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 })
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 })
  const t = useTranslations("games")
  const locale = useLocale()
  const gameNotFoundText = t("generic.game_not_found")

  // State for plan customization
  // Default to PERFORMANCE as requested for all non-Minecraft games
  const [planType, setPlanType] = useState<PlanTierType>("PERFORMANCE")
  const [ramMultiplier, setRamMultiplier] = useState(1)

  // Get current simulation data based on selected plan type
  const currentSimulation = simulationsByTier[planType] || simulationsByTier["PERFORMANCE"]

  // Calculate actual RAM amount based on baseRAM and multiplier
  const baseRAM = currentSimulation.baseRAM
  const ramAmount = baseRAM * ramMultiplier

  // Use maxRAM from simulation data instead of hardcoded multipliers
  const maxRam = currentSimulation.maxRAM
  // Calculate the max multiplier based on baseRAM and maxRAM
  const maxMultiplier = Math.floor(maxRam / baseRAM)

  // Generate RAM options based on baseRAM and max multiplier
  const ramOptions = Array.from({ length: maxMultiplier }, (_, i) => baseRAM * (i + 1))

  // Calculate price based on actual pricing data
  const totalPrice = ramMultiplier * currentSimulation.basePriceBRL

  const filteredGame = games.find(game => game.slug === gameName.toLowerCase().trim())

  if (!filteredGame) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-semibold text-white text-center"
        >
          {gameNotFoundText}
        </motion.p>
      </div>
    )
  }

  // Get the description from translations
  let gameDescription = ""
  try {
    gameDescription = t(`descriptions.${filteredGame.slug}`)
  } catch (error) {
    // If translation is not found, use an empty string
    gameDescription = ""
  }

  // Map PlanTierType to display names
  const getPlanDisplayName = (type: PlanTierType): string => {
    return type === "BASIC" ? t("personalize_plan.budget") : t("personalize_plan.performance")
  }

  const getWhmcsLink = () => {
    return "https://financeiro.lowping.com.br/index.php?rp=/store/game-miami-usa-performance"
  }

  return (
    <div className="bg-black p-4 md:p-8 lg:p-12 mt-32 mb-52">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            ref={imageRef}
            className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="boxImage w-full max-w-xs h-80 md:h-96 rounded-lg bg-center bg-no-repeat bg-cover relative"
              style={{ backgroundImage: `url(${filteredGame.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300" />
            </motion.div>
          </motion.div>

          <motion.div
            ref={contentRef}
            className="w-full md:w-1/2 lg:w-3/5 text-white flex flex-col text-center md:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 text-white"
            >
              {filteredGame.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg leading-relaxed text-gray-200 mb-6"
            >
              {gameDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-2 md:mt-4"
            >
              {/* Plan Customization Section */}
              <motion.div
                className="bg-gray-900 p-6 rounded-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold mb-4">{t("personalize_plan.title")}</h3>

                {/* Plan Type Display & Processor Info */}
                <div className="mb-6">
                  <p className="mb-2 text-gray-300">{t("personalize_plan.plan_type")}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <div className="px-4 py-2 rounded-md bg-blue-600 text-white font-bold tracking-wide uppercase shadow-lg shadow-blue-900/20">
                      {getPlanDisplayName("PERFORMANCE")}
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span className="text-sm font-medium">Ryzen 9 9900X</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 border-l border-gray-700 pl-4">
                      <MapPin className="h-4 w-4 opacity-70" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium text-gray-300">Miami - USA</span>
                        <span className="text-[10px] text-gray-500 font-medium">Ping: 120-140ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RAM Slider - Completely revised implementation */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">{t("personalize_plan.ram_memory")}</p>
                    <motion.p
                      className="text-lg font-bold"
                      key={ramAmount}
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {ramAmount}GB
                    </motion.p>
                  </div>

                  <div className="relative pt-4 pb-6">
                    {/* Using a better structure for slider tracks - now FIRST in DOM order */}
                    <div className="relative h-2 mb-4">
                      {/* Base Track - Gray background */}
                      <div className="absolute inset-0 rounded-full bg-gray-700" />

                      {/* Active Track - This will render OVER the base track */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 rounded-full bg-blue-600"
                        style={{ width: `${((ramMultiplier - 1) / (maxMultiplier - 1)) * 100}%` }}
                        animate={{ width: `${((ramMultiplier - 1) / (maxMultiplier - 1)) * 100}%` }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Step Markers - Now positioned directly ABOVE the slider */}
                      <div className="absolute w-full" style={{ top: '-1px' }}>
                        {ramOptions.map((value, index) => (
                          <div
                            key={value}
                            className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 ${ramAmount >= value ? 'bg-blue-400' : 'bg-gray-500'}`}
                            style={{
                              left: `${index * (100 / (ramOptions.length - 1))}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Slider Handle - On top of everything */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: `${((ramMultiplier - 1) / (maxMultiplier - 1)) * 100}%`,
                        transform: 'translateX(-50%)',
                        top: '8px'
                      }}
                      animate={{
                        left: `${((ramMultiplier - 1) / (maxMultiplier - 1)) * 100}%`
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-6 h-6 bg-blue-500 rounded-full cursor-grab shadow-lg flex items-center justify-center border-2 border-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95, cursor: "grabbing" }}
                      />
                    </motion.div>

                    {/* Actual Range Input - On top for touch/mouse interaction */}
                    <input
                      type="range"
                      min="1"
                      max={maxMultiplier}
                      step="1"
                      value={ramMultiplier}
                      onChange={(e) => setRamMultiplier(parseInt(e.target.value))}
                      className="absolute w-full left-0 right-0 cursor-pointer opacity-0 h-10"
                      style={{ top: '15px' }}
                    />

                    {/* RAM Step Labels - Now properly aligned with the step markers */}
                    <div className="relative w-full mt-4">
                      {ramOptions.map((value, index) => (
                        <div
                          key={`label-${value}`}
                          className="absolute text-center transform -translate-x-1/2 text-sm text-gray-300"
                          style={{
                            left: `${index * (100 / (ramOptions.length - 1))}%`
                          }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <motion.div
                  className="mb-6 text-right"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.4, times: [0, 0.5, 1] }}
                  key={totalPrice} // Re-animate when price changes
                >
                  <p className="text-sm text-gray-300">{t("personalize_plan.monthly_value")}</p>
                  <p className="text-2xl font-bold text-white">R${totalPrice.toFixed(2)}</p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={getWhmcsLink()}
                    target="_blank"
                    className="flex-1"
                  >
                    <motion.div
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-md font-medium text-center"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("personalize_plan.continue_button")}
                      <motion.span
                        className="ml-2 inline-block"
                        initial={{ x: -5 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </Link>

                  <Link
                    href="https://financeiro.lowping.com.br/index.php?rp=/store/game-miami-usa-performance"
                    target="_blank"
                    className="flex-1 text-center border border-blue-500 text-blue-400 px-6 py-3 rounded-md font-medium hover:bg-blue-900/20 transition-colors"
                  >
                    <motion.span whileHover={{ x: 2 }} className="inline-block">
                      {t("personalize_plan.see_all_plans")} <ExternalLinkIcon size={16} className="inline-block ml-1" />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>

              {/* Pricing Disclaimer Note */}
              <div className="mb-6">
                <p className="text-xs text-gray-400">
                  {t("personalize_plan.disclaimer")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}