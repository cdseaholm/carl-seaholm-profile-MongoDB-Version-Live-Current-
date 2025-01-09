import { GetData } from "@/utils/data/get";
import { IUser } from "@/models/types/user";

export async function initData(): Promise<IUser> {
  const data = await GetData() as { message: string, data: IUser };
  const returnData = data ? data.data as IUser : {} as IUser;
  return returnData;
}