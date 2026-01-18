"use client"

import type React from "react"
import { useSprings, type SpringConfig } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"
import { AnimatedSpan } from "./animated-span"

type SplitTextProps = {
  editable?: string
  text?: string
  className?: string
  delay?: number
  animationFrom?: {
    opacity: number
    transform: string
  }
  animationTo?: {
    opacity: number
    transform: string
  }
  easing?: SpringConfig["easing"]
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end"
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  editable,
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = (t: number) => t,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete
}) => {
  const words = text.split(" ").map((word) => word.split(""))
  const letters = words.flat()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const animatedCount = useRef(0)

  const gradientClasses =
    className.match(/(bg-gradient-[^\s]+|from-[^\s]+|to-[^\s]+|via-[^\s]+|bg-clip-text|text-transparent)/g) || []
  const nonGradientClasses = className
    .replace(/(bg-gradient-[^\s]+|from-[^\s]+|to-[^\s]+|via-[^\s]+|bg-clip-text|text-transparent)/g, "")
    .trim()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold, rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next: (props: any) => Promise<void>) => {
          await next(animationTo)
          animatedCount.current += 1
          if (animatedCount.current === letters.length && onLetterAnimationComplete) {
            onLetterAnimationComplete()
          }
        }
        : animationFrom,
      delay: i * delay,
      config: { easing }
    }))
  )

  return (
    <p
      ref={ref}
      className={`${className} split-parent inline ${nonGradientClasses}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      data-editable={editable}
    >
      {words.map((word, wordIndex) => (
        <span data-editable={editable} key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.map((letter, letterIndex) => {
            const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex

            return (
              <AnimatedSpan
                key={index}
                style={springs[index] as unknown as React.CSSProperties}
                className={`inline-block transform transition-opacity will-change-transform ${gradientClasses.join(" ")}`}
                data-editable={editable}
              >
                {letter}
              </AnimatedSpan>
            )
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>{" "}</span>
        </span>
      ))}
    </p>
  )
}

export default SplitText