"use client"

// Imports of packages
import { useState, useRef, useMemo, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ChevronDown, Search, AlertCircle, X } from "lucide-react"
import { useTranslations } from "next-intl"

// Import of the project
import { FAQCategory } from "@/types/faq/FAQCategory"
import { FAQItem } from "@/types/faq/FAQItem"

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
}

const toggleButtonVariants = {
    initial: { y: 0, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
    showAll: { y: 0 },
    showLess: { y: -5 }
}

type FAQProps = {
    faqs: FAQItem[]
    category: FAQCategory
}

export default function FAQSearch({ faqs, category }: FAQProps) {
    const t = useTranslations("faq.search")
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<FAQCategory>(category)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setActiveCategory(category)
    }, [category])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(faqs.map(faq => faq.category)))
        return uniqueCategories
    }, [faqs])

    const filteredFaqs = useMemo(() => {
        let result = faqs.filter(faq => {
            if (activeCategory === "HOME") {
                return searchTerm ? true : faq.category === "HOME"
            }
            return faq.category === activeCategory
        })

        if (searchTerm) {
            result = result.filter(faq =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        return result
    }, [faqs, activeCategory, category, searchTerm])

    const displayedFaqs = useMemo(() => {
        if (searchTerm || showAll) {
            return filteredFaqs
        }
        return filteredFaqs.slice(0, 3)
    }, [filteredFaqs, searchTerm, showAll])

    const showCategorySeparators = activeCategory === "HOME" && searchTerm.length > 0

    const faqsByCategory = useMemo(() => {
        if (!showCategorySeparators) return null

        return displayedFaqs.reduce((acc, faq) => {
            if (!acc[faq.category]) {
                acc[faq.category] = []
            }
            acc[faq.category].push(faq)
            return acc
        }, {} as Record<FAQCategory, FAQItem[]>)
    }, [displayedFaqs, showCategorySeparators])

    const handleToggle = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm("")
        setShowAll(false)
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }

    const handleCategorySelect = (selectedCategory: FAQCategory) => {
        setActiveCategory(selectedCategory)
        setIsDropdownOpen(false)
    }

    const handleToggleShowAll = () => {
        setShowAll(prev => !prev)
    }

    return (
        <div className="w-full min-w-full min-h-[250px]">
            <motion.div
                className="flex flex-col md:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <motion.input
                        ref={searchRef}
                        type="text"
                        className="w-full pl-12 pr-10 py-3 rounded-xl bg-gray-800/60 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400 outline-none transition-all duration-300"
                        placeholder={t("input_placeholder")}
                        value={searchTerm}
                        onChange={handleSearch}
                        whileFocus={{ borderColor: "rgb(59, 130, 246)" }}
                        transition={{ duration: 0.2 }}
                    />
                    {searchTerm && (
                        <motion.button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <X size={18} />
                        </motion.button>
                    )}
                </div>

                <div className="relative" ref={dropdownRef}>
                    <motion.button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex justify-between items-center w-full md:w-48 py-3 px-4 rounded-xl bg-gray-800/60 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white outline-none transition-all duration-300 hover:bg-gray-800/80"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <span>
                            {t(`categories_name.${activeCategory}`)}
                        </span>
                        <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                                className="absolute z-50 w-full mt-2 rounded-xl bg-gray-800 border border-gray-700 shadow-lg shadow-black/30 overflow-hidden"
                                role="listbox"
                            >
                                <div className="py-1 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-700">
                                    {categories.map((categoryOption, index) => (
                                        <motion.div
                                            key={categoryOption}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            className={`cursor-pointer px-4 py-2.5 ${activeCategory === categoryOption
                                                ? "bg-blue-600/20 text-blue-300"
                                                : "text-white hover:bg-gray-700/50"
                                                }`}
                                            onClick={() => handleCategorySelect(categoryOption)}
                                            role="option"
                                            aria-selected={activeCategory === categoryOption}
                                            whileHover={{
                                                backgroundColor: activeCategory === categoryOption ? "rgba(37, 99, 235, 0.3)" : "rgba(55, 65, 81, 0.5)"
                                            }}
                                        >
                                            <motion.span
                                                whileHover={{ x: 2 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                className="block"
                                            >
                                                {t(`categories_name.${categoryOption}`)}
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="space-y-3">
                {displayedFaqs.length > 0 ? (
                    <LayoutGroup>
                        <motion.div
                            layout
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {showCategorySeparators && faqsByCategory ? (
                                Object.entries(faqsByCategory).map(([category, items], groupIndex) => (
                                    <motion.div
                                        key={category}
                                        className="space-y-4 mb-8"
                                        layout
                                        variants={itemVariants}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">
                                            {t(`categories_name.${category}`)}
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {items.map((item, index) => (
                                                <motion.div
                                                    key={`${category}-${index}`}
                                                    layout
                                                    variants={itemVariants}
                                                >
                                                    <FAQItemComp
                                                        item={{
                                                            question: item.question,
                                                            answer: item.answer,
                                                        }}
                                                        open={openIndex === (groupIndex * 1000) + index}
                                                        toggle={() => handleToggle((groupIndex * 1000) + index)}
                                                        highlight={searchTerm}
                                                    />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <AnimatePresence initial={false} mode="popLayout">
                                    <motion.div className="space-y-4" layout>
                                        {displayedFaqs.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                layout
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit={{ opacity: 0, y: -20 }}
                                                custom={index}
                                            >
                                                <FAQItemComp
                                                    item={{
                                                        question: item.question,
                                                        answer: item.answer,
                                                    }}
                                                    open={openIndex === index}
                                                    toggle={() => handleToggle(index)}
                                                    highlight={searchTerm}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            )}

                            <AnimatePresence mode="wait">
                                {!searchTerm && filteredFaqs.length > 3 && (
                                    <motion.div
                                        layout
                                        key={showAll ? "less" : "more"}
                                        initial="initial"
                                        animate={[
                                            "animate",
                                            showAll ? "showLess" : "showAll"
                                        ]}
                                        exit="exit"
                                        variants={toggleButtonVariants}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 25
                                        }}
                                        className="flex justify-center mt-4"
                                    >
                                        <motion.button
                                            onClick={handleToggleShowAll}
                                            className="px-6 py-2.5 text-blue-400 hover:text-blue-300 rounded-lg transition-colors font-medium flex items-center gap-1"
                                            aria-label={showAll ? t("show_less.aria_label") : t("show_all.aria_label")}
                                        >
                                            {showAll ? t("show_less.text") : t("show_all.text")}
                                            <motion.div
                                                animate={{ rotate: showAll ? 180 : 0 }}
                                                transition={{ duration: 0.3, type: "spring" }}
                                            >
                                                <ChevronDown size={18} />
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </LayoutGroup>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            scale: { type: "spring", stiffness: 100 }
                        }}
                        className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/40 rounded-xl border border-gray-700"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="text-xl font-semibold text-white mb-2"
                        >
                            {t("no_results.title")}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="text-gray-400"
                        >
                            {t("no_results.description")}
                        </motion.p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

type FAQItemType = {
    question: string
    answer: string
}

type FAQItemProps = {
    item: FAQItemType
    open: boolean
    toggle: () => void
    highlight?: string
}

function FAQItemComp({ item, open, toggle, highlight = "" }: FAQItemProps) {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (open && itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
    }, [open])

    const highlightText = (text: string) => {
        // Separate text into segments (regular text and links)
        const segments: {
            type: "TEXT" | "LINK"
            content: string
            url?: string
        }[] = []

        // Find all links in [text](url) format
        let lastIndex = 0
        const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
        let match

        while ((match = linkPattern.exec(text)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
                segments.push({
                    type: "TEXT",
                    content: text.substring(lastIndex, match.index)
                })
            }

            // Add the link
            segments.push({
                type: "LINK",
                content: match[1], // link text
                url: match[2]      // link URL
            })

            lastIndex = match.index + match[0].length
        }

        // Add remaining text after last link
        if (lastIndex < text.length) {
            segments.push({
                type: "TEXT",
                content: text.substring(lastIndex)
            })
        }

        // If no search term, just render segments
        if (!highlight || highlight.trim() === "") {
            return segments.map((segment, i) => {
                if (segment.type === "LINK") {
                    return (
                        <a
                            key={i}
                            href={segment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            {segment.content}
                        </a>
                    )
                }
                return segment.content
            })
        }

        // With search highlight, process each segment
        return segments.flatMap((segment, segmentIndex) => {
            if (segment.type === "LINK") {
                // For links, check if the link text contains the highlight term
                if (segment.content.toLowerCase().includes(highlight.toLowerCase())) {
                    // Apply highlighting while maintaining the link
                    const parts = segment.content.split(new RegExp(`(${highlight})`, "gi"))
                    return (
                        <a
                            key={`link-${segmentIndex}`}
                            href={segment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            {parts.map((part, i) =>
                                part.toLowerCase() === highlight.toLowerCase() ? (
                                    <span
                                        key={`link-highlight-${segmentIndex}-${i}`}
                                        className="bg-blue-500/30 text-blue-200 px-1 rounded"
                                    >
                                        {part}
                                    </span>
                                ) : part
                            )}
                        </a>
                    )
                } else {
                    // Link doesn"t contain search term, render normally
                    return (
                        <a
                            key={`link-${segmentIndex}`}
                            href={segment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            {segment.content}
                        </a>
                    )
                }
            }

            // For normal text, apply highlight as before
            const parts = segment.content.split(new RegExp(`(${highlight})`, "gi"))
            return parts.map((part, i) => {
                if (part.toLowerCase() === highlight.toLowerCase()) {
                    return (
                        <span
                            key={`highlight-${segmentIndex}-${i}`}
                            className="bg-blue-500/30 text-blue-200 px-1 rounded"
                        >
                            {part}
                        </span>
                    )
                }
                return part
            })
        })
    }

    return (
        <motion.div
            ref={itemRef}
            layout
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? "border-blue-500/70 shadow-lg shadow-blue-500/10" : "border-gray-700 hover:border-gray-600"
                }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{
                boxShadow: open ? "0 4px 20px rgba(59, 130, 246, 0.2)" : "0 4px 10px rgba(0, 0, 0, 0.1)"
            }}
        >
            <motion.button
                className={`flex justify-between items-center w-full p-5 text-left transition-colors ${open ? "bg-gray-800/80" : "bg-gray-800/40 hover:bg-gray-800/60"}`}
                onClick={toggle}
                aria-expanded={open}
            >
                <span className="text-lg font-medium text-white break-words pr-2">
                    {highlightText(item.question)}
                </span>
                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                        backgroundColor: open ? "rgba(59, 130, 246, 0.2)" : "transparent"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 rounded-full p-1`}
                >
                    <motion.div
                        animate={{ color: open ? "rgb(96, 165, 250)" : "rgb(156, 163, 175)" }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className={`h-5 w-5`} />
                    </motion.div>
                </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full"
                    >
                        <div className="p-5 pt-4 border-t border-gray-700 bg-gray-800/20 w-full overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
                                className="text-lg text-gray-300 break-words leading-relaxed"
                            >
                                {highlightText(item.answer)}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}