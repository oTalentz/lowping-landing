"use client"

import Logo from "./logo"
import Link from "next/link"
import CreateServerButton from "./ui/create-server"
import SelectLangButton from "./ui/select-lang"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

type NavLink = {
    nameKey: string
    href: string
}

const links: NavLink[] = [
    {
        nameKey: "home",
        href: "/"
    },
    {
        nameKey: "minecraft",
        "href": "/minecraft"
    },
    {
        nameKey: "games",
        href: "/games"
    },
    {
        nameKey: "vps",
        href: "/vps"
    },
    {
        nameKey: "help",
        href: "/#help"
    }
]

export default function Navbar() {
    const t = useTranslations("navbar")
    const pathname = usePathname()

    const [isScrolled, setIsScrolled] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isDrawerOpen])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLinkClick = () => {
        setIsDrawerOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isDrawerOpen) {
                setIsDrawerOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isDrawerOpen])

    return (
        <>
            <motion.nav
                className={`fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"}`}
                initial={false}
                animate={isScrolled ? "scrolled" : "top"}
                variants={{
                    top: {
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0)",
                    },
                    scrolled: {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(11.5px)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
                    },
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center text-white"
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                className="text-xl font-bold mr-4 md:mr-8"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={"/"}>
                                    <Logo />
                                </Link>
                            </motion.span>

                            <div className="hidden md:flex space-x-4 lg:space-x-6">
                                {links.map((link) => (
                                    <motion.a
                                        key={link.nameKey}
                                        href={link.href}
                                        aria-label={t(`${link.nameKey}.aria_label`)}
                                        className={`font-medium text-base lg:text-xl ${pathname === link.href ? "text-blue-600" : "text-white hover:text-blue-300"}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t(`${link.nameKey}.text`)}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div layout className="hidden md:flex items-center space-x-4 lg:space-x-6 text-white">
                            <CreateServerButton />
                            <span className={`${isScrolled && "hidden"}`}>
                                <SelectLangButton />
                            </span>
                        </motion.div>

                        <motion.button
                            className="md:hidden flex items-center p-2 rounded-full hover:bg-white/10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDrawerOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} color="white" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                        />

                        <motion.div
                            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-gradient-to-b from-gray-900 to-black text-white z-50 flex flex-col shadow-xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
                                <Logo />
                                <motion.button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            <div className="flex flex-col py-6 px-5 flex-1 overflow-y-auto">
                                {links.map((link, index) => (
                                    <motion.div
                                        key={link.nameKey}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            aria-label={t(`${link.nameKey}.aria_label`)}
                                            className={`block py-3 font-medium text-lg ${pathname === link.href
                                                    ? "text-blue-500"
                                                    : "text-white hover:text-blue-300"
                                                } transition-colors`}
                                            onClick={handleLinkClick}
                                        >
                                            {t(`${link.nameKey}.text`)}
                                        </Link>
                                        {index < links.length - 1 && (
                                            <div className="h-px bg-gray-800/60 my-1" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-5 border-t border-gray-800 space-y-4">
                                <CreateServerButton className="w-full md:w-fit" />
                                <SelectLangButton />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}