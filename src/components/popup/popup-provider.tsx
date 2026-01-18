"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Popup } from "./popup"
import { DynamicContent, getDynamicContentValue } from "@/types/dynamic-content/DynamicContent"
import { getCookie, setCookie } from "@/lib/cookies"

type PopupContextType = {
  isOpen: boolean
  showPopup: () => void
  hidePopup: () => void
  doNotShowAgain: () => void
  config: PopupConfig
  updateConfig: (config: Partial<PopupConfig>) => void
  title: string | null
  content: string | null
  copyableText: string | null
  buttonText: string | null
  buttonUrl: string | null
}

type PopupConfig = {
  autoShowDelay: number
  position: "bottom-left"
  showCloseButton: boolean
}

const defaultConfig: PopupConfig = {
  autoShowDelay: 3000,
  position: "bottom-left",
  showCloseButton: true,
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

const COOKIE_SEEN_NAME = 'lowping_popup_seen'
const COOKIE_NEVER_SHOW_NAME = 'lowping_popup_never_show'

type PopupProviderProps = {
  contents: DynamicContent[]
  children: React.ReactNode
}

export const PopupProvider = ({ contents, children }: PopupProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<PopupConfig>(defaultConfig)

  // Extract popup content from DynamicContent
  const title = getDynamicContentValue(contents, "POPUP_TITLE")
  const content = getDynamicContentValue(contents, "POPUP_CONTENT")
  const copyableText = getDynamicContentValue(contents, "POPUP_COPYABLE_TEXT")
  const buttonText = getDynamicContentValue(contents, "POPUP_BUTTON_TEXT")
  const buttonUrl = getDynamicContentValue(contents, "POPUP_BUTTON_URL")

  useEffect(() => {
    const verifyCookie = async () => {
      const hasSeenPopup = await getCookie(COOKIE_SEEN_NAME)
      const neverShowAgain = await getCookie(COOKIE_NEVER_SHOW_NAME)

      // Only show popup if user hasn't chosen to never see it again
      if (!neverShowAgain && !hasSeenPopup) {
        setTimeout(() => {
          showPopup()
          setCookie(COOKIE_SEEN_NAME, "true")
        }, config.autoShowDelay)
      }
    }

    verifyCookie()
  }, [config.autoShowDelay])

  const showPopup = () => {
    setIsOpen(true)
  }

  const hidePopup = () => {
    setIsOpen(false)
  }

  const doNotShowAgain = async () => {
    await setCookie(COOKIE_NEVER_SHOW_NAME, "true", {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    hidePopup()
  }

  const updateConfig = (newConfig: Partial<PopupConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }))
  }

  const hasPopupContent = title && content

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        showPopup,
        hidePopup,
        doNotShowAgain,
        config,
        updateConfig,
        title,
        content,
        copyableText,
        buttonText,
        buttonUrl
      }}
    >
      {children}
      {isOpen && hasPopupContent && <Popup />}
    </PopupContext.Provider>
  )
}

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}