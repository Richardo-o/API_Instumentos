import express from "express"
import mongoose from "mongoose"
import Instrumento from "./models/Instrumentos.js"
import instrumentoRoutes from "./routes/instrumentoRoutes.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import swaggerOptions from "./config/swagger-config.js"

const app = express()
const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", instrumentoRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

mongoose.connect("mongodb://localhost:27017/api-instrumentos")

app.get("/", async (req,res) => {
    try{
        const instrumentos = await Instrumento.find()
        res.status(200).json({instrumento : instrumento})
    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

app.get("/", (req, res) => {
    const instrumentos = [
        {
            name: "Guitarra",
            category: "Cordas",
            description: "Instrumento elétrico versátil para vários estilos musicais",
            price: 1500
        },
        {
            name: "Piano",
            category: "Teclas",
            description: "Instrumento de teclado clássico, ideal para música erudita e contemporânea",
            price: 12000
        },
    ]
    res.json(instrumentos)
})

const port = 4000
app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log(`API rodando em http:localhost:${port}.`)
})