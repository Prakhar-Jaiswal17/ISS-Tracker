import { AnimatePresence } from 'framer-motion';
import StarfieldBackground from './StarfieldBackground';
import ErrorBoundary from './ErrorBoundary';
import useStore from '../store/useStore';
import ISSTracker from '../pages/ISSTracker';
import NewsDashboard from '../pages/NewsDashboard';
import SpeedChart from '../charts/SpeedChart';
import ChatButton from '../chatbot/ChatButton';
import ChatWindow from '../chatbot/ChatWindow';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const chatOpen = useStore((s) => s.chatOpen);
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <StarfieldBackground />

      <main className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-header-subtitle">Mission Control Dashboard</p>
            <h1 className="dashboard-header-title">Real-Time ISS and News Intelligence</h1>
          </div>
          <button className="theme-btn" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </header>

        {/* ISS Tracker + Speed Chart side by side */}
        <div className="top-grid">
          <ErrorBoundary>
            <ISSTracker />
          </ErrorBoundary>
          <ErrorBoundary>
            <SpeedChart />
          </ErrorBoundary>
        </div>

        {/* Breaking News full width */}
        <ErrorBoundary>
          <NewsDashboard />
        </ErrorBoundary>
      </main>

      {/* Chatbot */}
      <ChatButton />
      <AnimatePresence>
        {chatOpen && <ChatWindow />}
      </AnimatePresence>
    </div>
  );
}
