import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  open: boolean;
  onSave: (apiKey: string, backendUrl: string) => void;
}

export const ApiKeyModal = ({ open, onSave }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [backendUrl, setBackendUrl] = useState('');
  const [step, setStep] = useState<'intro' | 'config'>('intro');

  const handleSave = () => {
    if (apiKey.trim() && backendUrl.trim()) {
      onSave(apiKey.trim(), backendUrl.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-accent" />
            Connect Your Backend
          </DialogTitle>
          <DialogDescription>
            {step === 'intro'
              ? 'Set up your AI-powered study assistant in a few simple steps.'
              : 'Enter your backend URL and Gemini API key to enable AI features.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'intro' ? (
          <div className="space-y-4 py-4">
            <div className="study-card p-4">
              <h4 className="font-semibold text-sm mb-2">What you need:</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Deploy your Pydantic AI backend (Railway, Render, etc.)</li>
                <li>Get a free Gemini API key from Google AI Studio</li>
                <li>Enter both below to connect</li>
              </ol>
            </div>

            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Get free Gemini API key
            </a>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="backend-url">Backend URL</Label>
              <Input
                id="backend-url"
                placeholder="https://your-backend.railway.app"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="input-glow"
              />
              <p className="text-xs text-muted-foreground">
                Your deployed Pydantic AI backend endpoint
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-glow"
              />
              <p className="text-xs text-muted-foreground">
                Your key is stored locally in your browser only
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 'intro' ? (
            <Button onClick={() => setStep('config')} className="w-full">
              Continue Setup
            </Button>
          ) : (
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={() => setStep('intro')} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSave}
                disabled={!apiKey.trim() || !backendUrl.trim()}
                className="flex-1"
              >
                Connect
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
