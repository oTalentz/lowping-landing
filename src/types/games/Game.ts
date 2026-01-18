export interface Game {
    type: GameType
    name: string
    slug: string
    image: string
    firstPlanPrice: number
    whmcsEggId?: string // ID of the option value for the Egg configurable option
}

export const games: Game[] = [
    {
        type: 'STANDALONE',
        name: "Minecraft",
        slug: "minecraft",
        image: "/images/games/minecraft.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "1"
    },
    {
        type: 'STANDALONE',
        name: "Terraria",
        slug: "terraria",
        image: "/images/games/terraria.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "2"
    },
    {
        type: 'STANDALONE',
        name: "Factorio",
        slug: "factorio",
        image: "/images/games/factorio.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "3"
    },
    {
        type: 'STEAM_CDM',
        name: "Space Engineers - Torch",
        slug: "space-engineers-torch",
        image: "/images/games/space-engineers.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "4"
    },
    {
        type: 'STEAM_CDM',
        name: "Palworld",
        slug: "palworld",
        image: "/images/games/palworld.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "5"
    },
    {
        type: 'STEAM_CDM',
        name: "Satisfactory",
        slug: "satisfactory",
        image: "/images/games/satisfactory.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "6"
    },
    {
        type: 'STEAM_CDM',
        name: "Counter-Strike 2",
        slug: "counter-strike-2",
        image: "/images/games/cs2.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "7"
    },
    {
        type: 'STEAM_CDM',
        name: "Rust",
        slug: "rust",
        image: "/images/games/rust.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "8"
    },
    {
        type: 'STEAM_CDM',
        name: "Valheim",
        slug: "valheim",
        image: "/images/games/valheim.png",
        firstPlanPrice: 4.90,
        whmcsEggId: "9"
    },
    {
        type: 'STEAM_CDM',
        name: "V Rising",
        slug: "v-rising",
        image: "/images/games/v-rising.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "10"
    },
    {
        type: 'STEAM_CDM',
        name: "ARK: Survival Evolved",
        slug: "ark-survival-evolved",
        image: "/images/games/ark-survival-evolved.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "11"
    },
    {
        type: 'STEAM_CDM',
        name: "ARK: Survival Ascended",
        slug: "ark-survival-ascended",
        image: "/images/games/ark-survival-ascended.jpg",
        firstPlanPrice: 4.90,
        whmcsEggId: "12"
    }
]