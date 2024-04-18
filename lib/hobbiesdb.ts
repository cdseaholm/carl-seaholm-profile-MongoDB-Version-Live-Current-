import Hobby from "@/models/hobby";
import dbConnect from "@/lib/mongodb";
import { stringToObjectId } from "./utils";

interface HobbyFilter { page?: number; limit?: number;}

export async function getHobbys(filter: HobbyFilter = {}) {
  try {
    await dbConnect();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const hobbys = await Hobby.find().skip(skip).limit(limit).lean().exec();

    const results = hobbys.length;

    return { hobbys: hobbys, page, limit, results };
  } catch (error) {
    return { error };
  }
}

export async function createHobby(title: string, dates: [string], descriptions: [string], minutesXsessions: [string], categories: [string], goals: [string], user_email: string, color: string) {
  try {
    await dbConnect();

    const hobby = await Hobby.create({ title, dates, descriptions, minutesXsessions, categories, goals, user_email, color});

    return { hobby };
  } catch (error) {
    return { error };
  }
}

export async function getHobby(id: string) {
  try {
    await dbConnect();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Hobby not found" };
    }

    const hobby = await Hobby.findById(parsedId).lean().exec();
    if (hobby) {
      return {
        hobby,
      };
    } else {
      return { error: "Hobby not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateHobby( id: string, { title, dates, descriptions, minutesXsessions, categories, goals, user_email, color }: { title?: string; dates?: [string]; descriptions?: [string]; minutesXsessions?: [string]; categories?: [string]; goals?: [string]; user_email?: string; color?: string;}
) {
  try {
    await dbConnect();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Hobby not found" };
    }

    const hobby = await Hobby.findByIdAndUpdate( parsedId, { title, dates, descriptions, minutesXsessions, categories, goals, user_email, color }, { new: true }).lean().exec();

    if (hobby) {
      return {
        hobby,
      };
    } else {
      return { error: "Hobby not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteHobby(id: string) {
  try {
    await dbConnect();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Hobby not found" };
    }

    const hobby = await Hobby.findByIdAndDelete(parsedId).exec();

    if (hobby) {
      return {};
    } else {
      return { error: "Hobby not found" };
    }
  } catch (error) {
    return { error };
  }
}