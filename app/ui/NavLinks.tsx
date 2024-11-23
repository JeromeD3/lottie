'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { fetchRoutes } from '@/hook/useGetRouter';
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Boxes,
  CircuitBoard,
  Component,
  Cpu,
  FlaskConical,
  Layers,
  LayoutGrid,
  Lightbulb,
  Puzzle,
  Shapes,
  Sparkles,
  Wand2,
} from 'lucide-react';

// 图标映射
const iconMap: { [key: string]: React.ElementType } = {
  'hover-card': LayoutGrid,
  'Card-Stack': Layers,
  'SweepAway': Sparkles,
  'hover': Component,
  'Lottie': FlaskConical,
  'dynamic': Shapes,
  'lingdongdao': Cpu,
  'AAARq': Boxes,
  'TextReveal': Lightbulb,
  'AppleCarousel': CircuitBoard,
  'btn': Puzzle,
  'ui': Wand2,
};

export default function NavLinks() {
  const pathname = usePathname();
  const [links, setLinks] = useState<Array<{
    name: string;
    href: string;
    icon: React.ElementType;
  }>>([]);

  useEffect(() => {
    fetchRoutes().then(data => {
      const res = data.directories.map((link: string) => ({
        name: link,
        href: `/${link}`,
        icon: iconMap[link] || Boxes // 使用映射的图标或默认图标
      }));
      setLinks(res);
    });
  }, []);

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 py-4">
        <div className="">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
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
                  <Link href={`/dashboard/${link.href}`}>
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
