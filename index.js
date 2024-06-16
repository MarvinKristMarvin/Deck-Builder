const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
dotenv.config();

const router = require("./app/router");

const app = express();

app.set("view engine", "ejs");
app.set("views", "app/views");

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET_SESSION, // Permet de générer le cryptage basé sur une chaine de caractères
    resave: false, // Relance la sauvegarde du token automatiquement (si vrai) après une action
    saveUninitialized: true, // Sauvegarde la session sans nécessité d'authentification du client (pas de login / password)
    cookie: {
      secure: false, // Si false, le cookie peut être généré sur un site en HTTP (non sécurisé)
      maxAge: 1000 * 60 * 60, // Définit un temps d'expiration du cookie (ici fixé à une heure)
    },
  })
);

app.use(router);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
