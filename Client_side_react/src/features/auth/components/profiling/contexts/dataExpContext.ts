import { createContext } from "react";

type ProviderValueType = {
    data: {
        job: string;
        local: string;
        company: string;
        period: string;
    }[];
    setFormData: React.Dispatch<
        React.SetStateAction<{
            data: {
                job: string;
                local: string;
                company: string;
                period: string;

            }[];
        }>
    >;
};

const expContext = createContext<ProviderValueType>({
    data: [],
    setFormData: () => { },
});

export default expContext;
