import { subjects } from '@/lib/subjects';
import { Subject } from '@/types/chat';
import { cn } from '@/lib/utils';

interface SubjectSelectorProps {
  selected: Subject;
  onSelect: (subject: Subject) => void;
}

export const SubjectSelector = ({ selected, onSelect }: SubjectSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          onClick={() => onSelect(subject.id)}
          className={cn(
            'subject-chip flex items-center gap-2',
            selected === subject.id && 'active'
          )}
        >
          <span>{subject.icon}</span>
          <span>{subject.name}</span>
        </button>
      ))}
    </div>
  );
};
