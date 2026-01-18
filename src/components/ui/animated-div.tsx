// Imports of packages
import { animated } from "@react-spring/web"
import { ReactNode } from "react"

export const AnimatedDiv = animated.div as React.FC<React.HTMLAttributes<HTMLDivElement> & { children?: ReactNode }>