import { useState, useCallback } from 'react';
import { Message, Conversation, Subject } from '@/types/chat';

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateTitle = (message: string): string => {
  const words = message.split(' ').slice(0, 5).join(' ');
  return words.length > 30 ? words.substring(0, 30) + '...' : words;
};

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<{ apiKey: string; backendUrl: string } | null>(() => {
    const saved = localStorage.getItem('studybuddy-config');
    return saved ? JSON.parse(saved) : null;
  });

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const saveConfig = useCallback((apiKey: string, backendUrl: string) => {
    const newConfig = { apiKey, backendUrl };
    localStorage.setItem('studybuddy-config', JSON.stringify(newConfig));
    setConfig(newConfig);
  }, []);

  const createNewConversation = useCallback(() => {
    const newConv: Conversation = {
      id: generateId(),
      title: 'New Chat',
      subject: selectedSubject,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv.id;
  }, [selectedSubject]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!config) return;

      let conversationId = activeConversationId;
      
      if (!conversationId) {
        conversationId = createNewConversation();
      }

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      // Update conversation with user message
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const isFirstMessage = conv.messages.length === 0;
            return {
              ...conv,
              title: isFirstMessage ? generateTitle(content) : conv.title,
              messages: [...conv.messages, userMessage],
              updatedAt: new Date(),
            };
          }
          return conv;
        })
      );

      setIsLoading(true);

      try {
        // Call the Python backend
        const response = await fetch(`${config.backendUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': config.apiKey,
          },
          body: JSON.stringify({
            message: content,
            subject: selectedSubject,
            conversation_history: activeConversation?.messages.map((m) => ({
              role: m.role,
              content: m.content,
            })) || [],
          }),
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.response || 'Sorry, I could not generate a response.',
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              };
            }
            return conv;
          })
        );
      } catch (error) {
        console.error('Chat error:', error);
        
        const errorMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: `⚠️ Error connecting to the backend. Please check:\n\n1. Your backend URL is correct\n2. The backend is running\n3. Your API key is valid\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, errorMessage],
                updatedAt: new Date(),
              };
            }
            return conv;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [config, activeConversationId, selectedSubject, activeConversation, createNewConversation]
  );

  return {
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
    isConnected: !!config,
  };
};
