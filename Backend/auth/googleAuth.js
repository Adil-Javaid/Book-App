const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userDB = require("../model/GoogleUserSchema");

const setupGoogleAuth = (app) => {
  const clientId = process.env.CLIENTID;
  const clientSecret = process.env.CLIENTSECRET;
  const secretSession = process.env.SECRET;

const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }), // use your MongoDB URI here
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);


  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "https://booksite-b7kfhvha.b4a.run/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userDB.findOne({ googleId: profile.id });
          if (!user) {
            user = new userDB({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
            });
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDB.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      console.log("User authenticated:", req.isAuthenticated());
      console.log("User:", req.user);
      res.redirect("https://book-app-virid-six.vercel.app");
    }
  );

  app.get("/auth/user", (req, res) => {
    console.log("Is authenticated:", req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.json({
        displayName: req.user.displayName,
        email: req.user.email,
        image: req.user.image,
        username: req.user.displayName.toLowerCase().replace(/\s+/g, ""),
      });
    } else {
      res.status(401).json({ error: "User is not authenticated" });
    }
  });

  app.get("/auth/logout", (req, res) => {
    req.logout(() => {
      res.redirect("https://book-app-virid-six.vercel.app");
    });
  });
};


module.exports = setupGoogleAuth;
