'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, CreditCard, Trophy, Calendar } from 'lucide-react';

export type BottomNavProps = {
  activeId: string;
  className?: string;
};

const BOTTOM_NAV_ITEMS = [
  { id: "inicio", icon: LayoutDashboard, href: "/dashboard" },
  { id: "inscritos", icon: Users, href: "/dashboard/inscritos" },
  { id: "eventos", icon: Calendar, href: "/dashboard/eventos" },
  { id: "financeiro", icon: CreditCard, href: "/dashboard/financeiro" },
  { id: "lutas", icon: Trophy, href: "/dashboard/lutas" },
];

export default function BottomNav({
  activeId,
  className = ''
}: BottomNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-fight-surface border-t border-fight backdrop-blur-sm bg-opacity-95',
        className
      )}
    >
      <div className="flex justify-around items-center gap-1.5 p-1.5">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <Button
              key={item.id}
              asChild
              variant="default"
              className={cn(
                'h-auto flex-col gap-1 py-3 px-4 rounded-md',
                isActive && 'ring-1 ring-fight-accent/50'
              )}
            >
              <Link href={item.href}>
                <Icon className="w-8 h-8" strokeWidth={2} />
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
