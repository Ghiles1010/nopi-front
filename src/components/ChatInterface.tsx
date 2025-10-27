import React, { useEffect, useRef } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatInput } from './ChatInput'
import { TypingIndicator } from './TypingIndicator'

interface Message {
  content: string
  isUser: boolean
}

interface ChatInterfaceProps {
  messages: Message[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isTyping,
  onSendMessage,
  disabled,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto pt-12 text-center">
            <p className="text-gray-500 text-base mb-2">
              Commencez par décrire votre projet d'investissement LMNP.
            </p>
            <p className="text-sm text-gray-400">
              Par exemple: "J'achète un studio à 150 000€, loyer 800€/mois"
            </p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message.content} isUser={message.isUser} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} disabled={disabled} />
    </div>
  )
}
