# 📧 Configuration Supabase pour Email de Confirmation

## ✅ Ce qui est déjà en place

Votre application a déjà :
- ✅ Système d'inscription avec confirmation email
- ✅ Système de connexion avec email + mot de passe
- ✅ Gestion des profils utilisateur
- ✅ Messages multilingues

---

## 🔧 Configuration requise dans Supabase

### **Étape 1 : Vérifier vos variables d'environnement**

Ouvrez `.env.local` ou `.env` et vérifiez :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anonyme
```

Si ces variables manquent :
1. Ouvrez `https://app.supabase.com`
2. Sélectionnez votre projet
3. Allez dans `Settings` → `API`
4. Copiez `Project URL` et `anon public key`

---

### **Étape 2 : Activer la confirmation email dans Supabase**

1. Ouvrez votre projet Supabase
2. Allez dans `Authentication` → `Settings`
3. Onglet `Email`
4. Activez : **"Enable email confirmations"** ou **"Confirm email"**

---

### **Étape 3 : Configurer l'envoi d'email (SMTP)**

Supabase doit avoir un service SMTP pour envoyer les emails de confirmation.

#### **Option A : Utiliser SendGrid (recommandé)**

1. Créez un compte sur `https://sendgrid.com`
2. Créez une clé API dans SendGrid
3. Dans Supabase (`Authentication` → `Settings` → `SMTP`), renseignez :
   - **SMTP Host** : `smtp.sendgrid.net`
   - **SMTP Port** : `587`
   - **SMTP Username** : `apikey`
   - **SMTP Password** : `SG.votre_clé_sendgrid`
   - **From Email** : `noreply@votresite.com`

#### **Option B : Utiliser Mailgun**

1. Créez un compte sur `https://mailgun.com`
2. Créez une clé API
3. Dans Supabase, renseignez :
   - **SMTP Host** : `smtp.mailgun.org`
   - **SMTP Port** : `587`
   - **SMTP Username** : `postmaster@mg.votredomaine.com`
   - **SMTP Password** : `votre_clé_mailgun`
   - **From Email** : `noreply@mg.votredomaine.com`

#### **Option C : Utiliser Amazon SES**

1. Configurez Amazon SES dans votre console AWS
2. Vérifiez l'adresse email expéditrice
3. Créez les identifiants SMTP dans SES
4. Renseignez-les dans Supabase

---

### **Étape 4 : Configurer l'URL de redirection après confirmation**

1. Dans Supabase → `Authentication` → `Settings`
2. Section `Site URL` ou `Redirect URLs`
3. Ajoutez :
   - `http://localhost:5173` (développement)
   - `http://localhost:4173` (preview)
   - `https://votresite.com` (production)

---

## 🧪 Tester le système

### **Test d'inscription avec confirmation email**

1. Lancez l'app : `npm run dev`
2. Ouvrez `http://localhost:5173`
3. Cliquez sur `Create Account` (Créer un compte)
4. Entrez :
   - **Full Name** : `Test User`
   - **Email** : `votre-email@example.com`
   - **Password** : `TestPassword123!`
   - **Confirm Password** : `TestPassword123!`
5. Cliquez `Sign Up`
6. **Attendez le message** : `"Compte créé ! Vérifiez votre email pour confirmer votre adresse."`
7. **Vérifiez votre email** (boîte de réception ou spam)
8. **Cliquez sur le lien** dans l'email
9. Vous devriez être redirigé vers l'app et connecté automatiquement

### **Test de connexion après confirmation**

1. Si vous ne l'êtes pas déjà, accédez à la page `Sign In`
2. Entrez :
   - **Email** : `votre-email@example.com`
   - **Password** : `TestPassword123!`
3. Cliquez `Sign In`
4. Vous devriez voir le tableau de bord `Overview`

---

## ⚠️ Dépannage

### **"Account created! But I didn't get an email"**

- ✅ Vérifiez le dossier spam
- ✅ Confirmez que SMTP est bien configuré dans Supabase
- ✅ Vérifiez que la clé API SendGrid/Mailgun est correcte
- ✅ Attendez 1-2 minutes (les emails peuvent être lents)

### **"I can't sign in"**

- ✅ Confirmez que vous avez cliqué sur le lien dans l'email
- ✅ Vérifiez que `user_profiles` table existe dans Supabase
- ✅ Assurez-vous que Row-Level Security (RLS) n'interfère pas

### **"I forgot my password"**

- Utilisateurs peuvent réinitialiser leur mot de passe via une option "Forgot Password" (à ajouter si nécessaire)

---

## 📌 Configuration de production

Avant de déployer, mettez à jour `.env.production` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anonyme
```

Et dans Supabase, ajoutez votre domaine de production dans `Redirect URLs`.

---

## 🎉 Résumé du flux

```
1. Utilisateur s'inscrit
   ↓
2. Email de confirmation envoyé
   ↓
3. Utilisateur clique sur le lien
   ↓
4. Compte confirmé
   ↓
5. Utilisateur peut se connecter avec email + mot de passe
   ↓
6. Accès à l'application
```

---

Besoin d'aide? Contactez le support de Supabase ou dites-moi si quelque chose n'est pas clair!
