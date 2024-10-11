import { Account } from "../models";

const getAccount = async (id_account: number) => {
    const getAccount = await Account.findByPk(id_account);
    return getAccount;
};

export { getAccount };