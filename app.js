import express from "express";
import mongoose from "./config/db-connection.js";
import Instrumento from "./models/Instrumentos.js";
import instrumentoRoutes from "./routes/instrumentoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger-config.js";

const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/", instrumentoRoutes);
app.use("/", userRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Rota para cadastrar instrumentos fixos
app.get("/", async (req, res) => {
  try {
    const instrumentos = [
      {
        name: "Guitarra",
        category: "Cordas",
        description: "Instrumento elétrico versátil para vários estilos musicais",
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

    // Insere os instrumentos no banco (se não existirem ainda)
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
