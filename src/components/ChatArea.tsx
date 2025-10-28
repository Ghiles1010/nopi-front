import React from 'react'
import { ChatInterface } from './ChatInterface'

interface Message {
  content: string
  isUser: boolean
}

interface ChatAreaProps {
  messages: Message[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  onRestart: () => void
  disabled?: boolean
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isTyping,
  onSendMessage,
  onRestart,
  disabled,
}) => {
  return (
    <div className="flex-1 m-4 h-[calc(100vh-8rem)] rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
      {/* Header with Restart button */}
      <div className="border-b border-gray-200 px-4 py-3 flex justify-end flex-shrink-0">
        <button
          onClick={onRestart}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart Simulation
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden p-4 lg:p-6">
        <ChatInterface
          messages={messages}
          isTyping={isTyping}
          onSendMessage={onSendMessage}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

