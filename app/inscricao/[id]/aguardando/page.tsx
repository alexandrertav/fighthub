"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api"

export default function PaymentStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: registrationId } = use(params)
  const searchParams = useSearchParams()
  const result = searchParams.get("result") // success, pending, failure
  
  const [status, setStatus] = useState<{
    registrationStatus: string
    matchStatus: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await apiClient.get<{
          registrationId: string
          status: string
          matchStatus: string
        }>(`/public/registrations/${registrationId}/status`)
        
        setStatus({
          registrationStatus: data.status,
          matchStatus: data.matchStatus
        })
      } catch (err) {
        console.error("Erro ao verificar status:", err)
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
    
    // Polling a cada 5 segundos para verificar se o pagamento foi confirmado
    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [registrationId])

  const getStatusConfig = () => {
    if (result === "success" || status?.registrationStatus === "PAID") {
      return {
        icon: CheckCircle2,
        color: "text-green-400",
        bgColor: "bg-green-900/20",
        borderColor: "border-green-800",
        title: "PAGAMENTO APROVADO!",
        message: "Sua inscrição foi confirmada com sucesso. Você receberá mais informações em breve.",
        showEventLink: true
      }
    }
    
    if (result === "pending" || status?.registrationStatus === "PENDING_PAYMENT") {
      return {
        icon: Clock,
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/20",
        borderColor: "border-yellow-800",
        title: "PAGAMENTO PENDENTE",
        message: "Seu pagamento está sendo processado. Isso pode levar alguns minutos.",
        showEventLink: false
      }
    }
    
    return {
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-800",
      title: "PAGAMENTO NÃO APROVADO",
      message: "Houve um problema com seu pagamento. Tente novamente ou entre em contato.",
      showEventLink: false
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <AppShell>
      <div className="relative min-h-screen bg-fight-black bg-grain-noise">
        <div className="absolute inset-0 bg-fight-gradient opacity-30 pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            {/* Status Card */}
            <div className={`bg-fight-surface border-2 ${config.borderColor} rounded-lg p-8 text-center`}>
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.bgColor} mb-6`}>
                <Icon className={`w-10 h-10 ${config.color}`} />
              </div>
              
              <h1 className="font-display text-3xl font-bold text-fight uppercase mb-4">
                {config.title}
              </h1>
              
              <p className="font-ui text-lg text-fight-secondary mb-8">
                {config.message}
              </p>

              {/* Registration Details */}
              <div className="bg-fight-black border border-fight rounded-lg p-6 mb-8 text-left">
                <h2 className="font-display text-sm uppercase text-fight-secondary mb-4">
                  Detalhes da Inscrição
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-ui text-sm text-fight-secondary">ID da Inscrição:</span>
                    <span className="font-ui text-sm text-fight font-mono">{registrationId.slice(0, 8)}...</span>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-5 h-5 text-fight-accent animate-spin" />
                    </div>
                  ) : status && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-ui text-sm text-fight-secondary">Status do Pagamento:</span>
                        <span className={`font-ui text-sm font-semibold ${
                          status.registrationStatus === "PAID" ? "text-green-400" : "text-yellow-400"
                        }`}>
                          {status.registrationStatus === "PAID" ? "PAGO" : "PENDENTE"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-ui text-sm text-fight-secondary">Status da Luta:</span>
                        <span className="font-ui text-sm text-fight">
                          {status.matchStatus === "SEM_LUTA" ? "Aguardando Matchmaking" : status.matchStatus}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events">
                  <Button 
                    variant="outline"
                    className="border-fight hover:border-fight-hover bg-transparent text-fight font-display uppercase w-full sm:w-auto"
                  >
                    VER OUTROS EVENTOS
                  </Button>
                </Link>
                
                {config.showEventLink && (
                  <Link href="/dashboard">
                    <Button 
                      className="bg-fight-accent hover:bg-fight-accent-hover text-white font-display uppercase w-full sm:w-auto"
                    >
                      IR PARA DASHBOARD
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-fight-surface border border-fight rounded-lg p-6">
              <h3 className="font-display text-sm uppercase text-fight mb-3">
                Próximos Passos
              </h3>
              <ul className="space-y-2 font-ui text-sm text-fight-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-fight-accent mt-1">•</span>
                  <span>Você receberá um email de confirmação com os detalhes da sua inscrição</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fight-accent mt-1">•</span>
                  <span>O organizador entrará em contato para o matchmaking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fight-accent mt-1">•</span>
                  <span>Acompanhe o status da sua luta no dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
