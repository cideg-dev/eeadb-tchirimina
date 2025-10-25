const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

// parser for JSON bodies (used by frontend fetch calls)
app.use(express.json());

// Simple configurable CORS middleware
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin) return next();
  if (allowedOrigins.length === 0) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Configuration conditionnelle de Passport GitHub Strategy
// Ne configure que si les variables d'environnement nécessaires sont présentes
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      // Vérifier la liste d'utilisateurs autorisés si fournie
      const allowed = (process.env.AUTHORIZED_USERS || '').split(',').map(s => s.trim()).filter(Boolean);
      if (allowed.length > 0) {
        // profile.username contient le GitHub login
        if (!allowed.includes(profile.username)) {
          // Refuse l'authentification avec message utile
          return done(null, false, { message: 'Utilisateur non autorisé' });
        }
      }
      // Attacher l'accessToken si l'on veut appeler l'API GitHub plus tard
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  ));
  console.log('Authentification GitHub configurée');
} else {
  console.log('Mode développement: authentification GitHub désactivée (variables manquantes)');
}

function ensureAuthenticated(req, res, next) {
  // En mode développement (sans variables d'environnement), on autorise l'accès
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    return next();
  }
  
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/', ensureAuthenticated, (req, res) => {
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    res.send(`<h1>Espace privé EEADB</h1><p>Bienvenue ${req.user.username} !</p><a href="/logout">Déconnexion</a>`);
  } else {
    res.send(`<h1>Espace privé EEADB</h1><p>Mode développement: accès libre</p><p><a href="/private/">Accéder aux fichiers privés</a></p>`);
  }
});

app.get('/login', (req, res) => {
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    res.send('<a href="/auth/github">Se connecter avec GitHub</a>');
  } else {
    res.send('<p>Mode développement: authentification désactivée</p><a href="/">Retour à l\'accueil</a>');
  }
});

// Routes d'authentification GitHub (seulement si configuré)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
} else {
  // Route de secours pour le mode développement
  app.get('/auth/github', (req, res) => {
    res.redirect('/');
  });
  app.get('/auth/github/callback', (req, res) => {
    res.redirect('/');
  });
}

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

// Exemple de route protégée pour un fichier privé
app.get('/fichier-confidentiel', ensureAuthenticated, (req, res) => {
  res.send('Contenu confidentiel réservé aux membres authentifiés.');
});

// Serve files from the private folder (render-private/private)
const path = require('path');
const fs = require('fs');

app.get('/private/:filename', ensureAuthenticated, (req, res) => {
  const filename = req.params.filename;
  const safeName = path.basename(filename); // prevent directory traversal
  const filePath = path.join(__dirname, 'private', safeName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Fichier non trouvé');
  }
  res.download(filePath);
});

// Health check public (sans authentification) pour Render
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, () => {
  console.log(`Serveur privé EEADB lancé sur le port ${PORT}`);
});
