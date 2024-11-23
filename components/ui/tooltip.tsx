"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipRootProps {
  children: React.ReactNode
  open?: boolean
}

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function Tooltip({ children, open }: TooltipRootProps) {
  return (
    <div className="relative inline-block">
      {children}
    </div>
  )
}

export function TooltipContent({ children, className }: TooltipContentProps) {
  return (
    <div className={cn(
      "absolute z-50 scale-100 transition-transform",
      "bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm",
      "shadow-md -translate-x-1/2 left-1/2 -top-[calc(100%+5px)]",
      className
    )}>
      {children}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover" />
    </div>
  )
}

export function TooltipTrigger({ children, asChild }: TooltipTriggerProps) {
  return (
    <div className="group">
      {children}
    </div>
  )
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 
