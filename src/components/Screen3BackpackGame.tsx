import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { ItemIllustration } from './ItemIllustration';

interface Screen3BackpackGameProps {
  onNext: () => void;
  onPrev: () => void;
}

interface SupplyOption {
  id: string;
  name: string;
  nameWithTashkeel: string;
  isBackpackItem: boolean;
  emoji: string;
  hint: string;
}

const GAME_ITEMS: SupplyOption[] = [
  { id: 'book', name: 'كتاب', nameWithTashkeel: 'كِتَابٌ 📖', isBackpackItem: true, emoji: '📖', hint: 'نَعَمْ! الكِتَابُ نَضَعُهُ فِي المَحْفَظَةِ 🎒' },
  { id: 'pen', name: 'قلم', nameWithTashkeel: 'قَلَمٌ ✏️', isBackpackItem: false, emoji: '✏️', hint: 'القَلَمُ مَكَانُهُ دَاخِلَ المِقْلَمَةِ ✏️' },
  { id: 'notebook', name: 'كراسة', nameWithTashkeel: 'كُرَّاسَةٌ 📒', isBackpackItem: true, emoji: '📒', hint: 'أَحْسَنْتَ! الكُرَّاسَةُ مَكَانُهَا فِي المَحْفَظَةِ 🎒' },
  { id: 'ruler', name: 'مسطرة', nameWithTashkeel: 'مِسْطَرَةٌ 📏', isBackpackItem: false, emoji: '📏', hint: 'المِسْطَرَةُ نَضَعُهَا دَاخِلَ المِقْلَمَةِ 📏' },
  { id: 'apple', name: 'تفاحة', nameWithTashkeel: 'تُفَّاحَةٌ 🍎', isBackpackItem: false, emoji: '🍎', hint: 'التُّفَّاحَةُ غِذَاءٌ لَذِيذٌ وَلَيْسَتْ مِنْ أَدَوَاتِ الدِّرَاسَةِ 🍎' },
  { id: 'eraser', name: 'ممحاة', nameWithTashkeel: 'مِمْحَاةٌ 🧽', isBackpackItem: false, emoji: '🧽', hint: 'المِمْحَاةُ أَدَاةٌ صَغِيرَةٌ نَضَعُهَا فِي المِقْلَمَةِ 🧽' },
  { id: 'sharpener', name: 'مبراة', nameWithTashkeel: 'مِبْرَاةٌ ✂️', isBackpackItem: false, emoji: '✂️', hint: 'المِبْرَاةُ مَكَانُهَا فِي المِقْلَمَةِ ✂️' },
  { id: 'toy_car', name: 'سيارة لعبة', nameWithTashkeel: 'سَيَّارَةُ لُعَبٍ 🚗', isBackpackItem: false, emoji: '🚗', hint: 'السَّيَّارَةُ لُعْبَةٌ نَتْرُكُهَا فِي غُرْفَةِ الأَلْعَابِ 🚗' },
];

export const Screen3BackpackGame: React.FC<Screen3BackpackGameProps> = ({ onNext, onPrev }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);

  const totalBackpackItems = GAME_ITEMS.filter((i) => i.isBackpackItem).length;
  const foundItems = selectedIds.filter((id) =>
    GAME_ITEMS.find((item) => item.id === id)?.isBackpackItem
  );
  const isComplete = foundItems.length === totalBackpackItems;

  const handleItemClick = (item: SupplyOption) => {
    if (selectedIds.includes(item.id)) {
      soundFx.speak(item.nameWithTashkeel);
      return;
    }

    if (item.isBackpackItem) {
      soundFx.playSuccess();
      setSelectedIds([...selectedIds, item.id]);
      setFeedback({
        text: `أَحْسَنْتَ! 👏 ${item.hint}`,
        isSuccess: true,
      });
      soundFx.speak(`أحسنت! ${item.nameWithTashkeel}`);

      // Check if this was the last item
      if (foundItems.length + 1 === totalBackpackItems) {
        soundFx.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      soundFx.playEncouragement();
      setFeedback({
        text: `حَاوِلْ مَرَّةً أُخْرَى! 😊 ${item.hint}`,
        isSuccess: false,
      });
      soundFx.speak(`حاول مرة أخرى! ${item.hint}`);
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setSelectedIds([]);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-3 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Header & Prompt */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm">
          <span>🎮</span>
          <span>المَحَطَّةُ 3: لُعْبَةُ التَّعَرُّفِ التَّفَاعُلِيَّةُ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          مَاذَا أَجِدُ فِي مَحْفَظَتِي؟ 🎒
        </h2>
        <p className="text-lg sm:text-xl font-bold text-amber-800">
          اِضْغَطْ عَلَى الأَدَوَاتِ الَّتِي نَضَعُهَا دَاخِلَ المَحْفَظَةِ (الكِتَابُ وَالكُرَّاسَةُ)
        </p>
      </div>

      {/* Score Tracker & Feedback Bar */}
      <div className="w-full max-w-4xl my-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl p-3 border-2 border-amber-200 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">أَدَوَاتُ المَحْفَظَةِ المُكْتَشَفَةُ:</span>
          <div className="flex items-center gap-1 font-mono text-lg font-black text-amber-600 bg-amber-50 px-3 py-0.5 rounded-lg border border-amber-200">
            <span>{foundItems.length}</span>
            <span>/</span>
            <span>{totalBackpackItems}</span>
          </div>
          <div className="flex items-center gap-1 mr-2">
            {[...Array(totalBackpackItems)].map((_, i) => (
              <span
                key={i}
                className={`text-xl transition-transform ${
                  i < foundItems.length ? 'scale-110' : 'opacity-30 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Live Feedback banner */}
        {feedback && (
          <div
            className={`px-4 py-1.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200 ${
              feedback.isSuccess
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <span>{feedback.isSuccess ? '👏' : '💡'}</span>
            <span>{feedback.text}</span>
          </div>
        )}

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إِعَادَةُ اللَّعِبِ</span>
        </button>
      </div>

      {/* Main Choice Grid */}
      <div className="w-full max-w-5xl my-3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {GAME_ITEMS.map((item) => {
          const isFound = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`relative flex flex-col items-center justify-between p-4 rounded-3xl border-4 transition-all duration-200 cursor-pointer text-center group ${
                isFound
                  ? 'border-emerald-500 bg-emerald-50/90 shadow-lg scale-102 ring-4 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Badge if found */}
              {isFound && (
                <div className="absolute top-2 left-2 bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              {/* Graphic visual */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center my-2">
                {['book', 'notebook', 'pen', 'eraser', 'ruler', 'sharpener'].includes(item.id) ? (
                  <ItemIllustration itemId={item.id} size="md" />
                ) : (
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>
                )}
              </div>

              {/* Word with Tashkeel in high legibility font */}
              <div className="w-full mt-2 pt-2 border-t border-slate-100">
                <span className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-700">
                  {item.nameWithTashkeel}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Success Celebration Toast when complete */}
      {isComplete && (
        <div className="w-full max-w-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-4 shadow-xl text-center space-y-1 animate-in bounce-in duration-500">
          <p className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2">
            <span>🎉</span>
            <span>مُمْتَازٌ يَا أَبْطَالَ الصَّفِّ الأَوَّلِ!</span>
            <span>⭐</span>
          </p>
          <p className="text-base sm:text-lg font-bold text-emerald-100">
            لَقَدْ تَعَرَّفْتُمْ عَلَى أَدَوَاتِ المَحْفَظَةِ (الكِتَابُ وَالكُرَّاسَةُ) بِنَجَاحٍ!
          </p>
        </div>
      )}

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
          className="px-8 py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-base sm:text-lg shadow-lg shadow-amber-500/30 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>إِلَى اكْتِشَافِ المِقْلَمَةِ</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
