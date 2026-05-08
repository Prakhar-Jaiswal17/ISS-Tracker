export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="chat-bubble-bot flex items-center gap-1 py-3 px-4">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
