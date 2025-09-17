import instrumentoService from "../services/instrumentoService.js";
import { ObjectId } from "mongodb";

const getAllInstrumentos = async (req, res) => {
  try {
    const instrumentos = await instrumentoService.getAllInstrumentos();
    res.status(200).json({ instrumentos: instrumentos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createInstrumento = async (req, res) => {
  try {
    const { name, category, descriptions, price } = req.body;
    await instrumentoService.Create(name, category, descriptions, price);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const deleteInstrumento = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      instrumentoService.Delete(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const updateInstrumento = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { name, category, description, price } = req.body;
      const instrumento = await instrumentoService.Update(
        id,
        name,
        category,
        description,
        price
      );
      res.status(200).json({ instrumento });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getOneInstrumento = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const instrumento = await instrumentoService.getOne(id);
      if (!instrumento) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ instrumento });
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  getAllInstrumentos,
  createInstrumento,
  deleteInstrumento,
  updateInstrumento,
  getOneInstrumento,
};
