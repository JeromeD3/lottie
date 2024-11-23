import type { Metadata } from 'next'
import '../globals.css'
import NavLinks from '@/app/ui/NavLinks'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/components/ui/user-profile'
import Providers from '@/components/ui/provider'
import { Toaster } from 'sonner'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <div className="min-h-screen flex">
              <aside className="w-[280px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col  fixed ">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-accent">
                              <HomeIcon className="h-4 w-4" />
                              <span>首页</span>
                            </Button>
                          </Link>
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="flex items-center gap-2">
                      <ModeToggle />
                    </div>
                  </div>
                  <UserProfile />
                </div>

                <div className="flex-1 flex flex-col p-4">
                  <nav className="space-y-2">
                    <NavLinks />
                  </nav>
                </div>

                <div className="p-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">© 2024 Your App. All rights reserved.</p>
                </div>
              </aside>

              <main className="flex-1 overflow-auto bg-muted/5 ml-[280px]">
                <div className="py-6 px-4">{children}</div>
              </main>
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
