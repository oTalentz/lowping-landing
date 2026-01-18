import { VPSRamType } from "./VPSRamType"
import { VPSStorageType } from "./VPSStorageType"

export default interface VPSPlan {
    id: number
    tierId: number
    priceBRL: number
    cpuBrand: string
    vCores: number
    cpuSpeedGHz: number
    ramGB: number
    ramType: VPSRamType
    linkSpeedMbps: number
    monthlyDataLimitGB: number | null
    storageAmountGB: number
    storageType: VPSStorageType
    featuresByLocale: Record<string, string[]>
    detach: boolean
}