import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Header } from '@/components/Header';
import { ConversationList } from '@/components/ConversationList';
import { SubjectSelector } from '@/components/SubjectSelector';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { cn } from '@/lib/utils';

const Index = () => {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    selectedSubject,
    setSelectedSubject,
    isLoading,
    config,
    saveConfig,
    createNewConversation,
    sendMessage,
    isConnected,
  } = useChat();

  const [showSettings, setShowSettings] = useState(!config);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSaveConfig = (apiKey: string, backendUrl: string) => {
    saveConfig(apiKey, backendUrl);
    setShowSettings(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 bg-sidebar transform transition-transform duration-300 lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
            <h2 className="text-lg font-semibold text-sidebar-foreground">History</h2>
          </div>
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={(id) => {
              setActiveConversationId(id);
              setSidebarOpen(false);
            }}
            onNew={() => {
              createNewConversation();
              setSidebarOpen(false);
            }}
          />
        </div>
      </aside>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header
          onSettingsClick={() => setShowSettings(true)}
          onMenuClick={() => setSidebarOpen(true)}
          isConnected={isConnected}
        />

        {/* Subject selector */}
        <div className="border-b border-border p-4 bg-card/50">
          <SubjectSelector selected={selectedSubject} onSelect={setSelectedSubject} />
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto" style={{ background: 'var(--gradient-chat)' }}>
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {activeConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={sendMessage}
              disabled={isLoading || !isConnected}
              placeholder={
                isConnected
                  ? 'Ask anything about your studies...'
                  : 'Connect your backend to start chatting...'
              }
            />
            {!isConnected && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                Click Settings (⚙️) to configure your backend connection
              </p>
            )}
          </div>
        </div>
      </main>

      {/* API Key Modal */}
      <ApiKeyModal open={showSettings} onSave={handleSaveConfig} />
    </div>
  );
};

export default Index;
