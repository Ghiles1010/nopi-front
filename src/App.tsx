import React, { useState, useCallback } from 'react'
import { Topbar } from './components/Topbar'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { SimulationSection } from './components/SimulationSection'
import { sendChatMessage, ChatResponse } from './services/api'

interface Message {
  content: string
  isUser: boolean
}

interface SimulationState {
  prix_achat: number
  loyer_mensuel: number
  charges_annuelles: number
  duree: number
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [simulation, setSimulation] = useState<SimulationData | null>(null)
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      setSimulation(response.simulation)
      setSimulationState(response.state)
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

  const handleRestart = useCallback(() => {
    setMessages([])
    setSimulation(null)
    setSimulationState(null)
    setSidebarOpen(false)
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Topbar */}
      <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onRestart={handleRestart}
        />

        <div className="flex-1 flex flex-col lg:flex-row bg-gray-50">
          <ChatArea
            messages={messages}
            isTyping={isLoading}
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />

          <SimulationSection
            simulation={simulation}
            state={simulationState}
          />
        </div>
      </div>
    </div>
  )
}

export default App
