# 🌍 NKY Travel - Modern Travel Community Platform

A modern and elegant application for sharing your travel experiences with the world. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## 🔄 Live development & translation

- Use `npm run dev` to start Vite and get hot reload when files change.
- Language selection updates the app instantly and is saved in localStorage.
- Music selection plays while browsing the app.

## ▶️ Run & Share (fix display issues)

- Stop any Live Server or other servers that may be serving `index.html` (Live Server uses a different port like `5174`). If you use the VS Code "Go Live" button, click it again to stop it.
- Start the Vite dev server from the project root:

```bash
npm install
npm run dev
```

- Open the app in your browser at:
  - `http://localhost:5173` (local)
  - or the network address shown by Vite (e.g. `http://192.168.x.x:5173`) to access from other devices on the same LAN.

- I also provide a temporary public tunnel you can share while developing:
  - Example: `https://long-candles-care.loca.lt`

- If pages still do not load:
  1. Ensure the Vite server is running (`npm run dev`).
  2. Stop Live Server / other static servers — they may serve a different `index.html` and port.
  3. Check Windows Firewall: allow `node.exe` or open TCP port `5173` for private networks.

Tips for testing on mobile:
- Connect phone/tablet to the same Wi‑Fi network as your computer and open the network URL (shown by Vite).
- If video playback is blocked on mobile, use the video controls to start playback (controls enabled in the app).


## Project Structure

NKY Travel is organized into **functional modules**, each representing a distinct part of the application:

```
src/
├── modules/
│   ├── shared/                    # Core utilities & components
│   │   ├── components/            # Reusable UI (CameroonStar)
│   │   ├── constants/             # Global constants (languages, colors)
│   │   ├── hooks/                 # Custom hooks (auth, travels, translation)
│   │   ├── services/              # Business logic (translations)
│   │   ├── types/                 # TypeScript definitions
│   │   └── utils/                 # Utilities (validation, formatting)
│   ├── presentation/              # Welcome & Auth pages
│   │   └── components/            # WelcomePage, AuthForm, LanguageModal
│   ├── overview/                  # Travel feed & discovery
│   │   └── components/            # OverviewFeed (main travel list)
│   ├── travel-notes/              # Travel publishing
│   │   └── components/            # TravelNotesPublisher (new travel form)
│   ├── spotboard/                 # Photo gallery & sharing
│   │   └── components/            # CameraCapture, SpotboardGallery
│   ├── travelers/                 # Traveler profiles
│   │   └── components/            # TravelerProfile, TravelerGallery
│   └── itinerary/                 # Travel schedule (reserved)
├── App.tsx                        # Application router & orchestrator
├── main.tsx                       # Entry point
├── index.css                      # Global styles
└── vite-env.d.ts                 # Vite environment types
```

## ✨ Key Features

- **🌍 Multi-Language Support**: Full multilingual support with instant translations
- **🔐 Authentication**: Secure signup and login via Supabase Auth
- **🧳 Travel Sharing**: Publish your travel stories with detailed descriptions
- **📸 Photos & Media**: Support for cover images and photo galleries
- **❤️ Appreciation System**: Rate and appreciate travel experiences
- **⭐ Spotboard**: Share hidden gems and travel recommendations
- **👥 Community**: Connect with travelers worldwide
- **🎨 Beautiful UI**: Cameroon flag-inspired color scheme

## 💻 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **Backend**: Supabase, PostgreSQL
- **Tools**: ESLint, PostCSS, Prettier

## 🎨 Design Inspiration

The application features colors inspired by **Cameroon's flag**:
- **🟢 Green** (#007A5E) - Peace and hope
- **🔴 Red** (#CE1126) - Courage and determination
- **🟡 Yellow** (#FCD116) - The sun and wealth

### Animated Elements
- ✨ Twinkling star animations
- 🌟 Smooth transitions
- 🎯 Interactive hover effects

## 📚 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run typecheck   # Check TypeScript
npm run lint        # Run ESLint
npm run format      # Format code
```

## 🔒 Security Features

✅ Row-Level Security (RLS)
✅ JWT Authentication
✅ CORS Protection
✅ API Rate Limiting
✅ Encrypted Data Transfer

## 📖 Documentation

- [Full Documentation](./public/readme.html)
- [Presentation Slides](./public/ppt.html)
- [Interactive Demo](./public/demo.html)

## 👨‍💻 Author

**NKWEMI KEYIM HYMBOSSO**

## 📝 License

MIT License - See LICENSE file for details

---

**Made with ❤️ and inspired by Cameroon's beautiful landscapes**

🇨🇲 NKY Travel 🇨🇲

```
src/
├── modules/
│   ├── shared/                    # Core utilities & components
│   │   ├── components/            # Reusable UI (CameroonStar)
│   │   ├── constants/             # Global constants (languages, colors)
│   │   ├── hooks/                 # Custom hooks (auth, travels, translation)
│   │   ├── services/              # Business logic (translations)
│   │   ├── types/                 # TypeScript definitions
│   │   └── utils/                 # Utilities (validation, formatting)
│   ├── presentation/              # Welcome & Auth pages
│   │   └── components/            # WelcomePage, AuthForm, LanguageModal
│   ├── overview/                  # Travel feed & discovery
│   │   └── components/            # OverviewFeed (main travel list)
│   ├── travel-notes/              # Travel publishing
│   │   └── components/            # TravelNotesPublisher (new travel form)
│   ├── itinerary/                 # Travel schedule (reserved)
│   ├── guestbook/                 # Comments & messages (reserved)
│   └── spotboard/                 # Photo gallery (reserved)
├── App.tsx                        # Application router & orchestrator
├── main.tsx                       # Entry point
├── index.css                      # Global styles
└── vite-env.d.ts                 # Vite environment types
```

## Caractéristiques

- **🌍 50+ Langues**: Support multilingue complet avec traductions instantanées
- **🔐 Authentification**: Inscription et connexion sécurisées via Supabase Auth
- **🧳 Partage de Voyages**: Publiez vos histoires de voyage avec descriptions
- **📸 Photos et Médias**: Support pour les images de couverture
- **❤️ Appréciations**: Système de notation et d'appréciations pour les voyages
- **🎨 Design du Cameroun**: Couleurs et animations aux couleurs du drapeau camerounais
- **📱 Responsive**: Design adapté à tous les appareils
- **⚡ Performance**: Optimisé avec React hooks et lazy loading

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Firebase alternative)
- **Database**: PostgreSQL via Supabase
- **Build**: Vite
- **Icons**: Lucide React

## Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Variables d'environnement (.env)

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Structure des Données

### Users
- `id` (UUID)
- `email` (string)
- `full_name` (string)

### Travels
- `id` (UUID)
- `user_id` (UUID)
- `title` (string)
- `description` (text)
- `cover_image_url` (string, optional)
- `appreciation_count` (integer)
- `created_at` (timestamp)

### Appreciations
- `id` (UUID)
- `travel_id` (UUID)
- `user_id` (UUID)
- `rating` (integer, 1-5)
- `created_at` (timestamp)

### Photos
- `id` (UUID)
- `travel_id` (UUID)
- `user_id` (UUID)
- `image_url` (string)
- `caption` (string, optional)
- `created_at` (timestamp)

## Flux d'Application

### Page de Bienvenue
- Présentation du logo NKY animé avec étoile du Cameroun
- Boutons de connexion/inscription
- Sélecteur de langue (50+ langues)
- Design avec gradient du drapeau camerounais
- **Module**: `presentation/WelcomePage`

### Authentification
- Inscription avec nom complet, email et mot de passe
- Connexion avec email et mot de passe
- Gestion des sessions
- **Module**: `presentation/AuthForm`

### Accueil (Overview)
- Feed de tous les voyages (tri par date)
- Affichage du nombre d'appréciations
- Bouton pour apprécier un voyage
- Navigation vers publication
- **Module**: `overview/OverviewFeed`

### Publication de Voyage (Travel Notes)
- Formulaire pour titre et description
- Support des images de couverture
- Validation des données
- Redirection vers le feed après publication
- **Module**: `travel-notes/TravelNotesPublisher`

### Modules Réservés
- **Itinerary**: Calendrier et horaire du voyage
- **Guestbook**: Commentaires et messages
- **Spotboard**: Galerie photos et partage d'images

## Hooks Personnalisés

All custom hooks are located in `src/modules/shared/hooks/`

### useAuth()
Gère l'authentification utilisateur.
```typescript
const { signUp, signIn, logout, getSession, loading, error } = useAuth();
```

### useTranslation(language)
Récupère les traductions pour une langue.
```typescript
const t = useTranslation(language);
const text = t('welcome');
```

### useTravels()
Gère les voyages (fetch, publish, delete).
```typescript
const { travels, fetchTravels, publishTravel, deleteTravel, loading, error } = useTravels();
```

### useAppreciate()
Gère les appréciations (like/unlike).
```typescript
const { toggleAppreciation } = useAppreciate();
```

## Utilitaires

All utilities are located in `src/modules/shared/utils/helpers.ts`

### Validation
- `validateEmail(email)` - Valide un email
- `validatePassword(password)` - Valide une mot de passe
- `validateFullName(name)` - Valide un nom

### Date
- `formatDate(dateString)` - Formate une date
- `getRelativeTime(dateString)` - Retourne le temps relatif

### Stockage
- `getFromStorage<T>(key)` - Récupère du localStorage
- `setToStorage<T>(key, value)` - Sauvegarde dans localStorage
- `removeFromStorage(key)` - Supprime du localStorage

## Constantes

All constants are located in `src/modules/shared/constants/index.ts`

### CAMEROON_COLORS
```typescript
{
  GREEN: '#007A5E',
  RED: '#CE1126',
  YELLOW: '#FCD116'
}
```

### LANGUAGES
Liste complète des 50+ langues supportées avec drapeaux.

### STORAGE_KEYS
Clés de localStorage standardisées.

## Translations

All translations are located in `src/modules/shared/services/translationService.ts`

The `T` object contains translations for 15+ languages with 20+ keys each:
- en, fr, es, de, pt, it, ja, zh, ko, ar, hi, ru, tr, sw

Fallback to English if language or key not found.

## Sécurité

- RLS (Row Level Security) activé sur toutes les tables
- Authentification via Supabase Auth
- Policies strictes pour l'accès aux données
- Validation côté client et serveur
- Protection CSRF automatique via Supabase

## Performance

- Lazy loading des composants
- Memoization des traductions
- Requêtes Supabase optimisées
- Bundle size optimisé (~92KB gzip)

## Supports Navigateur

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Améliorations Futures

- [ ] Galeries de photos pour chaque voyage
- [ ] Commentaires sur les voyages
- [ ] Recherche et filtres avancés
- [ ] Système de follow/followers
- [ ] Notifications en temps réel
- [ ] Cartes interactives
- [ ] Export de voyages
- [ ] Partage sur les réseaux sociaux

## Licence

MIT

## Auteur

Nkwemi Keyim Hymbosso - NKY Travel

## Professor Checklist

La checklist destinée au professeur est disponible ici: [CHECKLIST.md](CHECKLIST.md)

Veuillez ouvrir la checklist pour suivre les étapes de vérification rapides.
