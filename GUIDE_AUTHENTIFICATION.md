# 🚀 Guide Complet d'Authentification NKY Travel

## 📋 Flux d'Authentification

```
┌─────────────────────────────────────────────────────────────┐
│                    NOUVEAU UTILISATEUR                       │
└─────────────────────────────────────────────────────────────┘

1. L'utilisateur clique sur "Create Account"
   ↓
2. Remplit le formulaire d'inscription :
   - Full Name
   - Email
   - Password
   - Confirm Password
   ↓
3. Clique "Sign Up"
   ↓
4. ✅ Message : "Compte créé ! Vérifiez votre email pour confirmer votre adresse."
   ↓
5. Un email est envoyé à son adresse
   ↓
6. L'utilisateur clique sur le lien dans l'email
   ↓
7. ✅ Il est automatiquement connecté et redirigé vers la page d'accueil
   ↓
8. Accès à l'application = NKY Travel avec tous ses services


┌─────────────────────────────────────────────────────────────┐
│              UTILISATEUR EXISTANT (APRÈS CONFIRMATION)       │
└─────────────────────────────────────────────────────────────┘

1. L'utilisateur clique sur "Sign In"
   ↓
2. Remplit le formulaire de connexion :
   - Email
   - Password
   ↓
3. Clique "Sign In"
   ↓
4. ✅ Connecté immédiatement (s'il a confirmé son email)
   ↓
5. Accès à l'application complète
```

---

## 🔑 Identifiants de Test

Vous pouvez utiliser un email de test comme :
- `test@example.com`
- `user@test.fr`
- `demo@nkytravel.com`

---

## 📧 Comment fonctionne la confirmation d'email

### **L'utilisateur voit ce message après inscription :**

```
✅ Compte créé ! 
   Vérifiez votre email pour confirmer votre adresse.
```

### **Il reçoit un email Supabase avec :**
- Un lien unique de confirmation
- Le lien ressemble à : `https://localhost:5173/?token=xyz&...`
- Le lien est valide pendant 24 heures

### **Il clique sur le lien :**
- Supabase valide son identité
- Son compte est marqué comme confirmé
- Il est automatiquement connecté
- Il est redirigé vers la page d'accueil

### **Si le lien expire :**
- L'utilisateur reçoit un nouveau lien d'activation
- (fonction à ajouter si nécessaire)

---

## 🔐 Sécurité

✅ **Hachage des mots de passe** : Supabase utilise bcrypt
✅ **Tokens JWT** : Les sessions sont sécurisées
✅ **Row-Level Security** : Chaque utilisateur ne voit que ses données
✅ **HTTPS** : En production, HTTPS est forcé
✅ **Confirmation d'email** : Vérifie l'adresse email réelle

---

## 📱 Fonctionnalités d'authentification

### **À la première connexion :**
- ✅ Création du profil utilisateur
- ✅ Synchronisation avec la base de données
- ✅ Affichage du nom complet dans l'app

### **À chaque connexion :**
- ✅ Récupération des voyages publiés
- ✅ Récupération des photos
- ✅ Récupération des appréciations
- ✅ Synchronisation de la langue

### **À la déconnexion :**
- ✅ Effacement de la session
- ✅ Retour à la page d'accueil
- ✅ Suppression des données personnelles du cache

---

## 💡 Points importants

1. **L'email doit être unique**
   - Deux utilisateurs ne peuvent pas avoir le même email

2. **Le mot de passe doit être fort**
   - Minimum 6 caractères (configurable dans Supabase)

3. **La confirmation d'email est obligatoire**
   - Sinon l'utilisateur ne peut pas se connecter

4. **Les sessions persistent**
   - L'utilisateur reste connecté même s'il ferme le navigateur
   - Sauf s'il clique sur "Logout"

---

## ✅ Checklist de configuration complète

- [ ] Supabase configuré avec `.env.local`
- [ ] SMTP configuré (SendGrid, Mailgun, Amazon SES)
- [ ] Confirmation email activée dans Supabase
- [ ] Table `user_profiles` créée
- [ ] Row-Level Security activé
- [ ] URL de redirection définie

---

## 🐛 Dépannage

### **L'utilisateur ne reçoit pas l'email de confirmation**
1. ✅ Vérifiez le dossier spam
2. ✅ Vérifiez que SMTP est bien configuré dans Supabase
3. ✅ Consultez les logs Supabase → Auth

### **L'utilisateur peut se connecter sans confirmer l'email**
1. ✅ Vérifiez que "Confirm email" est activé dans Supabase
2. ✅ Assurez-vous que Row-Level Security fonctionne

### **Le lien de confirmation est cassé**
1. ✅ Vérifiez les URL de redirection dans Supabase
2. ✅ Vérifiez que le port (5173, 4173, etc.) est correct

---

## 🎯 Résultat attendu

1. **Un nouvel utilisateur s'inscrit**
   → Reçoit un email de confirmation
   → Clique sur le lien
   → Est automatiquement connecté
   → Peut accéder à l'application

2. **Un utilisateur existant se connecte**
   → Entre email + mot de passe
   → Est connecté immédiatement
   → Accède à l'application

3. **Un utilisateur se déconnecte**
   → Est redirigé vers la page d'accueil
   → Doit se reconnecter pour accéder à l'app

---

Besoin d'aide? Consultez la documentation Supabase : https://supabase.com/docs/guides/auth
