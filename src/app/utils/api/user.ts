import { LoginUser, UserModel } from "../StorageUtils";

export const reqLogin = async (username: string, password: string): Promise<LoginUser> => {
  return new Promise((resolve, _) => {
    console.log(username, password);
    resolve({
      id: 1,
      name: "zhangsan",
    });
  });
};
