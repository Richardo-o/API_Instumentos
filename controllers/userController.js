// Importando Service

import userService from "../services/userService.js";

//Import JWT

import jwt from "jsonwebtoken";

// Importando dotenv

import dotenv from "dotenv";

// Segredo para o token

const JWTSecret = "arrozcomfeijao";

// Importando o bcrypt

import bcrypt from "bcrypt";

// Função para CADASTRAR um usuário

const createUser = async (req, res) => {
  try {
    //Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    // Ver se o usuário já existe
    const user = await userService.getOne(email);
    // Se não houver usuário cadastrado
    if (user == undefined) {
      // Aqui será feito o hash da senha
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // Cadastrando o usuário
      await userService.Create(name, email, hash);
      res.status(201).json({ success: "Usuário cadastrado com sucesso!" }); // 201. CREATED
    } else {
      res.status(409).json({ error: "O usuário informado ja está cadastrado" }); // .Cod de conflito
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Error interno do sv
  }
};
// Função para realizar o login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getOne(email);
    if (user != undefined) {
      //Senha Correta

      //Comparando hash
      const correct = bcrypt.compareSync(password, user.password);

      // Se a senha for valida

      if (correct) {
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400).json({
                error: "Não foi possivel gerar o token de autenticação.",
              });
            } else {
              //token gerado com sucesso
              res.status(200).json({ token });
            }
          }
        );
      } else {
        //SENHA INCORRETA
        res.status(401).json({ error: "Credenciais invalidas" }); // 401. Não autorizado
      }
    } else {
      res.status(404).json({ error: "Usuário não encontrado!" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, JWTSecret };
