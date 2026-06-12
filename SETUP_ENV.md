# ⚡ Configuration Rapide - Variables d'Environnement

## 🎯 Ce qu'il faut faire MAINTENANT

### **Étape 1 : Créer le fichier `.env.local`**

À la racine du projet (`test-spa/`), créez un fichier nommé `.env.local` :

```bash
# Windows PowerShell
New-Item -Path ".env.local" -ItemType File

# macOS/Linux
touch .env.local
```

### **Étape 2 : Remplir les variables Supabase**

Ouvrez `.env.local` et remplissez :

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxx

# Application Environment
VITE_APP_ENV=development
VITE_API_TIMEOUT=30000
```

### **Étape 3 : Récupérer vos clés Supabase**

1. Ouvrez `https://app.supabase.com`
2. Sélectionnez votre projet
3. Allez dans `Settings` → `API`
4. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

Exemple :

```env
VITE_SUPABASE_URL=https://abcdefgh1234.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Étape 4 : Sauvegarder et relancer l'app**

```bash
npm run dev
```

---

## 📋 Après avoir rempli `.env.local`

1. ✅ Redémarrez le serveur Vite
2. ✅ La connexion avec Supabase doit fonctionner
3. ✅ L'authentification doit être active

---

## ⚠️ Ne partagez JAMAIS

- ❌ `VITE_SUPABASE_ANON_KEY`
- ❌ Votre `.env.local`
- ❌ Votre URL Supabase (peut être deduit, mais quand même)

---

## 🔍 Vérification

Pour tester que tout fonctionne :

1. Lancez : `npm run dev`
2. Ouvrez `http://localhost:5173`
3. Essayez de vous inscrire
4. Vous devriez voir : **"Compte créé ! Vérifiez votre email..."**
5. Vérifiez votre email
6. Cliquez sur le lien de confirmation
7. Vous devriez être automatiquement connecté

---

## ✅ Checklist finale

- [ ] Fichier `.env.local` créé
- [ ] `VITE_SUPABASE_URL` rempli
- [ ] `VITE_SUPABASE_ANON_KEY` rempli
- [ ] Serveur Vite redémarré
- [ ] Supabase SMTP configuré
- [ ] Confirmation email activée dans Supabase
- [ ] Tests d'inscription effectués

---

## 📞 Besoin d'aide?

Consultez :
- `CONFIGURATION_EMAIL.md` - Configuration complète de Supabase
- `GUIDE_AUTHENTIFICATION.md` - Flux d'authentification
- Docs Supabase : https://supabase.com/docs

