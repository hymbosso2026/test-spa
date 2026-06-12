# Architecture du Projet NKY Travel

## Vue d'ensemble

NKY Travel est une application de partage de voyages construite avec React, TypeScript et Supabase. L'architecture suit une séparation claire des responsabilités avec des dossiers dédiés pour les composants, hooks, services, utilitaires et types.

## Structure des Répertoires

```
src/
├── components/          # Composants React réutilisables
├── constants/           # Constantes globales (langues, couleurs, messages)
├── hooks/               # Hooks React personnalisés
├── services/            # Services métier (auth, traduction, API)
├── styles/              # CSS personnalisés et thèmes
├── types/               # Définitions TypeScript (interfaces, types)
├── utils/               # Fonctions utilitaires (validation, date, localStorage)
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée React
└── index.css           # Styles globaux
```

## Responsabilités par Répertoire

### components/
Composants React réutilisables et modularisés.
- `CameroonFlag.tsx` - Composant du drapeau du Cameroun avec animations
- `index.ts` - Exports centralisés

**Principes:**
- Un composant par fichier
- Pas de logique métier complexe
- Props bien typées
- Composants fonctionnels avec hooks

### constants/
Constantes globales et configuration statique.
- Langues et drapeaux (50+ langues)
- Couleurs du drapeau camerounais
- Clés de localStorage
- Messages d'erreur et de succès
- Règles de validation

### hooks/
Hooks React personnalisés pour logique réutilisable.
- `useAuth.ts` - Authentification (signup, signin, logout)
- `useTranslation.ts` - Traduction (récupère les textes traduits)
- `useTravels.ts` - Gestion des voyages (fetch, publish, delete)
- `useAppreciate.ts` - Gestion des appréciations (like/unlike)

**Principes:**
- Un responsabilité par hook
- Pas d'effets secondaires non gérés
- Retourne des fonctions et états
- Typé avec TypeScript

### services/
Services métier pour opérations complexes.
- `translationService.ts` - Service de traduction (dictionnaire de tous les textes)

**Principes:**
- Pas de dépendances React
- Fonctions pures
- Bien documenté
- Exports centralisés

### types/
Définitions TypeScript pour typage fort.
- `User` - Définition utilisateur
- `Travel` - Définition voyage
- `Appreciation` - Définition appréciation
- `PageType` - Types de pages
- `Translations` - Type pour traductions

**Principes:**
- Réutilisable partout dans l'app
- Documenté avec commentaires
- Aligné avec la base de données

### utils/
Fonctions utilitaires et helpers.
- Validation (email, password, fullName)
- Date (formatDate, getRelativeTime)
- String (truncateString, capitalize)
- LocalStorage (get, set, remove)
- Array (removeDuplicates, sortByDate)
- Erreur (handleError)
- Couleurs (getCameroonGradient)

**Principes:**
- Fonctions pures
- Pas d'effets secondaires
- Bien testables
- Documentées

## Flux de Données

### Authentification
```
UI (LoginForm) 
  → useAuth.signIn() 
    → Supabase.auth.signInWithPassword() 
      → get user_profiles 
        → setState(user)
```

### Publication de Voyage
```
UI (PublishForm) 
  → useTravels.publishTravel() 
    → Supabase.travels.insert() 
      → setState(travels)
```

### Appréciation
```
UI (HeartButton) 
  → useAppreciate.toggleAppreciation() 
    → Supabase.appreciations.insert/delete() 
      → useTravels.fetchTravels() 
        → setState(travels)
```

### Traduction
```
useState(language: 'en')
  → useTranslation(language)
    → getTranslation(language, key)
      → T[language][key] || T.en[key]
```

## État Global (useState vs Context)

Actuellement, l'application utilise `useState` pour la gestion d'état local. Pour une évolution future :

**Considérer Context API pour:**
- Langue (pour éviter prop drilling)
- Utilisateur authentifié (accès global)

**Considérer Zustand/Redux pour:**
- État complexe avec beaucoup de mutations
- Time-travel debugging
- DevTools

Actuellement, `useState` suffit car :
- Arborescence peu profonde
- Peu de prop drilling
- État simple par composant

## Intégration Supabase

### Tables RLS
Toutes les tables ont Row Level Security activé:
- `user_profiles` - Consultable par propriétaire
- `travels` - Lisible par tous, éditable par propriétaire
- `photos` - Lisible par tous, éditable par propriétaire  
- `appreciations` - Lisible par tous, éditable par propriétaire

### Queries Patterns
```typescript
// Fetch avec relation
const { data } = await supabase
  .from('travels')
  .select('*, user_profile:user_profiles(full_name)')
  .order('created_at', { ascending: false });

// Fetch single
const { data } = await supabase
  .from('users')
  .select()
  .eq('id', userId)
  .maybeSingle();

// Insert
const { data, error } = await supabase
  .from('travels')
  .insert([{ title, description, user_id }])
  .select();

// Delete
const { error } = await supabase
  .from('appreciations')
  .delete()
  .eq('id', appreciationId);
```

## Performance

### Code Splitting
- Vite gère le chunking automatique
- `rollupOptions` : vendor et supabase en chunks séparés

### Memoization
- `useCallback` pour les hooks
- `useMemo` pour les calculs coûteux (si nécessaire)

### Lazy Loading
- Images via HTML native `loading="lazy"`
- Composants via React.lazy() (si nécessaire)

### Bundle Size
- React + DOM: ~40KB
- Supabase: ~35KB
- Lucide: ~10KB
- CSS: ~4KB
- **Total: ~92KB gzip**

## Testing

**À implémenter:**
- Unit tests avec Vitest
- Component tests avec React Testing Library
- E2E avec Playwright ou Cypress

**Fichiers de test suggérés:**
```
src/
├── utils/__tests__/
│   └── helpers.test.ts
├── services/__tests__/
│   └── translationService.test.ts
├── hooks/__tests__/
│   └── useAuth.test.ts
└── components/__tests__/
    └── CameroonFlag.test.tsx
```

## Évolution Future

### Court Terme
- [ ] Ajouter unit tests
- [ ] Cache local des voyages
- [ ] Pagination du feed
- [ ] Chargement des images optimisé

### Moyen Terme
- [ ] Galeries de photos
- [ ] Commentaires sur voyages
- [ ] Système de follow
- [ ] Notifications
- [ ] Recherche et filtres

### Long Terme
- [ ] Cartes interactives (Mapbox)
- [ ] Export PDF
- [ ] Partage sur réseaux sociaux
- [ ] Machine learning pour recommandations
- [ ] Progressive Web App (PWA)

## Conventions de Code

### Naming
- Composants: PascalCase (`UserProfile.tsx`)
- Fonctions: camelCase (`validateEmail()`)
- Constantes: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- Types: PascalCase (`interface User {}`)

### Imports
```typescript
// 1. React et dépendances externes
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 2. Imports locaux
import { useAuth } from '@hooks';
import { User } from '@types';

// 3. Styles
import './Component.css';
```

### Commentaires
- Commenter le **WHY**, pas le **WHAT**
- Pas de commentaires obvieux
- Documenter les cas limites

## Déploiement

### Préparation
```bash
npm run typecheck    # Vérifier les types
npm run lint         # Linter le code
npm run build        # Compiler
npm run preview      # Prévisualiser
```

### Déploiement (Vercel/Netlify)
```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

### Variables d'Environnement (Production)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Troubleshooting

### Types TypeScript manquants
→ Vérifier que les types sont dans `src/types/index.ts`

### Traductions manquantes
→ Ajouter la clé dans `src/services/translationService.ts`

### Erreur de build
→ Exécuter `npm run typecheck` pour diagnostiquer

### Performance lente
→ Utiliser React DevTools Profiler pour identifier les rendus coûteux
