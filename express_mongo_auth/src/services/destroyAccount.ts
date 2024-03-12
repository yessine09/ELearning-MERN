import DAORefresh from "../models/dao/refresh.dao";
import DAOUser from "../models/dao/user.dao";

export async function destroyAccount(email: string): Promise<void> {
    const user = await DAOUser.getUserByEmail(email);
    if (user) {
        await DAOUser.deleteUser(user.id);
        await DAORefresh.clearTokens({ owner: user.id });
    }
}
