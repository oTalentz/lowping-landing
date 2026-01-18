"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, Loader2, Globe, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { setCookie } from "@/lib/cookies"
import { useMobile } from "@/hooks/use-mobile"

type Locale = {
  code: string
  name: string
}

const locales: Locale[] = [
  { code: "pt-BR", name: "Português" },
  { code: "en-US", name: "English" },
  { code: "es-ES", name: "Español" },
]

export default function LocaleSelectDropdown() {
  const isMobile = useMobile()
  const usingLocale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [changingToLocale, setChangingToLocale] = useState<Locale | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const changeLocale = async (code: string) => {
    const locale = locales.find((l) => l.code === code)
    if (!locale || usingLocale === code) return
    setChangingToLocale(locale)
    try {
      await setCookie("i18n@locale", locale.code)
    } finally {
      setChangingToLocale(null)
      setIsOpen(false)
    }
  }

  const current = locales.find((l) => l.code === usingLocale) || locales[0]

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-full md:w-auto">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full md:w-fit flex items-center justify-between gap-2 bg-[#0a1a2a] text-white px-4 py-2 rounded-md focus:outline-none transition"
      >
        <Image
          src={`/images/flags/${current.code.split("-")[1]}.svg`}
          alt={current.name}
          width={24}
          height={24}
          className="rounded-sm"
        />
        <span>{current.name}</span>
        <ChevronDown className={cn("w-5 h-5 transform transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsOpen(false)}
              />
            )}

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute z-50 bg-[#0a1a2a] text-white rounded-lg overflow-hidden right-0 mt-5 w-56 border border-[#1f3245] shadow-lg"
              >
                <div className="flex flex-col py-2 px-2">
                  {locales.map((locale) => (
                    <button
                      key={locale.code}
                      onClick={() => changeLocale(locale.code)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm w-full text-left transition rounded-md",
                        usingLocale === locale.code ? "bg-[#25406b] font-medium" : "hover:bg-[#1a2a3a]"
                      )}
                    >
                      <Image
                        src={`/images/flags/${locale.code.split("-")[1]}.svg`}
                        alt={locale.name}
                        width={28}
                        height={28}
                        className="rounded-sm"
                      />
                      <span className="flex-1">{locale.name}</span>
                      {usingLocale === locale.code && <Check className="w-5 h-5 text-blue-300" />}
                      {changingToLocale?.code === locale.code && (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed z-50 bg-[#0a1a2a] text-white rounded-lg overflow-hidden inset-x-4 top-16 bottom-16 max-h-[80vh]"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f3245]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-white" />
                    <span className="font-medium">Selecionar idioma</span>
                  </div>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex flex-col py-2 overflow-y-auto">
                  {locales.map((locale) => (
                    <button
                      key={locale.code}
                      onClick={() => changeLocale(locale.code)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm w-full text-left transition rounded-md",
                        usingLocale === locale.code ? "bg-[#25406b] font-medium" : "hover:bg-[#1a2a3a]"
                      )}
                    >
                      <Image
                        src={`/images/flags/${locale.code.split("-")[1]}.svg`}
                        alt={locale.name}
                        width={28}
                        height={28}
                        className="rounded-sm"
                      />
                      <span className="flex-1">{locale.name}</span>
                      {usingLocale === locale.code && <Check className="w-5 h-5 text-blue-300" />}
                      {changingToLocale?.code === locale.code && (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
