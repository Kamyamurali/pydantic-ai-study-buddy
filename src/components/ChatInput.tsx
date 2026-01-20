import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  onSend,
  disabled = false,
  placeholder = 'Ask anything about your studies...',
}: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'min-h-[56px] max-h-[200px] pr-14 resize-none',
          'bg-card border-border rounded-xl',
          'focus:ring-2 focus:ring-accent/30 focus:border-accent',
          'transition-all duration-200 input-glow'
        )}
        rows={1}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon"
        className={cn(
          'absolute right-2 bottom-2',
          'bg-primary hover:bg-primary/90',
          'rounded-lg transition-all duration-200',
          'disabled:opacity-40'
        )}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};
