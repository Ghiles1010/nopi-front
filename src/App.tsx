import { useState, useCallback, useEffect } from 'react'
import { Topbar } from './components/Topbar'
import { ChatArea } from './components/ChatArea'
import { SimulationSection } from './components/SimulationSection'
import { sendChatMessage, getState, resetSession, ChatResponse, StateResponse } from './services/api'
import SessionPage from './pages/Session'

interface Message {
  content: string
  isUser: boolean
}

interface SimulationState {
  prix_achat: number | null
  loyer_mensuel: number | null
  charges_annuelles: number | null
  duree: number | null
}

interface SimulationData {
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

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [simulation, setSimulation] = useState<SimulationData | null>(null)
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId')
    if (!sessionId) {
      if (window.location.pathname !== '/session') {
        window.location.href = '/session'
      }
      return
    }
    setHasSession(!!sessionId)
  }, [])

  // Hydrate chat history and extracted state when a session exists
  useEffect(() => {
    const hydrateFromBackend = async () => {
      if (!hasSession) return
      try {
        const stateResponse: StateResponse = await getState()
        // Set extracted info/state
        setSimulationState(stateResponse.state)
        // Map backend history to UI messages
        const hydratedMessages: Message[] = (stateResponse.history || []).map((h) => ({
          content: h.content,
          isUser: h.role === 'user',
        }))
        setMessages(hydratedMessages)
      } catch (error) {
        console.error('Failed to load session state:', error)
      }
    }

    hydrateFromBackend()
  }, [hasSession])

  const handleSendMessage = useCallback(async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true }])
    
    setIsLoading(true)

    try {
      const conversationHistory = messages
        .filter(m => m.isUser)
        .map(m => m.content)
      const response: ChatResponse = await sendChatMessage(message, conversationHistory)
      
      // Add AI response and update simulation
      setMessages(prev => [...prev, { content: response.reply, isUser: false }])
      
      // Fetch current state to show partial data in real-time
      const stateResponse: StateResponse = await getState()
      setSimulationState(stateResponse.state)
      
      // Update simulation only if all info is complete
      if (response.simulation) {
        setSimulation(response.simulation)
      } else {
        setSimulation(null)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        isUser: false
      }])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const handleRestart = useCallback(async () => {
    try {
      // Reset backend session
      await resetSession()
      // Clear local state
      setMessages([])
      setSimulation(null)
      setSimulationState(null)
    } catch (error) {
      console.error('Error resetting session:', error)
      // Still clear local state even if backend reset fails
      setMessages([])
      setSimulation(null)
      setSimulationState(null)
    }
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('sessionId')
    window.location.href = '/session'
  }, [])

  if (!hasSession) {
    return <SessionPage />
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Topbar */}
      <Topbar 
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
        <ChatArea
          messages={messages}
          isTyping={isLoading}
          onSendMessage={handleSendMessage}
          onRestart={handleRestart}
          disabled={isLoading}
        />

        <SimulationSection
          simulation={simulation}
          state={simulationState}
        />
      </div>
    </div>
  )
}

export default App
