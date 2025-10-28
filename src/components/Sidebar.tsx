import React from 'react'
import { X, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onRestart: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onRestart,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden mt-24"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-24 left-4 h-[calc(100vh-6rem)] w-72 bg-white rounded-lg border border-gray-200 shadow-sm
          transform transition-transform duration-300 ease-in-out z-50 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:top-0 lg:left-0 lg:h-[calc(100vh-8rem)] lg:w-72 lg:mx-4 lg:my-4 lg:flex-shrink-0 lg:translate-x-0 lg:rounded-lg
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
          <h2 className="text-lg font-semibold">Actions</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Restart Button */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <Button
            onClick={onRestart}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart Simulation
          </Button>
        </div>

        {/* Empty Space */}
        <div className="flex-1"></div>
      </div>
    </>
  )
}
