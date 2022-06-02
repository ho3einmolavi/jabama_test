
import * as bcrypt from "bcrypt";

export const matchPassword = async (enteredpassword, oldPassword) => {
    return await bcrypt.compare(enteredpassword, oldPassword);
};