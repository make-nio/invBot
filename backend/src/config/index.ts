// Configurations 
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user';
import crypto from 'crypto';

export const setupExpress = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configuración de sesión
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

  // Configuración de Passport
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      const user = await User.findOne({ username, password: hashedPassword });
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
