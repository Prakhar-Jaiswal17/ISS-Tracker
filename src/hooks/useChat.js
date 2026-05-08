import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/chatApi';
import useStore from '../store/useStore';

export function useChat() {
  const [loading, setLoading] = useState(false);
  const addMessage = useStore((s) => s.addChatMessage);

  // Build context from dashboard data
  const buildContext = useCallback(() => {
    const state = useStore.getState();
    const parts = [];

    // ISS data
    if (state.issPosition) {
      parts.push(`ISS Current Position: Latitude ${state.issPosition.latitude.toFixed(4)}, Longitude ${state.issPosition.longitude.toFixed(4)}`);
      parts.push(`ISS Current Speed: ${state.issSpeed} km/h`);
      parts.push(`ISS Current Location: ${state.issLocation}`);
      parts.push(`Total ISS Positions Tracked: ${state.trackedCount}`);
    }

    // Astronaut data
    if (state.astronauts) {
      parts.push(`People in Space: ${state.astronauts.number}`);
      parts.push(`Astronaut Names: ${state.astronauts.people.map((p) => `${p.name} (${p.craft})`).join(', ')}`);
    }

    // News data
    if (state.newsArticles.length > 0) {
      parts.push(`Number of News Articles: ${state.newsArticles.length}`);
      parts.push(`News Category: ${state.newsCategory}`);
      const headlines = state.newsArticles.slice(0, 5).map(
        (a, i) => `${i + 1}. "${a.title}" by ${a.author || 'Unknown'} (${a.source?.name || 'Unknown'})`
      );
      parts.push(`Recent Headlines:\n${headlines.join('\n')}`);
    }

    return parts.join('\n') || 'No dashboard data available yet.';
  }, []);

  const send = useCallback(async (text) => {
    if (!text.trim()) return;

    addMessage({
      role: 'user',
      content: text,
      timestamp: Date.now(),
    });

    setLoading(true);
    try {
      const context = buildContext();
      const reply = await sendChatMessage(text, context);
      addMessage({
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      });
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: `Error: ${err.message}`,
        timestamp: Date.now(),
        error: true,
      });
    } finally {
      setLoading(false);
    }
  }, [addMessage, buildContext]);

  return { send, loading };
}
