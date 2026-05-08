import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function ChatButton() {
  const toggleChat = useStore((s) => s.toggleChat);
  const chatOpen = useStore((s) => s.chatOpen);

  return (
    <motion.button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: 'var(--accent-red)',
        color: 'white',
        border: 'none',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Open AI Assistant"
    >
      <motion.div
        animate={{ rotate: chatOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {chatOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
             <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
