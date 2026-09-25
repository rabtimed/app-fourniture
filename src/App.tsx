import React, { useState, useEffect, useCallback } from 'react';
import { ClassroomHeader } from './components/ClassroomHeader';
import { Screen1Intro } from './components/Screen1Intro';
import { Screen2Backpack } from './components/Screen2Backpack';
import { Screen3BackpackGame } from './components/Screen3BackpackGame';
import { Screen4PencilCase } from './components/Screen4PencilCase';
import { Screen5SortingGame } from './components/Screen5SortingGame';
import { Screen6GenderGame } from './components/Screen6GenderGame';
import { Screen7Care } from './components/Screen7Care';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const totalScreens = 7;

  // Toggle Fullscreen mode for classroom projector
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fallback or ignore if blocked
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  }, []);

  // Monitor fullscreen change events
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Toggle Sound FX
  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
  };

  // Keyboard navigation for teachers during projection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        // In RTL, left arrow goes forward
        if (currentScreen < totalScreens) {
          soundFx.playPop();
          setCurrentScreen((s) => s + 1);
        }
      } else if (e.key === 'ArrowRight') {
        // In RTL, right arrow goes backward
        if (currentScreen > 1) {
          soundFx.playPop();
          setCurrentScreen((s) => s - 1);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, totalScreens, handleToggleFullscreen]);

  const goToNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const goToPrev = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const goToStart = () => {
    setCurrentScreen(1);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 via-sky-50/30 to-emerald-50/40 text-slate-800 flex flex-col justify-between selection:bg-amber-200">
      {/* Teacher Top Navigation */}
      <ClassroomHeader
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Classroom Projection Viewport */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        {currentScreen === 1 && <Screen1Intro onStart={goToNext} />}
        {currentScreen === 2 && <Screen2Backpack onNext={goToNext} onPrev={goToPrev} />}
        {currentScreen === 3 && <Screen3BackpackGame onNext={goToNext} onPrev={goToPrev} />}
        {currentScreen === 4 && <Screen4PencilCase onNext={goToNext} onPrev={goToPrev} />}
        {currentScreen === 5 && <Screen5SortingGame onNext={goToNext} onPrev={goToPrev} />}
        {currentScreen === 6 && <Screen6GenderGame onNext={goToNext} onPrev={goToPrev} />}
        {currentScreen === 7 && <Screen7Care onPrev={goToPrev} onRestartAll={goToStart} />}
      </main>

      {/* Classroom Footer */}
      <footer className="w-full bg-white/80 backdrop-blur-xs border-t border-amber-200/60 py-2.5 px-4 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span>🎒 أَدَوَاتِي الْمَدْرَسِيَّةُ</span>
            <span className="opacity-50">|</span>
            <span className="text-emerald-700">دَرْسٌ تَفَاعُلِيٌّ لِلصَّفِّ الأَوَّلِ ابْتِدَائِي</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-slate-500">
            <span className="font-bold text-teal-800">الأستاذة مرام الدالي</span>
            <span>•</span>
            <span>أستاذة تعليم ابتدائي</span>
            <span>•</span>
            <span className="text-amber-700 font-mono">2026-2027</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>[← / → لِلتَّنَقُّلِ]</span>
            <span>[F لِمَلْءِ الشَّاشَةِ]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
