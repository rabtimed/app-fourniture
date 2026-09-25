import React, { useState } from 'react';
import { Volume2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { SCHOOL_ITEMS } from '../data/schoolSupplies';
import { ItemIllustration } from './ItemIllustration';

interface Screen6GenderGameProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Screen6GenderGame: React.FC<Screen6GenderGameProps> = ({ onNext, onPrev }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<{
    text: string;
    isCorrect: boolean;
    explanation?: string;
  } | null>(null);

  const currentItem = SCHOOL_ITEMS[currentIdx];
  const isFinished = currentIdx >= SCHOOL_ITEMS.length;
  const correctCount = Object.values(answers).filter(Boolean).length;

  const handleChoice = (chosen: 'هذا' | 'هذه') => {
    if (!currentItem || isFinished) return;

    const isCorrect = chosen === currentItem.demonstrative;
    setAnswers((prev) => ({ ...prev, [currentIdx]: isCorrect }));

    if (isCorrect) {
      soundFx.playSuccess();
      const sentence = `${currentItem.demonstrative} ${currentItem.nameWithTashkeel}!`;
      setFeedback({
        text: `أَحْسَنْتُمْ! 👏 نَقُولُ: ${sentence}`,
        isCorrect: true,
        explanation:
          currentItem.demonstrative === 'هذا'
            ? 'لِأَنَّهُ اسْمٌ مُذَكَّرٌ 🔵'
            : 'لِأَنَّهُ اسْمٌ مُؤَنَّثٌ يَنْتَهِي بِالتَّاءِ الْمَرْبُوطَةِ 🟣',
      });
      soundFx.speak(`أحسنت! ${sentence}`);

      // Auto advance
      setTimeout(() => {
        const next = currentIdx + 1;
        setCurrentIdx(next);
        setFeedback(null);
        if (next >= SCHOOL_ITEMS.length) {
          soundFx.playFanfare();
          confetti({
            particleCount: 130,
            spread: 90,
            origin: { y: 0.6 },
          });
        }
      }, 1400);
    } else {
      soundFx.playEncouragement();
      setFeedback({
        text: `حَاوِلْ مَرَّةً أُخْرَى! 😊 فَلْنُفَكِّرْ مَعاً: هَلْ هُوَ مُذَكَّرٌ أَمْ مُؤَنَّثٌ؟`,
        isCorrect: false,
      });
      soundFx.speak(`حاول مرة أخرى!`);
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setCurrentIdx(0);
    setAnswers({});
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-3 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Top Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 font-bold text-sm">
          <span>🔵🟣</span>
          <span>المَحَطَّةُ 6: التَّمْيِيزُ بَيْنَ اسْمَيِ الإِشَارَةِ (هذا / هذه)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          هذا أَمْ هذه؟ 🔵 🟣
        </h2>
        <p className="text-lg sm:text-xl font-bold text-purple-800">
          انْظُرْ إِلَى الصُّورَةِ وَاخْتَرِ اسْمَ الإِشَارَةِ الْمُنَاسِبَ (هذا لِلْمُذَكَّرِ / هذه لِلْمُؤَنَّثِ)
        </p>
      </div>

      {/* Progress Stars */}
      <div className="w-full max-w-3xl my-1 flex items-center justify-between bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">الأَسْئِلَةُ:</span>
          <span className="font-mono text-base font-black text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
            {Math.min(currentIdx + 1, SCHOOL_ITEMS.length)} / {SCHOOL_ITEMS.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {SCHOOL_ITEMS.map((_, idx) => (
            <span
              key={idx}
              className={`text-xl transition-all ${
                answers[idx] !== undefined
                  ? answers[idx]
                    ? 'scale-110'
                    : 'opacity-40 grayscale'
                  : 'opacity-20'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إِعَادَةُ التَّمْرِينِ</span>
        </button>
      </div>

      {/* Central Interactive Arena */}
      <div className="w-full max-w-3xl my-3 bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-200 shadow-2xl flex flex-col items-center justify-between text-center relative overflow-hidden">
        {!isFinished && currentItem ? (
          <>
            {/* Object Image in Large Projector Size */}
            <div className="relative my-2">
              <div className="w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center bg-radial from-amber-50 to-purple-50/50 rounded-3xl p-4 border-2 border-purple-100 shadow-inner">
                <ItemIllustration itemId={currentItem.id} size="projector" />
              </div>
              <button
                onClick={() => soundFx.speak(currentItem.nameWithTashkeel)}
                className="absolute -bottom-2 -left-2 p-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold shadow-md cursor-pointer flex items-center gap-1.5 text-xs"
                title="استمع إلى اسم الأداة"
              >
                <Volume2 className="w-4 h-4" />
                <span>نُطْقُ الكَلِمَةِ</span>
              </button>
            </div>

            {/* Prompt sentence template: ... [الأداة] */}
            <div className="my-3 space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wide">
                ... {currentItem.nameWithTashkeel}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-400">
                {currentItem.description}
              </p>
            </div>

            {/* Instant Feedback Notice */}
            {feedback && (
              <div
                className={`w-full p-3 rounded-2xl text-center font-bold text-base sm:text-lg mb-2 animate-in fade-in zoom-in-95 duration-200 ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-2 border-amber-300'
                }`}
              >
                <p>{feedback.text}</p>
                {feedback.explanation && (
                  <p className="text-xs sm:text-sm font-medium mt-1 text-emerald-700">
                    {feedback.explanation}
                  </p>
                )}
              </div>
            )}

            {/* The Two Big Projector Buttons: strictly هذا and هذه */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg mt-2">
              {/* Option: هذا */}
              <button
                onClick={() => handleChoice('هذا')}
                className="py-5 sm:py-6 px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white rounded-3xl font-black text-2xl sm:text-3xl shadow-xl shadow-blue-500/25 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-4 border-blue-400"
              >
                <span className="text-3xl sm:text-4xl">🔵</span>
                <span>هذا</span>
                <span className="text-xs font-bold text-blue-200">(مُذَكَّرٌ)</span>
              </button>

              {/* Option: هذه */}
              <button
                onClick={() => handleChoice('هذه')}
                className="py-5 sm:py-6 px-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95 text-white rounded-3xl font-black text-2xl sm:text-3xl shadow-xl shadow-purple-500/25 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border-4 border-purple-400"
              >
                <span className="text-3xl sm:text-4xl">🟣</span>
                <span>هذه</span>
                <span className="text-xs font-bold text-pink-200">(مُؤَنَّثٌ)</span>
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 space-y-4">
            <span className="text-6xl animate-bounce">🌟</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              أَحْسَنْتُمْ يَا فُرْسَانَ اللُّغَةِ الْعَرَبِيَّةِ!
            </h3>
            <p className="text-lg font-bold text-purple-800">
              أَجَبْتُمْ بِشَكْلٍ مُمْتَازٍ عَلَى كُلِّ أَدَوَاتِ الإِشَارَةِ (هذا / هذه)!
            </p>
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-900 px-6 py-2 rounded-2xl border border-purple-200 font-black text-lg">
              <span>العَلَامَةُ: {correctCount} / {SCHOOL_ITEMS.length}</span>
              <span>⭐</span>
            </div>
            <div>
              <button
                onClick={handleReset}
                className="mt-3 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
              >
                إِعَادَةُ اللَّعِبِ 🔄
              </button>
            </div>
          </div>
        )}
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
          className="px-8 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>إِلَى حِفْظِ الأَدَوَاتِ الْمَدْرَسِيَّةِ</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
