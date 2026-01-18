"use client"

import { type ReactNode, useState } from "react"

type TooltipProps = {
  position?: "top" | "right" | "bottom" | "left"
  className?: string
  content: string | ReactNode
  children: ReactNode
  maxWidth?: string
  showOnClick?: boolean
  delay?: number
}

export default function Tooltip({
  position = "top",
  className = "",
  content,
  children,
  maxWidth = "16rem",
  showOnClick = false,
  delay = 0,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  }

  const mobilePositionClasses: Record<string, string> = {
    top: "bottom-full left-0 right-0 mx-auto mb-2 w-[calc(100vw-2rem)] max-w-xs",
    right: "top-full left-0 mt-2 w-[calc(100vw-2rem)] max-w-xs",
    bottom: "top-full left-0 right-0 mx-auto mt-2 w-[calc(100vw-2rem)] max-w-xs",
    left: "top-full left-0 mt-2 w-[calc(100vw-2rem)] max-w-xs",
  }

  const handleMouseEnter = () => {
    if (!showOnClick && delay === 0) {
      setIsVisible(true)
    } else if (!showOnClick && delay > 0) {
      setTimeout(() => setIsVisible(true), delay)
    }
  }

  const handleMouseLeave = () => {
    if (!showOnClick) {
      setIsVisible(false)
    }
  }

  const handleClick = () => {
    if (showOnClick) {
      setIsVisible(!isVisible)
    }
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      <span
        className={`
          ${className} 
          absolute z-30 
          px-3 py-2 
          bg-[#040404] 
          border border-white/10 
          text-white
          tracking-tight
          text-sm
          rounded 
          transition-all duration-200 ease-out 
          pointer-events-none 
          ${positionClasses[position]}
          md:${positionClasses[position]}
          ${isVisible || (!showOnClick && "group-hover:opacity-100 group-hover:scale-100")}
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          sm:text-base
          max-sm:${mobilePositionClasses[position]}
        `}
        style={{
          maxWidth: maxWidth,
          width: "max-content",
          maxHeight: "20rem",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
          hyphens: "auto",
        }}
      >
        {content}
      </span>
    </span>
  )
}
