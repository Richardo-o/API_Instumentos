import Instrumento from "../models/Instrumentos.js";

class instrumentoService {

    // Buscando todos instrumentos no sistema 

    async getAllInstrumentos(){
        try {
            const instrumento = await Instrumento.find()
            return instrumento
        } catch (error){
            console.log(error)
        }
    }

    async Create (name, category, description, price){
        try{
            const newInstrumento = new Instrumento({
                name,
                category,
                description,
                price
            })
            await newInstrumento.save()
        }catch(error){
            console.log(error)
        }
    }

    async Delete(id){
        try {
            await Instrumento.findByIdAndDelete(id)
            console.log(`Instrumento com a id: ${id} foi deletado`)
        } catch(error){
            console.log(error)
        }
    }

    async Update(id, name, category, description, price){
        try{
            const updateInstrumento = await Instrumento.findByIdAndUpdate(
                id,
                {
                    name,
                    category,
                    description,
                    price
                },
                {new: true}
            )
            console.log(`Dados do instrumento com id: ${id} alterados com sucesso.`)
            return updateInstrumento
        }catch(error){
            console.log(error)
        }
    }

    async getOne(id) {
        try {
            const instrumento = await Instrumento.findOne({_id: id})
            return instrumento
        } catch (error) {
            console.log(error)
        }
    }
}
export default new instrumentoService() 