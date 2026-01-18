import PlanTierType from "@/types/plan/PlanTierType"

export interface GamePlanSimulation {
    id: number
    tierType: PlanTierType
    baseRAM: number
    maxRAM: number
    basePriceBRL: number
    whmcsPid: number // Product ID in WHMCS
}