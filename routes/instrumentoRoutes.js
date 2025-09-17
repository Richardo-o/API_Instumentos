import express from "express";
const instrumentoRoutes = express.Router();
import instrumentoController from "../controllers/instrumentoController.js";

// Importando Middleware

import Auth from "../middleware/Auth.js";

instrumentoRoutes.get(
  "/instrumentos",
  Auth.Authorization, 
  instrumentoController.getAllInstrumentos
);

instrumentoRoutes.post(
  "/instrumento",
  Auth.Authorization,
  instrumentoController.createInstrumento
);

instrumentoRoutes.delete(
  "/instrumento/:id",
  Auth.Authorization, 
  instrumentoController.deleteInstrumento
);

instrumentoRoutes.put(
  "/instrumento/:id",
  Auth.Authorization, 
  instrumentoController.updateInstrumento
);

instrumentoRoutes.get(
  "/instrumento/:id",
  Auth.Authorization, 
  instrumentoController.getOneInstrumento
);

export default instrumentoRoutes;
