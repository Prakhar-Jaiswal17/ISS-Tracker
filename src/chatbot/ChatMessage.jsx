export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p
          className="text-[10px] mt-1 opacity-50"
          style={{ color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
