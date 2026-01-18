// Imports of packages
import { animated } from "@react-spring/web"
import { ReactNode } from "react"

export const AnimatedSpan = animated.span as React.FC<React.HTMLAttributes<HTMLSpanElement> & { children?: ReactNode }>