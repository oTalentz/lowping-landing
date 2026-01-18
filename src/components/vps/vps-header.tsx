// Imports of packages
import Image from "next/image"
import { getTranslations } from "next-intl/server"

// Import of the project
import AnimatedContent from "@/components/ui/animated-content"
import BlurText from "../ui/blur-text"
import SplitText from "../ui/split-text"
import VPSImage from "../../../public/images/vps/vps.png"

export default async function VPSHeader() {
    const t = await getTranslations("vps.header")

    return (
        <div className="w-full h-screen relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: "url('/images/blured-blue-bg.png')" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-70" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="lines w-full h-full m-auto relative z-0">
                    <div className="line w-[1px] h-full absolute left-[14.3%] bg-white/10"></div>
                    <div className="line w-[1px] h-full absolute left-[28.6%] bg-white/10"></div>
                    <div className="line w-[1px] h-full absolute left-[42.9%] bg-white/10"></div>
                    <div className="line w-[1px] h-full absolute left-[57.2%] bg-white/10"></div>
                    <div className="line w-[1px] h-full absolute left-[71.5%] bg-white/10"></div>
                    <div className="line w-[1px] h-full absolute left-[85.8%] bg-white/10"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="relative z-20 container mx-auto h-full px-4 py-8 flex flex-col md:flex-row justify-center items-center">
                <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <BlurText
                        text={t("coming_soon")}
                        delay={20}
                        animateBy="words"
                        direction="top"
                        className="text-blue-600 text-lg md:text-xl font-medium mb-2"
                    />
                    <SplitText
                        text={t("title_line1")}
                        className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-t from-blue-500 to-white bg-clip-text text-transparent"
                        delay={80}
                        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                    <SplitText
                        text={t("title_line2")}
                        className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-blue-500"
                        delay={120}
                        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                    <SplitText
                        text={t("title_line3")}
                        className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent"
                        delay={180}
                        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <AnimatedContent
                        distance={150}
                        direction="horizontal"
                        reverse={false}
                        config={{ tension: 80, friction: 20 }}
                        initialOpacity={0.05}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                    >
                        <Image
                            src={VPSImage}
                            alt="VPS"
                            width={500}
                            height={500}
                            priority
                            className="drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        />
                    </AnimatedContent>
                </div>
            </div>
        </div>
    )
}