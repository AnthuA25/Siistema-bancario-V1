import type { RequestHandler } from "express";
import { getAccount } from "../services/accountServices";

// Handler para el endpoint GET /account/:id
const accountInfoHandler: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el id de la cuenta de los parámetros de la URL
        const account = await getAccount(Number(id));

        if (!account) {
            res.status(404).json({ message: "Cuenta no encontrada" });
            return; // Importante: No retornamos ningún valor, solo terminamos la función
        }

        // Devolver información de la cuenta
        res.status(200).json(account);
    } catch (error) {
        console.error("Error al obtener la información de la cuenta:", error);
        res.status(500).json({ message: "Ocurrió un error al obtener la información de la cuenta" });
    }
};

export { accountInfoHandler };
