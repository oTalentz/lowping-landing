'use client'

// Imports of packages
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function VPSFAQ() {
  const t = useTranslations("vps.faq")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mt-24 w-full px-4 md:px-16 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent mb-4"
      >
        {t("subtitle")}
      </motion.h2>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white text-4xl font-bold mb-12 text-center"
      >
        {t("title")}
      </motion.h1>

      <div className="w-full max-w-3xl mx-auto">
        {((t.raw("items") as { question: string; answer: string }[]) || []).map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 bg-slate-800/70 hover:bg-slate-800 rounded-lg text-left"
            >
              <h3 className="text-white text-lg font-medium">{faq.question}</h3>
              <div className="text-blue-500 ml-2">
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-800/30 p-4 rounded-b-lg">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
