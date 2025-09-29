const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", 
    info: {
      title: "The Instruments API",
      description: "API para catálogo de instrumentos",
      version: "1.0.0",
      contact: {
        name: "Erlon, Paulo, Ricardo",
      },
      servers: [{ url: "http://localhost:4000" }],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", 
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/instrumentoRoutes.js", "./docs/swaggerDocs.yaml"], 
};

export default swaggerOptions;