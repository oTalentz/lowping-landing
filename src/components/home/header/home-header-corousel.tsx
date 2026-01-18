"use client"

// Imports of packages
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

type Slide = {
  title: string
  image: string
}

const slides: Slide[] = [
  {
    title: "Minecraft",
    image: "/images/games/minecraft.jpg",
  },
  {
    title: "Valheim",
    image: "/images/games/valheim.png",
  },
  {
    title: "ARK: Survival Evolved",
    image: "/images/games/ark-survival-evolved.jpg"
  }
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full mx-auto h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={carouselRef} className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => {
            let position = index - current

            if (position < -1) position += slides.length
            if (position > 1) position -= slides.length

            let scale = 0.7
            let opacity = 0.6
            let zIndex = 0
            const xPosition = position * 150

            if (position === 0) {
              scale = 1
              opacity = 1
              zIndex = 10
            }

            return (
              <motion.div
                key={slide.title}
                className="absolute w-[180px] sm:w-[220px] md:w-[250px] h-[200px] sm:h-[240px] md:h-[280px]"
                style={{ zIndex }}
                animate={{
                  x: xPosition,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold text-center text-xl tracking-widest">{slide.title}</h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}