import { UseFormReturnType } from "@mantine/form";

export type newSesh = {
    value: string,
    date: string,
    hobbyTitle: string,
    newIndex: number,
    hobbyTitleIndex: number
}

export type logSessionType = {
    hobbyKeyId: number, session: string; time: string; mostFrequentlyUseTime: number[]
}

export type LogSessionFormType = {
    newSessions: logSessionType[]
}

export type LogSessionFormReturnType = UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType>;