import React, { useState } from 'react';
import { Volume2, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { BACKPACK_ITEMS } from '../data/schoolSupplies';
import { ItemIllustration } from './ItemIllustration';
import backpackImg from '../assets/images/school_backpack_open_1790323571128.jpg';

interface Screen2BackpackProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Screen2Backpack: React.FC<Screen2BackpackProps> = ({ onNext, onPrev }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [revealedItems, setRevealedItems] = useState<number[]>([0]);

  const currentItem = BACKPACK_ITEMS[activeIdx];

  const handleSelect = (idx: number) => {
    soundFx.playPop();
    setActiveIdx(idx);
    if (!revealedItems.includes(idx)) {
      setRevealedItems([...revealedItems, idx]);
    }
    const item = BACKPACK_ITEMS[idx];
    soundFx.speak(item.sentenceWithTashkeel);
  };

  const handleRevealAll = () => {
    soundFx.playSuccess();
    setRevealedItems([0, 1]);
  };

  const handleSpeakCurrent = () => {
    soundFx.speak(`${currentItem.demonstrative} ${currentItem.nameWithTashkeel}. ${currentItem.sentenceWithTashkeel}`);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-3 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Top Banner / Question */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 font-bold text-sm">
          <span>🎒</span>
          <span>المَحَطَّةُ 2: فِي مَحْفَظَتِي أَجِدُ أَدَوَاتِي الْمَدْرَسِيَّةَ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          اِكْتِشَافُ مُحْتَوَيَاتِ الْمَحْفَظَةِ 🎒
        </h2>
        <p className="text-lg sm:text-xl font-bold text-blue-700">
          اِضْغَطْ عَلَى الأَدَاةِ لِتَتَعَرَّفَ عَلَى اسْمِهَا وَجُمْلَتِهَا
        </p>
      </div>

      {/* Main 2-Zone Classroom Display */}
      <div className="w-full my-3 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Zone: The Open Backpack & Thumbnail Shelf */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur-sm rounded-3xl p-5 border-4 border-blue-200 shadow-xl flex flex-col justify-between items-center relative overflow-hidden">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-inner group">
            <img
              src={backpackImg}
              alt="المحفظة المدرسية مفتوحة"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-blue-900/80 text-white px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-xs flex items-center gap-1">
              <span>🎒 مَحْفَظَتِي الْمَفْتُوحَةُ</span>
            </div>
          </div>

          {/* Interactive Item Selector Shelf */}
          <div className="w-full mt-4">
            <p className="text-xs font-bold text-slate-400 mb-2 text-right">
              الأَدَوَاتُ المَوْجُودَةُ فِي المَحْفَظَةِ: الكِتَابُ وَالكُرَّاسَةُ
            </p>
            <div className="grid grid-cols-2 gap-3">
              {BACKPACK_ITEMS.map((item, idx) => {
                const isSelected = activeIdx === idx;
                const isRevealed = revealedItems.includes(idx);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-md scale-105 ring-2 ring-blue-300'
                        : isRevealed
                        ? 'border-slate-200 bg-white hover:border-blue-300'
                        : 'border-dashed border-slate-300 bg-slate-50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <ItemIllustration itemId={item.id} size="md" />
                    <span className="text-sm font-black mt-1 text-slate-800">
                      {item.nameWithTashkeel}
                    </span>
                    {isRevealed && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> تم
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Reveal / Reset Toolbar */}
          <div className="w-full mt-4 flex items-center justify-between text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
            <button
              onClick={handleRevealAll}
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-bold cursor-pointer"
            >
              ✨ إِظْهَارُ جَمِيعِ الأَدَوَاتِ
            </button>
            <button
              onClick={() => {
                setActiveIdx(0);
                setRevealedItems([0]);
                soundFx.playPop();
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إِعَادَةُ الاسْتِكْشَافِ</span>
            </button>
          </div>
        </div>

        {/* Right Zone: Spotlight Large Item Card for Classroom Projector */}
        <div className="lg:col-span-6 bg-linear-to-b from-blue-50 to-indigo-50/70 rounded-3xl p-6 sm:p-8 border-4 border-blue-300 shadow-xl flex flex-col items-center justify-between text-center relative">
          {/* Top demonstrative tag: strictly هذا or هذه */}
          <div className="flex items-center gap-2">
            <span
              className={`px-4 py-1.5 rounded-2xl text-lg font-black shadow-xs ${
                currentItem.demonstrative === 'هذا'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {currentItem.demonstrative === 'هذا' ? '🔵 هذا' : '🟣 هذه'}
            </span>
            <span className="text-xs font-bold text-slate-500">
              (اسْمُ إِشَارَةٍ)
            </span>
          </div>

          {/* Large Projector Visual */}
          <div className="my-4 relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-white rounded-3xl p-4 shadow-xl border-4 border-blue-200">
              <ItemIllustration itemId={currentItem.id} size="projector" />
            </div>
            {/* Pronounce sound bubble */}
            <button
              onClick={handleSpeakCurrent}
              className="absolute -bottom-3 -left-3 p-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
              title="انطق الجملة"
            >
              <Volume2 className="w-6 h-6" />
              <span className="text-sm font-bold hidden sm:inline">اِسْتَمِعْ</span>
            </button>
          </div>

          {/* Big Arabic Sentence for Class Repetition */}
          <div className="space-y-3 w-full max-w-lg">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-blue-200 shadow-md">
              <p className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-wide leading-tight">
                {currentItem.sentenceWithTashkeel}
              </p>
              <p className="text-base sm:text-lg font-bold text-blue-700 mt-2">
                {currentItem.description}
              </p>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-500">
              🗣️ رَدِّدُوا مَعَ الْمُعَلِّمَةِ: «{currentItem.sentenceWithTashkeel}»
            </p>
          </div>

          {/* Stepper controls */}
          <div className="flex items-center justify-between w-full max-w-xs mt-4">
            <button
              onClick={() => {
                if (activeIdx > 0) handleSelect(activeIdx - 1);
              }}
              disabled={activeIdx === 0}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="الأداة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <span className="text-sm font-black text-slate-700">
              {activeIdx + 1} مِنْ {BACKPACK_ITEMS.length}
            </span>

            <button
              onClick={() => {
                if (activeIdx < BACKPACK_ITEMS.length - 1) handleSelect(activeIdx + 1);
              }}
              disabled={activeIdx === BACKPACK_ITEMS.length - 1}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="الأداة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stage Navigation */}
      <div className="w-full flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm sm:text-base transition-colors cursor-pointer flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5" />
          <span>الشَّاشَةُ السَّابِقَةُ</span>
        </button>

        <button
          onClick={() => {
            soundFx.playSuccess();
            onNext();
          }}
          className="px-8 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg shadow-lg shadow-blue-500/30 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>إِلَى لُعْبَةِ المَحْفَظَةِ</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
