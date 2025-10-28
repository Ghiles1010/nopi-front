import React, { useState, useEffect } from 'react'
import { Building2, LogOut, User } from 'lucide-react'
import { Button } from './ui/button'

interface TopbarProps {
  onLogout: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ onLogout }) => {
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    const id = localStorage.getItem('sessionId') || ''
    setSessionId(id)
  }, [])

  return (
    <div className="h-20 bg-slate-800 flex items-center justify-between px-4 lg:px-6 shadow-md flex-shrink-0">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-white" />
        <div>
          <h1 className="text-lg font-semibold text-white">Simulateur LMNP</h1>
          <p className="text-xs text-slate-300">Optimisez votre fiscalité locative</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Session ID Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-md">
          <User className="h-4 w-4 text-slate-300" />
          <span className="text-sm text-slate-200">ID: {sessionId}</span>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-white hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
