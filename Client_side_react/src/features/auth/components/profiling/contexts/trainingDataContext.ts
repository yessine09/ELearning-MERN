import { createContext } from "react";

type ProviderValueType = {
    data: {
        establishment: string,
        local: string,
        specialty: string, // corrected typo
        degree: string,
        startDate: Date,
        endDate: Date,
        student: boolean,
    }[];
    setTrainingData: React.Dispatch<
        React.SetStateAction<{
            data: {
                establishment: string,
                degree: string,
                specialty: string, // corrected typo
                local: string,
                startDate: Date,
                endDate: Date,
                student: boolean,
            }[];
        }>
    >;
};

const trainingDataContext = createContext<ProviderValueType>({
    data: [],
    setTrainingData: () => { },
});

export default trainingDataContext;
