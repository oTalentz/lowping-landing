export const storageTypeNames = {
    HDD_SATA: "HDD SATA",
    HDD_SAS: "HDD SAS",
    HDD_FC: "HDD FC",
    SSD_SATA: "SSD SATA",
    SSD_NVME_M2: "SSD NVMe M.2",
    SSD_NVME_U2: "SSD NVMe U.2",
    SSD_NVME_PCIE: "SSD NVMe PCIe"
} as const

export type VPSStorageType = keyof typeof storageTypeNames

export function getStorageTypeName(storageType: VPSStorageType): string {
    return storageTypeNames[storageType] ?? storageType
}