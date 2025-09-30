// Importando o mongoose
import mongoose from "mongoose"
// Usuário e senha do banco de dados
const dbUser = "rickysilva04205_db_user"
const dbPassword = "e7Ebvx20F8fLH4Ov"



const connect = () => {
    mongoose.connect(
   `mongodb+srv://rickysilva04205_db_user:e7Ebvx20F8fLH4Ov@cluster0.l6z569b.mongodb.net/api-instrumentos?retryWrites=true&w=majority&appName=Cluster0`
    )

    const connection = mongoose.connection;
    connection.on("error", ()=>{
        console.log("Erro ao conectar com o mongoDB");
    });
    connection.on("open", ()=>{
        console.log("Conectado ao mongoDB com sucesso!");
    });
    };

    connect();
    
    export default mongoose;