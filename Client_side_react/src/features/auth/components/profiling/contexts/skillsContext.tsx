
import { createContext } from "react";

export type ProviderValueType = {
    data: {
        skill: string;
        level: string;
        isSoftSkill: boolean;
    }[];
    addData: React.Dispatch<
        React.SetStateAction<{
            data: {
                skill: string;
                level: string;
                isSoftSkill: boolean;
            }[];
        }>
    >;
};

const skillContext = createContext<ProviderValueType>({
    data: [],
    addData: () => { },
});

export default skillContext;
