# NKY Travel - Modular Application Structure

## Project Organization

The application is now organized into functional modules, each representing a distinct part of the application:

```
src/
├── modules/
│   ├── shared/                    # Shared utilities across all modules
│   │   ├── components/            # Reusable UI components
│   │   │   ├── CameroonStar.tsx   # Animated Cameroon star component
│   │   │   └── index.ts
│   │   ├── constants/             # Global constants
│   │   │   └── index.ts           # Colors, languages, validation rules
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth.ts         # Authentication logic
│   │   │   ├── useTravels.ts      # Travel CRUD operations
│   │   │   ├── useTranslation.ts  # Multi-language support
│   │   │   ├── useAppreciate.ts   # Appreciation/like functionality
│   │   │   └── index.ts
│   │   ├── services/              # Business logic services
│   │   │   ├── translationService.ts # Translation dictionary & functions
│   │   │   └── index.ts
│   │   ├── types/                 # TypeScript type definitions
│   │   │   └── index.ts           # User, Travel, Appreciation types
│   │   └── utils/                 # Utility functions
│   │       ├── helpers.ts         # Validation, formatting, storage helpers
│   │       └── index.ts
│   ├── presentation/              # UI layer - Welcome, Auth, Language
│   │   └── components/
│   │       ├── WelcomePage.tsx    # Landing page with NKY logo
│   │       ├── AuthForm.tsx       # Login/signup form
│   │       ├── LanguageModal.tsx  # Language selection modal
│   │       └── index.ts
│   ├── overview/                  # Travel discovery module
│   │   └── components/
│   │       ├── OverviewFeed.tsx   # Main travel feed
│   │       └── index.ts
│   ├── travel-notes/              # Travel publishing module
│   │   └── components/
│   │       ├── TravelNotesPublisher.tsx # Publish new travel form
│   │       └── index.ts
│   ├── itinerary/                 # Travel schedule module (reserved)
│   ├── guestbook/                 # Comments/messages module (reserved)
│   └── spotboard/                 # Photo gallery module (reserved)
├── App.tsx                        # Main application router & orchestrator
├── main.tsx                       # Application entry point
├── index.css                      # Global styles
└── vite-env.d.ts                 # Vite environment types
```

## Module Responsibilities

### Shared Module
Provides core functionality used across all modules:
- **Types**: User, Travel, Appreciation interfaces
- **Constants**: Language options, colors, validation rules
- **Services**: Translation management (50+ languages)
- **Hooks**: Authentication, travel management, appreciation, translation
- **Utils**: Validation, date formatting, storage helpers
- **Components**: CameroonStar animated component

### Presentation Module
Handles user onboarding and authentication:
- **WelcomePage**: Landing page with animated logo and language selection
- **AuthForm**: Login/signup form with field validation
- **LanguageModal**: 50+ language selector with flag emojis

### Overview Module
Displays travel feed and discovery:
- **OverviewFeed**: Shows all travels with author info, appreciation count
- Features: Like/appreciate functionality, responsive layout

### Travel-Notes Module
Allows users to publish their travel experiences:
- **TravelNotesPublisher**: Form to create new travel entries
- Features: Title, description input with validation

### Reserved Modules
For future expansion:
- **Itinerary**: Travel schedule and timeline
- **Guestbook**: Comments and messaging
- **Spotboard**: Photo gallery and image management

## App Flow

1. **App.tsx** orchestrates the entire application
2. Uses React Router patterns (page state) for navigation
3. Manages global state: user, language, page
4. Integrates all modules through their components
5. Handles auth lifecycle and data persistence

## Key Features Preserved

✓ 50+ language translations
✓ Multi-page navigation (welcome → auth → overview → publish)
✓ Supabase authentication with profiles
✓ Travel CRUD operations
✓ Appreciation/like system
✓ Animated Cameroon flag and logo
✓ Responsive mobile-first design
✓ Row-level security (RLS) on database
✓ localStorage for language preference

## Build & Development

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Code linting
npm run typecheck    # TypeScript type checking
```

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Backend**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Package Manager**: npm

## Component Communication

Modules communicate through:
1. **Props**: Data flow from parent (App.tsx)
2. **Callbacks**: User actions passed from components
3. **Hooks**: Shared state and effects
4. **Context**: Could be added for global state (language, user)

## Future Enhancements

1. Add Context API for language/user state
2. Implement Itinerary, Guestbook, Spotboard modules
3. Add routing library (React Router) for cleaner navigation
4. Implement code splitting by module
5. Add testing framework and unit tests
6. Implement notifications system
7. Add video/media upload support
