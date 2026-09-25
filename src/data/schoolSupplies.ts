export interface SchoolItem {
  id: string;
  name: string;
  nameWithTashkeel: string;
  demonstrative: 'هذا' | 'هذه';
  sentence: string;
  sentenceWithTashkeel: string;
  container: 'محفظة' | 'مقلمة';
  emoji: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  description: string;
}

export const SCHOOL_ITEMS: SchoolItem[] = [
  {
    id: 'book',
    name: 'كتاب',
    nameWithTashkeel: 'كِتَابٌ',
    demonstrative: 'هذا',
    sentence: 'هذا كتاب.',
    sentenceWithTashkeel: 'هذا كِتَابٌ.',
    container: 'محفظة',
    emoji: '📖',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-400',
    badgeBg: 'bg-blue-100 text-blue-800',
    description: 'أَقْرَأُ فِيهِ الدُّرُوسَ الجَمِيلَةَ',
  },
  {
    id: 'notebook',
    name: 'كراسة',
    nameWithTashkeel: 'كُرَّاسَةٌ',
    demonstrative: 'هذه',
    sentence: 'هذه كراسة.',
    sentenceWithTashkeel: 'هذه كُرَّاسَةٌ.',
    container: 'محفظة',
    emoji: '📒',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800',
    description: 'أَكْتُبُ فِيهَا وَأَرْسُمُ بِعِنَايَةٍ',
  },
  {
    id: 'pen',
    name: 'قلم',
    nameWithTashkeel: 'قَلَمٌ',
    demonstrative: 'هذا',
    sentence: 'هذا قلم.',
    sentenceWithTashkeel: 'هذا قَلَمٌ.',
    container: 'مقلمة',
    emoji: '✏️',
    color: 'from-sky-500 to-cyan-600',
    borderColor: 'border-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800',
    description: 'أَكْتُبُ بِهِ كَلِمَاتِي الرَّائِعَةَ',
  },
  {
    id: 'eraser',
    name: 'ممحاة',
    nameWithTashkeel: 'مِمْحَاةٌ',
    demonstrative: 'هذه',
    sentence: 'هذه ممحاة.',
    sentenceWithTashkeel: 'هذه مِمْحَاةٌ.',
    container: 'مقلمة',
    emoji: '🧽',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-400',
    badgeBg: 'bg-rose-100 text-rose-800',
    description: 'أَمْحُو بِهَا الخَطَأَ بِهُدُوءٍ',
  },
  {
    id: 'ruler',
    name: 'مسطرة',
    nameWithTashkeel: 'مِسْطَرَةٌ',
    demonstrative: 'هذه',
    sentence: 'هذه مسطرة.',
    sentenceWithTashkeel: 'هذه مِسْطَرَةٌ.',
    container: 'مقلمة',
    emoji: '📏',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    description: 'أُسَطِّرُ بِهَا خُطُوطِي الْمُسْتَقِيمَةَ',
  },
  {
    id: 'sharpener',
    name: 'مبراة',
    nameWithTashkeel: 'مِبْرَاةٌ',
    demonstrative: 'هذه',
    sentence: 'هذه مبراة.',
    sentenceWithTashkeel: 'هذه مِبْرَاةٌ.',
    container: 'مقلمة',
    emoji: '✂️',
    color: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-400',
    badgeBg: 'bg-purple-100 text-purple-800',
    description: 'أَبْرِي بِهَا قَلَمِي لِيَكُونَ حَادّاً',
  },
];

// Items found in backpack (الكتاب والكراسة)
export const BACKPACK_ITEMS = [
  SCHOOL_ITEMS[0], // كتاب
  SCHOOL_ITEMS[1], // كراسة
];

// Items found in pencil case (القلم، الممحاة، المبراة، والمسطرة)
export const PENCIL_CASE_ITEMS = [
  SCHOOL_ITEMS[2], // قلم
  SCHOOL_ITEMS[3], // ممحاة
  SCHOOL_ITEMS[5], // مبراة
  SCHOOL_ITEMS[4], // مسطرة
];

// Classification items for Screen 5 (محفظة أم مقلمة؟)
export const SORTING_ITEMS = [
  { ...SCHOOL_ITEMS[0], target: 'محفظة' as const }, // كتاب
  { ...SCHOOL_ITEMS[1], target: 'محفظة' as const }, // كراسة
  { ...SCHOOL_ITEMS[2], target: 'مقلمة' as const }, // قلم
  { ...SCHOOL_ITEMS[3], target: 'مقلمة' as const }, // ممحاة
  { ...SCHOOL_ITEMS[5], target: 'مقلمة' as const }, // مبراة
  { ...SCHOOL_ITEMS[4], target: 'مقلمة' as const }, // مسطرة
];

// Interactive values for Care & Organization
export const CARE_VALUES = [
  {
    id: 1,
    title: 'أَسْتَعْمِلُهَا بِلُطْفٍ وَعِنَايَةٍ',
    subtitle: 'Utiliser avec soin',
    icon: '✨',
    badge: 'حِرْصٌ وَعِنَايَةٌ',
    detail: 'أَمْسِكُ قَلَمِي وَكُتُبِي بِرِفْقٍ دُونَ تَمْزِيقٍ أَوْ تَشْوِيهٍ.',
  },
  {
    id: 2,
    title: 'أُرَتِّبُهَا فِي مَكَانِهَا دَائِماً',
    subtitle: 'Ranger correctement',
    icon: '🎒',
    badge: 'تَرْتِيبٌ وَنِظَامٌ',
    detail: 'أُعِيدُ الأَقْلَامَ وَالمِسْطَرَةَ إِلَى المِقْلَمَةِ، وَالكُتُبَ إِلَى المَحْفَظَةِ بَعْدَ كُلِّ دَرْسٍ.',
  },
  {
    id: 3,
    title: 'لَا أَكْسِرُهَا وَلَا أُضَيِّعُهَا',
    subtitle: 'Ne pas abîmer',
    icon: '🛡️',
    badge: 'مُحَافَظَةٌ وَأَمَانَةٌ',
    detail: 'أَحْذَرُ أَنْ تَسْقُطَ مِسْطَرَتِي فَتَنْكَسِرَ، وَأَتَفَقَّدُ أَدَوَاتِي دَائِماً دَاخِلَ مِقْلَمَتِي.',
  },
  {
    id: 4,
    title: 'أُبْقِي كُتُبِي وَدَفَاتِرِي نَظِيفَةً',
    subtitle: 'Garder propre',
    icon: '🧼',
    badge: 'نَظَافَةٌ وَبَهَاءٌ',
    detail: 'أَغْسِلُ يَدَيَّ وَأُحَافِظُ عَلَى بَيَاضِ أَوْرَاقِي وَغِلَافِ دَفْتَرِي فِي مَحْفَظَتِي.',
  },
];
