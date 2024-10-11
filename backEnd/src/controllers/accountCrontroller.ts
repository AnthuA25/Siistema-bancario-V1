import type { RequestHandler } from "express";
import { deleteAccount } from "../services/accountServices";

const deleteAnAccount: RequestHandler = async (req, res) => {
    try {
        const { id_account } = req.params;

        if (!id_account) {
            res.status(400).json({ message: "Account ID is required" });
            return;
        }

        const deletingAcc = await deleteAccount(id_account);
        if (!deletingAcc.success) {
            res.status(404).json({ message: deletingAcc.error });
            return;
        }

        res.status(200).json(deletingAcc);
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: "An error occurred while deleting account" });
    }
};

export { deleteAnAccount };