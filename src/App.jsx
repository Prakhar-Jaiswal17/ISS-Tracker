import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-glass)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </ThemeProvider>
  );
}
