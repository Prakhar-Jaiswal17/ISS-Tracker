import { create } from 'zustand';

const useStore = create((set, get) => ({
  // === ISS State ===
  issPosition: null,
  issHistory: [],
  issSpeed: 0,
  issSpeedHistory: [],
  issLocation: 'Calculating...',
  trackedCount: 0,

  updateISSPosition: (position) => {
    const state = get();
    const history = [...state.issHistory, position].slice(-100);
    const speedHistory = [...state.issSpeedHistory];

    let speed = 0;
    if (state.issPosition) {
      // Inline Haversine calculation (ESM-compatible)
      const R = 6371;
      const lat1 = state.issPosition.latitude * Math.PI / 180;
      const lat2 = position.latitude * Math.PI / 180;
      const dLat = (position.latitude - state.issPosition.latitude) * Math.PI / 180;
      const dLon = (position.longitude - state.issPosition.longitude) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;
      const timeDiff = Math.abs(position.timestamp - state.issPosition.timestamp) / 3600;
      speed = timeDiff > 0 ? dist / timeDiff : state.issSpeed;
    }

    // Only keep last 30 speed readings
    if (speed > 0) {
      speedHistory.push({
        speed: Math.round(speed),
        time: new Date(position.timestamp * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      });
    }

    set({
      issPosition: position,
      issHistory: history,
      issSpeed: Math.round(speed) || state.issSpeed,
      issSpeedHistory: speedHistory.slice(-30),
      trackedCount: state.trackedCount + 1,
    });
  },

  setISSLocation: (location) => set({ issLocation: location }),

  // === Astronauts State ===
  astronauts: null,
  setAstronauts: (data) => set({ astronauts: data }),

  // === News State ===
  newsArticles: [],
  newsCategory: 'general',
  newsQuery: '',
  newsSort: 'date',
  newsLoading: false,
  newsError: null,

  setNewsArticles: (articles) => set({ newsArticles: articles }),
  setNewsCategory: (category) => set({ newsCategory: category }),
  setNewsQuery: (query) => set({ newsQuery: query }),
  setNewsSort: (sort) => set({ newsSort: sort }),
  setNewsLoading: (loading) => set({ newsLoading: loading }),
  setNewsError: (error) => set({ newsError: error }),

  // === Chat State ===
  chatMessages: JSON.parse(localStorage.getItem('sid_chat_messages') || '[]'),
  chatOpen: false,

  addChatMessage: (message) => {
    const messages = [...get().chatMessages, message].slice(-30);
    localStorage.setItem('sid_chat_messages', JSON.stringify(messages));
    set({ chatMessages: messages });
  },

  clearChat: () => {
    localStorage.removeItem('sid_chat_messages');
    set({ chatMessages: [] });
  },

  toggleChat: () => set({ chatOpen: !get().chatOpen }),
  setChatOpen: (open) => set({ chatOpen: open }),

  // === UI State ===
  activeTab: 'iss',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useStore;
