import { getTranslations } from "next-intl/server"
import SplitText from "../ui/split-text"
import Squares from "../ui/squares2"

export default async function GamesHeader() {
    const t = await getTranslations("games.header")

    return (
        <div className="w-full h-96 relative overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                <Squares
                    speed={0.6}
                    squareSize={50}
                    direction='diagonal'
                    borderColor='#fff'
                    hoverFillColor='#222'
                />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0.8)_60%,black_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            <div className="mt-10 w-full relative z-20 container mx-auto h-full px-4 py-8 flex flex-col items-center justify-center text-center">
                <SplitText
                    text={t("title_1")}
                    className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-t from-blue-500 to-white bg-clip-text text-transparent"
                    delay={80}
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                    threshold={0.2}
                    rootMargin="-50px"
                />
                <SplitText
                    text={t("title_2")}
                    className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-blue-500"
                    delay={120}
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                    threshold={0.2}
                    rootMargin="-50px"
                />
            </div>
        </div>
    )
}