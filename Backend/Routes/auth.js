import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { config } from '../Config/env.js';
const router = express.Router();

// start OAuth
router.get('/google', (req, res, next) => {
  console.log('[AUTH] GET /auth/google called');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback
router.get('/google/callback', (req, res, next) => {
  console.log('[AUTH] GET /auth/google/callback called, query:', req.query);
  next();
}, passport.authenticate('google', { failureRedirect: config.frontendOrigin, session: false }), async (req, res) => {
  console.log('[AUTH] passport callback succeeded, user:', req.user && req.user.id);
  const profile = req.user;
  const email = profile.emails && profile.emails[0] && profile.emails[0].value;
  const id = profile.id;

  await db.read();
  let user = db.data.users.find(u => u.googleId === id || u.email === email);
  if (!user) {
    user = {
      id: `u_${Date.now()}`,
      googleId: id,
      displayName: profile.displayName,
      email,
      photo: profile.photos && profile.photos[0] && profile.photos[0].value,
      createdAt: new Date().toISOString()
    };
      db.data.users.push(user);
      await db.write();
    } else {
      user.displayName = profile.displayName;
      user.photo = profile.photos && profile.photos[0] && profile.photos[0].value;
      await db.write();
    }

    // create JWT
    const payload = { sub: user.id, name: user.displayName, email: user.email };
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

    // Pass token as URL parameter instead of cookie for cross-origin
    res.redirect(`${config.frontendOrigin}/Frontend/main.html?token=${token}`);
  }
);

// logout endpoint
router.post('/logout', (req, res) => {
  res.json({ ok: true });
});

export default router;
