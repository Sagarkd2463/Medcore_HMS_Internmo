import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate access token
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
  );
};

// Generate refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    },
  );
};

// Hash refresh token
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// Generate both tokens
export const generateTokenPair = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    refreshTokenHash: hashToken(refreshToken),
    refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
};
