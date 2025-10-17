const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

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

// Liste des utilisateurs autorisés (depuis les variables d'environnement)
const authorizedUsers = (process.env.AUTHORIZED_USERS || '').split(',');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Filtrer les utilisateurs autorisés
    if (authorizedUsers.includes(profile.username)) {
      return done(null, profile);
    } else {
      return done(null, false, { message: 'Utilisateur non autorisé' });
    }
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/', ensureAuthenticated, (req, res) => {
  res.send(`<h1>Espace privé EEADB</h1><p>Bienvenue ${req.user.username} !</p><a href="/logout">Déconnexion</a>`);
});

app.get('/login', (req, res) => {
  res.send('<a href="/auth/github">Se connecter avec GitHub</a>');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

// Exemple de route protégée pour un fichier privé
app.get('/fichier-confidentiel', ensureAuthenticated, (req, res) => {
  res.send('Contenu confidentiel réservé aux membres authentifiés.');
});

app.listen(PORT, () => {
  console.log(`Serveur privé EEADB lancé sur le port ${PORT}`);
});
