import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || 5001,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5501",
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
};
