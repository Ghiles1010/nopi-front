import React from 'react'
import { cn } from '@/lib/utils'

interface ChatBubbleProps {
  message: string
  isUser: boolean
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        'flex mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 shadow-sm',
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  )
}
