# LMNP Simulator - Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Overview

This is a complete React frontend for an AI-first LMNP simulator built with:
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent UI
- **Recharts** for data visualization

## Component Architecture

### Main Components

1. **App.tsx** - Main application orchestrator
   - Manages global state (messages, simulation data)
   - Handles API integration
   - Provides responsive layout

2. **ChatInterface** - Chat container
   - Scrollable message list
   - Auto-scroll to bottom
   - Empty state with welcome message

3. **ChatBubble** - Individual message display
   - User messages (blue, right-aligned)
   - AI messages (gray, left-aligned)
   - Proper text wrapping

4. **ChatInput** - Message input area
   - Auto-expanding textarea
   - Send button and microphone icon
   - Keyboard shortcuts (Enter to send)

5. **TypingIndicator** - AI typing animation
   - Animated dots while AI is responding

6. **SimulationPanel** - Results display
   - Variables summary card
   - Side-by-side regime comparison
   - Interactive bar chart
   - Real-time updates

## API Integration

The frontend expects a backend at `/api/chat` with:

**Request:**
```json
{
  "message": "user input text",
  "conversation_history": ["previous messages"]
}
```

**Response:**
```json
{
  "reply": "AI response text",
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

## Styling

- Uses Tailwind CSS with custom design tokens
- shadcn/ui components for consistency
- Responsive breakpoints (mobile-first)
- Dark mode support built-in
- Accessible color contrasts

## Development

### File Structure
```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── ChatBubble.tsx   # Message bubbles
│   ├── ChatInput.tsx    # Input with send button
│   ├── ChatInterface.tsx # Chat container
│   ├── SimulationPanel.tsx # Results display
│   └── TypingIndicator.tsx # AI typing animation
├── lib/
│   └── utils.ts         # Helper functions
├── services/
│   └── api.ts           # API client
├── App.tsx              # Main app
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### Key Features

✅ **Responsive Design**
- Desktop: Chat left, results right
- Mobile: Chat top, results bottom

✅ **Real-time Updates**
- Simulation updates as chat progresses
- Loading states and typing indicators
- Smooth scrolling

✅ **Modern UI**
- Rounded chat bubbles
- Subtle shadows
- Professional color scheme
- Clean typography

✅ **User Experience**
- Auto-expanding text input
- Keyboard shortcuts
- Disabled states during loading
- Empty states and error handling

## Testing

To test without a backend, you can modify `services/api.ts` to return mock data:

```typescript
export const sendChatMessage = async (): Promise<ChatResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    reply: "Mock AI response",
    state: {
      prix_achat: 150000,
      loyer_mensuel: 800,
      charges_annuelles: 1200,
      duree: 10
    },
    simulation: {
      micro_bic: {
        revenus: 9600,
        impots: 2880,
        net_apres_impots: 6720
      },
      reel: {
        revenus: 9600,
        impots: 2400,
        net_apres_impots: 7200
      }
    }
  }
}
```

## Production Deployment

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

3. Make sure your backend API is accessible at `/api/chat`

## Browser Support

Modern browsers with ES2020 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
