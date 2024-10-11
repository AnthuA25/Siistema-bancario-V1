import  Account  from "../models/Account";
import { initResponse } from "../helper"

const deleteAccount = async (id_account: string ) => {
    const res = initResponse<Account>();

    const accountId = parseInt(id_account, 10);
    if (isNaN(accountId)) {
        res.error = "Invalid account ID";
        return res;
    } 

    const account = await Account.findOne({ where: { id_account } });
    if (!account) {
        res.error = "Account not found";
        return res;
    }
    await Account.destroy({ where: {  id_account } });
    res.success = true;
    res.data = account;
    return res;
}

export { deleteAccount }