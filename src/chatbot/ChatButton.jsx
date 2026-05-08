import useStore from '../store/useStore';

export default function ChatButton() {
  const toggleChat = useStore((s) => s.toggleChat);
  const chatOpen = useStore((s) => s.chatOpen);

  return (
    <button className="chat-fab" onClick={toggleChat} title="Open AI Assistant">
      {chatOpen ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      )}
    </button>
  );
}
