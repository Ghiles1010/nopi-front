# LMNP Simulator - AI-First React Frontend

A complete React frontend for an AI-first LMNP (Location Meublée Non Professionnelle) simulator with real-time chat-based interaction and dynamic simulation results.

## Features

- **Chat Interface**: Interactive AI conversation with typing indicators and message bubbles
- **Real-time Simulation**: Automatic updates of Micro-BIC vs Régime réel calculations
- **Responsive Design**: Optimized for desktop and mobile devices
- **Beautiful UI**: Modern, clean interface using Tailwind CSS and shadcn components
- **Bar Charts**: Visual comparison of tax regimes using Recharts

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Lucide React for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── ChatBubble.tsx   # Message bubble component
│   ├── ChatInput.tsx    # Message input with microphone icon
│   ├── ChatInterface.tsx # Main chat container
│   ├── SimulationPanel.tsx # Simulation results display
│   └── TypingIndicator.tsx # AI typing animation
├── lib/
│   └── utils.ts         # Utility functions
├── services/
│   └── api.ts           # API integration
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## API Integration

The app expects a backend API endpoint at `/api/chat` that accepts POST requests with:

```json
{
  "message": "user message",
  "conversation_history": ["previous messages"]
}
```

And returns:

```json
{
  "reply": "AI response",
  "state": {
    "prix_achat": 150000,
    "loyer_mensuel": 800,
    "charges_annuelles": 1200,
    "duree": 10
  },
  "simulation": {
    "micro_bic": {
      "revenus": 9600,
      "impots": 2880,
      "net_apres_impots": 6720
    },
    "reel": {
      "revenus": 9600,
      "impots": 2400,
      "net_apres_impots": 7200
    }
  }
}
```

## Features in Detail

### Chat Interface
- User messages (blue bubbles, right-aligned)
- AI messages (gray bubbles, left-aligned)
- Real-time typing indicators
- Auto-scrolling to latest message
- Send button and keyboard shortcuts

### Simulation Panel
- Extracted variables display (purchase price, monthly rent, charges, duration)
- Side-by-side Micro-BIC and Régime réel results
- Visual bar chart comparison
- Responsive layout for mobile

## Styling

The app uses Tailwind CSS with custom design tokens matching shadcn/ui:
- Modern color scheme with dark mode support
- Rounded corners and subtle shadows
- Responsive breakpoints
- Accessible contrast ratios

## License

MIT
