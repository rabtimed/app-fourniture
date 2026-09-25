import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Volume2, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { ItemIllustration } from './ItemIllustration';
import heroImg from '../assets/images/hero_school_pupils_1790323559059.jpg';

interface Screen1IntroProps {
  onStart: () => void;
}

export const Screen1Intro: React.FC<Screen1IntroProps> = ({ onStart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBag = () => {
    soundFx.playPop();
    setIsOpen(true);
    soundFx.speak('في محفظتي أجد أدواتي المدرسية. ماذا أجد في محفظتي ومقلمتي؟');
  };

  const handleSpeech = (text: string) => {
    soundFx.speak(text);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-4 px-4 text-center select-none">
      {/* Top Banner / Intro text */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm sm:text-base shadow-2xs">
          <span>🎒</span>
          <span>السَّنَةُ الأُولَى ابْتِدَائِي</span>
          <span>•</span>
          <span>دَرْسُ اللُّغَةِ العَرَبِيَّةِ التَّفَاعُلِيّ</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          أَدَوَاتِي الْمَدْرَسِيَّةُ 🎒✏️
        </h1>

        <div className="flex items-center justify-center gap-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-700">
            مَاذَا أَجِدُ فِي مَحْفَظَتِي وَمِقْلَمَتِي؟
          </p>
          <button
            onClick={() => handleSpeech('ماذا أجد في محفظتي ومقلمتي؟')}
            className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-transform active:scale-95 cursor-pointer"
            title="استمع إلى السؤال"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="w-full max-w-5xl my-4 sm:my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left / Pupils visual banner */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-amber-100 group">
          <img
            src={heroImg}
            alt="تلاميذ فرحون بأدواتهم المدرسية في الصف"
            className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-right">
            <span className="text-amber-300 text-sm font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> مَرْحَباً بِأَبْطَالِ الصَّفِّ الأَوَّلِ!
            </span>
            <p className="text-lg sm:text-xl font-bold mt-1 text-slate-100">
              « فِي مَحْفَظَتِي أَجِدُ أَدَوَاتِي الْمَدْرَسِيَّةَ. »
            </p>
          </div>
        </div>

        {/* Right / Interactive Bag Opening Experience */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-amber-200 text-center relative overflow-hidden">
          <div className="relative">
            {!isOpen ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-bounce">
                  <ItemIllustration itemId="backpack" size="xl" />
                </div>
                <button
                  onClick={handleOpenBag}
                  className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl shadow-amber-500/30 transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer flex items-center gap-3"
                >
                  <span>افْتَحِ المَحْفَظَةَ يَا بَطَلُ!</span>
                  <span>✨</span>
                </button>
                <p className="text-slate-500 text-sm font-medium">
                  اضغط على الزر لتكتشف ما بداخل المحفظة والمقلمة
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center justify-center gap-3">
                  <ItemIllustration itemId="backpack" size="lg" />
                  <ItemIllustration itemId="pencil_case" size="lg" />
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900">
                  <span className="text-2xl">🎉</span>
                  <p className="text-xl sm:text-2xl font-black mt-1">
                    انْفَتَحَتِ المَحْفَظَةُ وَالمِقْلَمَةُ!
                  </p>
                  <p className="text-base text-emerald-800 font-semibold mt-1">
                    كُتُبٌ، كُرَّاسَاتٌ، أَقْلَامٌ، وَمَمَاحٍ جَمِيلَةٌ فِي انْتِظَارِنَا!
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {['📖 كِتَابٌ', '📒 كُرَّاسَةٌ', '✏️ قَلَمٌ', '🧽 مِمْحَاةٌ', '📏 مِسْطَرَةٌ', '✂️ مِبْرَاةٌ'].map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Start CTA */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
        <button
          onClick={() => {
            soundFx.playSuccess();
            onStart();
          }}
          className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-black text-xl sm:text-2xl shadow-xl shadow-emerald-600/30 transform hover:-translate-y-1 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
        >
          <span>لِنَبْدَأِ الاسْتِكْشَافَ مَعاً!</span>
          <ArrowLeft className="w-6 h-6 rotate-180" />
        </button>
      </div>
    </div>
  );
};
