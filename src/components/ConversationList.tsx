import { Conversation } from '@/types/chat';
import { getSubjectById } from '@/lib/subjects';
import { cn } from '@/lib/utils';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export const ConversationList = ({
  conversations,
  activeId,
  onSelect,
  onNew,
}: ConversationListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNew}
          className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="text-center text-sidebar-foreground/60 py-8 px-4">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1 opacity-70">Start a new chat to begin learning</p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => {
              const subject = getSubjectById(conv.subject);
              return (
                <button
                  key={conv.id}
                  onClick={() => onSelect(conv.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-all duration-200',
                    'hover:bg-sidebar-accent',
                    activeId === conv.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{subject?.icon || '💬'}</span>
                    <span className="text-sm font-medium truncate flex-1">
                      {conv.title}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 truncate">
                    {conv.messages.length} messages
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
