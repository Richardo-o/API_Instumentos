import express from "express";
const instrumentoRoutes = express.Router();
import instrumentoController from "../controllers/instrumentoController.js";

instrumentoRoutes.get(
  "/instrumentos",
  instrumentoController.getAllInstrumentos
);

instrumentoRoutes.post("/instrumento", instrumentoController.createInstrumento);

instrumentoRoutes.delete(
  "/instrumento/:id",
  instrumentoController.deleteInstrumento
);

instrumentoRoutes.put(
  "/instrumento/:id",
  instrumentoController.updateInstrumento
);

instrumentoRoutes.get(
  "/instrumento/:id",
  instrumentoController.getOneInstrumento
);

export default instrumentoRoutes;
