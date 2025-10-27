import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Décrivez votre projet ou posez une question..."
            disabled={disabled}
            rows={1}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none max-h-32 overflow-y-auto scrollbar-hide min-h-[2.5rem]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
