// index.js — resolvido

import express from "express";
import mongoose from "./config/db-connection.js"; // mantém a conexão centralizada
import Instrumento from "./models/Instrumentos.js";
import instrumentoRoutes from "./routes/instrumentoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger-config.js";

const app = express();

// Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas principais
app.use("/", instrumentoRoutes);
app.use("/", userRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GET /  -> lista instrumentos (versão do branch main)
app.get("/", async (req, res) => {
  try {
    const instrumentos = await Instrumento.find();
    res.status(200).json({ instrumentos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Não foi possível listar os instrumentos" });
  }
});

// GET /seed -> insere dois instrumentos fixos (versão do branch Develop)
app.get("/seed", async (req, res) => {
  try {
    const instrumentos = [
      {
        name: "Guitarra",
        category: "Cordas",
        description:
          "Instrumento elétrico versátil para vários estilos musicais",
        price: 1500,
      },
      {
        name: "Piano",
        category: "Teclas",
        description:
          "Instrumento de teclado clássico, ideal para música erudita e contemporânea",
        price: 12000,
      },
    ];

    const saved = await Instrumento.insertMany(instrumentos);
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erro: "Não foi possível cadastrar os instrumentos" });
  }
});

// Inicializa servidor
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`🚀 API rodando em http://localhost:${port}`);
});
