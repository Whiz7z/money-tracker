import jwt from "jsonwebtoken";
interface JwtPayload {
  id: string;
}
export default (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  return decoded.id;
};
