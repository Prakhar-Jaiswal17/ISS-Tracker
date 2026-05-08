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
      className="chat-window"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Header */}
      <div className="chat-header">
        <h3 className="chat-header-title">AI Assistant</h3>
        <button className="chat-clear-btn" onClick={clearChat}>Clear</button>
      </div>

      {/* Messages */}
      <div className="chat-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="chat-empty">Ask me about dashboard data...</div>
        )}
        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          return (
            <div key={i} className={`chat-msg-row ${isUser ? 'user' : 'bot'}`}>
              <div className={`chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'} ${msg.error ? 'error-bubble' : ''}`}>
                {msg.content}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="chat-msg-row bot">
            <div className="chat-typing">Assistant is typing...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask from dashboard data only"
          className="chat-input"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="chat-send-btn"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
