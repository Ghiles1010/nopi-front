import React from 'react'
import { Menu, Building2 } from 'lucide-react'
import { Button } from './ui/button'

interface TopbarProps {
  onMenuClick: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <div className="h-20 bg-slate-800 flex items-center justify-between px-4 lg:px-6 shadow-md flex-shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden text-white hover:bg-slate-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-lg font-semibold text-white">Simulateur LMNP</h1>
            <p className="text-xs text-slate-300">Optimisez votre fiscalité locative</p>
          </div>
        </div>
      </div>
    </div>
  )
}
