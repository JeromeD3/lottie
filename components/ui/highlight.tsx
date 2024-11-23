import { cn } from "@/lib/utils"

interface HighlightProps {
  children: React.ReactNode
  className?: string
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span 
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  )
} 
