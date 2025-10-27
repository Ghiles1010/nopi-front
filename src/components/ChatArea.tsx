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
  disabled?: boolean
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isTyping,
  onSendMessage,
  disabled,
}) => {
  return (
    <div className="flex-1 mx-2 my-4 lg:mx-4 lg:my-4 h-[calc(100vh-8rem)] rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
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

