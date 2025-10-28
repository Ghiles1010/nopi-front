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
│   ├── ui/                 # UI primitives (button, card, input)
│   ├── ChatArea.tsx        # Conversation container (bubbles, input)
│   ├── ChatBubble.tsx      # Message bubble
│   ├── ChatInput.tsx       # Text input + submit
│   ├── SimulationSection.tsx # Extracted state + results
│   └── TypingIndicator.tsx # AI typing animation
├── pages/
│   └── Session.tsx         # Session ID gate (stores localStorage)
├── services/
│   └── api.ts              # API client (sendChatMessage, getState, resetSession)
├── App.tsx                 # App shell; hydrates state on load
├── main.tsx
└── index.css
```

## API Integration

The app expects a backend with:

- `POST /api/chat` (message → reply + optional simulation)
- `GET /api/state` (hydrate on load: state, isDone, history)
- `POST /api/reset`

`/api/chat` accepts:

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

On app load (after a session ID is set), the app calls `GET /api/state` to hydrate the chat history and extracted state so the conversation resumes where it left off.

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

## Deployment

- Build a Docker image (Taskfile provided): `task build` then `task up`
- The container serves static assets on port `80`
- With nginx in front, proxy:
  - `/` → frontend container (e.g. `http://127.0.0.1:8081`)
  - `/api/` → backend (e.g. `http://127.0.0.1:3001`)
