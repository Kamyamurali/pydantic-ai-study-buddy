export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  subject: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type Subject = 
  | 'mathematics'
  | 'science'
  | 'history'
  | 'literature'
  | 'programming'
  | 'languages'
  | 'general';

export interface SubjectInfo {
  id: Subject;
  name: string;
  icon: string;
  color: string;
}
