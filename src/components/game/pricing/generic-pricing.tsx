'use client'

// Imports of packages
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Server, Zap, Pickaxe, Check } from 'lucide-react'
import Link from 'next/link'

// Import of the project
import PlanLocation from '@/types/plan/PlanLocation'
import PlanTier from '@/types/plan/PlanTier'
import GamesPlan from '@/types/plan/GamesPlan'

interface Location {
  id: number
  product: string
  countryCode: string
  countryNameByLocale: { 'en-US': string }
  cityNameByLocale: { 'en-US': string }
  descriptionByLocale: { 'en-US': string }
  detach: boolean
}

interface Tier {
  id: number
  type: string
  locationId: number
  titleByLocale: { 'en-US': string }
  descriptionByLocale: { 'en-US': string }
  detach: boolean
}

interface Plan {
  id: number
  tierId: number
  priceBRL: number
  ram: number
  color: string
  secondaryColor: string
  titleByLocale: { 'en-US': string }
  featuresByLocale: { 'en-US': string[] }
  detach: boolean
}

type PricingCarouselProps = {
  locations: PlanLocation[]
  tiers: PlanTier[]
  plans: GamesPlan[]
}

export default function GenericPricing({ }: PricingCarouselProps) {
  const mockData = {
    locations: [
      {
        id: 3,
        product: "GAMES_GENERIC",
        countryCode: "US",
        countryNameByLocale: { "en-US": "USA" },
        cityNameByLocale: { "en-US": "New York" },
        descriptionByLocale: { "en-US": "Ping 90~120ms" },
        detach: false
      }
    ],
    tiers: [
      {
        id: 3,
        type: "BASIC",
        locationId: 3,
        titleByLocale: { "en-US": "Basic" },
        descriptionByLocale: { "en-US": "AMD Ryzen 7 5700x" },
        detach: false
      },
      {
        id: 4,
        type: "PREMIUM",
        locationId: 3,
        titleByLocale: { "en-US": "Premium" },
        descriptionByLocale: { "en-US": "Intel i9-12900K" },
        detach: false
      }
    ],
    plans: [
      {
        id: 1,
        tierId: 3,
        priceBRL: 12.95,
        ram: 2,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Starter" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "24/7 Support",
            "Auto Backup",
            "SSD Storage"
          ]
        },
        detach: false
      },
      {
        id: 2,
        tierId: 3,
        priceBRL: 19.95,
        ram: 4,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Standard" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "24/7 Support",
            "Daily Backup",
            "SSD Storage"
          ]
        },
        detach: false
      },
      {
        id: 3,
        tierId: 4,
        priceBRL: 24.95,
        ram: 6,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Pro" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "Priority Support",
            "Daily Backup",
            "NVMe Storage"
          ]
        },
        detach: false
      },
      {
        id: 4,
        tierId: 4,
        priceBRL: 34.95,
        ram: 8,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Elite" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "Priority Support",
            "Hourly Backup",
            "NVMe Storage"
          ]
        },
        detach: false
      },
      {
        id: 5,
        tierId: 4,
        priceBRL: 34.95,
        ram: 12,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Elite" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "Priority Support",
            "Hourly Backup",
            "NVMe Storage"
          ]
        },
        detach: false
      },
      {
        id: 6,
        tierId: 4,
        priceBRL: 34.95,
        ram: 16,
        color: "#1E40AF",
        secondaryColor: "#1E3A8A",
        titleByLocale: { "en-US": "Elite" },
        featuresByLocale: {
          "en-US": [
            "Unlimited Players",
            "Priority Support",
            "Hourly Backup",
            "NVMe Storage"
          ]
        },
        detach: false
      }
    ]
  }

  const { locations, tiers, plans } = mockData

  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0])
  const [selectedTier, setSelectedTier] = useState<Tier>(tiers[0])
  const [selectedRam, setSelectedRam] = useState<number>(plans[0].ram)
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false)

  const availableRamOptions = useMemo(() => {
    const rams = plans
      .filter(plan => plan.tierId === selectedTier.id)
      .map(plan => plan.ram)
    return [...new Set(rams)].sort((a, b) => a - b)
  }, [plans, selectedTier])

  const selectedPlan = useMemo(() => {
    return plans.find(plan => plan.tierId === selectedTier.id && plan.ram === selectedRam) || plans[0]
  }, [plans, selectedTier, selectedRam])

  const getLocationName = (location: Location) => {
    if (!location) return ""
    const city = location.cityNameByLocale["en-US"]
    const country = location.countryNameByLocale["en-US"]
    return `${city}, ${country}`
  }

  const getLocationDescription = (location: Location) => {
    if (!location) return ""
    return location.descriptionByLocale["en-US"]
  }

  const handleTierChange = (tier: Tier) => {
    setSelectedTier(tier)
    const tierPlans = plans.filter(plan => plan.tierId === tier.id)
    const defaultRam = tierPlans[0]?.ram || plans[0].ram
    setSelectedRam(defaultRam)
    setIsTierDropdownOpen(false)
  }

  if (!availableRamOptions.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
        <div className="text-red-400 text-center">
          No RAM options available for the selected tier.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-gray-900/80 backdrop-blur-sm text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-800"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 sm:mb-12 tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
          Craft Your Modular Plan
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="lg:col-span-3 space-y-8 sm:space-y-10">
            <div>
              <label className="block text-sm sm:text-base font-semibold mb-3 text-gray-200">Server Location</label>
              <div className="relative">
                <motion.button
                  className="w-full bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-sm"
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  whileHover={{ borderColor: "#3B82F6", scale: 1.01 }}
                >
                  <div className="text-left">
                    <div className="font-medium text-white text-sm sm:text-base">{getLocationName(selectedLocation)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{getLocationDescription(selectedLocation)}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: isLocationDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-300" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isLocationDropdownOpen && (
                    <motion.div
                      className="absolute mt-2 w-full bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 z-20 shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {locations.map((location) => (
                        <motion.div
                          key={location.id}
                          className="p-4 sm:p-5 hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                          whileHover={{ backgroundColor: "#3B82F620" }}
                          onClick={() => {
                            setSelectedLocation(location)
                            setIsLocationDropdownOpen(false)
                          }}
                        >
                          <div className="font-medium text-sm sm:text-base">{getLocationName(location)}</div>
                          <div className="text-xs sm:text-sm text-gray-400">{getLocationDescription(location)}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold mb-3 text-gray-200">Server Tier</label>
              <div className="relative">
                <motion.button
                  className="w-full bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl flex justify-between items-center border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-sm"
                  onClick={() => setIsTierDropdownOpen(!isTierDropdownOpen)}
                  whileHover={{ borderColor: "#3B82F6", scale: 1.01 }}
                >
                  <div className="text-left">
                    <div className="font-medium text-white text-sm sm:text-base">{selectedTier.titleByLocale["en-US"]}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{selectedTier.descriptionByLocale["en-US"]}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: isTierDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-300" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isTierDropdownOpen && (
                    <motion.div
                      className="absolute mt-2 w-full bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 z-20 shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tiers.filter(tier => tier.locationId === selectedLocation.id).map((tier) => (
                        <motion.div
                          key={tier.id}
                          className="p-4 sm:p-5 hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                          whileHover={{ backgroundColor: "#3B82F620" }}
                          onClick={() => handleTierChange(tier)}
                        >
                          <div className="font-medium text-sm sm:text-base">{tier.titleByLocale["en-US"]}</div>
                          <div className="text-xs sm:text-sm text-gray-400">{tier.descriptionByLocale["en-US"]}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm sm:text-base font-semibold text-gray-200">Memory (RAM)</label>
                <span className="text-sm sm:text-base font-medium text-blue-400">{selectedRam}GB</span>
              </div>
              <motion.div className="relative w-full h-2 bg-gray-800 rounded-full overflow-visible">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${(availableRamOptions.indexOf(selectedRam) / (availableRamOptions.length - 1)) * 100}%`,
                    background: `linear-gradient(to right, ${selectedPlan.color || "#3B82F6"}, ${selectedPlan.secondaryColor || "#2563EB"})`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div
                  className="absolute top-[-8px] w-5 h-5 bg-blue-500 rounded-full shadow-lg border-2 border-white"
                  style={{
                    left: `${(availableRamOptions.indexOf(selectedRam) / (availableRamOptions.length - 1)) * 100}%`,
                    x: '-50%'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.2 }}
                />
                <input
                  type="range"
                  min={0}
                  max={availableRamOptions.length - 1}
                  step={1}
                  value={availableRamOptions.indexOf(selectedRam)}
                  onChange={(e) => {
                    const index = parseInt(e.target.value)
                    if (index >= 0 && index < availableRamOptions.length) {
                      setSelectedRam(availableRamOptions[index])
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer"
                />
              </motion.div>
              <div className="relative mt-4 text-xs sm:text-sm text-gray-300">
                {availableRamOptions.map((ram, index) => (
                  <span
                    key={ram}
                    className="absolute text-center font-medium"
                    style={{
                      left: `${(index / (availableRamOptions.length - 1)) * 100}%`,
                      transform: 'translateX(-50%)',
                      width: '50px'
                    }}
                  >
                    {ram}GB
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              {selectedPlan && (
                <motion.div
                  key={selectedPlan.id + "-" + selectedRam}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between border border-gray-700 shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{selectedPlan.titleByLocale["en-US"]}</h3>
                    </div>

                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                      R${selectedPlan.priceBRL.toFixed(2)}
                      <span className="text-base sm:text-lg lg:text-xl font-normal text-gray-400">/mo</span>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <Server className="text-blue-400 flex-shrink-0" size={22} />
                        <span className="text-gray-200 text-sm sm:text-base">{selectedTier.descriptionByLocale["en-US"]}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Zap className="text-blue-400 flex-shrink-0" size={22} />
                        <span className="text-gray-200 text-sm sm:text-base">{selectedRam}GB RAM</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Pickaxe className="text-blue-400 flex-shrink-0" size={22} />
                        <span className="text-gray-200 text-sm sm:text-base">{getLocationName(selectedLocation)}</span>
                      </div>

                      <div className="mt-8 space-y-4">
                        {selectedPlan.featuresByLocale["en-US"].map((feature, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <Check className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href="https://financeiro.lowping.com.br/index.php?rp=/store/game-miami-usa-performance" target="_blank" className="w-full">
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm sm:text-base py-3 sm:py-4 rounded-xl mt-8 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
                      whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      Select This Plan
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}