"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2, MailCheck } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"

export default function VPSInterestCTA() {
  const t = useTranslations("vps.interest_cta")
  const [hasStartedTypingEmail, setHasStartedTypingEmail] = useState(false)

  const formSchema = z.object({
    email: z
      .string({ message: t("validation.email.required") })
      .nonempty({ message: t("validation.email.required") })
      .email({ message: t("validation.email.invalid") }),
    description: z
      .string({ message: t("validation.description.required") })
      .nonempty({ message: t("validation.description.required") })
      .max(150, { message: t("validation.description.max_chars", { count: 150 }) })
  })

  type FormValues = z.infer<typeof formSchema>

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit: hookFormSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      description: ""
    }
  })

  // Watch the email field to detect when user starts typing
  const emailValue = watch("email")

  useEffect(() => {
    if (emailValue && emailValue.length > 0 && !hasStartedTypingEmail) {
      setHasStartedTypingEmail(true)
    }
  }, [emailValue, hasStartedTypingEmail])

  const handleSubmit = hookFormSubmit(async ({ email, description }) => {
    try {
      setError("")
      setSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Mock interest registration:", { email, description })

      setSubmitted(true)
    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as any).response?.data?.error?.code
          ? (error as any).response.data.error.code
          : null
      setError(code || "An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <div className="w-full px-4 md:px-16 py-24 bg-slate-900/30 backdrop-blur-sm" id="interest-cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold leading-tight bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2"
        >
          {t("coming_soon")}
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-4xl md:text-5xl font-bold mb-6"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:gap-6 items-center justify-center">
            <motion.div
              layout
              className="flex-1 w-full text-left flex flex-col"
            >
              <label htmlFor="interest-email" className="block text-sm font-medium text-gray-300 mb-1">
                {t("email_label")}
              </label>

              <input
                id="interest-email"
                placeholder={t("email_placeholder")}
                className="w-full px-4 py-2 bg-slate-800/80 border border-blue-900/30 rounded-md text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitting || submitted}
                {...register("email")}
              />
              <div className="min-h-[16px] mt-1">
                {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
              </div>
            </motion.div>

            <AnimatePresence>
              {hasStartedTypingEmail && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex-1 w-full text-left flex flex-col mt-4 md:mt-0"
                >
                  <label htmlFor="interest-description" className="block text-sm font-medium text-gray-300 mb-1">
                    {t("description_label")}
                    <span className="text-xs text-gray-400 ml-1">
                      {t("description_max_characters_text")}
                    </span>
                  </label>

                  <textarea
                    id="interest-description"
                    placeholder={t("description_placeholder")}
                    className="w-full px-4 py-2 bg-slate-800/80 border border-blue-900/30 rounded-md text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed resize-none h-24"
                    disabled={submitting || submitted}
                    maxLength={150}
                    {...register("description")}
                  />
                  <div className="min-h-[16px] mt-1">
                    {errors.description && (
                      <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              layout
              whileHover={{ scale: (submitting || submitted) ? 1 : 1.05 }}
              whileTap={{ scale: (submitting || submitted) ? 1 : 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: hasStartedTypingEmail ? 0.2 : 0 }}
              type="submit"
              disabled={submitting || submitted}
              className="w-52 h-12 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 min-w-[180px] transition-all duration-300 disabled:bg-opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span>{t("sending")}</span>
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  <span>{submitted ? t("received") : t("register_interest")}</span>
                  {submitted ? (
                    <MailCheck size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-white"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    className="bg-blue-500/20 rounded-full p-2"
                  >
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-medium">{t("success_title")}</h3>
                    <p className="text-sm text-gray-300">{t("success_message")}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">{t("benefits.priority_notification")}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">{t("benefits.early_access")}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">{t("benefits.exclusive_offers")}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
