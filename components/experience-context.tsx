'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

export type ExperienceMode = 'resort' | 'clinic';
export type BookingIntent = {
  mode?: ExperienceMode;
  interest?: string;
  source?: string;
};

type ExperienceContextValue = {
  mode: ExperienceMode;
  setMode: (mode: ExperienceMode) => void;
  bookingOpen: boolean;
  bookingIntent: BookingIntent | null;
  openBooking: (intent?: BookingIntent) => void;
  closeBooking: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playTick: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const resortRoutes = ['/stay', '/dining', '/experiences', '/gallery'];
  const routeMode = pathname === '/wellness' ? 'clinic' : resortRoutes.includes(pathname) ? 'resort' : null;
  const [mode, setModeState] = useState<ExperienceMode>(routeMode || 'resort');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState<BookingIntent | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const savedMode = window.localStorage.getItem('aranya-experience');
      if (routeMode) setModeState(routeMode);
      else if (savedMode === 'clinic' || savedMode === 'resort') setModeState(savedMode);
    } catch {
      if (routeMode) setModeState(routeMode);
    }
  }, [pathname, routeMode]);

  useEffect(() => {
    try {
      setSoundEnabled(window.localStorage.getItem('aranya-sound') === 'on');
    } catch {
      // Sound is optional; the experience works when storage is unavailable.
    }
  }, []);

  const setMode = useCallback((nextMode: ExperienceMode) => {
    setModeState(nextMode);
    try {
      window.localStorage.setItem('aranya-experience', nextMode);
    } catch {
      // Ignore unavailable storage.
    }
  }, []);

  const openBooking = useCallback((intent?: BookingIntent) => {
    setBookingIntent(intent ?? null);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    setBookingIntent(null);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem('aranya-sound', next ? 'on' : 'off');
      } catch {
        // Ignore unavailable storage.
      }
      return next;
    });
  }, []);

  const playTick = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextConstructor = window.AudioContext;
      if (!AudioContextConstructor) return;
      const context = audioRef.current ?? new AudioContextConstructor();
      audioRef.current = context;
      if (context.state === 'suspended') void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(610, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(360, context.currentTime + 0.075);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.11);
    } catch {
      // Sound is an optional enhancement; never block an interaction.
    }
  }, [soundEnabled]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      bookingOpen,
      bookingIntent,
      openBooking,
      closeBooking,
      soundEnabled,
      toggleSound,
      playTick,
    }),
    [mode, setMode, bookingOpen, bookingIntent, openBooking, closeBooking, soundEnabled, toggleSound, playTick],
  );

  return (
    <ExperienceContext.Provider value={value}>
      <div className="site-root" data-experience={mode}>
        {children}
      </div>
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error('useExperience must be used inside ExperienceProvider');
  return context;
}
