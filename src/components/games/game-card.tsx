"use client"

import { ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

type GameCardProps = {
    name: string
    image: string
    firstPlanPrice: number
    href: string
}

export default function GameCard({ name, image, firstPlanPrice, href }: GameCardProps) {
    const t = useTranslations("home.choose_game.card")

    return (
        <Link href={href} className="relative block w-72 h-40 rounded-xl overflow-hidden group border-2 border-white/20">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="relative w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 ease-in-out flex flex-col justify-end p-4">
                <ExternalLink
                    strokeWidth={1.5}
                    color="white"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <h1 className="text-white text-2xl font-medium leading-2">
                        {name}
                    </h1>
                    {firstPlanPrice > 0 && (
                        <h2 className="text-white text-lg leading-3">
                            {t.rich("starting_price_text", {
                                price: firstPlanPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                            })}
                        </h2>
                    )}
                </div>
            </div>
        </Link>
    )
}