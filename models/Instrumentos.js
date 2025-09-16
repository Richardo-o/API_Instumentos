import mongoose from "mongoose";

// Criando um documento aninhado

const descriptionSchema = new mongoose.Schema({
    include:String,
    suport: String,
    rating: String
})




const instrumentoSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    descriptions: descriptionSchema
})

const Instrumento = mongoose.model('Instrumento', instrumentoSchema)

export default Instrumento