import { IUserInfo } from "../../../interfaces/user";
import { customFetch } from "../../infrastructure/fetch";
import { updateUserAction } from "./update-user-action";

export const fetchUserInfo = (email: string): Promise<IUserInfo> =>
  customFetch(`users/${email}`, { method: "GET" }).then((userInfo) => {
    updateUserAction(userInfo);
    return userInfo;
  });
