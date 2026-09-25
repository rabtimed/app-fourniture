import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ClassroomHeaderProps {
  currentScreen: number;
  totalScreens: number;
  onSelectScreen: (screen: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SCREEN_TITLES = [
  'المقدمة والترحيب',
  'اكتشاف المحفظة',
  'لعبة ماذا في محفظتي؟',
  'اكتشاف المقلمة',
  'محفظة أم مقلمة؟',
  'هذا أم هذه؟',
  'حفظ الأدوات المدرسية',
];

export const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({
  currentScreen,
  totalScreens,
  onSelectScreen,
  isFullscreen,
  onToggleFullscreen,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      {/* Teacher identification bar */}
      <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white px-4 py-1.5 text-xs md:text-sm flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-amber-300">
            👩‍🏫
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wide text-amber-200">الأستاذة مرام الدالي</span>
            <span className="opacity-70">|</span>
            <span className="font-medium text-emerald-100">أستاذة تعليم ابتدائي</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
          <span className="bg-white/15 px-2.5 py-0.5 rounded-md text-emerald-100 font-semibold">
            السنة الأولى ابتدائي
          </span>
          <span className="opacity-70">|</span>
          <span className="text-amber-200 font-mono tracking-wider">
            السنة الدراسية: 2026-2027
          </span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Main Title */}
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center text-xl shadow-xs ring-2 ring-amber-200">
            🎒
          </div>
          <div className="truncate">
            <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 leading-tight">
              أَدَوَاتِي الْمَدْرَسِيَّةُ
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              نشاط بيداغوجي تفاعلي للعرض على شاشة الصف
            </p>
          </div>
        </div>

        {/* Zone 2: Step Navigator Pills for classroom projector */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 px-1 max-w-[50vw] lg:max-w-none scrollbar-none">
          {SCREEN_TITLES.map((title, idx) => {
            const screenNum = idx + 1;
            const isActive = currentScreen === screenNum;
            const isCompleted = screenNum < currentScreen;

            return (
              <button
                key={screenNum}
                onClick={() => {
                  soundFx.playPop();
                  onSelectScreen(screenNum);
                }}
                title={`شاشة ${screenNum}: ${title}`}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105 ring-2 ring-amber-400'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{screenNum}</span>
                <span className="hidden lg:inline text-[11px] font-normal">{title}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Projector & Audio Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen for Projector */}
          <button
            onClick={onToggleFullscreen}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="ملء الشاشة لجهاز العرض (Vidéoprojecteur)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'تصغير' : 'ملء الشاشة'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
