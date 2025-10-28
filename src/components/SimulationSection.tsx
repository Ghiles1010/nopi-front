import React from 'react'
import { SimulationPanel } from './SimulationPanel'

interface SimulationState {
  prix_achat: number | null
  loyer_mensuel: number | null
  charges_annuelles: number | null
  duree: number | null
}

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

interface SimulationSectionProps {
  simulation: SimulationData | null
  state: SimulationState | null
}

export const SimulationSection: React.FC<SimulationSectionProps> = ({
  simulation,
  state,
}: SimulationSectionProps) => {
  return (
    <div className="flex-1 m-4 h-[calc(100vh-8rem)] rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden p-4 lg:p-6">
        <SimulationPanel
          simulation={simulation}
          state={state}
        />
      </div>
    </div>
  )
}

