import { GetData } from "@/utils/data/get";
import { IUser } from "@/models/types/user";

export async function initData(): Promise<IUser> {
  const data = await GetData();
  const returnData = data.data as IUser;
  return returnData;
}