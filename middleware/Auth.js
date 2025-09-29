import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

// Função de Autenticação para verificar se o usuário está enviado o token e se ele é válido

const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    // Dividindo a String do token (para eliminar a palavra Bearer)
    const bearer = authToken.split(" ");
    const token = bearer[1];
    // Validando o token
    jwt.verify(token, userController.JWTSecret, (error, data) => {
      if (error) {
        res.status(401).json({error: "Token inválido" });
      } else {
        // Token VÁLIDO
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Acesso não autorizado." });
  }
};

export default { Authorization };