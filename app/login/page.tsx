"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Eye, EyeOff, Mail, MessageCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = email.length > 0 && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    
    setIsLoading(true)
    // TODO: Implement authentication logic
    console.log("Login attempt:", { email, password })
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fight-black bg-grain-noise">
      {/* Background brutal - gradiente sutil */}
      <div className="absolute inset-0 bg-fight-gradient opacity-50" />

      <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Branding UFC style */}
          <div className="hidden lg:block space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={56} height={56} className="w-full h-full object-contain p-2"/>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-fight-surface border-l-2 border-fight-accent p-8">
                <h2 className="font-display text-3xl font-black mb-6 text-fight tracking-tighter leading-none">
                  GERENCIE SEUS EVENTOS
                </h2>
                <ul className="space-y-4 text-fight-secondary">
                  <li className="flex items-start gap-4 text-sm">
                    <div className="w-1 h-1 bg-fight-accent flex-shrink-0 mt-2" />
                    <span>Cadastre atletas e organize lutas com sistema inteligente de matchmaking</span>
                  </li>
                  <li className="flex items-start gap-4 text-sm">
                    <div className="w-1 h-1 bg-fight-accent flex-shrink-0 mt-2" />
                    <span>Gerencie inscrições, cards e resultados em tempo real</span>
                  </li>
                  <li className="flex items-start gap-4 text-sm">
                    <div className="w-1 h-1 bg-fight-accent flex-shrink-0 mt-2" />
                    <span>Publique eventos e acompanhe estatísticas completas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-fight-surface border border-fight p-6">
                <p className="text-sm text-fight-secondary">
                  <span className="font-bold text-fight">Novo na plataforma?</span><br />
                  Entre em contato para criar sua conta e começar a organizar eventos profissionais.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form UFC brutal */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            {/* Container brutal sem blur */}
            <div className="relative bg-fight-surface border border-fight p-8 md:p-12">
              

              <div className="space-y-10">
                <div className="flex flex-col items-center gap-6 mb-4">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                    <Image src="/logo.png" alt="Logo" width={112} height={112} className="w-full h-full object-contain"/>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Email input */}
                  <div>
                    <label htmlFor="email" className="font-ui block text-xs font-bold mb-3 text-fight uppercase tracking-wide">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nome@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="font-ui h-12 rounded-lg border border-fight hover:border-fight-hover focus:border-fight-accent focus:ring-0 focus:outline-none px-4 text-base bg-fight-black text-fight placeholder-fight-muted transition-colors duration-200"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password input */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label htmlFor="password" className="font-ui block text-xs font-bold text-fight uppercase tracking-wide">
                        Senha
                      </label>
                      <Link
                        href="/recuperar-senha"
                        className="font-ui text-xs text-fight-secondary hover:text-fight-accent transition-colors min-h-[44px] flex items-center uppercase tracking-wide font-medium"
                      >
                        Esqueceu?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="font-ui h-12 rounded-lg border border-fight hover:border-fight-hover focus:border-fight-accent focus:ring-0 focus:outline-none px-4 pr-12 text-base bg-fight-black text-fight placeholder-fight-muted transition-colors duration-200"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-fight-secondary hover:text-fight transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.5]" /> : <Eye className="w-4 h-4 stroke-[1.5]" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit button UFC style */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isFormValid || isLoading}
                    className="w-full mt-10"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ENTRANDO
                      </>
                    ) : (
                      "ENTRAR"
                    )}
                  </Button>
                </form>

                {/* Footer minimal */}
                <div className="pt-10 border-t border-fight">
                  <p className="font-ui text-xs text-fight-muted mb-3 uppercase tracking-wide">Precisa de ajuda?</p>
                  <div className="font-ui flex items-center gap-4 text-sm">
                    <Link 
                      href="https://wa.me/" 
                      className="inline-flex items-center gap-2 text-fight-secondary hover:text-fight transition-colors min-h-[44px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                      <span className="text-xs uppercase tracking-wide">WhatsApp</span>
                    </Link>
                    <span className="text-fight-border-hover">·</span>
                    <Link 
                      href="mailto:suporte@fighthub.com" 
                      className="inline-flex items-center gap-2 text-fight-secondary hover:text-fight transition-colors min-h-[44px]"
                    >
                      <Mail className="w-4 h-4 stroke-[1.5]" />
                      <span className="text-xs uppercase tracking-wide">E-mail</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
