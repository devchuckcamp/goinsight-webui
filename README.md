# GoInsight Frontend – Feedback Copilot

A React + TypeScript frontend application that connects to the [**GoInsight**](https://github.com/devchuckcamp/goinsight) feedback analytics API. This application provides an intuitive interface for asking natural language questions about feedback data and visualizing AI-powered insights.

> **Backend Required**: This frontend connects to the [GoInsight Backend API](https://github.com/devchuckcamp/goinsight) - a Go-based AI-powered feedback analytics service. Make sure to set up and run the backend before using this frontend.

## ��� Features

- **Natural Language Query Interface**: Ask questions in plain English about your feedback data
- **Rich Data Visualization**: Interactive tables with sortable columns, color-coded chips, and detailed tooltips
- **AI-Powered Insights**: Get summaries, recommendations, and actionable items from your feedback data
- **Material UI Design**: Professional, accessible UI components with a polished internal tool aesthetic
- **Type-Safe Architecture**: Full TypeScript coverage with strict typing throughout
- **State Management**: Efficient global state management with Zustand
- **Responsive Design**: Works seamlessly across desktop and tablet devices
- **SCSS Styling**: Customizable styling with SCSS modules and MUI theming

## ���️ Technology Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **Material UI (MUI v5)** - Component library
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **SCSS/Sass** - Styling
- **Emotion** - CSS-in-JS (required by MUI)

## 📋 Prerequisites

- **Node.js 18+** and npm
- **[GoInsight Backend API](https://github.com/devchuckcamp/goinsight)** - Clone, configure, and run the backend server
  ```bash
  # Clone the backend
  git clone https://github.com/devchuckcamp/goinsight.git
  cd goinsight
  # Follow the backend README for setup instructions
  ```
- Backend should be running at `http://localhost:8080` (or configure custom URL in `.env`)

## ��� Getting Started

### 1. Clone and Install

```bash
cd goinsight-web
npm install
```

### 2. Configure Environment

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` to configure your API endpoint and JIRA settings:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_JIRA_PROJECT_KEY=SASS
```

**Environment Variables:**
- `VITE_API_BASE_URL`: Backend API URL (default: `http://localhost:8080`)
- `VITE_JIRA_PROJECT_KEY`: JIRA project key for ticket creation (default: `SASS`)

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## ��� Project Structure

```
goinsight-webui/
├── src/
│   ├── api/
│   │   ├── client.ts           # Axios client with interceptors
│   │   └── goinsight.ts        # Typed API functions
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppLayout.tsx   # Main app layout with header/footer
│   │   └── ask/
│   │       ├── QuestionForm.tsx         # Question input form
│   │       ├── InsightSummary.tsx       # Summary display
│   │       ├── DataPreviewTable.tsx     # Data table with sorting
│   │       ├── RecommendationsList.tsx  # Recommendations display
│   │       └── ActionsAccordion.tsx     # Actionable items
│   ├── hooks/
│   │   └── useAskQuestion.ts   # Custom hook for API calls
│   ├── store/
│   │   └── useInsightStore.ts  # Zustand global store
│   ├── styles/
│   │   ├── _variables.scss     # SCSS variables
│   │   └── global.scss         # Global styles and utilities
│   ├── types/
│   │   └── goinsight.ts        # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── config.ts               # Configuration management
├── .env.example                # Environment variables template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## ���️ Architecture Overview

### State Management

The application uses **Zustand** for global state management with a clean, type-safe API:

```typescript
const { lastResponse, loading, error } = useInsightStore();
```

### API Integration

API calls are abstracted through:
1. **API Client** (`api/client.ts`): Axios instance with interceptors
2. **API Functions** (`api/goinsight.ts`): Typed API methods
3. **Custom Hook** (`useAskQuestion`): Encapsulates API logic and state updates

### Component Hierarchy

```
App.tsx
└── AppLayout
    ├── QuestionForm
    └── Results (conditional)
        ├── InsightSummary
        ├── DataPreviewTable
        ├── RecommendationsList
        └── ActionsAccordion
```

## ��� Styling Approach

The application combines **Material UI** theming with **SCSS** for maximum flexibility:

- **MUI Components**: Buttons, Cards, Tables, Chips, etc.
- **MUI Theme**: Custom color palette and typography
- **SCSS Variables**: Spacing, colors, breakpoints
- **SCSS Utilities**: Layout helpers, spacing utilities

## ��� Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ��� API Integration

The frontend expects the following API endpoint:

**POST** `/api/ask`

Request:
```json
{
  "question": "Show me critical issues from enterprise customers"
}
```

Response:
```json
{
  "question": "Show me critical issues from enterprise customers",
  "data_preview": [
    {
      "id": "fb-001",
      "created_at": "2025-12-02T10:13:20Z",
      "customer_tier": "enterprise",
      "priority": 5,
      "product_area": "billing",
      "region": "NA",
      "sentiment": "negative",
      "source": "zendesk",
      "summary": "Customer unable to process refund...",
      "topic": "refund processing"
    }
  ],
  "summary": "Analysis of critical enterprise issues...",
  "recommendations": [
    "Prioritize billing system refund workflow",
    "Schedule customer success check-in"
  ],
  "actions": [
    {
      "title": "Fix Refund Processing Bug",
      "description": "Investigate and resolve refund processing issue..."
    }
  ]
}
```

## 🔗 Backend Integration

This frontend is designed to work seamlessly with the [GoInsight Backend API](https://github.com/devchuckcamp/goinsight):

**Backend Features:**
- AI-powered feedback analysis using GPT models
- Natural language question processing
- JIRA ticket creation from actionable insights
- RESTful API with JSON responses
- Go-based for performance and reliability

**Integration Points:**
- `POST /api/ask` - Submit natural language questions about feedback data
- `POST /api/jira-tickets` - Create JIRA tickets from selected actions
- Environment-based configuration for seamless local/production deployment

**Setup Instructions:**
1. Clone and run the [GoInsight backend](https://github.com/devchuckcamp/goinsight)
2. Ensure it's accessible at `http://localhost:8080` (or update `VITE_API_BASE_URL`)
3. Start this frontend and begin querying your feedback data

## 🚀 Future Enhancements

- [ ] Authentication & Authorization
- [x] JIRA Integration (convert actions to tickets) ✅
- [ ] Advanced filtering and search
- [ ] Data export capabilities
- [ ] Charts and visualizations
- [ ] Saved queries and history
- [ ] Real-time updates via WebSockets
- [ ] Multi-language support

## ��� Code Quality

This project demonstrates senior-level React engineering practices:

- **TypeScript**: Strict typing, no `any` types
- **React Hooks**: Proper use of `useMemo`, `useCallback`, custom hooks
- **Component Design**: Small, focused, reusable components
- **Error Handling**: Comprehensive error states and user feedback
- **Performance**: Optimized re-renders, memoization where appropriate
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## ��� Contributing

1. Follow the existing code style and patterns
2. Use TypeScript strictly (no `any` types)
3. Write descriptive commit messages
4. Test thoroughly before submitting

## ��� License

MIT License - see LICENSE file for details

---

Built with ❤️ by the GoInsight Team
