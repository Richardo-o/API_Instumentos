import express from "express"
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", (req, res) => {
    const instrumentos = [
        {
            nome: "Guitarra",
            categoria: "Cordas",
            descricao: "Instrumento elétrico versátil para vários estilos musicais",
            price: 1500
        },
        {
            nome: "Piano",
            categoria: "Teclas",
            descricao: "Instrumento de teclado clássico, ideal para música erudita e contemporânea",
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