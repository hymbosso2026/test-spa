# NKY Travel - Guide d'installation VS Code

## Application de voyage Camerounaise extraordinaire

### Couleurs du drapeau du Cameroun
- **Vert** (#007A5E) - Espoir et nature
- **Rouge** (#CE1126) - Unite et force
- **Jaune** (#FCD116) - Soleil et prosperite

### Fonctionnalites principales
1. **Galerie de Voyage** - Photos de personnes en voyage (international + Cameroun)
2. **Explorateur de Destinations** - Destinations Camerounaises et internationales avec videos
3. **Camera Professionnelle** - 14 filtres, zoom 10x, HDR, 4K, timer, flash
4. **Commentaires & Avis** - Systeme complet sur photos et destinations
5. **Authentification** - Supabase email/password
6. **Base de donnees** - Supabase avec migrations

### Pages
- `welcome` - Page d'accueil avec video
- `auth` - Connexion/Inscription
- `overview` - Fil d'actualite des voyages
- `travel-notes` - Publier un voyage
- `spotboard` - Galerie photos et camera
- `gallery` - Galerie des voyageurs
- `photos` - Galerie photo avec masonry (personnes en voyage)
- `destinations` - Destinations avec fiches detaillees (Cameroun + monde)

### Cameroun dans l'application
- **Destinations camerounaises**: Kribi, Mont Cameroun, Reserve de Waza, Yaounde, Douala
- **Photos culturelles camerounaises**: Fete de la Jeunesse, Bataille de Ngondo
- **Couleurs du drapeau** partout dans l'interface
- **Filtre Cameroun** dans les destinations

### Installation

```bash
# 1. Installer les dependances
npm install

# 2. Configurer .env (copier .env.example et remplir les valeurs)
cp .env.example .env

# 3. Demarrer le serveur de developpement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:5173
```

### Configuration .env
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
```

### Structure du projet
```
src/
  App.tsx                 # Composant principal avec navigation
  main.tsx                # Point d'entree
  index.css               # Styles globaux (animations + drapeau cameroun)
  vite-env.d.ts           # Types Vite
  modules/
    overview/
      components/OverviewFeed.tsx
    presentation/
      components/WelcomePage.tsx, AuthForm.tsx, LanguageModal.tsx
    spotboard/
      components/SpotboardGallery.tsx, CameraCapture.tsx, EnhancedCameraCapture.tsx
    travelers/
      components/TravelerProfile.tsx, TravelerGallery.tsx, TravelPhotosGallery.tsx, DestinationsExplorer.tsx
    travel-notes/
      components/TravelNotesPublisher.tsx
    shared/
      components/CameroonStar.tsx
      hooks/useAuth.ts, useCamera.ts, useTranslation.ts, useTravels.ts, useAppreciate.ts
      constants/index.ts
      services/translationService.ts
      utils/helpers.ts
      types/index.ts
supabase/
  migrations/              # Migrations SQL pour la base de donnees
```

### Technologies
- React 18 + TypeScript
- Vite (build ultra-rapide)
- Tailwind CSS
- Supabase (auth + base de donnees)
- Lucide React (icones)
- Pexels (photos et videos)

### Build
```bash
npm run build    # Build production
npm run preview  # Preview production
```

### Note sur les images
Toutes les images sont chargees depuis Pexels (gratuit). Aucune image n'est telechargee localement.

### Note sur les migrations
Les migrations Supabase sont dans `supabase/migrations/`. Il faut les appliquer sur votre projet Supabase pour que l'app fonctionne correctement.
