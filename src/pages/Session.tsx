import React, { useState, useEffect } from 'react'

const SessionPage: React.FC = () => {
  const [sessionId, setSessionId] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const existing = localStorage.getItem('sessionId') || ''
    setSessionId(existing)
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!sessionId.trim()) {
      setError('Veuillez entrer un ID de session')
      return
    }

    localStorage.setItem('sessionId', sessionId.trim())
    setSaved(true)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSave} className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold">Connexion</h1>
        <p className="text-sm text-gray-600">Entrez votre identifiant de session pour continuer la conversation.</p>
        <div>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => {
              setSessionId(e.target.value)
              setError('')
            }}
            placeholder="Votre ID (ex: email, uuid, etc.)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
            autoFocus
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-md bg-slate-800 hover:bg-slate-700 text-white"
        >
          {saved ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

export default SessionPage


