import Link from "next/link"
import Logo from "./logo"
import { getLocale, getTranslations } from "next-intl/server"
import { DynamicContent, getDynamicContentValue } from "@/types/dynamic-content/DynamicContent"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"

type FooterProps = {
    dynamicContent: DynamicContent[]
}

export default async function Footer({ dynamicContent }: FooterProps) {
    const t = await getTranslations("footer")
    const locale = await getLocale()

    return (
        <footer className="relative w-full border-t border-t-white/10 bg-gradient-to-b from-black to-slate-900/90 py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-48 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12">
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <Logo width={120} height={120} className="w-32 h-32 sm:w-36 sm:h-36 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            </div>
                        </div>
                        <p className="text-gray-400 text-center mt-4 max-w-xs">
                            {t("tagline")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 w-full md:max-w-3xl">
                        <div className="flex flex-col">
                            <h2 className="text-white text-lg sm:text-xl font-medium mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {t("legal_information.title")}
                            </h2>

                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/terms-of-use"
                                        aria-label={t("legal_information.terms_of_use.aria_label")}
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("legal_information.terms_of_use.text")}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        aria-label={t("legal_information.privacy_policy.aria_label")}
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("legal_information.privacy_policy.text")}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-white text-lg sm:text-xl font-medium mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {t("contact.title")}
                            </h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="https://discord.gg/apFUEw4zyv"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("contact.discord_text")}
                                        </span>
                                        <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`mailto:${getDynamicContentValue(dynamicContent, "EMAIL_ADDRESS") || "unknown"}`}
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("contact.email_text")}
                                        </span>
                                        <ArrowUpRight size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-white text-lg sm:text-xl font-medium mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {t("company.title")}
                            </h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href={getDynamicContentValue(dynamicContent, "CUSTOMER_AREA_URL") || "/"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("company.customer_area_text")}
                                        </span>
                                        <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={getDynamicContentValue(dynamicContent, "HELP_CENTER_URL") || "/"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("company.help_center_text")}
                                        </span>
                                        <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={getDynamicContentValue(dynamicContent, "NETWORK_STATUS_URL") || "/"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 text-sm sm:text-base transition duration-300 ease-in-out hover:text-blue-400 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {t("company.network_status_text")}
                                        </span>
                                        <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8 sm:my-10"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base order-2 sm:order-1">
                        {t.rich("rights", {
                            year: new Date().getFullYear()
                        })}
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base mb-2 sm:mb-0 order-1 sm:order-2 flex items-center gap-1.5">
                        {t.rich("credits", {
                            Link: (text) => <Link
                                href={`https://maxyni.com.br/?loc=${locale}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-300 transition-al duration-300 text-base sm:text-lg inline-flex items-center group"
                            >
                                {text}
                            </Link>
                        })}
                    </p>
                </div>
            </div>
        </footer>
    )
}