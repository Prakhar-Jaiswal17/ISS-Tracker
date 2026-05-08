import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { useChat } from '../hooks/useChat';

export default function ChatWindow() {
  const messages = useStore((s) => s.chatMessages);
  const clearChat = useStore((s) => s.clearChat);
  const { send, loading } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden rounded-2xl"
      style={{
        height: '460px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
          AI Assistant
        </h3>
        <button
          onClick={clearChat}
          className="px-3 py-1 rounded-md text-xs font-medium border transition-colors hover:opacity-80"
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-color)',
            background: 'var(--bg-primary)',
          }}
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3"
      >
        {messages.length === 0 && (
          <div className="text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>
            Ask me about dashboard data...
          </div>
        )}
        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          return (
            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-2.5 text-sm max-w-[85%] leading-relaxed ${
                  isUser ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-bl-md'
                }`}
                style={{
                  background: isUser ? 'var(--bg-primary)' : 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: msg.error ? '1px solid #ef4444' : '1px solid var(--border-color)',
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div
              className="px-4 py-2.5 text-xs rounded-2xl rounded-bl-md italic"
              style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
            >
              Assistant is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 flex-shrink-0 flex items-center gap-2"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask from dashboard data only"
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none border"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 hover:opacity-80"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
