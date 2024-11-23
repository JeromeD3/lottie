"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: "start" | "end" | "center"
  className?: string
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const DropdownContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type === DropdownMenuContent) {
              return open ? child : null
            }
            return child
          }
          return child
        })}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu')

  return (
    <div onClick={() => context.setOpen(!context.open)}>
      {children}
    </div>
  )
}

export function DropdownMenuContent({ children, align = "end", className }: DropdownMenuContentProps) {
  const context = React.useContext(DropdownContext)
  if (!context) return null

  return context.open ? (
    <div 
      className={cn(
        "absolute z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
        "mt-2",
        className
      )}
    >
      {children}
    </div>
  ) : null
}

export function DropdownMenuItem({ children, className, onClick }: DropdownMenuItemProps) {
  const context = React.useContext(DropdownContext)
  
  const handleClick = () => {
    onClick?.()
    context?.setOpen(false)
  }

  return (
    <button
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-muted" />
} 
