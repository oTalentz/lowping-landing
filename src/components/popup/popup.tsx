"use client"

import { X, Copy, CheckCircle, ExternalLink } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { usePopup } from "./popup-provider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { getCookie, setCookie } from "@/lib/cookies"

export const Popup = () => {
  const {
    title,
    content,
    copyableText,
    buttonText,
    buttonUrl,
    hidePopup,
    doNotShowAgain
  } = usePopup()

  const [copied, setCopied] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const checkCookies = async () => {
      const hideUntil = await getCookie('popup_hide_until')
      const savedCoupon = await getCookie('popup_coupon_code')

      // If there's a new coupon or no saved coupon, show the popup
      if (copyableText && (!savedCoupon || savedCoupon !== copyableText)) {
        // Save the new coupon code
        await saveCouponCode()
        setShouldShow(true)
        return
      }

      // If no hide_until cookie or it's expired, show the popup
      if (!hideUntil || new Date(hideUntil) < new Date()) {
        setShouldShow(true)
      } else {
        setShouldShow(false)
        hidePopup()
      }
    }

    checkCookies()
  }, [copyableText, hidePopup])

  const saveCouponCode = async () => {
    if (copyableText) {
      await setCookie('popup_coupon_code', copyableText)
    }
  }

  const saveHidePreference = async () => {
    // Set cookie to hide for 7 days
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    await setCookie('popup_hide_until', expiryDate.toISOString(), { expires: expiryDate })

    // Save the coupon code
    await saveCouponCode()
  }

  useEffect(() => {
    const setupPulse = () => {
      pulseIntervalRef.current = setInterval(() => {
        if (popupRef.current && !isHovering) {
          popupRef.current.classList.add("pulse")

          pulseTimeoutRef.current = setTimeout(() => {
            if (popupRef.current) {
              popupRef.current.classList.remove("pulse")
            }
          }, 1000)
        }
      }, 5000)
    }

    if (shouldShow) {
      setupPulse()
    }

    return () => {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current)
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current)
    }
  }, [isHovering, shouldShow])

  const copyToClipboard = () => {
    if (copyableText) {
      navigator.clipboard.writeText(copyableText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = async () => {
    await saveHidePreference()
    doNotShowAgain()
    setShouldShow(false)
  }

  if (!shouldShow) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="popup"
        className={cn(
          "fixed z-50 ticket-popup",
          isMobile ? "bottom-2 left-2 right-2 max-w-[calc(100%-1rem)]" : "bottom-4 left-4"
        )}
        ref={popupRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          transition: { duration: 0.2 }
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg shadow-xl bg-gradient-to-br from-black to-zinc-900 text-white border border-zinc-700",
            "ticket-edge hover:border-zinc-600 transition-colors duration-300",
            isMobile ? "w-full" : "w-80"
          )}
        >
          <div className={cn("p-4", isMobile && "p-3")}>
            <div className="flex items-start">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <motion.h3
                    className={cn(
                      "font-medium text-white truncate pr-5 title",
                      isMobile ? "text-sm" : "text-base"
                    )}
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {title}
                  </motion.h3>
                  <motion.button
                    onClick={handleClose}
                    className="p-1.5 rounded-full transition-all -mt-1 -mr-1 text-gray-400 hover:text-white hover:bg-zinc-800 close-button"
                    aria-label="Fechar"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
                  </motion.button>
                </div>

                <motion.p
                  className={cn(
                    "mt-2 mb-3 text-gray-300 line-clamp-2 description",
                    isMobile ? "text-xs" : "text-sm"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {content}
                </motion.p>

                {copyableText && (
                  <motion.div
                    className={cn("flex items-center mb-3 coupon-container", isMobile && "mb-2")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <code
                      className={cn(
                        "font-mono font-medium bg-zinc-800/70 py-1.5 px-3 rounded border-dashed border border-zinc-600 truncate coupon-code cursor-pointer flex-1",
                        isMobile ? "text-xs py-1 px-2" : "text-sm"
                      )}
                      onClick={copyToClipboard}
                    >
                      {copyableText}
                    </code>
                    <motion.button
                      onClick={copyToClipboard}
                      className={cn(
                        "ml-2 p-2 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors copy-button",
                        isMobile && "p-1.5"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <CheckCircle className={cn("h-4 w-4 text-green-500", isMobile && "h-3.5 w-3.5")} />
                        </motion.div>
                      ) : (
                        <Copy className={cn("h-4 w-4 text-gray-300", isMobile && "h-3.5 w-3.5")} />
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {buttonText && buttonUrl && (
                  <motion.a
                    href={buttonUrl}
                    target="_blank"
                    className={cn(
                      "mt-2 w-full h-10 bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700",
                      "text-white border border-zinc-600 hover:border-zinc-500 rounded flex items-center justify-center cta-button transition-all",
                      "shadow-md hover:shadow-lg",
                      isMobile ? "text-xs h-8" : "text-sm"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileHover={{ y: -2, transition: { duration: 0.1 } }}
                    whileTap={{ y: 0 }}
                  >
                    <span>{buttonText}</span>
                    <ExternalLink className={cn("ml-1.5", isMobile ? "h-3 w-3" : "h-4 w-4")} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        
        .ticket-popup.pulse {
          animation: pulse 1s forwards;
        }

        /* Shine effect for coupon code */
        @keyframes shine {
          0% {
            background-position: -100px;
          }
          40%, 100% {
            background-position: 300px;
          }
        }

        .coupon-code {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            rgba(40, 40, 40, 0) 0%,
            rgba(80, 80, 80, 0.3) 50%,
            rgba(40, 40, 40, 0) 100%
          );
          background-size: 200px 100%;
          background-repeat: no-repeat;
          animation: shine 3s infinite linear;
        }

        .cta-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 20px;
          height: 200%;
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(30deg);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .cta-button:hover::after {
          left: 120%;
        }

        /* Adding transitions for smoother hover effects */
        .ticket-popup {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>
    </AnimatePresence>
  )
}