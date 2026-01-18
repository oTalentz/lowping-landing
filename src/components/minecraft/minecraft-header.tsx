// Imports of packages
import { getTranslations } from "next-intl/server"

export default async function MinecraftHeader() {
    const t = await getTranslations("minecraft.header")

    return (
        <div className="w-full pt-60 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/games/minecraft.jpg')" }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.8)_60%,black_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <div className="w-full relative z-20 container mx-auto h-full px-4 py-8 flex flex-col items-center justify-center text-center">
                <div className="text-white">
                    <h1 className="text-5xl text-white/90">
                        {t("title_1")}
                    </h1>
                    <h1 className="text-7xl">
                        {t("title_2")}
                    </h1>
                    <p className="text-lg text-white/80">
                        {t("description")}
                    </p>
                </div>
            </div>
        </div>
    )
}