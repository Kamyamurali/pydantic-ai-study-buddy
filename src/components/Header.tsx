import { BookOpen, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  isConnected: boolean;
}

export const Header = ({ onSettingsClick, onMenuClick, isConnected }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-semibold text-lg">StudyBuddy</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Not connected'}
          </span>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
