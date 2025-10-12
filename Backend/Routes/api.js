import express from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  const { id, displayName, email, photo } = req.user;
  res.json({ id, displayName, email, photo });
});

router.get('/protected-data', requireAuth, (req, res) => {
  res.json({ secret: 'this is protected', user: req.user.displayName });
});

export default router;
