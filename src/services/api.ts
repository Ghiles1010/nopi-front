export interface ChatResponse {
  reply: string
  state: {
    prix_achat: number
    loyer_mensuel: number
    charges_annuelles: number
    duree: number
  }
  simulation: {
    micro_bic: {
      revenus: number
      impots: number
      net_apres_impots: number
    }
    reel: {
      revenus: number
      impots: number
      net_apres_impots: number
    }
  }
}

export const sendChatMessage = async (message: string, conversationHistory: string[] = []): Promise<ChatResponse> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      conversation_history: conversationHistory,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}
