"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/events", label: "Eventos" },
    { href: "/athletes", label: "Atletas" },
    { href: "/rankings", label: "Ranking" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with fight night aesthetic */}
      <header className="sticky top-0 z-50 border-b-4 border-primary bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span
                  className="text-2xl font-bold text-primary-foreground"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  FH
                </span>
              </div>
              <div>
                <h1
                  className="text-xl font-bold text-expanded leading-none"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Fight Hub
                </h1>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
                  )}
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" style={{ fontFamily: "var(--font-oswald)" }}>
                ENTRAR
              </Button>
              <Button size="sm" style={{ fontFamily: "var(--font-oswald)" }}>
                CADASTRAR
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button variant="outline" size="sm" className="md:hidden bg-transparent">
              MENU
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t-4 border-primary bg-card mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-expanded mb-4" style={{ fontFamily: "var(--font-oswald)" }}>
                Fight Hub
              </h3>
              <p className="text-sm text-muted-foreground">
                Plataforma de registro de atletas e eventos de artes marciais no RS
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
                PLATAFORMA
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/eventos" className="hover:text-primary">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/atletas" className="hover:text-primary">
                    Atletas
                  </Link>
                </li>
                <li>
                  <Link href="/ranking" className="hover:text-primary">
                    Ranking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
                FEDERAÇÕES
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Cadastrar Federação
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Lista de Federações
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ fontFamily: "var(--font-oswald)" }}>
                SUPORTE
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Perguntas Frequentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Regulamentos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Fight Hub. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
