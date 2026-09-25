import React, { useState } from 'react';
import { Volume2, ChevronRight, RotateCcw, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { CARE_VALUES } from '../data/schoolSupplies';
import careImg from '../assets/images/care_school_supplies_1790323592348.jpg';

interface Screen7CareProps {
  onPrev: () => void;
  onRestartAll: () => void;
}

export const Screen7Care: React.FC<Screen7CareProps> = ({ onPrev, onRestartAll }) => {
  const [pledgedRules, setPledgedRules] = useState<number[]>([1]);
  const [hasTakenPledge, setHasTakenPledge] = useState<boolean>(false);

  const mainSentence = 'أَسْتَعْمِلُ أَدَوَاتِي الْمَدْرَسِيَّةَ بِعِنَايَةٍ وَأُحَافِظُ عَلَيْهَا.';

  const handleSpeakMain = () => {
    soundFx.speak(mainSentence);
  };

  const handleToggleRule = (id: number) => {
    soundFx.playPop();
    if (pledgedRules.includes(id)) {
      setPledgedRules(pledgedRules.filter((r) => r !== id));
    } else {
      setPledgedRules([...pledgedRules, id]);
    }
  };

  const handleTakePledge = () => {
    soundFx.playFanfare();
    setHasTakenPledge(true);
    setPledgedRules([1, 2, 3, 4]);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
    });
    soundFx.speak('أنا تلميذ مؤدب أحافظ على أدواتي المدرسية ولا أتلفها!');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] py-3 px-4 max-w-7xl mx-auto w-full select-none">
      {/* Top Banner */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-sm">
          <span>❤️</span>
          <span>المَحَطَّةُ 7: القِيمَةُ التَّرْبَوِيَّةُ وَالسُّلُوكُ الْمِثَالِيّ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
          حِفْظُ الأَدَوَاتِ الْمَدْرَسِيَّةِ وَالعِنَايَةُ بِهَا 🎒✨
        </h2>
        <p className="text-lg sm:text-xl font-bold text-emerald-800">
          كَيْفَ نَكُونُ تَلَامِيذَ مُنَظَّمِينَ نُحَافِظُ عَلَى أَدَوَاتِنَا؟
        </p>
      </div>

      {/* Main Focus: The Golden Sentence with audio button */}
      <div className="w-full max-w-4xl my-2 bg-linear-to-r from-amber-50 via-emerald-50 to-teal-50 rounded-3xl p-5 sm:p-6 border-4 border-emerald-300 shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
            ⭐ الْجُمْلَةُ الْخِتَامِيَّةُ لِلدَّرْسِ
          </span>
        </div>

        <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-wide leading-tight">
          « {mainSentence} »
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={handleSpeakMain}
            className="px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md cursor-pointer flex items-center gap-2 transition-transform active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
            <span>اِسْتَمِعْ وَرَدِّدْ مَعَ الْمُعَلِّمَةِ</span>
          </button>
        </div>
      </div>

      {/* 2 Columns: Visual Scene + The 4 Golden Rules */}
      <div className="w-full max-w-6xl my-2 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Tidy Backpack & Pupil Illustration */}
        <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-200 bg-white flex flex-col justify-between group">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={careImg}
              alt="تلميذ يرتب أدواته المدرسية بعناية ونظافة"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 right-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
              <span>مَحْفَظَةٌ مُرَتَّبَةٌ وَمِقْلَمَةٌ أَنِيقَةٌ تَدُلَّانِ عَلَى حُسْنِ التَّرْبِيَةِ</span>
            </div>
          </div>

          <div className="p-4 text-center bg-emerald-50/50">
            <p className="text-xs font-bold text-emerald-800">
              « تَرْتِيبُ الكُتُبِ فِي المَحْفَظَةِ وَالأَقْلَامِ فِي المِقْلَمَةِ يُسَهِّلُ العَمَلَ! »
            </p>
          </div>
        </div>

        {/* Right: 4 Interactive Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CARE_VALUES.map((rule) => {
              const isChecked = pledgedRules.includes(rule.id);

              return (
                <div
                  key={rule.id}
                  onClick={() => handleToggleRule(rule.id)}
                  className={`p-4 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between ${
                    isChecked
                      ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{rule.icon}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isChecked ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {rule.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {rule.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student Pledge Button / Badge */}
          <div className="bg-white rounded-3xl p-4 border-2 border-emerald-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-black shrink-0">
                🏅
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-slate-900">
                  {hasTakenPledge ? 'مُبَارَكٌ! لَقَدْ تَعَهَّدْتُمْ بِحِفْظِ أَدَوَاتِكُمْ' : 'مِيثَاقُ التِّلْمِيذِ النَّظِيفِ وَالْمُنَظَّمِ'}
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  {hasTakenPledge
                    ? 'أَنْتُمْ نَمُوذَجٌ يُحْتَذَى بِهِ فِي الاِنْضِبَاطِ وَالعِنَايَةِ!'
                    : 'اِضْغَطْ لِتُؤَكِّدَ حِرْصَكَ عَلَى أَدَوَاتِكَ المَدْرَسِيَّةِ'}
                </p>
              </div>
            </div>

            <button
              onClick={handleTakePledge}
              className={`px-6 py-3 rounded-2xl font-black text-sm sm:text-base shadow-md cursor-pointer transition-all active:scale-95 whitespace-nowrap ${
                hasTakenPledge
                  ? 'bg-emerald-600 text-white'
                  : 'bg-linear-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
              }`}
            >
              {hasTakenPledge ? 'أَنَا أُحَافِظُ عَلَى أَدَوَاتِي! ✨' : 'أَتَعَهَّدُ بِالحِفْظِ عَلَيْهَا ❤️'}
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
            onRestartAll();
          }}
          className="px-8 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>إِعَادَةُ العَرْضِ مِنَ البِدَايَةِ 🎒</span>
        </button>
      </div>
    </div>
  );
};
