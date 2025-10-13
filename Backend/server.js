import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './Routes/auth.js';
import apiRoutes from './Routes/api.js';
import path from "path";

const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { config } from './Config/env.js';
import './Config/passport.js';


console.log('[CONFIG] google config:', config.google);

const __dirname = path.resolve();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// tiny rate limiter
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 120
}));

app.use(cors({
  origin: 'https://turing-web-version.vercel.app',
  credentials: true
}));

app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use(express.static(path.join(process.cwd(), "../Frontend")));

// healthcheck
app.get('/', (req, res) => res.send('Backend running'));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../Frontend/main.html"));
});


app.listen(process.env.PORT || 8080, () => console.log("Server running"));
