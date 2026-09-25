import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { SORTING_ITEMS } from '../data/schoolSupplies';
import { ItemIllustration } from './ItemIllustration';

interface Screen5SortingGameProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Screen5SortingGame: React.FC<Screen5SortingGameProps> = ({ onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [backpackBag, setBackpackBag] = useState<string[]>([]);
  const [pencilCaseBag, setPencilCaseBag] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);

  const currentItem = SORTING_ITEMS[currentIndex];
  const isFinished = currentIndex >= SORTING_ITEMS.length;

  const handleClassify = (target: 'محفظة' | 'مقلمة') => {
    if (!currentItem || isFinished) return;

    if (currentItem.target === target) {
      soundFx.playSuccess();
      setFeedback({
        text: `أَحْسَنْتَ! 👏 ${currentItem.nameWithTashkeel} مَكَانُهُ فِي ${
          target === 'محفظة' ? 'المَحْفَظَةِ 🎒' : 'المِقْلَمَةِ ✏️'
        }!`,
        isSuccess: true,
      });

      if (target === 'محفظة') {
        setBackpackBag((prev) => [...prev, currentItem.id]);
      } else {
        setPencilCaseBag((prev) => [...prev, currentItem.id]);
      }

      soundFx.speak(`أحسنت! ${currentItem.nameWithTashkeel} في ${target === 'محفظة' ? 'المحفظة' : 'المقلمة'}`);

      // Move to next item after small delay
      setTimeout(() => {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setFeedback(null);
        if (nextIdx >= SORTING_ITEMS.length) {
          soundFx.playFanfare();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
          });
        }
      }, 900);
    } else {
      soundFx.playEncouragement();
      setFeedback({
        text: `حَاوِلْ مَرَّةً أُخْرَى! 😊 أَيْنَ نَضَعُ ${currentItem.nameWithTashkeel}؟`,
        isSuccess: false,
      });
      soundFx.speak(`حاول مرة أخرى! أين نضع ${currentItem.nameWithTashkeel}؟`);
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setCurrentIndex(0);
    setBackpackBag([]);
    setPencilCaseBag([]);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-3 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Top Banner */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-900 font-bold text-sm">
          <span>⚖️</span>
          <span>المَحَطَّةُ 5: لُعْبَةُ التَّصْنِيفِ الثُّنَائِيّ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          مَحْفَظَةٌ أَمْ مِقْلَمَةٌ؟ 🎒 / ✏️
        </h2>
        <p className="text-lg sm:text-xl font-bold text-indigo-800">
          اِنْقُرْ عَلَى المَكَانِ الصَّحِيحِ لِوَضْعِ الأَدَاةِ الْمَعْرُوضَةِ
        </p>
      </div>

      {/* Progress & Reset bar */}
      <div className="w-full max-w-4xl my-1 flex items-center justify-between bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-700">
          <span>الأَدَاةُ الحَالِيَّةُ:</span>
          <span className="font-mono text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
            {Math.min(currentIndex + 1, SORTING_ITEMS.length)} / {SORTING_ITEMS.length}
          </span>
        </div>

        {feedback && (
          <div
            className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-bold animate-in fade-in zoom-in-95 ${
              feedback.isSuccess
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {feedback.text}
          </div>
        )}

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إِعَادَةُ التَّصْنِيفِ</span>
        </button>
      </div>

      {/* 3-Column Arena */}
      <div className="w-full max-w-6xl my-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Zone A: المحفظة (Dropzone 1) */}
        <div className="md:col-span-4 bg-linear-to-b from-blue-50 to-indigo-100/70 rounded-3xl p-5 border-4 border-blue-300 shadow-lg flex flex-col justify-between items-center text-center">
          <div className="space-y-1">
            <span className="text-3xl">🎒</span>
            <h3 className="text-2xl font-black text-blue-900">مَحْفَظَتِي</h3>
            <p className="text-xs font-semibold text-blue-700">
              لِلْكُتُبِ وَالكُرَّاسَاتِ
            </p>
          </div>

          {/* Items inside Backpack */}
          <div className="w-full my-4 min-h-[140px] bg-white/70 rounded-2xl p-3 border-2 border-dashed border-blue-300 flex flex-wrap gap-2 items-center justify-center">
            {backpackBag.length === 0 ? (
              <span className="text-xs text-blue-400 font-bold">
                المَحْفَظَةُ تَنْتَظِرُ أَدَوَاتِهَا...
              </span>
            ) : (
              backpackBag.map((id) => (
                <div
                  key={id}
                  className="bg-white p-2 rounded-xl shadow-xs border border-blue-200 flex flex-col items-center animate-in zoom-in-75 duration-300"
                >
                  <ItemIllustration itemId={id} size="sm" />
                  <span className="text-[11px] font-black mt-1 text-blue-900">
                    {SORTING_ITEMS.find((i) => i.id === id)?.nameWithTashkeel}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Big Action Button */}
          <button
            onClick={() => handleClassify('محفظة')}
            disabled={isFinished}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>🎒 ضَعْ فِي الْمَحْفَظَةِ</span>
          </button>
        </div>

        {/* Center: The Active Item Card */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
          {!isFinished && currentItem ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>أَيْنَ نَضَعُ هذه الأَدَاةَ؟</span>
              </div>

              {/* Central Projector Item Visual */}
              <div className="my-4 animate-in zoom-in-95 duration-300">
                <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center bg-amber-50 rounded-3xl p-4 border-2 border-amber-200 shadow-inner">
                  <ItemIllustration itemId={currentItem.id} size="projector" />
                </div>
              </div>

              {/* Big Arabic Name with diacritics */}
              <div className="w-full space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-900">
                  {currentItem.nameWithTashkeel}
                </p>
                <p className="text-xs font-bold text-slate-400">
                  {currentItem.description}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-semibold pt-2">
                اختر الزر الأيمن أو الأيسر لتوجيه الأداة
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-3 py-8">
              <span className="text-5xl animate-bounce">🏆</span>
              <p className="text-2xl font-black text-emerald-700">
                رَائِعٌ جِدّاً!
              </p>
              <p className="text-sm font-bold text-slate-600 max-w-xs">
                وَضَعْتُمْ كُلَّ أَدَاةٍ فِي مَكَانِهَا الْمُنَاسِبِ!
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                إِعَادَةُ اللَّعِبِ 🔄
              </button>
            </div>
          )}
        </div>

        {/* Zone B: المقلمة (Dropzone 2) */}
        <div className="md:col-span-4 bg-linear-to-b from-pink-50 to-purple-100/70 rounded-3xl p-5 border-4 border-pink-300 shadow-lg flex flex-col justify-between items-center text-center">
          <div className="space-y-1">
            <span className="text-3xl">✏️</span>
            <h3 className="text-2xl font-black text-pink-900">مِقْلَمَتِي</h3>
            <p className="text-xs font-semibold text-pink-700">
              لِلأَقْلَامِ، المِمْحَاةِ، المِبْرَاةِ، وَالمِسْطَرَةِ
            </p>
          </div>

          {/* Items inside Pencil Case */}
          <div className="w-full my-4 min-h-[140px] bg-white/70 rounded-2xl p-3 border-2 border-dashed border-pink-300 flex flex-wrap gap-2 items-center justify-center">
            {pencilCaseBag.length === 0 ? (
              <span className="text-xs text-pink-400 font-bold">
                المِقْلَمَةُ تَنْتَظِرُ أَدَوَاتِهَا...
              </span>
            ) : (
              pencilCaseBag.map((id) => (
                <div
                  key={id}
                  className="bg-white p-2 rounded-xl shadow-xs border border-pink-200 flex flex-col items-center animate-in zoom-in-75 duration-300"
                >
                  <ItemIllustration itemId={id} size="sm" />
                  <span className="text-[11px] font-black mt-1 text-pink-900">
                    {SORTING_ITEMS.find((i) => i.id === id)?.nameWithTashkeel}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Big Action Button */}
          <button
            onClick={() => handleClassify('مقلمة')}
            disabled={isFinished}
            className="w-full py-4 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>✏️ ضَعْ فِي الْمِقْلَمَةِ</span>
          </button>
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
          className="px-8 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base sm:text-lg shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>إِلَى لُعْبَةِ «هذا أَمْ هذه؟»</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
