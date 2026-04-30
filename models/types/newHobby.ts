import { UseFormReturnType } from "@mantine/form";

export type NewHobbyFormValues = {
    hobbyTitle: string;
    hobbyColor: string;
    hobbyCategory: string;
    hobbyCreate: string;
    hobbyGoalType: string;
    hobbyGoalValue: string;
    hobbyDescription: string;
};

export const InitialNewHobbyFormValues = {
    hobbyTitle: '',
    hobbyColor: '#000000',
    hobbyCategory: '',
    hobbyCreate: '',
    hobbyGoalType: '0',
    hobbyGoalValue: '',
    hobbyDescription: ''
} as NewHobbyFormValues;

export type NewHobbyFormType = UseFormReturnType<NewHobbyFormValues, (values: NewHobbyFormValues) => NewHobbyFormValues>;