import Image from "next/image"
import Link from "next/link"
import FAQList from "../faq/faq-list"
import { ExternalLink, Smartphone, Tag } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { DynamicContent, getDynamicContentValue } from "@/types/dynamic-content/DynamicContent"

type HomeFAQProps = {
    dynamicContent: DynamicContent[]
}

export default async function HomeFAQ({ dynamicContent }: HomeFAQProps) {
    const t = await getTranslations("faq")

    return (
        <section id="help" className="bg-slate-900/30 py-8 sm:py-10 lg:py-20">
            <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto flex flex-col items-center justify-center">
                    <h2 className="text-lg sm:text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent text-center">
                        {t("description")}
                    </h2>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight mt-2 text-center">
                        {t("title")}
                    </h1>

                    <div className="w-full mx-auto grid gap-8 sm:gap-10 lg:gap-16 md:grid-cols-1 lg:grid-cols-2 mt-8 sm:mt-10">
                        <div className="flex items-center justify-center order-2 lg:order-1">
                            <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px]">
                                <Image
                                    className="object-contain w-full h-auto"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    alt="FAQ image"
                                    src="/images/home-faq.png"
                                    priority={false}
                                />
                            </div>
                        </div>
                        <div className="w-full overflow-hidden order-1 lg:order-2">
                            <FAQList category="HOME" />
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight text-center">
                        {t("more_questions_lore.1")}
                    </h1>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight text-center">
                        {t("more_questions_lore.2")}
                    </h1>

                    <div className="w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 mb-10">
                        <Link
                            href={getDynamicContentValue(dynamicContent, "SITE_SUPPORT_URL") || "/"}
                            target="_blank"
                            className="w-full max-w-[320px] md:max-w-[360px] h-auto py-4 rounded-md flex items-center gap-4 px-4 bg-blue-400/10 backdrop-blur-sm border-2 border-blue-700/40 transition duration-300 ease-in-out hover:border-blue-700/100 hover:shadow-lg hover:shadow-blue-700/20"
                        >
                            <div className="bg-white p-3 sm:p-4 rounded-full flex-shrink-0">
                                <Tag strokeWidth={2} color="black" size={20} />
                            </div>
                            <div className="text-white text-start">
                                <h1 className="text-xl sm:text-2xl font-medium">
                                    {t("support.site.title")}
                                </h1>
                                <p className="flex gap-1 opacity-80 text-sm sm:text-base items-center">
                                    {t("support.site.description")} <ExternalLink size={16} />
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="https://discord.gg/apFUEw4zyv"
                            target="_blank"
                            className="w-full max-w-[320px] md:max-w-[360px] h-auto py-4 rounded-md flex items-center gap-4 px-4 bg-blue-400/10 backdrop-blur-sm border-2 border-blue-700/40 transition duration-300 ease-in-out hover:border-blue-700/100 hover:shadow-lg hover:shadow-blue-700/20"
                        >
                            <div className="bg-white p-3 sm:p-4 rounded-full flex-shrink-0">
                                <Smartphone strokeWidth={2} color="black" size={20} />
                            </div>
                            <div className="text-white text-start">
                                <h1 className="text-xl sm:text-2xl font-medium">
                                    {t("support.discord.title")}
                                </h1>
                                <p className="flex gap-1 opacity-80 text-sm sm:text-base items-center">
                                    {t("support.discord.description")} <ExternalLink size={16} />
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}