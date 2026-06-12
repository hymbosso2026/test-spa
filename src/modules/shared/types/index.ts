export interface User {
  id: string;
  email: string;
  fullName?: string;
}

export interface Travel {
  id: string;
  title: string;
  description: string;
  cover_image_url?: string;
  user_id: string;
  appreciation_count: number;
  created_at: string;
  user_profile?: {
    full_name: string;
  };
}

export interface Appreciation {
  id: string;
  travel_id: string;
  user_id: string;
  rating: number;
  created_at: string;
}

export type PageType = 'welcome' | 'auth' | 'overview' | 'itinerary' | 'travel-notes' | 'guestbook' | 'spotboard' | 'presentation';

export interface LanguageOption {
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: string;
}

export interface TranslationDictionary {
  [language: string]: Translations;
}

export interface ApiResponse<T = Record<string, unknown>> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface PublishFormData {
  title: string;
  description: string;
  coverImage?: File;
}
