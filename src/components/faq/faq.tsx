import Link from "next/link"
import FAQList from "./faq-list"
import { ExternalLink, Smartphone, Tag } from "lucide-react"
import { FAQCategory } from "@/types/faq/FAQCategory"
import { getTranslations } from "next-intl/server"
import { DynamicContent, getDynamicContentValue } from "@/types/dynamic-content/DynamicContent"

type FAQProps = {
    category: FAQCategory
    dynamicContent: DynamicContent[]
}

export default async function FAQ({ category, dynamicContent }: FAQProps) {
    const t = await getTranslations("faq")

    return (
        <>
            <div className="mt-12 sm:mt-16 md:mt-24 w-full px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center">
                <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent text-center">
                    {t("description")}
                </h2>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-tight text-center mt-2">
                    {t("title")}
                </h1>
                <div className="w-full mx-auto mt-5 sm:mt-8">
                    <div className="w-full max-w-screen-2xl mx-auto overflow-hidden px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-72">
                        <FAQList category={category} />
                    </div>
                </div>
            </div>

            <div className="mt-12 mb-40 sm:mt-16 md:mt-24 w-full px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center">
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-tight text-center">
                    {t("more_questions_lore.1")}
                </h1>
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-tight text-center mt-1 sm:mt-2">
                    {t("more_questions_lore.2")}
                </h1>

                <div className="w-full flex md:flex-row flex-col items-center justify-center mt-8 gap-8">
                    <Link
                        href={getDynamicContentValue(dynamicContent, "SITE_SUPPORT_URL") || "/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto sm:h-20 rounded-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-4 sm:py-0 bg-blue-400/10 backdrop-blur-sm border-2 border-blue-700/40 transition duration-300 ease-in-out hover:border-blue-700/100"
                    >
                        <div className="bg-white p-3 sm:p-4 rounded-full mb-2 sm:mb-0">
                            <Tag strokeWidth={2} color="black" size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="text-white text-center sm:text-start">
                            <h2 className="text-xl sm:text-2xl font-medium">
                                {t("support.site.title")}
                            </h2>
                            <p className="flex items-center justify-center sm:justify-start gap-1 opacity-80 text-sm sm:text-base">
                                {t("support.site.description")} <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </p>
                        </div>
                    </Link>
                    <Link
                        href="https://discord.gg/apFUEw4zyv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto sm:h-20 rounded-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-4 sm:py-0 bg-blue-400/10 backdrop-blur-sm border-2 border-blue-700/40 transition duration-300 ease-in-out hover:border-blue-700/100"
                    >
                        <div className="bg-white p-3 sm:p-4 rounded-full mb-2 sm:mb-0">
                            <Smartphone strokeWidth={2} color="black" size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="text-white text-center sm:text-start">
                            <h2 className="text-xl sm:text-2xl font-medium">
                                {t("support.discord.title")}
                            </h2>
                            <p className="flex items-center justify-center sm:justify-start gap-1 opacity-80 text-sm sm:text-base">
                                {t("support.discord.description")} <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}