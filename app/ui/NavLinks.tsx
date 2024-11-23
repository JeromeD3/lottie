'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { fetchRoutes } from '@/hook/useGetRouter';
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NavLinks() {
  const pathname = usePathname();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchRoutes().then(data => {
      const res = data.directories.map((link: string) => {
        return {
          name: link,
          href: `/${link}`,
        };
      });
      setLinks(res);
    });
  }, []);

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {links.map((link: any) => (
              <Button
                key={link.name}
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  "flex h-[48px] grow items-center gap-2",
                  "text-sm font-medium",
                  "transition-colors",
                  pathname === link.href && "bg-secondary text-secondary-foreground",
                  "hover:bg-secondary/80"
                )}
                asChild
              >
                <Link href={link.href}>
                  <span className="truncate">{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
