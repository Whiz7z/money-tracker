import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const getJwtSecredKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable secret key is not set");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecredKey())
    );

    console.log("auth vers", verified);

    return verified.payload.id;
  } catch (err) {
    throw new Error("Yur token has expired");
  }
};
