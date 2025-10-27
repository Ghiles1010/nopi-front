import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

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

interface SimulationState {
  prix_achat: number
  loyer_mensuel: number
  charges_annuelles: number
  duree: number
}

interface SimulationPanelProps {
  simulation: SimulationData | null
  state: SimulationState | null
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({ simulation, state }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!simulation || !state) {
    return (
      <div className="h-full p-6 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Paramètres du projet</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Prix d'achat</p>
              <p className="text-lg text-gray-400">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Loyer mensuel</p>
              <p className="text-lg text-gray-400">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Charges annuelles</p>
              <p className="text-lg text-gray-400">-</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Durée</p>
              <p className="text-lg text-gray-400">-</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-gray-500 text-center">
            Les résultats de simulation apparaîtront ici une fois que vous aurez fourni les informations nécessaires.
          </p>
        </div>
      </div>
    )
  }

  const chartData = [
    {
      regime: 'Micro-BIC',
      net: simulation.micro_bic.net_apres_impots,
    },
    {
      regime: 'Réel',
      net: simulation.reel.net_apres_impots,
    },
  ]

  return (
    <div className="h-full p-6 space-y-4 overflow-y-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Paramètres du projet</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Prix d'achat</p>
            <p className="text-lg font-semibold">{formatCurrency(state.prix_achat)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Loyer mensuel</p>
            <p className="text-lg font-semibold">{formatCurrency(state.loyer_mensuel)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Charges annuelles</p>
            <p className="text-lg font-semibold">{formatCurrency(state.charges_annuelles)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Durée</p>
            <p className="text-lg font-semibold">{state.duree} ans</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Résultats de simulation</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-base">Micro-BIC</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenus annuels</span>
                <span className="font-medium">{formatCurrency(simulation.micro_bic.revenus)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impôts</span>
                <span className="font-medium">{formatCurrency(simulation.micro_bic.impots)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Net après impôts</span>
                <span className="font-semibold text-slate-800">{formatCurrency(simulation.micro_bic.net_apres_impots)}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-base">Régime réel</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenus annuels</span>
                <span className="font-medium">{formatCurrency(simulation.reel.revenus)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impôts</span>
                <span className="font-medium">{formatCurrency(simulation.reel.impots)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Net après impôts</span>
                <span className="font-semibold text-green-600">{formatCurrency(simulation.reel.net_apres_impots)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Comparaison visuelle</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="regime" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="net" fill="#1e293b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
