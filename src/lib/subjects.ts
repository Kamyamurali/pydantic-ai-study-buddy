import { SubjectInfo } from '@/types/chat';

export const subjects: SubjectInfo[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'hsl(222 47% 20%)',
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'hsl(142 76% 36%)',
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    color: 'hsl(28 80% 52%)',
  },
  {
    id: 'literature',
    name: 'Literature',
    icon: '📚',
    color: 'hsl(280 65% 60%)',
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    color: 'hsl(200 95% 45%)',
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: '🌍',
    color: 'hsl(350 80% 55%)',
  },
  {
    id: 'general',
    name: 'General',
    icon: '💡',
    color: 'hsl(38 92% 50%)',
  },
];

export const getSubjectById = (id: string): SubjectInfo | undefined => {
  return subjects.find((s) => s.id === id);
};
