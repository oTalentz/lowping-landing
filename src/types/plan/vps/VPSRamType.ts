export const ramTypeNames = {
    DDR3: "DDR3",
    DDR4: "DDR4",
    DDR5: "DDR5",
    DDR6: "DDR6"
} as const

export type VPSRamType = keyof typeof ramTypeNames

export function getRamTypeName(ramType: VPSRamType): string {
    return ramTypeNames[ramType] ?? ramType
}