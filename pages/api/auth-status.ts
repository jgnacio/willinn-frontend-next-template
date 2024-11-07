import { NextApiRequest, NextApiResponse } from "next";

export default function getServerToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  // Puedes verificar o decodificar el token aquí si es necesario
  return res.status(200).json({ authenticated: true, token });
}
