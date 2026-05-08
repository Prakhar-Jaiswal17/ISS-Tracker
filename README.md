# 🚀 Space Intelligence Dashboard

A premium, NASA-style AI-powered space intelligence platform built with React + Vite. Features real-time ISS tracking, news intelligence, and an AI chatbot assistant — all wrapped in a futuristic glassmorphism UI.

![Space Intelligence Dashboard](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

### 🛰️ ISS Live Tracking
- Real-time ISS position updates every 15 seconds
- Interactive Leaflet map with custom satellite marker
- Trajectory path for last 15 positions
- Speed calculation via Haversine formula
- Live speed chart (last 30 readings)
- Reverse geocoding for current location name
- People in Space display

### 📡 News Dashboard
- Latest headlines from NewsAPI
- Category filters (7 categories)
- Search and sort functionality
- Interactive source distribution chart
- 15-minute localStorage caching
- Loading skeletons and error handling

### 🤖 AI Chatbot
- Floating AI assistant powered by Mistral-7B
- Answers ONLY from dashboard data
- Persistent chat history (last 30 messages)
- Typing indicator and smooth animations

### 🎨 UI/UX
- Futuristic space-tech glassmorphism design
- Dark/light mode with smooth transitions
- Animated starfield parallax background
- Framer Motion page transitions
- Fully responsive (mobile/tablet/desktop)
- Toast notifications and error boundaries

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd iss-tracker

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_AI_TOKEN=your_huggingface_token_here
```

- **VITE_NEWS_API_KEY**: Get free at [newsapi.org](https://newsapi.org/register)
- **VITE_AI_TOKEN**: Get from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` is pre-configured with NewsAPI proxy rewrites.

## 📁 Project Structure

```
src/
├── components/      # Shared UI components
├── pages/           # ISS Tracker & News Dashboard pages
├── map/             # Leaflet map components
├── charts/          # Recharts chart components
├── chatbot/         # AI chatbot components
├── hooks/           # Custom React hooks
├── services/        # API service abstractions
├── store/           # Zustand state management
├── context/         # React context (Theme)
├── utils/           # Utility functions
└── index.css        # Global styles + Tailwind
```

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite 6 | Build tool |
| Tailwind CSS 4 | Utility styles |
| Zustand | State management |
| Framer Motion | Animations |
| Leaflet + React-Leaflet | Maps |
| Recharts | Charts |
| react-hot-toast | Notifications |

## 📄 License

MIT
