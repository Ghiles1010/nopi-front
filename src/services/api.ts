export interface ChatResponse {
  reply: string
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
    state: {
      prix_achat: number
      loyer_mensuel: number
      charges_annuelles: number
      duree: number
    }
  } | null
}

export interface StateResponse {
  state: {
    prix_achat: number | null
    loyer_mensuel: number | null
    charges_annuelles: number | null
    duree: number | null
  }
  isDone: boolean
  history: Array<{ role: string; content: string }>
  sessionId: string
}

export const sendChatMessage = async (message: string, conversationHistory: string[] = []): Promise<ChatResponse> => {
  const sessionId = localStorage.getItem('sessionId') || 'default'
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': sessionId,
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

export const getState = async (): Promise<StateResponse> => {
  const sessionId = localStorage.getItem('sessionId') || 'default'
  const response = await fetch('/api/state', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': sessionId,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get state')
  }

  return response.json()
}

export const resetSession = async (): Promise<void> => {
  const sessionId = localStorage.getItem('sessionId') || 'default'
  const response = await fetch('/api/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': sessionId,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to reset session')
  }
}
